import { Progress } from "../ui/progress"; 
import { BookOpen, Clock, CheckCircle } from "lucide-react";

export const ProgressCard = ({ course }) => {
    const durationStr = course?.courseDuration ? course.courseDuration.toString().trim() : "";
    const match = durationStr.match(/^(\d+(\.\d+)?)\s*(\w+)?$/); 
    let totalHours = 0;

    if (match) {
        const durationValue = parseFloat(match[1]);
        const unit = match[3]?.toLowerCase() || ""; 

        if (unit.includes("week")) {
            totalHours = durationValue * 7 * 24; 
        } else if (unit.includes("hour")) {
            totalHours = durationValue;
        }
    }

    totalHours = totalHours || 0;
    const hoursLeft = totalHours - Math.round(totalHours * ((course.progress || 0) / 100));

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md duration-300 border border-gray-100 transition-all hover:scale-105">
            <div className="relative">
                <img
                    src={course.courseThumbnail}
                    alt={course.courseTitle}
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                <span className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-[#395972]">
                    {course.category}
                </span>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">{course.creator?.name || "Unknown"}</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{course.courseTitle}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                            {hoursLeft >= 24
                                ? `${(hoursLeft / 24).toFixed(1)} days left`
                                : `${hoursLeft} hours left`}
                        </span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                    <Progress value={course.progress || 0} />
                    <div className="flex justify-between text-xs mt-2">
                        <span className="text-gray-500">{course.progress || 0}% Complete</span>
                        <span className="text-gray-500">{course.assignments} Assignments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
