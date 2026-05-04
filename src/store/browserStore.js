import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid/non-secure";

const INTERNAL_ROUTES = {
  about: { title: "About ArhanOS", kind: "internal", url: "about" },
  projects: { title: "Projects", kind: "internal", url: "projects" },
  contact: { title: "Contact", kind: "internal", url: "contact" },
  skills: { title: "Skills", kind: "internal", url: "skills" },
  terminal: { title: "Terminal", kind: "internal", url: "terminal" },
  finder: { title: "Finder", kind: "internal", url: "finder" },
  notes: { title: "Notes", kind: "internal", url: "notes" },
  photos: { title: "Photos", kind: "internal", url: "photos" },
  settings: { title: "Settings", kind: "internal", url: "settings" },
  launchpad: { title: "Launchpad", kind: "internal", url: "launchpad" },
};

const DEFAULT_BOOKMARKS = [
  { id: "github", title: "GitHub", url: "https://github.com", favicon: "🐙" },
  {
    id: "youtube",
    title: "YouTube",
    url: "https://youtube.com",
    favicon: "📺",
  },
  { id: "openai", title: "OpenAI", url: "https://openai.com", favicon: "🤖" },
  { id: "vercel", title: "Vercel", url: "https://vercel.com", favicon: "▲" },
  {
    id: "codewitharhan",
    title: "CodeWithArhan",
    url: "https://youtube.com/@codewitharhanofficial",
    favicon: "🧠",
  },
];

const DEFAULT_INTERNAL_PAGES = {
  about: {
    title: "About ArhanOS",
    content:
      "ArhanOS Portfolio is a macOS-inspired interactive portfolio environment.",
  },
  projects: {
    title: "Projects",
    content: "Browse Arhan’s project catalog from the Projects app or Finder.",
  },
  contact: {
    title: "Contact",
    content: "Reach out through the Contact app or the bookmarked profiles.",
  },
  skills: {
    title: "Skills",
    content:
      "Frontend, backend, AI, 3D, and product design experiences live here.",
  },
  terminal: {
    title: "Terminal",
    content: "Use Terminal for filesystem commands and quick app launch.",
  },
  finder: {
    title: "Finder",
    content: "Navigate the virtual filesystem and manage files.",
  },
  notes: {
    title: "Notes",
    content: "Capture notes, ideas, and snippets in the Notes app.",
  },
  photos: {
    title: "Photos",
    content: "Browse generated wallpaper and media assets.",
  },
  settings: {
    title: "Settings",
    content: "Adjust wallpaper, clock, appearance, and system preferences.",
  },
  launchpad: {
    title: "Launchpad",
    content: "Open any installed app from the grid.",
  },
};

const normalizeUrlInput = (value) => {
  const input = value.trim();
  if (!input) return "about:blank";

  const internal = INTERNAL_ROUTES[input.toLowerCase()];
  if (internal) {
    return internal.url;
  }

  if (
    /^https?:\/\//i.test(input) ||
    /^mailto:/i.test(input) ||
    /^about:/i.test(input)
  ) {
    return input;
  }

  if (input.includes(".") && !input.includes(" ")) {
    return input.startsWith("www.") ? `https://${input}` : `https://${input}`;
  }

  const search = encodeURIComponent(input);
  return `https://www.google.com/search?q=${search}`;
};

const resolveTitle = (url) => {
  const internal = INTERNAL_ROUTES[url.toLowerCase()];
  if (internal) return internal.title;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (host === "github.com" || host === "www.github.com") return "GitHub";
    if (host === "youtube.com" || host === "www.youtube.com") return "YouTube";
    if (host === "openai.com" || host === "www.openai.com") return "OpenAI";
    if (host === "vercel.com" || host === "www.vercel.com") return "Vercel";
    if (host === "www.google.com" && parsed.pathname === "/search")
      return "Search Results";
  } catch {
    // Non-URL values (for example internal routes) fall through to default formatting.
  }

  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const createTab = (url = "about") => {
  const resolvedUrl = normalizeUrlInput(url);
  return {
    id: nanoid(),
    title: resolveTitle(resolvedUrl),
    url: resolvedUrl,
    favicon: resolvedUrl.startsWith("http") ? "🌐" : "",
    history: [resolvedUrl],
    historyIndex: 0,
    loading: false,
    error: null,
  };
};

const initialTabs = [createTab("about")];

