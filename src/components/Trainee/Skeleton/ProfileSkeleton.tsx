const SkeletonProfile = () => {
  return (
    <div className="bg-white overflow-hidden min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Skeleton Header Card */}
      <div className="w-full max-w-4xl mt-8 mb-12">
        <div className="relative overflow-hidden rounded-lg bg-gray-200 animate-pulse h-40"></div>
      </div>

      {/* Skeleton Form Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skeleton Edit Data */}
        <div className="bg-gray-100 p-6 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <div className="w-24 h-10 bg-gray-200 rounded"></div>
            <div className="w-24 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Skeleton Right Column */}
        <div className="space-y-8">
          {/* Skeleton Edit Photo */}
          <div className="bg-gray-100 p-6 rounded-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-6"></div>
            <div className="flex justify-center gap-8 mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex justify-between">
              <div className="w-24 h-10 bg-gray-200 rounded"></div>
              <div className="w-24 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
