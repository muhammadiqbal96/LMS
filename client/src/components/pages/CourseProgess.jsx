import React, { useEffect } from "react";
import {
  setCourseData,
  setCurrentLecture,
  setError,
  markCompleted,
  markIncompleted,
} from "@/redux/courseProgressSlice";
import { markLectureViewed } from "@/redux/courseProgressSlice";
import { setLoading } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PROGRESS_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";

const CourseProgress = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const { data, isError, currentLecture, completed } = useSelector(
    (state) => state.courseProgress
  );
  const { loading } = useSelector((store) => store.auth);

  const fetchCourseProgress = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${PROGRESS_API_END_POINT}/${courseId}`, {
        withCredentials: true,
      });
      dispatch(setCourseData(res.data.data));
    } catch (error) {
      dispatch(setError(true));
      toast.error("Failed to load course progress");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCourseProgress();
  }, [courseId]);


  const handleLectureProgress = async (lectureId) => {
    try {
      await axios.post(
        `${PROGRESS_API_END_POINT}/${courseId}/lecture/${lectureId}/view`,
        {},
        { withCredentials: true }
      );
      dispatch(markLectureViewed(lectureId)); // ✅ Update Redux state only
    } catch (err) {
      toast.error("Failed to update lecture progress");
    }
  };

  const handleCompleteCourse = async () => {
    try {
      await axios.post(
        `${PROGRESS_API_END_POINT}/${courseId}/complete`,
        {},
        { withCredentials: true }
      );
      dispatch(markCompleted());
      toast.success("Course marked as completed");
      fetchCourseProgress(); // Refresh progress
    } catch (err) {
      toast.error("Failed to mark as completed");
    }
  };

  const handleInCompleteCourse = async () => {
    try {
      await axios.post(
        `${PROGRESS_API_END_POINT}/${courseId}/incomplete`,
        {},
        { withCredentials: true }
      );
      dispatch(markIncompleted());
      toast.success("Course marked as incomplete");
      fetchCourseProgress(); // Refresh progress
    } catch (err) {
      toast.error("Failed to mark as incomplete");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load course details</p>;

  const { courseDetails, progress } = data;

  const isLectureCompleted = (lectureId) =>
    progress.some((p) => p.lectureId === lectureId && p.viewed);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {courseDetails.courseTitle}
        </h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className="flex items-center gap-2"
        >
          {completed ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" /> Completed
            </>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Video Section */}
        <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
          <div className="relative aspect-video">
            <video
              src={currentLecture?.videoUrl}
              controls
              onPlay={() => handleLectureProgress(currentLecture._id)}
              className="w-full h-full object-contain md:rounded-t-2xl"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Lecture: {currentLecture?.lectureTitle}
            </h2>
          </div>
        </div>

        {/* Lectures List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Course Lectures
          </h2>
          <div className="space-y-3">
            {courseDetails.lectures.map((lecture, index) => {
              const isCurrent = currentLecture?._id === lecture._id;
              const viewed = isLectureCompleted(lecture._id);

              return (
                <Card
                  key={lecture._id}
                  onClick={() => dispatch(setCurrentLecture(lecture))}
                  className={`transition-all duration-200 cursor-pointer border ${isCurrent
                    ? "bg-blue-100 dark:bg-blue-800 border-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-3">
                      {viewed ? (
                        <CheckCircle2 className="text-green-500" />
                      ) : (
                        <CirclePlay className="text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {lecture.lectureTitle}
                        </p>
                        <p className="text-sm text-gray-500">
                          Lecture {index + 1}
                        </p>
                      </div>
                    </div>
                    {viewed && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-600 border border-green-200"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
