import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Plus, Users, Calendar, FileEdit, BookOpenCheck, MoreVertical, Delete } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import getInstructorCourse from "@/hooks/getInstructorCourse";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const recentActivities = [
  { student: "John Doe", course: "React Basics", activity: "Completed Lesson 5", date: "2024-03-20" },
  { student: "Jane Smith", course: "UI/UX Fundamentals", activity: "Started Course", date: "2024-03-19" },
  { student: "Tom Lee", course: "Advanced JavaScript", activity: "Completed Assignment 2", date: "2024-03-18" },
  { student: "Emma Davis", course: "Introduction to React", activity: "Completed Quiz 1", date: "2024-03-17" },
  { student: "Chris Brown", course: "UI/UX Fundamentals", activity: "Completed Lesson 3", date: "2024-03-16" },
];

export default function ManageCourse() {
  getInstructorCourse();
  const { instructorCourse } = useSelector(store => store.course);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Courses</h1>
        <Link to={`/instructor/courses/create`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Button>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructorCourse.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-lg">{course.courseTitle}</CardTitle>
                <Badge variant={course.isPublished ? "default" : "secondary"}>
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link to={`/instructor/courses/edit/${course._id}`}>
                    <DropdownMenuItem>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit Course
                    </DropdownMenuItem>
                  </Link>
                  <Link to={`/instructor/courses/addLecture/${course._id}`}>
                    <DropdownMenuItem>
                      <FileEdit className="mr-2 h-4 w-4" />
                      Manage Lecture
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Delete color="red" className="mr-2 h-4 w-4" />
                    Delete Course
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">{course.courseDuration}</span>
                </div>
              </div>
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Course Progress: {course.progress}%
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-xs flex items-center gap-1">
                Last updated:
                <span className="text-blue-600 text-[10px]">
                  {new Date(course.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </span>

              <Link to={`/instructor/courses/view/${course._id}`}>
                <Button variant="outline" size="sm" className="flex gap-1">
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit Course
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Student Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-all"
              >
                <div>
                  <p className="text-sm font-semibold">{activity.student}</p>
                  <p className="text-xs text-muted-foreground">{activity.course}</p>
                </div>
                <div className="text-sm text-muted-foreground">{activity.activity}</div>
                <div className="text-sm text-gray-500">{activity.date}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Course Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Course Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="text-2xl font-bold">{instructorCourse.length}</span>
              <span className="text-sm text-muted-foreground">Total Courses</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-2xl font-bold">2.1k</span>
              <span className="text-sm text-muted-foreground">Total Students</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <BookOpenCheck className="h-6 w-6 mb-2" />
              <span className="text-2xl font-bold">78%</span>
              <span className="text-sm text-muted-foreground">Avg. Completion</span>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-2xl font-bold">{instructorCourse.filter(course => !course.isPublished).length}</span>
              <span className="text-sm text-muted-foreground">Upcoming</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
