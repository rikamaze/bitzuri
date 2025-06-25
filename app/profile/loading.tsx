import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-64 space-y-4">
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="text-center w-full">
                  <Skeleton className="h-6 w-32 mx-auto" />
                  <Skeleton className="h-4 w-24 mx-auto mt-2" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="space-y-1 py-2">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="flex-1">
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-72 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
              
              <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}