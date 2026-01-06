function Loader() {
  return (
    <div className="flex min-h-100 w-full flex-col items-center justify-center gap-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-slate-800 border-t-indigo-500"></div>
        
        {/* Inner static icon/dot */}
        <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></div>
      </div>
      <p className="animate-pulse text-sm font-medium text-slate-500 tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}

export default Loader;