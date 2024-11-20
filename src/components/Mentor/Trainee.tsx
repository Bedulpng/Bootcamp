'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Pencil, Eye, Users, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data
const trainees = [
  { id: 1, name: "John Doe", class: "Quality Assurance", batch: "12", github: "github.com/johndoe", note: null },
  { id: 2, name: "Jane Smith", class: "Fullstack Developer", batch: "13", github: "github.com/janesmith", note: "Excellent progress" },
  { id: 3, name: "Bob Johnson", class: "Data Science", batch: "11", github: "github.com/bobjohnson", note: "Needs improvement in Python" },
]

const classes = [
  { id: 1, name: "Quality Assurance", trainees: 15, startDate: "2023-01-01" },
  { id: 2, name: "Fullstack Developer", trainees: 20, startDate: "2023-02-15" },
  { id: 3, name: "Data Science", trainees: 18, startDate: "2023-03-10" },
]

export default function Trainee() {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('trainee')
  
    const filteredTrainees = trainees.filter(trainee => 
      trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.class.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    const filteredClasses = classes.filter(cls => 
      cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex justify-center items-center p-8">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">
                {activeTab === 'trainee' ? 'Trainee Management' : 'Class Management'}
              </h1>
              
                <Button asChild variant="outline" className="bg-blue-500 text-white border-none hover:bg-blue-600 transition-colors duration-300">
                  <Link to="#">
                    <Download className="mr-2 h-4 w-4" /> Download Recap
                  </Link>
                </Button>
              
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
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={activeTab === 'trainee' ? "Search trainees..." : "Search classes..."}
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
                  ) : (
                    <>
                      <TableHead className="text-gray-600 font-semibold">Class Name</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Number of Trainees</TableHead>
                      <TableHead className="text-gray-600 font-semibold">Start Date</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTab === 'trainee' ? (
                  filteredTrainees.map((trainee) => (
                    <TableRow key={trainee.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <TableCell className="font-medium">{trainee.name}</TableCell>
                      <TableCell>{trainee.class}</TableCell>
                      <TableCell>{trainee.batch}</TableCell>
                      <TableCell>
                        <a href={`https://${trainee.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                          {trainee.github}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-block rounded-md ${trainee.note === null ? 'bg-gray-100' : 'bg-cyan-100'}`}>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className={`text-sm font-medium ${trainee.note === null ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200' : 'text-cyan-600 hover:text-cyan-800 hover:bg-cyan-200'}`}
                          >
                            {trainee.note === null ? (
                              <>Add Note<Pencil className="ml-2 h-4 w-4" /></>
                            ) : (
                              <>View Notes <Eye className="ml-2 h-4 w-4" /></>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  filteredClasses.map((cls) => (
                    <TableRow key={cls.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{cls.trainees}</TableCell>
                      <TableCell>{cls.startDate}</TableCell>
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