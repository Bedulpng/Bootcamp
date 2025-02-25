"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserCircle, GraduationCap, Lightbulb, ChevronLeft, Send } from "lucide-react"

interface ReviewModalProps {
  formData: {
    personal: Record<string, any>
    education: Record<string, any>
    skills: Record<string, any>
  }
  onSubmit: () => void
  onClose: () => void
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ formData, onSubmit, onClose }) => {
  const renderSection = (title: string, data: Record<string, any>, icon: React.ReactNode) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <dt className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, " ")}</dt>
            <dd className="text-sm font-medium">{value}</dd>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Review Your Information</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-8 py-4">
            {/* Personal Information Section */}
            {renderSection("Personal Information", formData.personal, <UserCircle className="h-5 w-5 text-primary" />)}

            <Separator className="my-6" />

            {/* Education Section */}
            {renderSection("Education", formData.education, <GraduationCap className="h-5 w-5 text-primary" />)}

            <Separator className="my-6" />

            {/* Skills Section */}
            {renderSection("Skills", formData.skills, <Lightbulb className="h-5 w-5 text-primary" />)}
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end gap-4 p-6">
        <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onSubmit} className="flex items-center gap-2">
          Submit
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

