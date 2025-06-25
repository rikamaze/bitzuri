import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-72 mt-2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Skeleton */}
        <div className="space-y-4">
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="space-y-2">
                {Array(7).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="md:col-span-3">
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32" />
                  <div className="grid grid-cols-3 gap-4">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex flex-col items-center space-y-3 rounded-lg border border-white/10 p-4">
                        <Skeleton className="w-full h-24 rounded-md" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Skeleton className="h-5 w-32" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-4 w-64" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Skeleton className="h-10 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}