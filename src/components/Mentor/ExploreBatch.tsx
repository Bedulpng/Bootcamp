'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Batch } from '../../types/Trainee';
import { jwtDecode } from 'jwt-decode'

export default function ExploreBatch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all-batch' | 'my-batch'>('all-batch');
  const [batches, setBatches] = useState<Batch[]>([]);
  const [mentorBatches, setMentorBatches] = useState<Batch[]>([]);

  // Fetch all batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://10.10.103.104:4000/admin/batch'); // Replace with your API URL
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  // Fetch batches by mentor ID
  useEffect(() => {
     // Ensure mentorId is defined

    const fetchMentorBatches = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const decodedToken: any = jwtDecode(refreshToken as string);
        const mentorId = decodedToken.id;
        
        if (!mentorId) return;

        const response = await axios.get(`http://10.10.103.104:4000/admin/batch/${mentorId}`); // Replace with your API URL
        setMentorBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches by mentorId:', error);
      }
    };

    fetchMentorBatches();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get('filter');
    if (filter && (filter === 'my-batch' || filter === 'all-batch')) {
      setActiveFilter(filter);
    }
  }, [location.search]);

  const carouselItems = [
    { id: 1, image: '/placeholder.png?height=200&width=600', title: 'Developer Bootcamp' },
    { id: 2, image: '/placeholder.png?height=200&width=600', title: 'Learn to Code' },
    { id: 3, image: '/placeholder.png?height=200&width=600', title: 'Master Development' },
  ];

  const totalSlides = carouselItems.length;

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentSlide === totalSlides) {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setCurrentSlide(0);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [currentSlide, totalSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleFilterChange = (filter: 'all-batch' | 'my-batch') => {
    setActiveFilter(filter);
    navigate(`/dashboard/batch?filter=${filter}`); // Update URL with the new filter
  };

  return (
    <div className="container mx-auto px-4 py-10 mb-24">
      <div className="grid gap-6 md:grid-cols-[1fr_200px]">
        <div className="relative">
          {/* Explore Batch Header */}
          <div className="absolute top-2 left-0 text-2xl font-bold text-gray-800">
            Explore Batch
          </div>

          {/* Search Bar */}
          <div className="mb-4 flex justify-end">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input
                className="pl-10"
                placeholder="Find batch..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Carousel */}
          <div className="relative h-[300px] overflow-hidden rounded-xl">
            <div
              className={`flex transition-transform duration-500 ease-in-out ${
                isAnimating ? '' : 'transition-none'
              }`}
              style={{
                transform: `translateX(-${(currentSlide % (totalSlides + 1)) * 100}%)`,
              }}
            >
              {carouselItems.map((item, index) => (
                <div key={index} className="min-w-full">
                  <img
                    alt={item.title}
                    className="h-[300px] w-full object-cover"
                    height={300}
                    src={item.image}
                    width={800}
                  />
                </div>
              ))}
              {/* Duplicate the first slide to create a seamless loop */}
              <div className="min-w-full">
                <img
                  alt={carouselItems[0].title}
                  className="h-[300px] w-full object-cover"
                  height={300}
                  src={carouselItems[0].image}
                  width={800}
                />
              </div>
            </div>

            <Button
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full"
              onClick={handlePrevSlide}
              size="icon"
              variant="secondary"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full"
              onClick={handleNextSlide}
              size="icon"
              variant="secondary"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>

          {/* Showing Batch Text */}
          <div className="mt-2 text-right text-sm text-gray-600">
            Showing {(activeFilter === 'all-batch' ? batches : mentorBatches).length} Batch
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-[52px] rounded-lg bg-white p-1 shadow-sm">
          <div className="flex flex-col gap-2">
            <button
              className={cn(
                'w-full rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
                activeFilter === 'all-batch'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
              onClick={() => handleFilterChange('all-batch')}
            >
              All Batch
            </button>
            <button
              className={cn(
                'w-full rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
                activeFilter === 'my-batch'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
              onClick={() => handleFilterChange('my-batch')}
            >
              My Batch
            </button>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(activeFilter === 'all-batch' ? batches : mentorBatches).map((batch) => (
          <Card key={batch.id} 
          onClick={async () => {
            try {
              // Fetch the batch data from the API
              const response = await fetch(`http://10.10.103.104:4000/admin/batchs/${batch.id}`);
              if (!response.ok) {
                throw new Error(`Failed to fetch batch with ID: ${batch.id}`);
              }
              const data = await response.json();
              console.log('Fetched batch:', data);
    
              // Navigate to the dashboard with batch data
              navigate(`/dashboard/batch/${batch.id}`, { state: { batchData: data } });
            } catch (error) {
              if (error instanceof Error) {
                console.error('Error fetching batch:', error.message);
              } else {
                console.error('Unknown error:', error);
              }
            }
          }}
          className="cursor-pointer"
          >

            <CardContent className="p-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img
                  alt={`Thumbnail for ${batch.batchTitle}`}
                  className="h-full w-full object-cover"
                  height={200}
                  src="/placeholder.png" // Replace with actual image if available
                  width={300}
                />
              </div>
              <h4 className="mt-4 mb-4 font-semibold">{batch.batchTitle || 'This Batch Title'}</h4>
              <p className="text-sm text-muted-foreground">{batch.batchDesc || 'This batch description'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
