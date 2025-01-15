  'use client'

  import { useNavigate } from 'react-router-dom'
  import axios from 'axios'
  import { useState, useEffect, useRef} from 'react'
  import { PenLine, CheckCheck } from 'lucide-react'
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent
  } from "@/components/ui/card"
  import { PieChart, Pie, Cell } from "recharts"
  import { Link } from 'react-router-dom'
  import ProfileEditor from './Modal/ProfileEdit'
  import { jwtDecode } from 'jwt-decode'
  import { Batch, Trainee } from '../../types/Trainee'
  import { fetchTrainees } from '@/Api/FetchTrainee'
  import { format } from 'date-fns'
  import { ScheduleClassModal } from './Modal/Schedule-Class'

  interface ScheduleItem {
    date: string
    start: string
    end: string
  }  

  export default function MentorDb() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [mentorName, setMentorName] = useState('');
    const [mentorRole, setMentorRole] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [batches, setBatches] = useState<Batch[]>([]);
    const [trainees, setTrainees] = useState<Trainee[]>([]);
    const [batch, setMyBatch] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [classes, setClasses] = useState<any[]>([]);
    const [chartData, setChartData] = useState([
      { name: 'Present', value: 0 },
      { name: 'Not Present', value: 0 },
    ]);
    const [lessonPercentage, setLessonPercentage] = useState(0);
    const [challengePercentage, setChallengePercentage] = useState(0);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
    const [scheduledClasses, setScheduledClasses] = useState<Array<any>>([]); // Initialize as an empty array

   const refreshToken = localStorage.getItem('refreshToken') // Get the token from localStorage
    const decodedToken: any = jwtDecode(refreshToken as string);
    const userId = decodedToken.id; // Assuming the user ID is stored in 'id'

    useEffect(() => {
      const fetchScheduledClasses = async () => {
        try {
          const token = localStorage.getItem('refreshToken') // Get the token from localStorage
          if (!token) {
            console.error('No token found')
            return
          }
  
          const response = await fetch('http://10.10.103.222:4000/mentor/schedule', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
  
          if (!response.ok) {
            throw new Error('Failed to fetch scheduled classes')
          }
  
          const data = await response.json()
          setScheduledClasses(data)
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
  
      fetchScheduledClasses()
    }, [])
  
    // Handle the click for scheduling a class
    const handleScheduleClass = () => {
      setIsScheduleModalOpen(true)
    }
  
    // Handle submit of the scheduled class
    const handleSubmitSchedule = (newSchedule: any) => {
      console.log('Schedule submitted:', newSchedule)
      setIsScheduleModalOpen(false)
    }

    const handleEditProfile = () => {
      setModalOpen(true)
    }

    const navigate = useNavigate() // Use navigate hook from react-router-dom

    const handleSeeMore = () => {
      // Navigate to /dashboard/batch with the My batch filter
      navigate('/dashboard/batch?filter=my-batch')
    }

    const COLORS = ['#FFD700', '#0000FF'] // Bright yellow and solid blue

    useEffect(() => {
      const fetchBatches = async () => {
        try {
          const response = await axios.get('http://10.10.103.222:4000/admin/batch'); // Replace with your API URL
          setBatches(response.data);
        } catch (error) {
          console.error('Error fetching batches:', error);
        }
      };
    
      fetchBatches();
    }, []);

    useEffect(() => {
      // Fetch batches connected to the mentor
      const fetchBatches = async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const decodedToken: any = jwtDecode(refreshToken as string);
          const mentorId = decodedToken.id;
          if (!mentorId) return;

          const response = await axios.get(`http://10.10.103.222:4000/admin/batch/${mentorId}`);
          const batchNumbers = response.data.map((batch: { batchNum: number }) => batch.batchNum);
          setMyBatch(batchNumbers);
        } catch (error) {
          console.error('Error fetching batches:', error);
        }
      };
  
      fetchBatches();
    }, []);

    useEffect(() => {
      const fetchCompletionPercentages = async () => {
        try {
          const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the refresh token from localStorage
          const response = await axios.get("http://10.10.103.222:4000/mentor/completion-percentage", {
            headers: {
              Authorization: `Bearer ${refreshToken}`, // Use Authorization header
            },
          });
    
          const { wholeClassLessonPercentage, wholeClassChallengePercentage } = response.data;
    
          setLessonPercentage(parseFloat(wholeClassLessonPercentage));
          setChallengePercentage(parseFloat(wholeClassChallengePercentage));
          console.log("Lesson Percentage:", wholeClassLessonPercentage);
          console.log("Challenge Percentage:", wholeClassChallengePercentage);
        } catch (error) {
          console.error("Failed to fetch completion percentages:", error);
        }
      };
    
      fetchCompletionPercentages();
    }, []);
    
  
    const handleDotClick = (index: number) => {
      setCurrentIndex(index);
  
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const itemWidth = scrollWidth / batches.length; // Divide total scrollable width by number of batches
        scrollContainerRef.current.scrollTo({
          left: itemWidth * index,
          behavior: 'smooth',
        });
      }
    };

      useEffect(() => {
        async function loadTrainees() {
          try {
            const data = await fetchTrainees(); // Fetch trainees using the service
            setTrainees(data);
          } catch (error) {
            console.error('Error fetching Trainees:', error);
          } 
        }
    
        loadTrainees();
      }, []);

    // Custom label component for the donut chart
    useEffect(() => {
      const fetchMentorDetails = async () => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const decodedToken: any = jwtDecode(refreshToken as string);
          const userId = decodedToken.id; // Assuming the user ID is stored in 'id'
    
          // Fetch mentor details
          const response = await axios.get(`http://10.10.103.222:4000/admin/mentor/${userId}`);
          setMentorName(response.data.fullName);
          setMentorRole(response.data.role);
    
          // Fetch the professional profile image
          const profileResponse = await axios.get(`http://10.10.103.222:4000/trainee/${userId}/pro`);
    
          // Check if profile image exists
          if (profileResponse.data.profileImage) {
            setProfileImage(profileResponse.data.profileImage); // Store the profile image path
          } else {
            setProfileImage(null); // Set to null if profile image not found
          }
    
        } catch (error) {
          console.error('Error fetching mentor details:', error);
          
        }
      };
    
      fetchMentorDetails();
    }, [navigate]);

    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const response = await axios.get('http://10.10.103.222:4000/admin/class'); // Replace with your API URL
          setClasses(response.data);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
  
      fetchClasses();
    }, []);

    const totalChallenges = classes.reduce((total, classItem) => {
      return total + (classItem.challenges ? classItem.challenges.length : 0);
    }, 0);

    useEffect(() => {
      async function loadTrainees() {
        try {
          const data = await fetchTrainees();  // fetch trainees using your service
          setTrainees(data);
  
          // 1. Count how many are logged in
          const presentCount = data.filter((t) => !!t.isLoggedIn === true).length;
          // 2. Calculate percentage out of total
          const totalCount = data.length;
          const presentPercentage = totalCount > 0 
            ? (presentCount / totalCount) * 100 
            : 0;
          const notPresentPercentage = 100 - presentPercentage;
  
          // 3. Update the chart data with the calculated percentages
          setChartData([
            { name: 'Present', value: presentPercentage },
            { name: 'Not Present', value: notPresentPercentage },
          ]);
        } catch (error) {
          console.error('Error fetching Trainees:', error);
        }
      }
      loadTrainees();
    }, []);

    const displayedPresentValue = Math.round(chartData[0].value);

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
                        <p className="text-4xl font-bold mb-2">{trainees.length}</p>
                        <p className="text-sm text-gray-600">Total Trainee</p>
                      </div>
                      <Link to="/dashboard/trainee" className='w-full'>
                      <Button className="w-full bg-white text-black hover:bg-gray-100">
                        More
                      </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="bg-pink-400 rounded-2xl shadow-lg">
                    <CardContent className="p-6 flex flex-col items-center justify-between h-[180px]">
                      <div className="text-center">
                        <p className="text-4xl font-bold mb-2">{totalChallenges}</p>
                        <p className="text-sm text-gray-600">Total Challenges</p>
                      </div>
                      <Link to="/dashboard/batch" className='w-full'>
                      <Button className="w-full bg-white text-black hover:bg-gray-100">
                        More
                      </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-400 rounded-2xl shadow-lg">
                    <CardContent className="p-6 flex flex-col items-center justify-between h-[180px]">
                      <div className="text-center">
                        <p className="text-4xl font-bold mb-2">{batches.length}</p>
                        <p className="text-sm text-gray-600">Total Batch</p>
                      </div>
                      <Link to="/dashboard/batch" className='w-full'>
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
                        <div className="flex-1 mr-4">
                          <h3 className="font-bold text-xl mb-2">Incoming Class</h3>
                          <div className="space-y-2">
                            {scheduledClasses && scheduledClasses.length > 0 ? (
                              scheduledClasses.slice(-2).map((scheduledClass, index) => (
                                <div key={index} className="mt-6">
                                  <h4 className="font-black mb-4">{scheduledClass.title}</h4>
                                  {Array.isArray(scheduledClass.scheduleDays) && scheduledClass.scheduleDays.length > 0 ? (
                                    scheduledClass.scheduleDays.slice(0, 2).map((item: ScheduleItem, itemIndex: number) => (
                                      <div key={itemIndex}>
                                        <p className="text-sm font-semibold">{format(new Date(item.date), 'EEEE d MMMM yyyy')}</p>
                                        <p className="text-lg font-normal">{`${item.start} - ${item.end}`}</p>
                                      </div>
                                    ))
                                  ) : (
                                    <p>No schedule available for this class.</p>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p>No classes scheduled yet.</p>
                            )}
                          </div>
                          <Button
                            variant="secondary"
                            className="bg-white hover:bg-gray-50 w-full mt-4"
                            onClick={handleScheduleClass}
                          >
                            Schedule Class
                          </Button>
                        </div>
                        <div className="flex flex-col gap-4 w-36">
                          <div className="bg-white rounded-xl h-48 flex flex-col overflow-hidden">
                            <div
                              className="px-4 pt-4 pb-2 text-center overflow-hidden scrollbar-hide"
                              style={{
                                WebkitOverflowScrolling: 'touch',
                                scrollBehavior: 'smooth',
                              }}
                            >
                              <p className="text-xs mb-4 mt-4">My Batch</p>
                              <div className="font-bold text-5xl text-center">{batch[currentIndex] || 'N/A'}</div>
                            </div>
                            {batch.length > 1 && (
                              <div className="mt-auto px-6 pb-6">
                                <div className="flex justify-center gap-2">
                                  {batch.map((_, index) => (
                                    <div
                                      key={index}
                                      className={`w-2 h-2 rounded-full cursor-pointer ${currentIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                                      onClick={() => handleDotClick(index)}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="secondary"
                            className="bg-white hover:bg-gray-50 w-full"
                            onClick={handleSeeMore}
                          >
                            See More
                          </Button>
                        </div>
                      </div>
                      <ScheduleClassModal
                        isOpen={isScheduleModalOpen}
                        onClose={() => setIsScheduleModalOpen(false)}
                        onSubmit={handleSubmitSchedule}
                      />
                    </CardContent>
                  </Card>


                  {/* Activity Chart Card */}
                  <Card className="bg-white rounded-2xl shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-1">Trainee login activity</h3>
                      <p className="text-sm text-gray-500">Trainee Logged in today</p>
                      <div className="flex items-center justify-between mt-4">
                        {/* Chart Wrapper */}
                        <div className="relative w-[200px] h-[200px]">
                          <PieChart width={200} height={200}>
                            <Pie
                              data={chartData}
                              cx={100}
                              cy={100}
                              innerRadius={60}
                              outerRadius={80}
                              startAngle={90}
                              endAngle={-270}
                              dataKey="value"
                            >
                              {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                              ))}
                            </Pie>
                          </PieChart>
                          {/* Center text with percentage */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {displayedPresentValue}%
                              </div>
                              <div className="text-sm text-gray-500">Present</div>
                            </div>
                          </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-col gap-3">
                          {chartData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index] }}
                              />
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
                    <div className="w-17 h-17 rounded-full border-2 border-gray-200 flex items-center justify-center mb-6">
                    <Avatar className="h-16 w-16 border-gray-800 rounded-full">
                        <AvatarImage src={`http://10.10.103.222:4000${profileImage}`} alt="Mentor" />
                          <AvatarFallback>
                            {mentorName
                              ? mentorName
                                  .split(' ') // Split the name by spaces
                                  .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word and capitalize it
                                  .join('') // Join the initials
                              : '?'}
                          </AvatarFallback>
                      </Avatar>
                      </div>
                      <h3 className="font-semibold text-xl mb-1">{mentorName || 'THIS MENTOR NAME'}</h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">{mentorRole || 'THIS MENTOR ROLE'}</p>
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
                    <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div>
                        <CheckCheck className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-white">Completion Percentage</span>
                    </div>
                    <div className="bg-white rounded-xl p-4 space-y-4">
                      {/* Challenge Completion */}
                      <div className="mb-6">
                        <div className="relative w-full h-2 bg-gray-400 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#0040FF] rounded-full"
                            style={{ width: `${challengePercentage}%` }} // Replace with dynamic data for challenge percentage
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-sm">
                            <span className="font-semibold">{challengePercentage}%</span>
                            {" Challenge Completed"}
                          </p>
                        </div>
                      </div>

                      {/* Lesson Completion */}
                      <div className="mt-6">
                        <div className="relative w-full h-2 bg-gray-400 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#0040FF] rounded-full"
                            style={{ width: `${lessonPercentage}%` }} // Replace with dynamic data for lesson percentage
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-sm">
                            <span className="font-semibold">  {lessonPercentage}%</span>
                            {" Lesson Completed"}
                          </p>
                        </div>
                      </div>
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
