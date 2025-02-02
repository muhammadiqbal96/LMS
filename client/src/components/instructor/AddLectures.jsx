import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2, Plus, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function AddLectures() {
    const { courseId } = useParams();
    const { singleCourse } = useSelector(store => store.course);
    const [courseData, setCourseData] = useState({
        lectures: []
    });

    useEffect(() => {
        const fetchCourse = async () => {
            const mockCourse = {
                lectures: [
                    //   { id: 1, title: "Introduction", description: "", video: null },
                ]
            };
            setCourseData(mockCourse);
        };
        fetchCourse();
    }, [courseId]);


    const handleLectureChange = (index, field, value) => {
        const updatedLectures = [...courseData.lectures];
        updatedLectures[index][field] = value;
        setCourseData({ ...courseData, lectures: updatedLectures });
    };

    const addNewLecture = () => {
        setCourseData({
            ...courseData,
            lectures: [
                ...courseData.lectures,
                { id: Date.now(), title: "", description: "", video: null }
            ]
        });
    };

    const removeLecture = (index) => {
        const updatedLectures = courseData.lectures.filter((_, i) => i !== index);
        setCourseData({ ...courseData, lectures: updatedLectures });
    };

    const handleFileUpload = (e, field, index = null) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (index !== null) {
            handleLectureChange(index, field, file);
        } else {
            setCourseData({ ...courseData, [field]: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append course data
        Object.entries(courseData).forEach(([key, value]) => {
            if (key === 'lectures') return;
            formData.append(key, value);
        });

        // Append lectures
        courseData.lectures.forEach((lecture, index) => {
            Object.entries(lecture).forEach(([key, value]) => {
                formData.append(`lectures[${index}].${key}`, value);
            });
        });

        try {
         
        } catch (error) {
            toast.error('Error updating course:', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Lectures</h1>
                <Button onClick={handleSubmit}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lectures Section */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Course Lectures</CardTitle>
                            <Button type="button" onClick={addNewLecture} size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Lecture
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {courseData.lectures.map((lecture, index) => (
                            <div key={lecture.id} className="space-y-4 border p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">Lecture {index + 1}</h3>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeLecture(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>

                                <div>
                                    <Label>Lecture Title *</Label>
                                    <Input
                                        value={lecture.title}
                                        onChange={(e) => handleLectureChange(index, 'title', e.target.value)}
                                        placeholder="Enter lecture title"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label>Lecture Description</Label>
                                    <Textarea
                                        value={lecture.description}
                                        onChange={(e) => handleLectureChange(index, 'description', e.target.value)}
                                        placeholder="Describe the lecture content"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label>Lecture Video *</Label>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="file"
                                            accept="video/*"
                                            className="cursor-pointer"
                                            onChange={(e) => handleFileUpload(e, 'video', index)}
                                        />
                                        {lecture.video && (
                                            <span className="text-sm text-muted-foreground">
                                                {lecture.video.name}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Supported formats: MP4, WebM, MOV
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}