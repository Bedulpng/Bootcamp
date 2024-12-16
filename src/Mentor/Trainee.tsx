'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Button } from "@/Landing/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Landing/components/ui/table"
import { Search, Download, Users, Calendar, Eye, NotepadText } from 'lucide-react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { NoteManagementButton } from "./NoteButton"
import { FpNoteManagementButton } from './FpNoteManagement'

interface Note {
  id: string;
  message: string;
  sender: {
    name: string;
    role: string;
  };
  file?: {
    url: string;
    type: 'image' | 'file';
    name: string;
  };
}


interface Trainee {
  id: string;
  name: string;
  class: string;
  batch: string;
  github: string;
  note: Note | null;
  fpNote: Note | null;
}

// Mock data
const initialTrainees: Trainee[] = [
  { 
    id: "1", 
    name: "John Doe", 
    class: "Quality Assurance", 
    batch: "12", 
    github: "github.com/johndoe", 
    note: null, 
    fpNote: null // Added fpNote
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    class: "Fullstack Developer", 
    batch: "13", 
    github: "github.com/janesmith", 
    note: { 
      id: "note1", 
      message: "Excellent progress", 
      sender: { name: "Instructor", role: "Teacher" } 
    }, 
    fpNote: null // Added fpNote
  },
  { 
    id: "3", 
    name: "Bob Johnson", 
    class: "Data Science", 
    batch: "11", 
    github: "github.com/bobjohnson", 
    note: { 
      id: "note2", 
      message: "Needs improvement in Python", 
      sender: { name: "Mentor", role: "Advisor" } 
    }, 
    fpNote: null // Added fpNote
  },
];

const classes = [
  { id: 1, name: "Quality Assurance", trainees: 15, startDate: "2023-01-01" },
  { id: 2, name: "Fullstack Developer", trainees: 20, startDate: "2023-02-15" },
  { id: 3, name: "Data Science", trainees: 18, startDate: "2023-03-10" },
]

