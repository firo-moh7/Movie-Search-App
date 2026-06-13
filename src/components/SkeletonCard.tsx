function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-80 bg-gray-300 rounded"></div>

      <div className="mt-4 h-6 bg-gray-300 rounded"></div>

      <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
}

export default SkeletonCard;