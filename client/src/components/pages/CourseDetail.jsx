import { useState } from "react"
import { Clock, User, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import Navbar from "../shared/Navbar"
import Footer from "../shared/Footer"

export default function CourseDetail() {
  const [selectedLecture, setSelectedLecture] = useState(0)

  const currentCourse = {
    title: "Complete React Development Course",
    subtitle: "From Zero to Hero in React Development",
    creator: "John Doe",
    lastUpdated: "2023-09-20",
    studentsEnrolled: 15430,
    totalDuration: "2 hours 30 minutes", // Total duration of the course
    description:
      "Master React with modern practices, build real-world applications, and learn to deploy your projects efficiently. This comprehensive course covers everything from the basics to advanced concepts, ensuring you're ready for real-world React development.",
    lectures: [
      { title: "Introduction to React", videoUrl: "https://youtube.com/embed/..." },
      { title: "Components and Props", videoUrl: "https://youtube.com/embed/..." },
      { title: "State Management", videoUrl: "https://youtube.com/embed/..." },
      { title: "Hooks in Depth", videoUrl: "https://youtube.com/embed/..." },
      { title: "Routing with React Router", videoUrl: "https://youtube.com/embed/..." },
    ],
    price: 49.99,
    thumbnail: "/placeholder.svg?height=400&width=600",
  }

  const otherCourses = [
    {
      title: "Advanced JavaScript Concepts",
      subtitle: "Deep Dive into JavaScript",
      price: 29.99,
      link: "/course/advanced-javascript",
    },
    {
      title: "CSS Mastery",
      subtitle: "From Beginner to Advanced in CSS",
      price: 19.99,
      link: "/course/css-mastery",
    },
    {
      title: "Node.js for Beginners",
      subtitle: "Backend Development with Node.js",
      price: 39.99,
      link: "/course/nodejs-beginners",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Course Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Course Details Card */}
            <Card className="bg-gray-900 text-white rounded-lg shadow-lg p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{currentCourse.title}</CardTitle>
                <CardDescription className="text-xl">{currentCourse.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-white" />
                    <span className="text-sm">{currentCourse.creator}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-white" />
                    <span className="text-sm">Last updated: {currentCourse.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{currentCourse.studentsEnrolled.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Course Duration: {currentCourse.totalDuration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Description Card */}
            <Card className="bg-white text-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{currentCourse.description}</p>
              </CardContent>
            </Card>

            {/* Course Content (Lectures List) */}
            <Card className="bg-white text-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mt-4">
                  <iframe
                    width="100%"
                    height="315"
                    src={currentCourse.lectures[selectedLecture]?.videoUrl}
                    title="Lecture Video"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-xl mb-3"
                  ></iframe>
                </div>
                {currentCourse.lectures.map((lecture, index) => (
                  <Card
                    key={index}
                    className="bg-white text-gray-800 rounded-lg shadow-lg mb-2 hover:bg-gray-100 transition-all"
                    onClick={() => setSelectedLecture(index)} // Update lecture on click
                  >
                    <CardHeader>
                      <CardTitle className="flex gap-2 items-center">
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">{lecture.title}</span>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Enroll Now Card */}
            <Card className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">${currentCourse.price}</h3>
              </div>
              <Button className="w-full bg-[#395972] hover:bg-[#395972]/90 text-white py-3 rounded-md text-lg">Enroll Now</Button>
              <p className="text-center text-gray-600 mt-4 text-sm">Gain lifetime access and start learning immediately!</p>
            </Card>

            {/* Other Courses Card */}
            <Card className="bg-white text-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>Other Courses You Might Like</CardTitle>
              </CardHeader>
              <CardContent>
                {otherCourses.map((course, index) => (
                  <Link to={course.link} key={index}>
                    <Card className="bg-white text-gray-800 rounded-lg shadow-lg mb-4 hover:bg-gray-100 transition-all">
                      <CardHeader>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="text-sm">{course.subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-800">${course.price}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