export default function Trainee() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('trainee')
  const [trainees, setTrainees] = useState(initialTrainees)

  const filteredTrainees = trainees.filter(trainee => 
    trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.class.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredFinalPresentation = trainees.filter(trainee =>
    trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.class.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddNote = (traineeId: string, note: { message: string; file?: File }) => {
    setTrainees(trainees.map(trainee => 
      trainee.id === traineeId 
        ? { 
            ...trainee, 
            note: { 
              id: `note${Date.now()}`, 
              message: note.message, 
              sender: { name: 'Current User', role: 'Instructor' },
              file: note.file 
                ? { 
                    url: URL.createObjectURL(note.file), 
                    type: note.file.type.startsWith('image/') ? 'image' : 'file',
                    name: note.file.name 
                  } 
                : undefined
            } 
          }
        : trainee
    ))
  }

  const handleDeleteNote = (traineeId: string, noteId: string) => {
    setTrainees(trainees.map(trainee => 
      trainee.id === traineeId ? { ...trainee, note: null } : trainee
    ))
  }

  const handleAddFpNote = (traineeId: string, note: { message: string; file?: File }) => {
    setTrainees(trainees.map(trainee => 
      trainee.id === traineeId 
        ? { 
            ...trainee, 
            fpNote: { 
              id: `fpnote${Date.now()}`, 
              message: note.message, 
              sender: { name: 'Tester', role: 'Examiner' },
              file: note.file 
                ? { 
                    url: URL.createObjectURL(note.file), 
                    type: note.file.type.startsWith('image/') ? 'image' : 'file',
                    name: note.file.name 
                  } 
                : undefined
            } 
          }
        : trainee
    ))
  }

  const handleDeleteFpNote = (traineeId: string, noteId: string) => {
    setTrainees(trainees.map(trainee => 
      trainee.id === traineeId ? { ...trainee, fpNote: null } : trainee
    ))
  }

  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(activeTab === 'trainee' ? 'Trainees' : activeTab === 'class' ? 'Classes' : 'Final Presentation')

    // Add header row
    if (activeTab === 'trainee') {
      worksheet.addRow(['Trainee Name', 'Class', 'Batch', 'GitHub', 'Note'])
    } else if (activeTab === 'class') {
      worksheet.addRow(['Class Name', 'Number of Trainees', 'Start Date'])
    } else {
      worksheet.addRow(['Trainee Name', 'Batch', 'Class', 'Note'])
    }
    worksheet.getRow(1).font = { bold: true }

    // Add data rows
    if (activeTab === 'trainee') {
      filteredTrainees.forEach(trainee => {
        worksheet.addRow([trainee.name, trainee.class, trainee.batch, trainee.github, trainee.note?.message || ''])
      })
    } else if (activeTab === 'class') {
      filteredClasses.forEach(cls => {
        worksheet.addRow([cls.name, cls.trainees, cls.startDate])
      })
    } else {
      filteredFinalPresentation.forEach(trainee => {
        worksheet.addRow([trainee.name, trainee.batch, trainee.class, trainee.note?.message || ''])
      })
    }

    // Style columns
    worksheet.columns.forEach(column => {
      column.width = 20 // Set column width
    })

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        if (rowNumber === 1) {
          cell.font = { bold: true }
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCCCCC' }
          }
        } else {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
      })
    })

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `${activeTab === 'trainee' ? 'Trainees' : activeTab === 'class' ? 'Classes' : 'FinalPresentation'}Recap.xlsx`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex justify-center items-center p-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {activeTab === 'trainee' ? 'Trainee Management' : activeTab === 'class' ? 'Class Management' : 'Final Presentation'}
        </h1>
        <div className="ml-auto flex space-x-2">
          <div>
            <Button 
              variant="outline" 
              className="bg-gray-400 text-white border-none hover:bg-gray-500 transition-colors duration-300"
              onClick={() => navigate('/dashboard/note')}
            >
              <NotepadText className="mr-2 h-4 w-4"/> Note Management
            </Button>
          </div>
          <div>
            <Button 
              onClick={handleDownload} 
              variant="outline" 
              className="bg-blue-500 text-white border-none hover:bg-blue-600 transition-colors duration-300"
            >
              <Download className="mr-2 h-4 w-4" /> Download Recap
            </Button>
          </div>
        </div>
      </div>
    </div>
  
        {/* Tabs and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-4">
              <Button
                onClick={() => setActiveTab('trainee')}
                variant={activeTab === 'trainee' ? 'default' : 'outline'}
                className={`rounded-full transition-all duration-300 ${
                  activeTab === 'trainee' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                <Users className="mr-2 h-4 w-4" /> Trainees
              </Button>
              <Button
                onClick={() => setActiveTab('class')}
                variant={activeTab === 'class' ? 'default' : 'outline'}
                className={`rounded-full transition-all duration-300 ${
                  activeTab === 'class' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                <Calendar className="mr-2 h-4 w-4" /> Classes
              </Button>
              <Button
                onClick={() => setActiveTab('finalPresentation')}
                variant={activeTab === 'finalPresentation' ? 'default' : 'outline'}
                className={`rounded-full transition-all duration-300 ${
                  activeTab === 'finalPresentation' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-500 hover:text-blue-700'
                }`}
              >
                <Eye className="mr-2 h-4 w-4" /> Final Presentation
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={activeTab === 'trainee' ? "Search trainees..." : activeTab === 'class' ? "Search classes..." : "Search final presentations..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
  
        {/* Table */}
        <div className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {activeTab === 'trainee' ? (
                  <>
                    <TableHead className="text-gray-600 font-semibold">Trainee Name</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Class</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Batch</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Github</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Note</TableHead>
                  </>
                ) : activeTab === 'class' ? (
                  <>
                    <TableHead className="text-gray-600 font-semibold">Class Name</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Number of Trainees</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Start Date</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead className="text-gray-600 font-semibold">Trainee Name</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Batch</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Class</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Note</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === 'trainee' && (
                filteredTrainees.map((trainee) => (
                  <TableRow key={trainee.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="font-medium">{trainee.name}</TableCell>
                    <TableCell>{trainee.class}</TableCell>
                    <TableCell>{trainee.batch}</TableCell>
                    <TableCell>
                      <a 
                        href={`https://${trainee.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
                      >
                        {trainee.github}
                      </a>
                    </TableCell>
                    <TableCell>
                      <NoteManagementButton
                        trainee={trainee}
                        onAddNote={handleAddNote}
                        onDeleteNote={handleDeleteNote}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
              {activeTab === 'class' && (
                filteredClasses.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.trainees}</TableCell>
                    <TableCell>{cls.startDate}</TableCell>
                  </TableRow>
                ))
              )}
              {activeTab === 'finalPresentation' && (
                filteredFinalPresentation.map((trainee) => (
                  <TableRow key={trainee.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="font-medium">{trainee.name}</TableCell>
                    <TableCell>{trainee.batch}</TableCell>
                    <TableCell>{trainee.class}</TableCell>
                    <TableCell>
                      <FpNoteManagementButton
                        trainee={trainee}
                        onAddNote={handleAddFpNote}
                        onDeleteNote={handleDeleteFpNote}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}