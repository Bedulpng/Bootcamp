import React from 'react';
import SidebarItem from './SidebarItem';
import { sidebarItems } from './SidebarConfig';

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-64px)] w-64 bg-primary text-white bg-[#0020F6] p-4 overflow-y-auto">
      <nav className="space-y-2">
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