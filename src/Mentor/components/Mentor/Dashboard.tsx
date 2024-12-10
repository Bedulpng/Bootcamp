'use client'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PenLine, User, CheckCheck } from 'lucide-react'
import { Button } from "@/LandingPage/ui/button"
import {
  Card,
  CardContent
} from "@/LandingPage/ui/card"
import { PieChart, Pie, Cell } from "recharts"
import { Link } from 'react-router-dom'
import ProfileEditor from './Modal/ProfileEdit'

export default function MentorDb() {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleEditProfile = () => {
    setModalOpen(true)
  }

  const navigate = useNavigate() // Use navigate hook from react-router-dom

  const handleSeeMore = () => {
    // Navigate to /dashboard/batch with the My batch filter
    navigate('/dashboardm/batch?filter=my-batch')
  }


  const data = [
    { name: 'Present', value: 75 },
    { name: 'Not Present', value: 25 },
  ]

  const COLORS = ['#FFD700', '#0000FF'] // Bright yellow and solid blue

  // Custom label component for the donut chart

  return (
    <div className="min-h-screen flex flex-col">
      <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-4 max-w-7xl mx-auto">
            {/* Left Content (3 columns) */}
            <div className="md:col-span-3 space-y-8">
              {/* Top Row - Metric Cards */}
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-sky-400 rounded-2xl shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center justify-between h-[180px]">
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">50</p>
                      <p className="text-sm text-gray-600">Total Trainee</p>
                    </div>
                    <Link to="/dashboardm/trainee" className='w-full'>
                    <Button className="w-full bg-white text-black hover:bg-gray-100">
                      More
                    </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-pink-400 rounded-2xl shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center justify-between h-[180px]">
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">100</p>
                      <p className="text-sm text-gray-600">Total Challenge</p>
                    </div>
                    <Link to="/dashboardm/batch" className='w-full'>
                    <Button className="w-full bg-white text-black hover:bg-gray-100">
                      More
                    </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-green-400 rounded-2xl shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center justify-between h-[180px]">
                    <div className="text-center">
                      <p className="text-4xl font-bold mb-2">12</p>
                      <p className="text-sm text-gray-600">Total Batch</p>
                    </div>
                    <Link to="/dashboardm/batch" className='w-full'>
                    <Button className="w-full bg-white text-black hover:bg-gray-100">
                      More
                    </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Bottom Row */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Incoming Class Card */}
                <Card className="bg-[#ffff80] rounded-2xl shadow-lg w-[440px]">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-1">Incoming Class</h3>
                        <p className="text-sm font-medium mb-4">Friday 1 November 2024</p>
                        <div className="space-y-2">
                          <p className="text-lg font-semibold">09:00 - QA</p>
                          <p className="text-sm font-medium">Tuesday 5 November 2024</p>
                          <p className="text-lg font-semibold">09:00 - FS DEV</p>
                        </div>
                      </div>
                      <div className="flex flex-col  gap-4">
                        <div className="bg-white rounded-xl w-36 h-48 flex flex-col">
                          <div className="px-4 pt-4 pb-2 text-center">
                            <p className="text-xs mb-4 mt-4">My Batch</p>
                            <p className="font-bold text-5xl text-center">12</p>
                          </div>
                          <div className="mt-auto px-4 pb-4">
                            <div className="flex justify-center gap-2">
                              <div className="w-2 h-2 bg-black rounded-full" />
                              <div className="w-2 h-2 bg-gray-300 rounded-full" />
                              <div className="w-2 h-2 bg-gray-300 rounded-full" />
                              <div className="w-2 h-2 bg-gray-300 rounded-full" />
                            </div>
                          </div>
                        </div>
                        <Button 
                        variant="secondary" 
                        className="bg-white hover:bg-gray-50 w-36"
                        onClick={handleSeeMore}
                        >
                          See More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Chart Card */}
                <Card className="bg-white rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-1">Trainee login activity</h3>
                    <p className="text-sm text-gray-500">Trainee Logged in today</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="relative w-[200px] h-[200px]">
                        <PieChart width={200} height={200}>
                          <Pie
                            data={data}
                            cx={100}
                            cy={100}
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index]} />
                            ))}
                          </Pie>
                        </PieChart>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold">75%</div>
                            <div className="text-sm text-gray-500">Present</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        {data.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                            <span className="text-sm">{entry.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Mentor Profile Card */}
              <Card className="rounded-3xl shadow-md">
                <CardContent className="p-8 flex flex-col items-center justify-between min-h-[240px]">
                  <div className="text-center flex-1 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center mb-6">
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="font-semibold text-xl mb-1">MENTOR NAME</h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">THIS MENTOR ROLE</p>
                  </div>
                  <Button 
                  variant="ghost" 
                  className="text-gray-500 hover:text-gray-700 hover:bg-transparent p-0 h-auto"
                  onClick={handleEditProfile}
                  >
                    <span className="flex items-center gap-2 text-sm">
                      Edit Profile <PenLine className="w-3 h-3" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
              <ProfileEditor open={isModalOpen} onOpenChange={setModalOpen} />

              {/* Completion Percentage Card */}
              <Card className="bg-[#0040FF] rounded-3xl shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                      <div>
                        <CheckCheck className="w-5 h-5 text-white" />
                      </div>
                    <span className="font-medium text-white">Completion Percentage</span>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="relative w-full h-2 bg-gray-400 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#0040FF] rounded-full"
                        style={{ width: "50%" }}
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm">
                        <span className="font-semibold">50%</span>
                        {" Challenge Completed"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  )
}
