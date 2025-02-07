import React, { useState } from 'react';
import { Clock, User, Star, BarChart } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

export default function CourseDetail() {
  const [selectedLecture, setSelectedLecture] = useState(0);

  // Mock course data
  const currentCourse = {
    title: "Complete React Development Course",
    subtitle: "From Zero to Hero in React Development",
    creator: "John Doe",
    lastUpdated: "2023-09-20",
    studentsEnrolled: 15430,
    description: "Master React with modern practices, build real-world applications, and learn to deploy your projects efficiently.",
    lectures: [
      { title: "Introduction to React", duration: "15:00", videoUrl: "https://youtube.com/embed/..." },
      { title: "Components and Props", duration: "22:30", videoUrl: "https://youtube.com/embed/..." },
      { title: "State Management", duration: "25:45", videoUrl: "https://youtube.com/embed/..." },
    ],
  };

  // Mock other courses data
  const otherCourses = [
    { title: "Advanced JavaScript Concepts", creator: "Jane Smith" },
    { title: "Node.js Backend Development", creator: "Mike Johnson" },
    { title: "UI/UX Fundamentals", creator: "Sarah Wilson" },
  ];

  return (
    <>
      <Navbar />
      <div className="flex gap-10 p-10">
        {/* Main Course Content */}
        <div className="flex-3">
          <h1 className="text-3xl font-semibold text-gray-900">{currentCourse.title}</h1>
          <h3 className="text-lg text-gray-600 mb-4">{currentCourse.subtitle}</h3>

          <div className="flex gap-5 mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-gray-600" />
              <span>{currentCourse.creator}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-600" />
              <span>Last updated: {currentCourse.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4 text-gray-600" />
              <span>{currentCourse.studentsEnrolled.toLocaleString()} students enrolled</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Course Description</h2>
            <p className="text-gray-700 mt-2">{currentCourse.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">Course Lectures</h2>
            <div className="bg-gray-100 rounded-lg p-4 mt-2">
              <iframe
                title="course-video"
                width="100%"
                height="400"
                src={currentCourse.lectures[selectedLecture].videoUrl}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="bg-white mt-4 rounded-lg shadow-md">
              {currentCourse.lectures.map((lecture, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedLecture(index)}
                  className={`cursor-pointer p-4 border-b border-gray-200 ${selectedLecture === index ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{lecture.title}</span>
                      <span className="text-sm text-gray-500">{lecture.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button variant="solid" color="primary" className="w-full">
            Enroll Now
          </Button>
        </div>

        {/* Sidebar for Other Courses */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Other Courses</h3>
          {otherCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md cursor-pointer"
            >
              <div className="text-lg font-semibold text-gray-800">{course.title}</div>
              <div className="text-sm text-gray-500">by {course.creator}</div>
              <Link to={`/course/detail/${course.title}`} className="text-[#395972] text-sm mt-2 block hover:underline">
                View Course
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
