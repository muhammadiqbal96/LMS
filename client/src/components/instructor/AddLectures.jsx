import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Save, Trash2, PlayCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RichTextEditor from "../shared/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { COURSE_API_END_POINT } from "@/utils/constant";
import { setlectures } from "@/redux/courseSlice";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export default function ManageLectures() {
  const { courseId } = useParams();
  const { lectures } = useSelector(store => store.course);
  const dispatch = useDispatch();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [newLecture, setNewLecture] = useState({
    lectureTitle: "",
    description: "",
    video: null,
    isPreviewFree: false,
  });

  const [editLecture, setEditLecture] = useState({
    lectureTitle: "",
    description: "",
    video: null,
    isPreviewFree: false,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchLectures();
  }, [courseId, dispatch]);

  const fetchLectures = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${COURSE_API_END_POINT}/${courseId}/get_lectures`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setlectures(res.data.lectures));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLecture((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditLecture((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewLecture((prev) => ({ ...prev, video: file }));
    }
  };

  const handleEditFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditLecture((prev) => ({ ...prev, video: file }));
    }
  };

  const handleSwitchChange = (checked) => {
    setNewLecture((prev) => ({ ...prev, isPreviewFree: checked }));
  };

  const handleEditSwitchChange = (checked) => {
    setEditLecture((prev) => ({ ...prev, isPreviewFree: checked }));
  };

  // Add New Lecture
  const handleAddLecture = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${COURSE_API_END_POINT}/${courseId}/create_lecture`, newLecture, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        fetchLectures();
        setNewLecture({
          lectureTitle: "",
          description: "",
          video: null,
          isPreviewFree: false,
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const [lectureId, setlectureId] = useState('');
  // Open Edit Dialog
  const handleEdit = (id) => {
    setlectureId(id);
    const lecture = lectures.find((lecture) => lecture._id === id);
    setEditLecture(lecture);
    setIsDialogOpen(true);
  };

  // Update Lecture
  const handleUpdateLecture = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.put(`${COURSE_API_END_POINT}/${lectureId}/update_lecture`, editLecture, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        fetchLectures();
        toast.success(res.data.message);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const [delLectureId, setdelLectureId] = useState();
  // Delete Lecture
  const handleDelete = async (e) => {
    console.log(delLectureId);
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${COURSE_API_END_POINT}/${delLectureId}/delete_lectures`, { withCredentials: true });
      if (res.data.success) {
        fetchLectures();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Lectures</h1>

      <form onSubmit={handleAddLecture} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Lecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="lectureTitle">Lecture Title *</Label>
            <Input
              id="lectureTitle"
              name="lectureTitle"
              value={newLecture.lectureTitle}
              onChange={handleInputChange}
              placeholder="Enter lecture title"
              required />

            <Label htmlFor="description">Lecture Description</Label>
            <RichTextEditor input={newLecture} setInput={setNewLecture} />

            <Label htmlFor="video">Lecture Video *</Label>
            <Input id="video" type="file" accept="video/*" onChange={handleFileUpload} />

            <div className="flex items-center space-x-2">
              <Switch id="preview" checked={newLecture.isPreviewFree} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="preview">Free Preview</Label>
            </div>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save Lecture
            </Button>
          </CardContent>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>All Lectures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lectures.length > 0 ? (
            lectures.map((lecture) => (
              <div
                key={lecture._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                {/* Lecture Title and Preview Status */}
                <div className="flex-1 space-y-2 sm:space-y-0 sm:flex sm:items-center mb-2 sm:mb-0 ">
                  <h3 className="text-lg font-semibold">{lecture.lectureTitle}</h3>
                  <span
                    className={`text-xs font-medium rounded px-2 py-1 sm:ml-2 whitespace-nowrap ${lecture.isPreviewFree ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"
                      }`}
                  >
                    {lecture.isPreviewFree ? "Free Preview" : "Locked"}
                  </span>
                </div>

                {/* Video Preview Button */}
                {lecture.videoUrl && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 mr-1"
                        onClick={() => setSelectedVideo(lecture.videoUrl)}
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span>Watch Preview</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Lecture Preview</DialogTitle>
                      </DialogHeader>
                      {selectedVideo && (
                        <video controls className="w-full rounded-lg shadow">
                          <source src={selectedVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </DialogContent>
                  </Dialog>
                )}

                {/* Action Buttons */}
                <div className="mt-3 sm:mt-0 flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(lecture._id)} title="Edit Lecture">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => { setdelLectureId(lecture._id); }} title="Delete Lecture">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          lecture and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">No lectures uploaded yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lecture</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateLecture} className="space-y-4">
            <Label htmlFor="editLectureTitle">Lecture Title *</Label>
            <Input id="editLectureTitle" name="lectureTitle" value={editLecture.lectureTitle} onChange={handleEditInputChange} required />

            <Label htmlFor="editDescription">Lecture Description</Label>
            <RichTextEditor input={editLecture} setInput={setEditLecture} />

            <Label htmlFor="editVideo">Lecture Video *</Label>
            <Input id="editVideo" type="file" accept="video/*" onChange={handleEditFileUpload} />

            <div className="flex items-center space-x-2">
              <Switch id="editPreview" checked={editLecture.isPreviewFree} onCheckedChange={handleEditSwitchChange} />
              <Label htmlFor="editPreview">Free Preview</Label>
            </div>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Update Lecture
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}