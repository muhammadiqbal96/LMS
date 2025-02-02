import { useSelector } from "react-redux";
import { ProgressCard } from "../shared/ProgressCard";

const courses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "John Doe",
        rating: "4.9",
        duration: "32 hours",
        difficulty: "Beginner",
        progress: 60,  
        assignments: 10,  
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
        progress: 90,  
        assignments: 5, 
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
        progress: 30, 
        assignments: 13, 
        category: "Design",
        thumbnail: "https://img.freepik.com/free-photo/ui-ux-representations-with-laptop_23-2150201871.jpg?semt=ais_hybrid",
    },
    {
        id: 4,
        title: "Advanced Python Programming",
        instructor: "Jane Smith",
        rating: "4.8",
        duration: "24 hours",
        difficulty: "Advanced",
        progress: 20,  
        assignments: 3, 
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
        progress: 70, 
        assignments: 7,  
        category: "Marketing",
        thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
];

function MyLearning() {
    const { user } = useSelector(store => store.auth);

    return (
        <main className="flex-1 p-6 space-y-6 bg-gradient-to-b from-[#395972]/5 to-white rounded min-h-screen">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
                        <p className="text-gray-600">Your enrolled courses.</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white p-3 rounded-xl shadow-lg border border-gray-200">
                        <img
                            src={user.profile?.profilePhoto || "https://github.com/shadcn.png"}
                            alt="User Avatar"
                            className="rounded-full w-12 h-12 border border-gray-300 object-cover"
                        />
                        <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                    {courses.map((course, index) => (
                        <ProgressCard key={index} course={course} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default MyLearning;
