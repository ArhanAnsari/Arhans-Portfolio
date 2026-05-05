import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';

/**
 * Calendar App - System Calendar Application
 */
const CalendarApp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [events, setEvents] = useState([]);
  const [creatingDate, setCreatingDate] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const openWindow = useWindowStore((s) => s.openWindow);

  const handleCreateEvent = (dateStr) => {
    const ev = { id: `ev-${Date.now()}`, title: newTitle || 'New Event', date: dateStr, description: '' };
    setEvents((es) => [...es, ev]);
    setCreatingDate(null);
    setNewTitle('');
    // open event in its own window using file-viewer fallback (pass state)
    openWindow({ app: 'file-viewer', title: ev.title, state: { fileId: null, fileName: ev.title, fileContent: `Event: ${ev.title}\nDate: ${ev.date}\n\n${ev.description}` } });
  };

  return (
    <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 p-6 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h1>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-neutral-600 dark:text-neutral-400 text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {days.map((day) => {
              const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString();
              const dayEvents = events.filter((e) => e.date === dateStr);
              return (
              <div
                key={day}
                className="aspect-square flex flex-col items-start justify-start rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-sm cursor-pointer p-2"
                onClick={() => setCreatingDate(dateStr)}
              >
                <div className="text-xs font-medium">{day}</div>
                <div className="mt-1 space-y-1 w-full">
                  {dayEvents.map((ev) => (
                    <div key={ev.id} className="text-[11px] bg-white/5 rounded px-1 truncate">{ev.title}</div>
                  ))}
                </div>
              </div>
            )})}
        </div>
      </div>
        {/* Create Event Modal */}
        {creatingDate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-neutral-800 rounded p-4 w-full max-w-md">
              <h3 className="font-semibold mb-2">Create event for {new Date(creatingDate).toLocaleDateString()}</h3>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-2 rounded mb-3 bg-white/5" placeholder="Event title" />
              <div className="flex justify-end gap-2">
                <button onClick={() => setCreatingDate(null)} className="px-3 py-1 rounded bg-neutral-200">Cancel</button>
                <button onClick={() => handleCreateEvent(creatingDate)} className="px-3 py-1 rounded bg-cyan-500 text-white">Create</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default CalendarApp;
