import { LayoutDashboard, Users, BookOpen, Award, FileText } from 'lucide-react';

export const sidebarItems = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    href: '/'
  },
  {
    icon: Users,
    title: 'User',
    subItems: [
      { title: 'User List', href: '/users' },
      { title: 'User Roles', href: '/user-roles' },
      { title: 'User Settings', href: '/user-settings' }
    ]
  },
  {
    icon: BookOpen,
    title: 'Class',
    subItems: [
      { title: 'Active Classes', href: '/active-classes' },
      { title: 'Class Schedule', href: '/class-schedule' },
      { title: 'Class Materials', href: '/class-materials' }
    ]
  },
  {
    icon: FileText,
    title: 'Note',
    subItems: [
      { title: 'My Notes', href: '/my-notes' },
      { title: 'Shared Notes', href: '/shared-notes' },
      { title: 'Archive', href: '/archived-notes' }
    ]
  },
  {
    icon: Award,
    title: 'Certificate',
    href: '/certificates'
  }
];