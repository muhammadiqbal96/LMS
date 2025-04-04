import { createSlice } from "@reduxjs/toolkit";

const instructorsSlice = createSlice({
    name: "instructors",
    initialState: {
        instructors: [],
    },
    reducers: {
        setInstructors: (state, action) => {
            state.instructors = action.payload;
        },
    },
});

export const { setInstructors } = instructorsSlice.actions;
export default instructorsSlice.reducer;
