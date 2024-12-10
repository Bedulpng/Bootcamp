'use client'

import { useState, useRef } from 'react'
import { Button } from "@/LandingPage/ui/button"
import { Input } from "@/LandingPage/ui/input"
import { Label } from "@/LandingPage/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/LandingPage/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/LandingPage/ui/avatar"

interface ProfileEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProfileEdit({ open, onOpenChange }: ProfileEditorProps) {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', profile)
    console.log('New profile picture:', imagePreview)
    onOpenChange(false) // Close the modal
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Basic Information</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-[2fr,1fr] gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Profile photo
                </Label>
                <Avatar className="h-24 w-24">
                  <AvatarImage src={imagePreview || '/placeholder.svg?height=96&width=96'} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-xs text-muted-foreground">
                  Recommended 300 x 300
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
