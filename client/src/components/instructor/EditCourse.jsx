import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Save } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setLoading } from "@/redux/authSlice"
import { COURSE_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import React from 'react'
import Loader from "../shared/Loader"
import RichTextEditor from "../shared/RichTextEditor"

export default function EditCourse() {
    const [courseData, setCourseData] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "All Level",
        courseDuration: "",
        coursePrice: "",
        courseThumbnail: null,
        isPublished: false,
    })
    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const res = await axios.get(`${COURSE_API_END_POINT}/getById/${id}`, { withCredentials: true })
                if (res.data.success) {
                    setCourseData(res.data.course)
                }
            } catch (error) {
                console.log(error)
                toast.error("Failed to fetch course data")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCourseData()
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setCourseData({ ...courseData, courseThumbnail: file })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!courseData.courseTitle || !courseData.category) {
            toast.error("Course title and category are required.")
            return
        }

        const formData = new FormData()
        Object.entries(courseData).forEach(([key, value]) => {
            formData.append(key, value)
        })

        try {
            dispatch(setLoading(true))
            const res = await axios.put(`${COURSE_API_END_POINT}/update/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/instructor/courses/manage")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="p-6 space-y-6 lg:max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Edit Course</h1>
                <Button onClick={handleSubmit} className="hidden sm:flex">
                    <Save className="mr-2 h-4 w-4" />
                    Update Course
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="courseTitle">Course Title *</Label>
                            <Input
                                id="courseTitle"
                                name="courseTitle"
                                value={courseData.courseTitle}
                                onChange={handleInputChange}
                                placeholder="Enter course title"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="subTitle">Course Subtitle</Label>
                            <Input
                                id="subTitle"
                                name="subTitle"
                                value={courseData.subTitle}
                                onChange={handleInputChange}
                                placeholder="Enter course subtitle"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Course Description *</Label>
                            <RichTextEditor input={courseData} setInput={setCourseData} />
                        </div>
                        <div>
                            <Label htmlFor="category">Course Category *</Label>
                            <Input
                                id="category"
                                name="category"
                                value={courseData.category}
                                onChange={handleInputChange}
                                placeholder="Web Development, Design, etc."
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Course Level</Label>
                                <Select
                                    value={courseData.courseLevel}
                                    onValueChange={(value) => setCourseData({ ...courseData, courseLevel: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select course level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All Level">All Level</SelectItem>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="courseDuration">Course Duration</Label>
                                <Input
                                    id="courseDuration"
                                    name="courseDuration"
                                    value={courseData.courseDuration}
                                    onChange={handleInputChange}
                                    placeholder="Example: 6 weeks"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing & Media</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="coursePrice">Course Price ($)</Label>
                                <Input
                                    id="coursePrice"
                                    name="coursePrice"
                                    type="number"
                                    min="0"
                                    value={courseData.coursePrice}
                                    onChange={handleInputChange}
                                    placeholder="Enter course price"
                                />
                            </div>
                            <div>
                                <Label htmlFor="courseThumbnail">Course Thumbnail</Label>
                                <Input
                                    id="courseThumbnail"
                                    name="courseThumbnail"
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                {courseData.courseThumbnail && (
                                    <p className="mt-2 text-xs text-gray-500 line-clamp-6">Current thumbnail: {courseData.courseThumbnail}</p>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isPublished"
                                    checked={courseData.isPublished}
                                    onCheckedChange={(checked) => setCourseData({ ...courseData, isPublished: checked })}
                                />
                                <Label htmlFor="isPublished">Publish Course</Label>
                            </div>
                        </CardContent>
                    </Card>
                    <Button onClick={handleSubmit} className="flex sm:hidden ml-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Update Course
                    </Button>
                </div>
            </form>
        </div>
    )
}

