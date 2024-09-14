import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row">
                <Skeleton className="w-full h-10" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-64" />
                ))}
            </div>
        </div>
    )
}
