import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 mb-10">
            <Skeleton className="h-[40vh] lg:h-[18vw] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-[2vh] w-[100%]" />
                <Skeleton className="h-[2vh] w-[80%]" />
                <Skeleton className="h-[2vh] w-[50%]" />
            </div>
        </div>
    )
}
