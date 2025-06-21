export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-white/10 rounded animate-pulse"></div>
            <div className="h-4 w-48 bg-white/5 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-8 w-20 bg-white/10 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 h-64 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-64 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-64 bg-white/10 rounded-lg animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-12 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-96 bg-white/10 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
