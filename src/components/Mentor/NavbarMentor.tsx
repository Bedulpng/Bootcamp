'use client'

import { Link } from 'react-router-dom'
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
  return (
    <header className="border-b">
      <div className="container relative flex h-16 items-center px-4">
        <Link to="/dashboard">
          <img
            src="/white_logo_big.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded"
          />
        </Link>
        <nav className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-12">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/batch">Explore Batch</Link>
            <Link to="/trainee">Trainee</Link>
          </div>
        </nav>
        <div className="absolute right-4 flex items-center gap-4">
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
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