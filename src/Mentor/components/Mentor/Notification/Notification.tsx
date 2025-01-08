'use client'

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, CheckCheck, ChevronDown, ChevronUp, AlertTriangle, Gift, MessageSquare, BookCheck, UserRoundCheck } from 'lucide-react';
import { Button } from "@/LandingPage/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/LandingPage/ui/popover"
import { ScrollArea } from "@/LandingPage/ui/scroll-area"
import { useNotifications } from '../../../../hooks/useNotifications';
import { Notification } from '../../../../types/Notification';

const iconMap: { [key: string]: React.ReactNode } = {
  Lesson: <BookCheck className="h-4 w-4" />,
  Challenge: <UserRoundCheck className="h-4 w-4" />,
  AlertTriangle: <AlertTriangle className="h-4 w-4" />,
  Gift: <Gift className="h-4 w-4" />,
  MessageSquare: <MessageSquare className="h-4 w-4" />,
};

export function NotificationPopup() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications([
    { id: 1, message: "Your student submitted a lesson", description: "John Doe submitted a lesson on class Full stack developer batch 12", isRead: false, icon: "Lesson", createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) }, // 8 hours ago
    { id: 2, message: "Your student submitted a challenge", description: "Jane Doe submitted a challenge on class Quality Assurance batch 11", isRead: false, icon: "Challenge", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) }, // 1 hour ago
  ]);

  const [showAll, setShowAll] = useState(false);
  const [scrollAreaHeight, setScrollAreaHeight] = useState(300);

  // Filter out read notifications
  const unreadNotifications = notifications.filter((notif) => !notif.isRead);

  const displayedNotifications = showAll ? unreadNotifications : unreadNotifications.slice(0, 5);

  useEffect(() => {
    const newHeight = Math.max(Math.min(unreadNotifications.length * 60, 300), 100);
    setScrollAreaHeight(newHeight);
  }, [unreadNotifications.length]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadNotifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadNotifications.length > 5 ? '5+' : unreadNotifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium text-lg">Notifications</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={markAllAsRead}
          >
            <CheckCheck className="h-4 w-4 mr-1" />
            Mark all as read
          </Button>
        </div>
        <ScrollArea style={{ height: `${scrollAreaHeight}px` }} className="transition-all duration-300 ease-in-out">
          <div className="p-4 min-h-[100px] flex flex-col justify-center">
            {displayedNotifications.length > 0 ? (
              displayedNotifications.map((notif) => (
                <NotificationItem 
                  key={notif.id} 
                  notification={notif} 
                  onMarkAsRead={markAsRead} 
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No new notifications.</p>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'See More'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NotificationItem({ notification, onMarkAsRead }: { notification: Notification; onMarkAsRead: (id: number) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`p-4 rounded bg-white border-b border-gray-200 last:border-b-0`}>
      <div className="flex items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="mr-3 text-blue-500">
          {iconMap[notification.icon]}
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium">{notification.message}</p>
          <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(notification.createdAt))} ago</p>
        </div>
        <Button variant="ghost" size="sm" className="ml-2">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-2 pl-7">
          <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
          {!notification.isRead && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs bg-[#0033FF] text-white hover:bg-[#0033FF]/90"
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(notification.id);
              }}
            >
              Mark as read
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
