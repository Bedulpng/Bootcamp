"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ThemeCustomizer() {
  const [selectedColor, setSelectedColor] = useState("gray")

  const colors = [
    { name: "blue", class: "bg-blue-600" },
    { name: "green", class: "bg-green-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "purple", class: "bg-purple-600" },
    { name: "red", class: "bg-red-600" },
    { name: "yellow", class: "bg-yellow-300" },
  ]

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName)
  }

  const handleUpload = () => {
    console.log("Upload foto clicked")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-lg font-medium">Sesuaikan tampilan</h2>

      <div className="relative w-full h-48 bg-slate-700 rounded-lg overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-90F2WEXnNw25aQtFxhaJ00NJRXuBVY.png"
          alt="Header preview"
          className="object-cover"
        />
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Pilih gambar header forum</p>
          <div>
            <Button variant="secondary" className="flex items-center gap-2" onClick={handleUpload}>
              <Upload size={16} className="opacity-70" />
              Upload foto
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Pilih warna tema</p>
          <div className="flex flex-wrap justify-center gap-4">
            <TooltipProvider>
              {colors.map((color) => (
                <Tooltip key={color.name} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <button
                      className={`w-14 h-14 rounded-full ${color.class} relative
                        hover:scale-110 transition-transform`}
                      aria-label={`Select ${color.name} theme`}
                      onClick={() => handleColorSelect(color.name)}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xl">✓</span>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="mt-2 px-3 py-1.5 bg-white border shadow-sm">
                    <p className="capitalize text-sm">{color.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost">Batal</Button>
        <Button>Simpan</Button>
      </div>
    </Card>
  )
}

