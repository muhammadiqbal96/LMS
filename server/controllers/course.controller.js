import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMediaToCloudinary } from "../utils/cloudinary.js";

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
        const course = await Course.findById(courseId)
            .populate({
                path: "lectures"
            })
            .populate({
                path: "creator",
                select: "name"
            }).lean();

        if (!course) {
            return res.status(400).json({
                course: [],
                message: "Course not found.",
                success: false
            })
        }

        course.lectures = course.lectures.map(lecture => ({
            lectureTitle: lecture.lectureTitle,
            videoUrl: lecture.isPreviewFree === true ? lecture.videoUrl : null
        }));

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

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({ path: "creator", select: "name" });
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

export const updateCourseLecture = async (req, res) => {
    try {
        const { lectureTitle, description, isPreviewFree } = req.body;
        const file = req.file;
        const lectureId = req.params.id;

        let lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(400).json({
                message: "Lecture not found.",
                success: false
            })
        }

        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (description) lecture.description = description;
        if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;
        if (file) {
            if (lecture.videoUrl) {
                const lecturevideo = lecture.videoUrl;
                const publicId = lecturevideo.split("/").pop().split(".")[0];
                deleteVideoFromCloudinary(publicId);
            }
            const cloudRes = await uploadMediaToCloudinary(file.path);
            lecture.videoUrl = cloudRes.secure_url;
        }

        await lecture.save();
        return res.status(200).json({
            message: "Lecture updated successfully.",
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

export const deleteCourseLecture = async (req, res) => {
    try {
        const { lectureId, courseId } = req.params;

        if (!lectureId || !courseId) {
            return res.status(400).json({
                message: "Lecture ID and Course ID are required.",
                success: false
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found.",
                success: false
            });
        }

        const lectureIndex = course.lectures.indexOf(lectureId);
        if (lectureIndex === -1) {
            return res.status(404).json({
                message: "Lecture not found in the course.",
                success: false
            });
        }

        let lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(400).json({
                message: "Lecture not found.",
                success: false
            });
        }

        if (lecture.videoUrl) {
            const lecturevideo = lecture.videoUrl;
            const publicId = lecturevideo.split("/").pop().split(".")[0];
            deleteVideoFromCloudinary(publicId);
        }

        course.lectures.splice(lectureIndex, 1);
        await course.save();

        await Lecture.deleteOne({ _id: lectureId });
        return res.status(200).json({
            message: "Lecture deleted successfully.",
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
};
