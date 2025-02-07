import { setinstructorCourse } from '@/redux/courseSlice';
import { COURSE_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function getInstructorCourse() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axios.get(`${COURSE_API_END_POINT}/get`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setinstructorCourse(res.data.courses));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCourse();
    }, [])
}