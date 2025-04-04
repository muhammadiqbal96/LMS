import { useSelector } from "react-redux";
import { ProgressCard } from "../shared/ProgressCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { PURCHASE_API_END_POINT } from "../../utils/constant";
import { Link } from "react-router-dom";

function MyLearning() {
    const { user } = useSelector(store => store.auth);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${PURCHASE_API_END_POINT}/`, { withCredentials: true });
                console.log(response.data);
                setEnrolledCourses(response.data.purchasedCourses);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEnrolledCourses();
    }, []);

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

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <p>Loading your courses...</p>
                    </div>
                ) : enrolledCourses.length === 0 ? (
                    <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Courses Enrolled</h2>
                        <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
                        <Link to="/courses" className="inline-block px-4 py-2 bg-[#395972] text-white rounded-md hover:bg-[#2a4358] transition-colors">
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                        {enrolledCourses.map((course, index) => (
                            <Link to={`/course/progress/${course.courseId._id}`} key={index}>
                                <ProgressCard course={course.courseId} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default MyLearning;
