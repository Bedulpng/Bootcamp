import React, { useState } from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';

interface SubItem {
  title: string;
  href: string;
}

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  subItems?: SubItem[];
  href?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, title, subItems, href }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div>
      <a
        href={href}
        className="flex items-center justify-between p-2 hover:bg-white/10 rounded"
        onClick={(e) => {
          if (hasSubItems) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center space-x-2">
          <Icon size={20} />
          <span>{title}</span>
        </div>
        {hasSubItems && (
          <div className="text-[#0020F6]">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </a>
      {hasSubItems && isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {subItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="block p-2 hover:bg-white/10 rounded text-sm"
            >
              {item.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;