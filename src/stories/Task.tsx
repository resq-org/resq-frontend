export interface TaskProps {
  task: {
    id: string;
    title: string;
    state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
  };
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: TaskProps) {
  const isArchived = state === 'TASK_ARCHIVED';
  const isPinned = state === 'TASK_PINNED';

  return (
    <div
      className={[
        // card
        'flex items-center gap-3 w-full',
        'rounded shadow-sm bg-white',
        'px-4 py-3',
        // focus ring for keyboard nav
        'focus-within:ring-2 focus-within:ring-cyan-400',
        isArchived ? 'opacity-90' : '',
      ].join(' ')}
      role="group"
      aria-label={`task-${id}`}
    >
      {/* Checkbox (display-only) */}
      <button
        type="button"
        aria-label={isArchived ? 'Archived' : 'Archive task'}
        onClick={() => !isArchived && onArchiveTask(id)}
        className={[
          'relative inline-flex items-center justify-center',
          'w-5 h-5 rounded-sm border-2',
          'transition',
          isArchived
            ? 'border-cyan-300 bg-cyan-50'
            : 'border-cyan-300 bg-white hover:bg-cyan-50',
          isArchived ? 'cursor-default' : 'cursor-pointer',
          'flex-shrink-0',
        ].join(' ')}
      >
        {/* 체크 아이콘 (ARCHIVED일 때만 표시) */}
        {isArchived && (
          <svg
            aria-hidden="true"
            className="absolute h-3.5 w-3.5 text-cyan-500"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4.5 10.5 8.5 14.5 15.5 6.5" />
          </svg>
        )}
      </button>

      {/* Title */}
      <label htmlFor={`title-${id}`} className="sr-only">
        Task title
      </label>
      <input
        id={`title-${id}`}
        value={title}
        readOnly
        className={[
          'flex-1 bg-transparent outline-none',
          'text-[15px]',
          isArchived ? 'text-gray-400' : 'text-slate-800',
        ].join(' ')}
      />

      {/* Pin (우측 별) — ARCHIVED는 숨김 */}
      {!isArchived && (
        <button
          type="button"
          aria-label={isPinned ? 'Unpin task' : 'Pin task'}
          onClick={() => onPinTask(id)}
          className={[
            'ml-auto p-1 rounded transition',
            'hover:bg-cyan-50 focus-visible:ring-2 focus-visible:ring-cyan-400',
          ].join(' ')}
        >
          <svg
            aria-hidden="true"
            className={[
              'w-4.5 h-4.5',
              isPinned
                ? 'fill-cyan-500 text-cyan-500'
                : 'fill-gray-300 text-gray-300',
              'transition',
            ].join(' ')}
            viewBox="0 0 24 24"
          >
            {/* star path */}
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      )}
    </div>
  );
}