export const useBrowserStore = create(
  persist(
    (set, get) => ({
      tabs: initialTabs,
      activeTabId: initialTabs[0].id,
      bookmarks: DEFAULT_BOOKMARKS,
      internalPages: DEFAULT_INTERNAL_PAGES,

      resolveUrl: (input) => normalizeUrlInput(input),
      resolveTitle: (url) => resolveTitle(url),

      getActiveTab: () => {
        const state = get();
        return (
          state.tabs.find((tab) => tab.id === state.activeTabId) ||
          state.tabs[0] ||
          null
        );
      },

      openTab: (url = "about") =>
        set((state) => {
          const nextTab = createTab(url);
          return {
            tabs: [...state.tabs, nextTab],
            activeTabId: nextTab.id,
          };
        }),

      closeTab: (tabId) =>
        set((state) => {
          if (state.tabs.length === 1) {
            const replacement = createTab("about");
            return { tabs: [replacement], activeTabId: replacement.id };
          }

          const tabs = state.tabs.filter((tab) => tab.id !== tabId);
          const activeTabId =
            state.activeTabId === tabId
              ? tabs[tabs.length - 1]?.id || tabs[0].id
              : state.activeTabId;
          return { tabs, activeTabId };
        }),

      duplicateTab: (tabId) => {
        const tab = get().tabs.find((item) => item.id === tabId);
        if (!tab) return;

        const duplicated = {
          ...tab,
          id: nanoid(),
          history: [...tab.history],
          historyIndex: tab.historyIndex,
          loading: false,
          error: null,
        };

        set((state) => ({
          tabs: [...state.tabs, duplicated],
          activeTabId: duplicated.id,
        }));
      },

      setActiveTab: (tabId) => set({ activeTabId: tabId }),

      navigateTab: (tabId, urlInput) => {
        const resolvedUrl = normalizeUrlInput(urlInput);
        set((state) => ({
          tabs: state.tabs.map((tab) => {
            if (tab.id !== tabId) return tab;
            const nextHistory = tab.history.slice(0, tab.historyIndex + 1);
            nextHistory.push(resolvedUrl);
            return {
              ...tab,
              url: resolvedUrl,
              title: resolveTitle(resolvedUrl),
              favicon: resolvedUrl.startsWith("http") ? "🌐" : "",
              history: nextHistory,
              historyIndex: nextHistory.length - 1,
              loading: true,
              error: null,
            };
          }),
          activeTabId: tabId,
        }));

        // For internal routes, finish immediately. For external URLs, let iframe onLoad handler finish
        if (!resolvedUrl.startsWith("http")) {
          window.setTimeout(() => get().finishTabLoad(tabId), 100);
        } else {
          // Set fallback timeout for external sites (some might not fire onLoad due to CORS)
          window.setTimeout(() => {
            const tab = get().tabs.find((t) => t.id === tabId);
            if (tab && tab.loading) {
              get().finishTabLoad(tabId);
            }
          }, 5000);
        }
      },

      finishTabLoad: (tabId) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === tabId ? { ...tab, loading: false } : tab,
          ),
        })),

      goBack: (tabId) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => {
            if (tab.id !== tabId || tab.historyIndex <= 0) return tab;
            const historyIndex = tab.historyIndex - 1;
            const url = tab.history[historyIndex];
            return {
              ...tab,
              url,
              title: resolveTitle(url),
              favicon: url.startsWith("http") ? "🌐" : "",
              historyIndex,
              loading: url.startsWith("http"),
              error: null,
            };
          }),
        }));
      },

      goForward: (tabId) => {
        set((state) => ({
          tabs: state.tabs.map((tab) => {
            if (tab.id !== tabId || tab.historyIndex >= tab.history.length - 1)
              return tab;
            const historyIndex = tab.historyIndex + 1;
            const url = tab.history[historyIndex];
            return {
              ...tab,
              url,
              title: resolveTitle(url),
              favicon: url.startsWith("http") ? "🌐" : "",
              historyIndex,
              loading: url.startsWith("http"),
              error: null,
            };
          }),
        }));
      },

      refreshTab: (tabId) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === tabId
              ? {
                  ...tab,
                  loading: tab.url.startsWith("http"),
                  error: null,
                }
              : tab,
          ),
        })),

      merge: (persistedState, currentState) => {
        const merged = {
          ...currentState,
          ...persistedState,
        };

        if (!merged.tabs?.length) {
          const fallback = createTab("about");
          merged.tabs = [fallback];
          merged.activeTabId = fallback.id;
        }

        return merged;
      },

      setTabError: (tabId, error) =>
        set((state) => ({
          tabs: state.tabs.map((tab) =>
            tab.id === tabId ? { ...tab, loading: false, error } : tab,
          ),
        })),

      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [
            ...state.bookmarks.filter(
              (entry) =>
                entry.title !== bookmark.title && entry.url !== bookmark.url,
            ),
            { ...bookmark, id: bookmark.id || nanoid() },
          ],
        })),

      removeBookmark: (bookmarkId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter(
            (bookmark) => bookmark.id !== bookmarkId,
          ),
        })),

      resetBookmarks: () => set({ bookmarks: DEFAULT_BOOKMARKS }),
    }),
    {
      name: "arhanos-browser-store",
      partialize: (state) => ({
        tabs: state.tabs,
        activeTabId: state.activeTabId,
        bookmarks: state.bookmarks,
      }),
    },
  ),
);

export default useBrowserStore;
