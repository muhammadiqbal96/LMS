import { setcourses } from '@/redux/courseSlice';
import { COURSE_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function getAllPublishedCourses() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPublishedCourses = async () => {
            try {
                const res = await axios.get(`${COURSE_API_END_POINT}/publishedCourses`);
                if (res.data.success) {
                    dispatch(setcourses(res.data.courses));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPublishedCourses();
    }, [])

}
