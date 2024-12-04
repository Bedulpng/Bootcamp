'use client'

import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Bell, ChevronDown, LogOut, Settings } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function NavbarMentor() {
  const location = useLocation() // Hook to get the current route
  const [activeNav, setActiveNav] = useState(location.pathname) // Initialize with the current route

  // Sync activeNav with route changes
  useEffect(() => {
    setActiveNav(location.pathname)
  }, [location.pathname])

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/batch', label: 'Explore Batch' },
    { path: '/dashboard/trainee', label: 'Trainee' },
  ]

  return (
    <header className="border-b">
      <div className="container relative flex h-16 items-center px-8 justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex-shrink-0">
          <img
            src="/Logo_black_big.png"
            alt="Logo"
            width={150}
            height={50}
            className="rounded"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setActiveNav(item.path)}
              className={`${
                activeNav === item.path ? 'text-wgs-blue font-semibold' : 'text-gray-700'
              } transition-colors hover:text-wgs-blue`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Bell className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1">
                <Avatar className="h-10 w-10 border-2 border-gray-200 rounded-full">
                  <AvatarImage src="/placeholder.svg" alt="Mentor" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="text-sm text-left">
                  <div>MENTOR NAME</div>
                  <div className="text-xs text-muted-foreground">THIS MENTOR ROLE</div>
                </div>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
