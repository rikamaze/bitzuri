import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function NotificationsLoading() {
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-72 mt-2" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Skeleton */}
        <div className="space-y-4">
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
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
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="md:col-span-3">
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="p-4 rounded-lg border border-white/10">
                  <div className="flex items-start space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <Skeleton className="h-8 w-24" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                        <Skeleton className="h-8 w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="flex justify-center border-t border-white/10 pt-6 p-6">
              <Skeleton className="h-10 w-32" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}