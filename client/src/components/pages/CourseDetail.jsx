import { useEffect, useState } from "react";
import { Clock, User, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setsingleCourse } from "@/redux/courseSlice";
import { toast } from "sonner";

export default function CourseDetail() {
  const [selectedLecture, setSelectedLecture] = useState(0);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await axios.get(`${COURSE_API_END_POINT}/getById/${courseId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setsingleCourse(res.data.course));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const { singleCourse } = useSelector((store) => store.course);
  const { courses } = useSelector((store) => store.course);

  return (
    <>
      <Navbar />
      <div className="container mx-auto sm:px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Course Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Course Details Card */}
            <Card className="bg-gray-900 text-white rounded-lg shadow-lg p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{singleCourse.courseTitle || "Course Title Not Available"}</CardTitle>
                <CardDescription className="text-xl">{singleCourse.subTitle || "No subtitle available"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-white" />
                    <span className="text-sm">{singleCourse.creator?.name || "Unknown Instructor"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-white" />
                    <span className="text-sm">
                      Last updated:{" "}
                      {singleCourse.updatedAt
                        ? new Date(singleCourse.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                        : "Not available"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{singleCourse.enrolledStudents?.length || 0} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Course Duration: {singleCourse.courseDuration || "Not specified"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Description Card */}
            <Card className="bg-white text-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent className="text-justify">
                <div dangerouslySetInnerHTML={{ __html: singleCourse.description || "<p>No description available.</p>" }} />
              </CardContent>
            </Card>

            {/* Course Content (Lectures List) */}
            <Card className="bg-white text-gray-800 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                {singleCourse.lectures?.length > 0 ? (
                  <>
                    <div className="mt-4">
                      {singleCourse.lectures[selectedLecture]?.videoUrl ? (
                        <iframe
                          width="100%"
                          height="315"
                          src={singleCourse.lectures[selectedLecture].videoUrl}
                          title="Lecture Video"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-xl mb-3"
                        ></iframe>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="https://media.giphy.com/media/j5BSXUirZ3pWceB5A5/giphy.gif"
                            alt="Locked Content"
                            className="sm:w-[100%] sm:h-[315px] object-cover rounded-lg"
                          />
                          <p className="text-gray-600 my-2">Purchase this course to unlock more lectures.</p>
                        </div>
                      )}
                    </div>

                    {/* Lecture List */}
                    {singleCourse.lectures.map((lecture, index) => (
                      <Card
                        key={index}
                        className="bg-white text-gray-800 rounded-lg shadow-lg mb-2 hover:bg-gray-100 transition-all cursor-pointer"
                        onClick={() => setSelectedLecture(index)} // Update lecture on click
                      >
                        <CardHeader>
                          <CardTitle className="flex gap-2 items-center">
                            <PlayCircle className="h-5 w-5 text-blue-500" />
                            <span className="text-sm">{lecture.lectureTitle}</span>
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-600 text-center">No lectures uploaded yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Enroll Now Card */}
            <Card className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">${singleCourse.coursePrice || "N/A"}</h3>
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
                {courses?.slice(0, 3).map((course, index) => (
                  <Link to={`/course/detail/${course._id}`} key={index}>
                    <Card className="bg-white text-gray-800 rounded-lg shadow-lg mb-4 hover:bg-gray-100 transition-all">
                      <CardHeader>
                        <CardTitle>{course.courseTitle}</CardTitle>
                        <CardDescription className="text-sm">{course.subTitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-gray-800">${course.coursePrice}</h3>
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
  );
}
