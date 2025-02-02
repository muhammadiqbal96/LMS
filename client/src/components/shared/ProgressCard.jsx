import { Progress } from "../ui/progress"; 
import { BookOpen, Clock, CheckCircle } from "lucide-react";

export const ProgressCard = ({ course }) => {
    const hoursLeft = course.duration.split(" ")[0] - Math.round(course.duration.split(" ")[0] * (course.progress / 100));

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md duration-300 border border-gray-100 transition-all hover:scale-105">
            <div className="relative">
                <img
                    src={course.thumbnail}
                    alt={course.title}
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
                        <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{hoursLeft} hours left</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2">
                    <Progress value={course.progress} />
                    <div className="flex justify-between text-xs mt-2">
                        <span className="text-gray-500">{course.progress}% Complete</span>
                        <span className="text-gray-500">{course.assignments} Assignments</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
