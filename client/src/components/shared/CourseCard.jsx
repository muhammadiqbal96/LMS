import { Link } from "react-router-dom";
import { Clock, User, Star, BarChart } from "lucide-react";
import { Button } from "../ui/button";

export const CourseCard = ({ course }) => {
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
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <BarChart className="h-4 w-4" />
                        <span>{course.difficulty}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                        {course.discountedPrice ? (
                            <>
                                <span className="text-xl font-bold text-[#395972]">
                                    ${course.discountedPrice}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    ${course.originalPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-[#395972]">
                                ${course.originalPrice}
                            </span>
                        )}
                    </div>
                    <Button asChild variant="outline" className="border-[#395972] text-[#395972] hover:bg-[#395972]/10">
                        <Link to={`/courses/${course.id}`}>View Course</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};