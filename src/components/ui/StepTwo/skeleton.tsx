const StepTwoSkeleton = () => {
  // Create an array of 9 items to match the timeSlots length
  const placeholderSlots = Array(9).fill(0)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Date Selection Skeleton */}
        <div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse" />
          <div className="relative">
            <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Time Selection Skeleton */}
        <div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse" />
          <div className="grid grid-cols-3 gap-2">
            {placeholderSlots.map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 rounded-md animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Reservation Info Skeleton */}
      <div className="bg-gray-100 p-4 rounded-md mt-6">
        <div className="flex items-start">
          <div className="h-5 w-5 bg-gray-300 rounded-full mr-2 animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-gray-300 rounded w-1/3 mb-2 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepTwoSkeleton

