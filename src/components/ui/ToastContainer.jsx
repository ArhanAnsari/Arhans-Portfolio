import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useToastStore } from '../../store/toastStore';

const ToastItem = ({ toast }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: 14, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.36, ease: 'power3.out' }
    );

    return () => {
      gsap.to(el, { y: 8, opacity: 0, scale: 0.98, duration: 0.22, ease: 'power2.in' });
    };
  }, [toast.id]);

  return (
    <div ref={ref} className="max-w-sm w-full bg-neutral-900/95 border border-white/10 rounded-lg p-3 text-sm text-white shadow-lg flex items-start gap-3">
      <div className="flex-1">
        <div className="font-medium">{toast.title || 'Notification'}</div>
        <div className="text-neutral-300 text-xs mt-1">{toast.message}</div>
      </div>
      {toast.actionLabel && (
        <button
          onClick={() => {
            try {
              toast.onAction && toast.onAction();
            } catch (e) {
              // ignore
            }
            useToastStore.getState().removeToast(toast.id);
          }}
          className="text-xs px-2 py-1 rounded bg-white/5 text-cyan-300 hover:bg-white/10"
        >
          {toast.actionLabel}
        </button>
      )}
    </div>
  );
};

const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
