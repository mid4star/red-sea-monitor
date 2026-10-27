import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  options: FilterOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  onClear?: () => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  selectedId,
  onSelect,
  onClear,
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-b border-rule/60',
          className
        )
      )}
    >
      <div className="flex items-center text-xs font-mono uppercase tracking-wider text-muted mr-2 shrink-0">
        <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 opacity-70" strokeWidth={1.5} />
        <span>Filter:</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {options.map((opt) => {
          const isSelected = opt.id === selectedId;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={clsx(
                'inline-flex items-center gap-1 px-3 py-1.5 text-xs font-sans rounded-sm border transition-colors select-none min-h-[36px]',
                isSelected
                  ? 'bg-sea-900 border-sea-900 text-paper font-medium dark:bg-paper dark:border-paper dark:text-sea-900'
                  : 'bg-transparent border-rule text-muted hover:border-ink/30 hover:text-ink dark:hover:text-paper'
              )}
            >
              <span>{opt.label}</span>
              {opt.count !== undefined && (
                <span className="font-mono text-[10px] opacity-70 ml-1">({opt.count})</span>
              )}
            </button>
          );
        })}

        {selectedId !== 'all' && onClear && (
          <button
            onClick={onClear}
            className="inline-flex items-center text-xs text-coral-500 hover:underline px-2 py-1 min-h-[36px]"
          >
            <X className="w-3 h-3 mr-0.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
