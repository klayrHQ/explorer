'use client'
import React, { useState, ReactNode } from 'react';
import { Icon } from '../images/icon';
interface AccordionProps {
  id: string;
  title: string;
  badgeCount?: number;
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ id, title, badgeCount, children }) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  const isOpen = openItemId === id;
  return (
    <div className="flex flex-col ">
      <div key={id} className="group">
        <button
          onClick={() => toggleItem(id)}
          className={`w-full flex items-center uppercase  justify-between text-left px-4 py-3 transition-all text-paragraph-sm text-onBackground border-b-1 border-b-borderLow ${isOpen ? 'border-b-1 border-b-borderMedium bg-backgroundTertiary rounded-t-none' : 'border-b-1 border-b-borderLow bg-background rounded-sm'}`}
        >
          <div className="flex justify-between items-center gap-2">
            <span className=" capitalize">{title}</span>
            {badgeCount !== undefined && badgeCount >= 1 && (
              <div className="ml-2 text-caption text-backgroundPrimary flex items-center p-2.5 justify-center bg-volt w-1 h-1 rounded-full">
                {badgeCount}
              </div>
            )}
          </div>

          <Icon
            icon="ChevronDown"
            className={`h-5 w-5 transform transition-transform duration-100 group-hover:text-onBackground ${isOpen ? '-rotate-180 text-onBackground' : 'rotate-0 text-onBackgroundLow'}`}
          />
        </button>
        {isOpen && (
          <div className="flex flex-col p-4 border-b-1 border-b-borderMedium bg-backgroundPrimary ">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
