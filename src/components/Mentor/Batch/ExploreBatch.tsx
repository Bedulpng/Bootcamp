"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Batch } from "@/types/Trainee";
import { jwtDecode } from "jwt-decode";
import BatchCards from "./BatchCard";
import { BatchCover } from "./BatchCover";
import { BatchExploreSkeleton } from "./Skeleton";

export default function ExploreBatch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all-batch" | "my-batch">(
    "all-batch"
  );
  const [batches, setBatches] = useState<Batch[]>([]);
  const [mentorBatches, setMentorBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          "http://192.168.254.104:4000/admin/batch"
        );
        setBatches(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Introduce 1-second delay after data fetch
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  useEffect(() => {
    const fetchMentorBatches = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const decodedToken: any = jwtDecode(refreshToken as string);
        const mentorId = decodedToken.id;
        if (!mentorId) return;
        const response = await axios.get(
          `http://192.168.254.104:4000/admin/batch/${mentorId}`
        );
        setMentorBatches(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Introduce 1-second delay after data fetch
      } catch (error) {
        console.error("Error fetching batches by mentorId:", error);
      }
    };
    fetchMentorBatches();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get("filter");
    if (filter && (filter === "my-batch" || filter === "all-batch")) {
      setActiveFilter(filter);
    }
  }, [location.search]);

  const totalSlides = batches.length;

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);
    return () => clearInterval(timer);
  }, [totalSlides]);  

  const handleFilterChange = (filter: "all-batch" | "my-batch") => {
    setActiveFilter(filter);
    navigate(`/dashboard/batch?filter=${filter}`);
  };

  if (loading) {
    return <BatchExploreSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-10 mb-24">
      <div className="grid gap-6 md:grid-cols-[1fr_200px]">
        <div className="relative">
          <div className="absolute top-2 left-0 text-2xl font-bold text-gray-800">
            Explore Batch
          </div>
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
              className={`flex w-full h-full cursor-pointer transition-transform duration-500 ease-in-out ${
                isAnimating ? "" : "transition-none"
              }`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {batches.map((batch, index) => (
                <div
                  key={index}
                  className="min-w-full h-full flex items-end" // Ensure proper alignment
                  onClick={async () => {
                    try {
                      const response = await fetch(
                        `http://192.168.254.104:4000/admin/batchs/${batch.id}`
                      );
                      if (!response.ok) {
                        throw new Error(
                          `Failed to fetch batch with ID: ${batch.id}`
                        );
                      }
                      const data = await response.json();
                      console.log("Fetched batch:", data);
                      navigate(`/dashboard/class/${batch.id}`, {
                        state: { batchData: data },
                      });
                    } catch (error) {
                      console.error(
                        "Error fetching batch:",
                        error instanceof Error ? error.message : error
                      );
                    }
                  }}
                >
                  {/* Ensure BatchCover takes full height */}
                  <BatchCover
                    batchTitle={batch.batchTitle}
                    coverImage={batch.cover?.filePath}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <Button
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full z-20"
              onClick={handlePrevSlide}
              size="icon"
              variant="secondary"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full z-20"
              onClick={handleNextSlide}
              size="icon"
              variant="secondary"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>

          <div className="mt-2 text-right text-sm text-gray-600">
            Showing{" "}
            {(activeFilter === "all-batch" ? batches : mentorBatches).length}{" "}
            Batch
          </div>
        </div>
        <div className="mt-[52px] rounded-lg bg-white p-1 shadow-sm">
          <div className="flex flex-col gap-2">
            <button
              className={cn(
                "w-full rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                activeFilter === "all-batch"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
              onClick={() => handleFilterChange("all-batch")}
            >
              All Batch
            </button>
            <button
              className={cn(
                "w-full rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                activeFilter === "my-batch"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )}
              onClick={() => handleFilterChange("my-batch")}
            >
              My Batch
            </button>
          </div>
        </div>
      </div>
      <BatchCards
        batches={activeFilter === "all-batch" ? batches : mentorBatches}
      />
    </div>
  );
}
