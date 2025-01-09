import React from 'react';
import SidebarItem from './SidebarItem';
import { sidebarItems } from './SidebarConfig';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-[#0020f6] items-[#0020f6] min-h-[calc(100vh-64px)]">
      <nav className="p-4 space-y-1 items-[#0020F6]">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            subItems={item.subItems}
            href={item.href}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;