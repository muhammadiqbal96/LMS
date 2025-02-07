import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Herosection from './Herosection'
import About from './About'
import CoursesSections from './CoursesSections'
import CallToAction from './CallToAction'
import Footer from '../shared/Footer'
import { useDispatch } from 'react-redux'
import { checkLoginExpiry } from '@/redux/authSlice'
import getAllPublishedCourses from '@/hooks/getAllPublishedCourses'

export default function Home() {
  getAllPublishedCourses();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLoginExpiry());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Herosection />
      <About />
      <CoursesSections />
      <CallToAction />
      <Footer />
    </div>
  )
}
