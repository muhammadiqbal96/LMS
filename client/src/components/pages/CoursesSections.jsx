import { useDispatch, useSelector } from "react-redux";
import { CourseCard } from "../shared/CourseCard";
import { Button } from "../ui/button";
import { setLoading } from "@/redux/authSlice";
import { SkeletonCard } from "../shared/SkeletonCard";

export default function CoursesSections() {

    const featuredCourses = [
        {
            id: 1,
            title: "Complete Web Development Bootcamp",
            instructor: "John Doe",
            rating: "4.9",
            duration: "32 hours",
            difficulty: "Beginner",
            originalPrice: 199,
            discountedPrice: 149,
            category: "Development",
            thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        },
        {
            id: 2,
            title: "Introduction to Machine Learning",
            instructor: "Alice Johnson",
            rating: "4.7",
            duration: "25 hours",
            difficulty: "Intermediate",
            originalPrice: 249,
            discountedPrice: 199,
            category: "Data Science",
            thumbnail: "https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg",
        },
        {
            id: 3,
            title: "Graphic Design Masterclass",
            instructor: "Emma Wilson",
            rating: "4.8",
            duration: "20 hours",
            difficulty: "All Levels",
            originalPrice: 149,
            discountedPrice: 99,
            category: "Design",
            thumbnail: "https://img.freepik.com/free-photo/ui-ux-representations-with-laptop_23-2150201871.jpg?semt=ais_hybrid",
        },
    ];

    const latestCourses = [
        {
            id: 4,
            title: "Advanced Python Programming",
            instructor: "Jane Smith",
            rating: "4.8",
            duration: "24 hours",
            difficulty: "Advanced",
            originalPrice: 179,
            discountedPrice: 149,
            category: "Programming",
            thumbnail: "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/https://builtin.com/sites/www.builtin.com/files/2024-09/programming-languages.jpg",
        },
        {
            id: 5,
            title: "Digital Marketing Strategies",
            instructor: "Michael Brown",
            rating: "4.6",
            duration: "18 hours",
            difficulty: "Intermediate",
            originalPrice: 129,
            discountedPrice: 89,
            category: "Marketing",
            thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        },
        {
            id: 6,
            title: "Photography Essentials",
            instructor: "Sophia Lee",
            rating: "4.5",
            duration: "15 hours",
            difficulty: "Beginner",
            originalPrice: 99,
            discountedPrice: 69,
            category: "Photography",
            thumbnail: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*zbjSpGnDnr-bYakH",
        },
    ];

    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    dispatch(setLoading(false));

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
                        !loading ? featuredCourses.map((course) => (
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
                        !loading ? latestCourses.map((course) => (
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