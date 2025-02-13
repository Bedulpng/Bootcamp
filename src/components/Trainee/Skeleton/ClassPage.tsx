export default function ClassesPageSkeleton() {
  return (
    <div className="flex gap-6 p-4 overflow-x-auto">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="min-w-[320px] rounded-lg border bg-white shadow-md animate-pulse"
        >
          {/* Header */}
          <div className="h-16 rounded-t-lg bg-gray-200" />

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-gray-200" />

              {/* Title and Subtitle */}
              <div className="flex flex-col space-y-2">
                <div className="h-6 w-36 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 h-6 w-1/2 rounded bg-gray-200" />
          </div>

          {/* Actions */}
          <div className="flex justify-between border-t p-4">
            <div className="h-6 w-10 rounded bg-gray-200" />
            <div className="h-6 w-10 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
