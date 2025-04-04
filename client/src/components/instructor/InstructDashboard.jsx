import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { UserCheck, BookOpen, TrendingUp, Users, Clock, BarChart } from "lucide-react";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { COURSE_API_END_POINT, PROGRESS_API_END_POINT } from "../../utils/constant";
import { Link } from "react-router-dom";

const recentEnrollments = [
  { student: "Sarah Johnson", course: "React Basics", time: "2h ago" },
  { student: "Mike Chen", course: "Node.js Advanced", time: "4h ago" },
  { student: "Emma Wilson", course: "Python Fundamentals", time: "1d ago" },
  { student: "Alex Thompson", course: "Cloud Computing", time: "2d ago" },
];

export default function InstructDashboard() {
  const { user } = useSelector(store => store.auth);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [courseStats, setCoursesStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    avgProgress: 0,
    totalRevenue: 0
  });
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${COURSE_API_END_POINT}/instructor`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const courses = response.data.data;
        setInstructorCourses(courses);

        // Calculate total students
        const totalStudents = courses.reduce((sum, course) => sum + (course.studentsEnrolled?.length || 0), 0);

        // Get course progress data for each course
        let totalProgress = 0;
        let totalStudentsWithProgress = 0;

        const coursesWithProgress = await Promise.all(
          courses.map(async (course) => {
            try {
              // Get all students enrolled in this course
              const studentsEnrolled = course.studentsEnrolled || [];

              // For each student, get their progress
              let courseProgress = 0;
              let studentsWithProgress = 0;

              await Promise.all(
                studentsEnrolled.map(async (studentId) => {
                  try {
                    const progressResponse = await axios.get(`${PROGRESS_API_END_POINT}/${course._id}?userId=${studentId}`, {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    });

                    const progressData = progressResponse.data.data;
                    const viewedLectures = progressData.progress.filter(lecture => lecture.viewed).length;
                    const totalLectures = course.lectures.length;
                    const progressPercentage = totalLectures > 0 ? (viewedLectures / totalLectures) * 100 : 0;

                    courseProgress += progressPercentage;
                    studentsWithProgress++;
                    totalProgress += progressPercentage;
                    totalStudentsWithProgress++;
                  } catch (error) {
                    console.error(`Error fetching progress for student ${studentId} in course ${course._id}:`, error);
                  }
                })
              );

              const avgCourseProgress = studentsWithProgress > 0 ? Math.round(courseProgress / studentsWithProgress) : 0;

              return {
                ...course,
                progress: avgCourseProgress,
                studentsEnrolled: studentsEnrolled.length
              };
            } catch (error) {
              console.error(`Error processing course ${course._id}:`, error);
              return {
                ...course,
                progress: 0,
                studentsEnrolled: course.studentsEnrolled?.length || 0
              };
            }
          })
        );

        // Calculate average progress across all courses
        const avgProgress = totalStudentsWithProgress > 0 ? Math.round(totalProgress / totalStudentsWithProgress) : 0;

        // Generate weekly progress data (simplified for now)
        const weeklyData = [
          { name: "Week 1", students: Math.round(totalStudents * 0.3), assignments: Math.round(totalStudents * 0.45) },
          { name: "Week 2", students: Math.round(totalStudents * 0.5), assignments: Math.round(totalStudents * 0.68) },
          { name: "Week 3", students: Math.round(totalStudents * 0.7), assignments: Math.round(totalStudents * 0.82) },
          { name: "Week 4", students: totalStudents, assignments: Math.round(totalStudents * 0.95) },
        ];

        setProgressData(weeklyData);
        setInstructorCourses(coursesWithProgress);
        setCoursesStats({
          totalStudents,
          activeCourses: courses.length,
          avgProgress,
          totalRevenue: totalStudents * 99 // Simplified revenue calculation
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching instructor courses:', error);
        setLoading(false);
      }
    };

    fetchInstructorCourses();
  }, []);

  const stats = [
    {
      title: "Total Students",
      value: courseStats.totalStudents.toString(),
      icon: Users,
      trend: `+${Math.round(courseStats.totalStudents * 0.12)}%`,
      color: "#395972"
    },
    {
      title: "Active Courses",
      value: courseStats.activeCourses.toString(),
      icon: BookOpen,
      trend: "+3 new",
      color: "#2e7d32"
    },
    {
      title: "Avg. Progress",
      value: `${courseStats.avgProgress}%`,
      icon: BarChart,
      trend: "+4.2%",
      color: "#d32f2f"
    },
    {
      title: "Total Revenue",
      value: `$${courseStats.totalRevenue}`,
      icon: TrendingUp,
      trend: "+8.7%",
      color: "#ed6c02"
    },
  ];

  return (
    <main className="flex-1 p-6 space-y-6 bg-gradient-to-b from-[#395972]/5 to-white rounded">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="text-gray-600 text-sm">Your teaching analytics at a glance</p>
        </div>
        <div className="flex items-center space-x-4 bg-white p-3 rounded-xl shadow-lg border border-gray-200">
          <img
            src={user.profile?.profilePhoto || "https://github.com/shadcn.png"}
            alt="User Avatar"
            className="rounded-full w-12 h-12 border border-gray-300 object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">Instructor</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-lg border border-gray-200 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span style={{ color: stat.color }}>{stat.trend}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading your courses...</p>
        </div>
      ) : instructorCourses.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Courses Created</h2>
          <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
          <Link to="/instructor/courses/create" className="inline-block px-4 py-2 bg-[#395972] text-white rounded-md hover:bg-[#2a4358] transition-colors">
            Create Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourses.map((course, index) => (
            <Link to={`/instructor/courses/edit/${course._id}`} key={index}>
              <Card className="shadow-lg border border-gray-200 bg-white transition-all hover:scale-105 cursor-pointer">
                <CardHeader className="flex items-center space-x-2">
                  <BookOpen className="text-[#395972]" />
                  <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mt-2 h-4 bg-gray-200" />
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-xs text-gray-600">{course.progress}% Average Progress</p>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <p className="text-xs text-gray-500">{course.studentsEnrolled}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardHeader className="flex items-center space-x-2">
              <UserCheck className="text-[#395972]" />
              <CardTitle>Recent Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 lg:min-h-[48.5vh]">
                {recentEnrollments.map((enrollment, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{enrollment.student}</p>
                      <p className="text-sm text-gray-500">{enrollment.course}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{enrollment.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg border border-gray-200 bg-white">
            <CardHeader className="flex items-center space-x-2">
              <TrendingUp className="text-[#395972]" />
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#555", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", borderColor: "#ddd", padding: "10px" }} />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} />
                  <Line type="monotone" dataKey="students" stroke="#395972" strokeWidth={2} />
                  <Line type="monotone" dataKey="assignments" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}