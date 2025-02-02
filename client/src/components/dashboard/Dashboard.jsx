import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Clock, BookOpen, Award, GroupIcon, TrendingUp } from "lucide-react"; // Added TrendingUp icon
import { useSelector } from "react-redux";

const assignmentData = [
    { name: "Week 1", course: 2 },
    { name: "Week 2", course: 3 },
    { name: "Week 3", course: 1 },
    { name: "Week 4", course: 4 },
];

const courses = [
    { title: "Introduction to React", progress: 70, timeToComplete: 3 },
    { title: "Advanced JavaScript", progress: 40, timeToComplete: 6 },
    { title: "Data Structures & Algorithms", progress: 90, timeToComplete: 1 },
];

const upcomingAssignments = [
    { title: "Assignment 1", course: "Introduction to React", dueIn: "2 days" },
    { title: "Quiz 3", course: "Advanced JavaScript", dueIn: "4 days" },
    { title: "Final Project", course: "Data Structures & Algorithms", dueIn: "1 week" },
];

function Dashboard() {
    const { user } = useSelector(store => store.auth)
    return (
        <main className="flex-1 p-6 space-y-6 bg-gradient-to-b from-[#395972]/5 to-white rounded">

            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
                    <p className="text-gray-600 text-sm">Continue your learning journey.</p>
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


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <Card key={index} className="shadow-lg border border-gray-200 bg-white transition-all hover:scale-105 cursor-pointer">
                        <CardHeader className="flex items-center space-x-2">
                            <BookOpen className="text-[#395972]" />
                            <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={course.progress} className="mt-2 h-4 bg-gray-200" />
                            <div className="mt-2 flex justify-between items-center">
                                <p className="text-xs text-gray-600">{course.progress}% Complete</p>
                                <p className="text-xs text-gray-500">~{course.timeToComplete} hours left</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



                <div className="lg:col-span-1">

                    <Card className="shadow-lg border border-gray-200 bg-white">
                        <CardHeader className="flex items-center space-x-2">
                            <Clock className="text-[#395972]" />
                            <CardTitle>Upcoming Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-none pl-0 text-gray-600 space-y-2"> {/* Improved List Styling */}
                                {upcomingAssignments.map((assignment, index) => (
                                    <li key={index} className="bg-gray-50 rounded p-2 flex items-center justify-between"> {/* List Item Styling */}
                                        <div>
                                            <p className="font-medium text-gray-800">{assignment.title} ({assignment.course})</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{assignment.dueIn}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                </div>


                <div className="lg:col-span-1">
                    <Card className="shadow-lg border border-gray-200 bg-white h-full">
                        <CardHeader className="flex items-center space-x-2">
                            <Award className="text-[#395972]" />
                            <CardTitle>Leaderboard & Achievements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <GroupIcon className="text-gray-600 w-8 h-8" />
                                <div>
                                    <p className="text-gray-600">Rank: <span className="font-semibold text-[#395972]">#5</span></p>
                                    <p className="text-gray-600">Next Badge: <span className="font-semibold text-[#395972]">Master Learner</span></p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>


                <div className="lg:col-span-2">
                    <Card className="shadow-lg border border-gray-200 bg-white">
                        <CardHeader className="flex items-center space-x-2">
                            <TrendingUp className="text-[#395972]" />
                            <CardTitle>Course Completion Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={assignmentData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
                                    <YAxis tick={{ fill: "#555", fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", borderColor: "#ddd", padding: "10px" }} />
                                    <Legend wrapperStyle={{ paddingTop: "10px" }} />
                                    <Line type="monotone" dataKey="course" stroke="#395972" fill="#e6f2ff" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;