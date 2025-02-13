"use client"

import { useState, useEffect } from "react"

interface FilePreviewProps {
  filePath: string | undefined
  onClose: () => void
}

export default function FilePreview({ filePath, onClose }: FilePreviewProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!filePath) return

    const formattedPath = filePath.replace(/\\/g, "/").replace("public", "")
    const url = `http://192.168.1.7:4000${formattedPath}`
    setPreviewUrl(url)

    const img = new Image()
    img.onload = () => {
      const maxWidth = window.innerWidth * 0.8
      const maxHeight = window.innerHeight * 0.8
      let newWidth = img.width
      let newHeight = img.height

      if (newWidth > maxWidth) {
        newHeight = (newHeight * maxWidth) / newWidth
        newWidth = maxWidth
      }

      if (newHeight > maxHeight) {
        newWidth = (newWidth * maxHeight) / newHeight
        newHeight = maxHeight
      }

      setDimensions({ width: newWidth, height: newHeight })
    }
    img.src = url
  }, [filePath])

  if (!previewUrl) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="font-medium text-lg mb-2">File Preview</h3>
        <div className="overflow-hidden" style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}>
          <iframe
            src={previewUrl}
            className="border rounded-md w-full h-full"
            style={{ width: `${dimensions.width + 20}px`, height: `${dimensions.height + 20}px` }}
            title="File Preview"
            scrolling="no"
          ></iframe>
        </div>
        <button onClick={onClose} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md">
          Close
        </button>
      </div>
    </div>
  )
}

