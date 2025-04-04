import { useEffect, useState } from "react";
import { Clock, User, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { PURCHASE_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setsingleCourse, setsingleCoursePurchasedStatus } from "@/redux/courseSlice";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";

export default function CourseDetail() {
  const [selectedLecture, setSelectedLecture] = useState(0);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { singleCourse, singleCoursePurchasedStatus, courses } = useSelector((store) => store.course);

  useEffect(() => {
    const fetchCourseData = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await axios.get(`${PURCHASE_API_END_POINT}/course/${courseId}/detail-with-status`, { withCredentials: true });
        if (data.success) {
          dispatch(setsingleCourse(data.course));
          dispatch(setsingleCoursePurchasedStatus(data.purchased));
        }
      } catch (error) {
        toast.error("Failed to load course details.");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchCourseData();
  }, [courseId]);

  const enrollNowHandler = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(`${PURCHASE_API_END_POINT}/checkout/create-checkout-session`, { courseId }, { withCredentials: true });
      if (data.message) toast.success(data.message);
      if (data.url) window.location.href = data.url;
    } catch (error) {
      toast.error("Failed to create checkout session.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-b from-[#395972] to-[#2a4357] text-white p-6 rounded-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">{singleCourse.courseTitle || "Course Title Not Available"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2"><User className="h-5 w-5 text-white" /><span>{singleCourse.creator?.name || "Unknown Instructor"}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-white" /><span>{new Date(singleCourse.updatedAt || Date.now()).toLocaleDateString()}</span></div>
                  <span>{singleCourse.enrolledStudents?.length || 0} students</span>
                  <span>Duration: {singleCourse.courseDuration || "Not specified"}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader><CardTitle>Course Description</CardTitle></CardHeader>
              <CardContent dangerouslySetInnerHTML={{ __html: singleCourse.description || "<p>No description available.</p>" }} />
            </Card>

            <Card className="shadow-lg">
              <CardHeader><CardTitle>Course Content</CardTitle></CardHeader>
              <CardContent>
                {singleCourse.lectures?.length ? (
                  <>
                    {singleCourse.lectures[selectedLecture]?.videoUrl ? (
                      <iframe
                        width="100%"
                        height="315"
                        src={singleCourse.lectures[selectedLecture]?.videoUrl}
                        allowFullScreen
                        className="rounded-xl shadow-md"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-gray-200 h-[315px] rounded-xl text-gray-600">
                        Video Not Available
                      </div>
                    )}

                    {singleCourse.lectures.map((lecture, index) => (
                      <div
                        key={index}
                        className={`p-3 my-2 rounded-lg cursor-pointer transition-colors ${index === selectedLecture ? "bg-[#395972] text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                        onClick={() => setSelectedLecture(index)}
                      >
                        <PlayCircle className="h-5 w-5 text-blue-500 inline" /> {lecture.lectureTitle}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-600 text-center">No lectures available.</p>
                )}
              </CardContent>
            </Card>

          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900">${singleCourse.coursePrice || "N/A"}</h3>
              <Button onClick={enrollNowHandler} className="w-full mt-4 bg-[#395972] hover:bg-[#2d475e] transition-colors shadow-lg" disabled={singleCoursePurchasedStatus}>
                {singleCoursePurchasedStatus ? "Already Enrolled" : "Enroll Now"}
              </Button>
              <p className="text-sm text-center mt-2 text-gray-600">{singleCoursePurchasedStatus ? "You have lifetime access!" : "Lifetime access included!"}</p>
            </Card>

            <Card className="shadow-lg">
              <CardHeader><CardTitle>Other Courses</CardTitle></CardHeader>
              <CardContent>
                {courses.slice(0, 3).map((course, index) => (
                  <Link to={`/course/detail/${course._id}`} key={index}>
                    <div className="p-3 bg-gray-100 rounded-lg mb-2 hover:bg-gray-200 transition-colors shadow-sm">
                      <h4 className="font-medium">{course.courseTitle}</h4>
                      <p className="text-sm text-gray-600">{course.subTitle}</p>
                      <span className="text-sm font-bold text-[#395972]">${course.coursePrice}</span>
                    </div>
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