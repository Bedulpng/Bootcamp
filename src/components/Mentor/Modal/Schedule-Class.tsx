'use client'

import { useState } from 'react'
import { addDays } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'

// Define the schedule interface to match Prisma schema
interface Schedule {
  day: string
  date: string
  start: string
  end: string
}

interface ScheduleClass {
  title: string
  schedule: Schedule[]  // Now it's 'schedule' instead of 'scheduleDays'
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function ScheduleClassModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (schedule: ScheduleClass) => void }) {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [workingHours, setWorkingHours] = useState<{ [key: string]: { start: string; end: string } }>({})
  const [scheduleTitle, setScheduleTitle] = useState('')

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const handleHoursChange = (day: string, type: 'start' | 'end', value: string) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: value }
    }))
  }

  const generateSchedule = async () => {
    const today = new Date();
    
    // Ensure title is within 20 characters
    if (scheduleTitle.length > 20) {
      console.error('Title must be 20 characters or less');
      return;
    }
  
    const schedule = selectedDays.map((day) => {
      const dayIndex = daysOfWeek.indexOf(day);
      let date = addDays(today, (dayIndex + 7 - today.getDay()) % 7); // Calculate the next occurrence of the selected day
      
      // Ensure the date is in ISO format for DateTime field
      const formattedDate = date.toISOString();  // Prisma expects ISO 8601 string for DateTime
      
      return {
        day,
        date: formattedDate, // Send the date as ISO string
        start: workingHours[day]?.start || '09:00',
        end: workingHours[day]?.end || '17:00'
      };
    });
  
    const newSchedule = {
      title: scheduleTitle,
      schedule  // This is now directly an array of schedule items
    };
  
    console.log("Request Payload:", newSchedule); // Check the payload being sent
  
    const token = localStorage.getItem("refreshToken");
  
    if (!token) {
      console.error("No authentication token found");
      return;
    }
  
    try {
      const response = await axios.post(
        'http://192.168.1.12:4000/mentor/schedule',
        newSchedule,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
  
      if (response.status === 200) {
        onSubmit(newSchedule);
      } else {
        throw new Error('Failed to create schedule');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error posting schedule:', error.response?.data || error.message);
      }
    }
  };  
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Class</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={scheduleTitle}
              onChange={(e) => setScheduleTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Working Days</Label>
            <div className="col-span-3 flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={selectedDays.includes(day)}
                    onCheckedChange={() => handleDayToggle(day)}
                  />
                  <label
                    htmlFor={day}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {selectedDays.map((day) => (
            <div key={day} className="grid grid-cols-4 items-center gap-2">
              <Label className="text-right col-span-1">{day} Hours</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Select
                  value={workingHours[day]?.start || '09:00'}
                  onValueChange={(value) => handleHoursChange(day, 'start', value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Start Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                        {`${hour.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select
                  value={workingHours[day]?.end || '17:00'}
                  onValueChange={(value) => handleHoursChange(day, 'end', value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="End Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                        {`${hour.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
        <Button type="submit" 
        onClick={() => { 
          generateSchedule(); 
          onClose(); 
          window.location.reload();
        }}>
          Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
