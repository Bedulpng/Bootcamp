import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"

export function BatchExploreSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 mb-24">
      <div className="grid gap-6 md:grid-cols-[1fr_200px]">
        <div className="relative">
          <div className="absolute top-2 left-0 text-2xl font-bold text-gray-800">Explore Batch</div>
          <div className="mb-4 flex justify-end">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input className="pl-10" placeholder="Find batch..." type="search" disabled />
            </div>
          </div>

          {/* Carousel Skeleton */}
          <div className="relative h-[300px] overflow-hidden rounded-xl">
            <Skeleton className="h-full w-full" />

            {/* Navigation Buttons */}
            <Button
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full z-20"
              size="icon"
              variant="secondary"
              disabled
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full z-20"
              size="icon"
              variant="secondary"
              disabled
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>

          <div className="mt-2 text-right text-sm text-gray-600">
            <Skeleton className="h-4 w-24 inline-block" />
          </div>
        </div>
        <div className="mt-[52px] rounded-lg bg-white p-1 shadow-sm">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* Batch Cards Skeleton */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden rounded-lg shadow-lg">
            <Skeleton className="h-40 w-full" />
            <div className="p-4 bg-white flex flex-col gap-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

