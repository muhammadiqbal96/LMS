import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        courses: [],
        instructorCourse: [],
        singleCourse: [],
        lectures: [],
    },
    reducers: {
        setcourses: (state, action) => {
            state.courses = action.payload;
        },
        setinstructorCourse: (state, action) => {
            state.instructorCourse = action.payload;
        },
        setsingleCourse: (state, action) => {
            state.singleCourse = action.payload;
        },
        setlectures: (state, action) => {
            state.lectures = action.payload;
        },
    }
});
export const { setcourses, setinstructorCourse, setsingleCourse, setlectures } = courseSlice.actions;
export default courseSlice.reducer;