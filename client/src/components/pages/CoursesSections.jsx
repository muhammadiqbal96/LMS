import { useDispatch, useSelector } from "react-redux";
import { CourseCard } from "../shared/CourseCard";
import { Button } from "../ui/button";
import { setLoading } from "@/redux/authSlice";
import { SkeletonCard } from "../shared/SkeletonCard";

export default function CoursesSections() {
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    dispatch(setLoading(false));
    const {courses} = useSelector(store => store.course)

    return (
        <section className="py-16 bg-gray-50">

            <div className="container mx-auto px-4 mb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
                    <Button variant="ghost" className="text-[#395972] hover:bg-[#395972]/10">
                        View All Courses
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        !loading ? courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        )) : Array.from({ length: 3 }, (_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    }
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Latest Courses</h2>
                    <Button variant="ghost" className="text-[#395972] hover:bg-[#395972]/10">
                        View All New
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        !loading ? courses.slice(0, 3).map((course) => (
                            <CourseCard key={course.id} course={course} />
                        )) : Array.from({ length: 3 }, (_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};