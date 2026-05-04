import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Folder,
  FileText,
  Image as ImageIcon,
  Link2,
  FolderOpen,
  Trash2,
  Copy,
  Pencil,
  MoveRight,
  Eye,
  Space,
  ArrowUp,
  Plus,
} from 'lucide-react';
import { useFilesystemStore } from '../../store/filesystemStore';
import { useTrashStore } from '../../store/trashStore';
import { useNotificationStore } from '../../store/notificationStore';

const ICON_BY_KIND = {
  folder: Folder,
  text: FileText,
  file: FileText,
  image: ImageIcon,
  shortcut: Link2,
  project: FolderOpen,
};

const FinderApp = () => {
  const {
    initialize,
    currentFolderId,
    previewId,
    getCurrentFolder,
    getNode,
    getNodePath,
    listFolder,
    openFolder,
    goUp,
    createFolder,
    createTextFile,
    renameNode,
    deleteNode,
    moveNode,
    duplicateNode,
    previewNode,
    closePreview,
  } = useFilesystemStore();
  const { deleteItem } = useTrashStore();
  const { pushNotification } = useNotificationStore();

  const [selectedIds, setSelectedIds] = useState([]);
  const [renameDraft, setRenameDraft] = useState('');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const currentFolder = getCurrentFolder();
  const items = useMemo(() => listFolder(currentFolderId), [currentFolderId, listFolder]);
  const currentPreview = previewId ? getNode(previewId) : null;
  const breadcrumbs = currentFolderId ? getNodePath(currentFolderId) : [];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePreview();
      }
      if (event.key === ' ' && selectedIds.length === 1) {
        event.preventDefault();
        previewNode(selectedIds[0]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closePreview, previewNode, selectedIds]);

  const selectedNode = selectedIds.length === 1 ? getNode(selectedIds[0]) : null;

  const handleSelect = (nodeId, additive = false) => {
    setSelectedIds((current) => {
      if (additive) {
        return current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId];
      }
      return [nodeId];
    });
  };

  const handleOpen = (node) => {
    if (!node) return;
    if (node.kind === 'folder') {
      openFolder(node.id);
      setSelectedIds([]);
      return;
    }

    if (node.kind === 'shortcut' && node.appId) {
      window.dispatchEvent(new CustomEvent('arhanos-open-app', { detail: { appId: node.appId } }));
      return;
    }

    previewNode(node.id);
    setSelectedIds([node.id]);
  };

  const handlePreview = () => {
    if (selectedNode) previewNode(selectedNode.id);
  };

  const handleRename = () => {
    if (!selectedNode || !renameDraft.trim()) return;
    renameNode(selectedNode.id, renameDraft.trim());
    pushNotification({ type: 'finder', title: 'File renamed', description: renameDraft.trim(), source: 'finder' });
    setRenameDraft('');
  };

  const handleDuplicate = () => {
    if (!selectedNode) return;
    duplicateNode(selectedNode.id);
    pushNotification({ type: 'finder', title: 'File duplicated', description: selectedNode.name, source: 'finder' });
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    deleteItem({ id: selectedNode.id, name: selectedNode.name, type: selectedNode.kind, original: selectedNode });
    deleteNode(selectedNode.id);
    setSelectedIds([]);
    pushNotification({ type: 'finder', title: 'Moved to Trash', description: selectedNode.name, source: 'finder' });
  };

  const handleMoveToFolder = (folderId) => {
    if (!selectedNode) return;
    moveNode(selectedNode.id, folderId);
    pushNotification({ type: 'finder', title: 'File moved', description: `${selectedNode.name} moved`, source: 'finder' });
  };

  const handleDragStart = (event, node) => {
    event.dataTransfer.setData('text/plain', node.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event, folderId) => {
    event.preventDefault();
    const nodeId = event.dataTransfer.getData('text/plain');
    if (!nodeId) return;
    moveNode(nodeId, folderId);
  };

  const renderPreview = () => {
    if (!currentPreview) {
      return (
        <div className="flex h-full items-center justify-center text-neutral-400">
          Select an item and press Space for Quick Look.
        </div>
      );
    }

    if (currentPreview.kind === 'image') {
      return (
        <img src={currentPreview.icon} alt={currentPreview.name} className="max-h-full max-w-full rounded-2xl object-contain" />
      );
    }

    if (currentPreview.kind === 'text' || currentPreview.kind === 'file' || currentPreview.kind === 'project') {
      return (
        <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-neutral-200 shadow-2xl">
          <div className="text-2xl font-semibold">{currentPreview.name}</div>
          <div className="mt-3 whitespace-pre-wrap text-sm text-neutral-300">
            {currentPreview.content || 'No preview content available.'}
          </div>
        </div>
      );
    }

    return <div className="text-neutral-300">Preview unavailable.</div>;
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <div className="border-b border-white/10 bg-black/20 p-4 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-2 overflow-x-auto text-sm text-neutral-400">
          <button onClick={() => openFolder('root')} className="font-semibold text-cyan-300">Finder</button>
          {breadcrumbs.slice(1).map((crumb, index) => (
            <React.Fragment key={`${crumb}-${index}`}>
              <ChevronRight size={14} />
              <span>{crumb}</span>
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={goUp} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
            <ArrowUp size={12} className="inline-block" /> Up
          </button>
          <button onClick={() => createFolder('New Folder')} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
            <Plus size={12} className="inline-block" /> Folder
          </button>
          <button onClick={() => createTextFile('Untitled.txt', 'New note')} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
            <FileText size={12} className="inline-block" /> File
          </button>
          <button onClick={handlePreview} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
            <Eye size={12} className="inline-block" /> Quick Look
          </button>
          <button onClick={handleDuplicate} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
            <Copy size={12} className="inline-block" /> Duplicate
          </button>
          <button onClick={handleDelete} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
            <Trash2 size={12} className="inline-block" /> Trash
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 lg:grid-cols-[1fr_360px]">
        <div className="min-h-0 overflow-auto p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((node) => {
              const Icon = ICON_BY_KIND[node.kind] || FileText;
              const isSelected = selectedIds.includes(node.id);
              return (
                <motion.button
                  key={node.id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, node)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => node.kind === 'folder' && handleDrop(event, node.id)}
                  onClick={(event) => handleSelect(node.id, event.metaKey || event.ctrlKey)}
                  onDoubleClick={() => handleOpen(node)}
                  className={`group rounded-2xl border p-3 text-left transition-all ${isSelected ? 'border-cyan-300/70 bg-cyan-400/15' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-neutral-200" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">{node.kind}</span>
                  </div>
                  <div className="mt-8 truncate text-sm font-medium text-white">{node.name}</div>
                  <div className="mt-1 text-xs text-neutral-500">{node.kind === 'folder' ? `${node.children?.length || 0} items` : 'Preview available'}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          <motion.aside
            className="border-t border-white/10 bg-neutral-950/90 p-5 lg:border-l lg:border-t-0"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
          >
            <div className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">Quick Look</div>
            <div className="flex h-[45vh] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              {renderPreview()}
            </div>

            {selectedNode && (
              <div className="mt-4 space-y-3 text-sm text-neutral-300">
                <div className="font-semibold text-white">{selectedNode.name}</div>
                <div>Type: {selectedNode.kind}</div>
                <div>Path: {getNodePath(selectedNode.id).join(' / ')}</div>
                <input
                  value={renameDraft}
                  onChange={(event) => setRenameDraft(event.target.value)}
                  placeholder={`Rename ${selectedNode.name}`}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500"
                />
                <button onClick={handleRename} className="rounded-xl bg-cyan-400/20 px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-400/30">
                  Rename
                </button>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-neutral-400">
                  Drag this item onto another folder to move it. Use Space to preview, Esc to close preview.
                </div>
                {selectedNode.kind === 'folder' && (
                  <div className="grid grid-cols-2 gap-2">
                    {items
                      .filter((node) => node.kind === 'folder' && node.id !== selectedNode.id)
                      .map((folder) => (
                        <button
                          key={folder.id}
                          onClick={() => handleMoveToFolder(folder.id)}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10"
                        >
                          Move to {folder.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </AnimatePresence>
      </div>

      {currentPreview && (
        <div className="fixed inset-0 z-[7000] flex items-center justify-center bg-black/70 p-6 backdrop-blur-xl" onClick={closePreview}>
          <div className="max-h-[90vh] max-w-[90vw] overflow-auto rounded-3xl border border-white/10 bg-neutral-950/95 p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-white">{currentPreview.name}</div>
                <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">Quick Look</div>
              </div>
              <button onClick={closePreview} className="rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center justify-center">{renderPreview()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinderApp;
