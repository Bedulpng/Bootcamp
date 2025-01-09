import { LayoutDashboard, Users, BookOpen, Award, FileText } from 'lucide-react';

export const sidebarItems = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    href: '/dashboardA'
  },
  {
    icon: Users,
    title: 'User',
    subItems: [
      { title: 'User Manage', href: '/usermanage' },
      { title: 'Role Manage', href: '/roles' },
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
    href: '/notes'
  },
  {
    icon: Award,
    title: 'Certificate',
    href: '/certificates'
  }
];