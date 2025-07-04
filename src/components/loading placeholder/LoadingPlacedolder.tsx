const LoadingPlacedolder = () => {
  return (
    <div className="space-y-2">
      {[...Array(1)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
      ))}
    </div>
  );
};

export default LoadingPlacedolder;
