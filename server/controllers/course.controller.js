import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { uploadMediaToCloudinary } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, subTitle, description, category, courseLevel, courseDuration, coursePrice, isPublished } = req.body;
        const file = req.file;

        if (!courseTitle || !description || !category || !courseLevel || !courseDuration || !coursePrice || !isPublished || !file) {
            return res.status(400).json({
                message: "Something is missing. Please fill all fields.",
                success: false
            });
        }
        const cloudRes = await uploadMediaToCloudinary(file.path);

        const course = await Course.create({
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            courseDuration,
            coursePrice,
            courseThumbnail: cloudRes.secure_url,
            isPublished,
            creator: req.id
        });

        return res.status(201).json({
            message: "Course created successfully.",
            course,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
}


export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId });
        if (!courses) {
            return res.status(400).json({
                courses: [],
                message: "Course not found.",
                success: false
            })
        }

        return res.status(200).json({
            courses,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                course: [],
                message: "Course not found.",
                success: false
            })
        }

        return res.status(200).json({
            course,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
};


export const updateCourse = async (req, res) => {
    try {
        const { courseTitle, subTitle, description, category, courseLevel, courseDuration, coursePrice, isPublished } = req.body;
        const file = req.file;
        const courseId = req.params.id;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                message: "Course not found.",
                success: false
            })
        }

        if (courseTitle) course.courseTitle = courseTitle;
        if (subTitle) course.subTitle = subTitle;
        if (description) course.description = description;
        if (category) course.category = category;
        if (courseLevel) course.courseLevel = courseLevel;
        if (courseDuration) course.courseDuration = courseDuration;
        if (coursePrice) course.coursePrice = coursePrice;
        if (isPublished) course.isPublished = isPublished;
        if (file) {
            if (course.courseThumbnail) {
                const courseThumb = course.courseThumbnail;
                const publicId = courseThumb.split("/").pop().split(".")[0];
                deleteMediaFromCloudinary(publicId);
            }
            const cloudRes = await uploadMediaToCloudinary(file.path);
            course.courseThumbnail = cloudRes.secure_url;
        }

        await course.save();
        return res.status(200).json({
            message: "Course updated successfully.",
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
}

// Lecture Controller
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle, description, isPreviewFree } = req.body;
        const file = req.file;
        const courseId = req.params.id;

        if (!lectureTitle || !description || !isPreviewFree || !file) {
            return res.status(400).json({
                message: "Something is missing. Please fill all fields.",
                success: false
            });
        }
        const cloudRes = await uploadMediaToCloudinary(file.path);

        const lecture = await Lecture.create({
            lectureTitle,
            description,
            videoUrl: cloudRes.secure_url,
            isPreviewFree
        });

        const course = await Course.findById(courseId);
        if (course) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(201).json({
            message: "Lecture created successfully.",
            lecture,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
}

export const getCourseLectures = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(400).json({
                lectures: [],
                message: "Course not found.",
                success: false
            })
        }

        return res.status(200).json({
            lectures: course.lectures,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
};