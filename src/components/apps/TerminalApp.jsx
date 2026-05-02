import React, { useState, useRef, useEffect } from 'react';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { useSystemStore } from '../../store/systemStore';

/**
 * Terminal App
 * macOS-style terminal with Arhan's portfolio commands
 */
const FAKE_FS = {
  '/': ['home', 'projects', 'downloads'],
  '/home': ['arhan'],
  '/home/arhan': ['Desktop', 'Documents', 'Portfolio'],
  '/home/arhan/Desktop': ['Resume.pdf', 'Projects', 'Contact.md'],
  '/home/arhan/Documents': ['notes.txt', 'ideas.md'],
  '/home/arhan/Portfolio': ['apps', 'src', 'public', 'README.md'],
  '/projects': ['ai-twin', 'safari-clone', 'saas-dashboard'],
  '/downloads': ['wallpaper-pack.zip'],
};

const APP_ALIASES = ['about', 'projects', 'skills', 'terminal', 'content', 'contact', 'resume', 'ai', 'finder', 'safari', 'launchpad', 'notifications', 'codewitharhan', 'saas', 'devtimeline', 'settings'];

const TerminalApp = ({ onAppSelect }) => {
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('/home/arhan');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState([
    'ArhanOS Shell v4.0',
    'Type "help" for available commands',
    ''
  ]);
  const { bootTime } = useSystemStore();
  const outputEndRef = useRef(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const getUptime = () => {
    const diffSec = Math.max(1, Math.floor((Date.now() - bootTime) / 1000));
    const h = Math.floor(diffSec / 3600);
    const m = Math.floor((diffSec % 3600) / 60);
    const s = diffSec % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const resolvePath = (target) => {
    if (!target || target === '~') return '/home/arhan';
    if (target.startsWith('/')) return target;
    if (target === '..') {
      const parts = cwd.split('/').filter(Boolean);
      parts.pop();
      return `/${parts.join('/')}` || '/';
    }
    if (target === '.') return cwd;
    return `${cwd === '/' ? '' : cwd}/${target}`;
  };

  const baseCommands = [
    'help', 'about', 'projects', 'skills', 'resume', 'contact', 'github', 'youtube', 'stats',
    'whoami', 'uptime', 'ls', 'cd', 'pwd', 'open', 'clear', 'neofetch'
  ];

  const runCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return [''];

    const [commandRaw, ...args] = trimmed.split(/\s+/);
    const command = commandRaw.toLowerCase();

    if (command === 'help') {
      return [
        'Available commands:',
        '  help, about, projects, skills, resume, contact',
        '  github, youtube, stats, whoami, uptime',
        '  ls, cd, pwd, open [app], clear, neofetch',
      ];
    }

    if (command === 'about') {
      return [`${profile.name} - ${profile.title}`, profile.bio.intro];
    }

    if (command === 'projects') {
      return projects.slice(0, 8).map((p, i) => `${i + 1}. ${p.title}`);
    }

    if (command === 'skills') {
      return [
        'Frontend: React, Next.js, Three.js, Tailwind',
        'Backend: Node.js, Express, Prisma',
        'AI: OpenAI, Gemini, LangChain',
      ];
    }

    if (command === 'resume') return ['Opening resume app...', 'Tip: open resume'];
    if (command === 'contact') return [`Email: ${profile.contact.email}`, `Discord: ${profile.contact.discord}`];
    if (command === 'github') return [`GitHub: ${profile.contact.github}`];
    if (command === 'youtube') return [`YouTube: ${profile.contact.youtube}`];

    if (command === 'stats') {
      return [
        `Projects: ${profile.stats.projects}+`,
        `Contributions: ${profile.stats.contributions}`,
        `Tech mastered: ${profile.stats.technologiesMastered}`,
      ];
    }

    if (command === 'whoami') return ['arhan', profile.name, profile.title];
    if (command === 'uptime') return [`up ${getUptime()}`];
    if (command === 'pwd') return [cwd];

    if (command === 'ls') {
      const entries = FAKE_FS[cwd] || [];
      return entries.length ? [entries.join('   ')] : [''];
    }

    if (command === 'cd') {
      const next = resolvePath(args[0]);
      if (FAKE_FS[next]) {
        setCwd(next);
        return [];
      }
      return [`cd: no such file or directory: ${args[0] || ''}`];
    }

    if (command === 'open') {
      const target = (args[0] || '').toLowerCase();
      if (!target) return ['usage: open [app]'];
      if (APP_ALIASES.includes(target)) {
        if (onAppSelect) onAppSelect(target);
        return [`opening ${target}...`];
      }
      return [`open: unknown app '${target}'`];
    }

    if (command === 'neofetch') {
      return [
        '      ___      ArhanOS 4.0',
        '   .-"   "-.   Host: Portfolio Desktop',
        '  /  .-. .-.\  Kernel: react-vite',
        ' |  /   Y   \| Shell: arhansh',
        ' |  \ 0 | 0 /| Uptime: ' + getUptime(),
        '  \  `---`  /  Theme: glass-cyan',
        '   `-.___.-`   Resolution: ' + window.innerWidth + 'x' + window.innerHeight,
      ];
    }

    if (command === 'clear') return '__CLEAR__';

    return [`command not found: ${command}`];
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const current = input;
      const result = runCommand(current);

      if (result === '__CLEAR__') {
        setOutput([]);
      } else {
        setOutput((prev) => [
          ...prev,
          `arhan@arhanos:${cwd.replace('/home/arhan', '~')}$ ${current}`,
          ...(result || []),
          '',
        ]);
      }

      if (current.trim()) {
        setHistory((prev) => [...prev, current]);
      }
      setHistoryIndex(-1);
      setInput('');
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex >= history.length - 1 ? -1 : historyIndex + 1;
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? '' : history[nextIndex]);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const [partial] = input.split(/\s+/);
      if (!partial) return;
      const candidates = [...baseCommands, ...APP_ALIASES].filter((c) => c.startsWith(partial.toLowerCase()));
      if (candidates.length === 1) {
        setInput(candidates[0] + (partial === 'open' ? ' ' : ''));
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-black">
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {output.map((line, i) => (
          <div key={i} className={`${
            line.includes('arhan@arhanos') ? 'text-cyan-300' :
            line.includes('not found') || line.includes('no such file') || line.includes('unknown') ? 'text-red-400' :
            'text-green-400'
          }`}>
            {line}
          </div>
        ))}
        <div ref={outputEndRef} />
      </div>
      <div className="p-3 border-t border-neutral-800 bg-neutral-950">
        <div className="flex items-center font-mono text-sm">
          <span className="text-cyan-300 mr-2">arhan@arhanos:{cwd.replace('/home/arhan', '~')}$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command"
            className="flex-1 bg-transparent text-green-400 outline-none placeholder-neutral-600"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalApp;
