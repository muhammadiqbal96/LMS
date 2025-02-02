import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Instructors from './components/pages/Instructors';
import Sidebar from './components/dashboard/Sidebar';
import { SidebarProvider } from './components/ui/sidebar';
import Dashboard from './components/dashboard/Dashboard';
import MyLearning from './components/dashboard/MyLearning';
import AccountSettings from './components/dashboard/AccountSettings';
import CourseHistory from './components/dashboard/CourseHistory';
import BrowseCourses from './components/dashboard/BrowseCourse';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import FaqsPage from './components/pages/FaqsPage';
import ContactSupportPage from './components/pages/ContactSupportPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoading } from './redux/authSlice';
import Loader from './components/shared/Loader';
import InstructDashboard from './components/instructor/InstructDashboard';
import ManageCourse from './components/instructor/ManageCourse';
import CreateCourse from './components/instructor/CreateCourse';
import AddLectures from './components/instructor/AddLectures';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/courses',
    element: <><Navbar /><BrowseCourses /><Footer /> </>
  },
  {
    path: '/instructors',
    element: <Instructors />
  },
  {
    path: '/profile',
    element: <SidebarProvider><Sidebar><Dashboard /></Sidebar></SidebarProvider>
  },
  {
    path: '/profile/learning',
    element: <SidebarProvider><Sidebar><MyLearning /></Sidebar></SidebarProvider>
  },
  {
    path: '/profile/account',
    element: <SidebarProvider><Sidebar><AccountSettings /></Sidebar></SidebarProvider>
  },
  {
    path: '/courses/completed',
    element: <SidebarProvider><Sidebar><CourseHistory /></Sidebar></SidebarProvider>
  },
  {
    path: '/courses/browse',
    element: <SidebarProvider><Sidebar><BrowseCourses /></Sidebar></SidebarProvider>
  },
  {
    path: '/support/faqs',
    element: <SidebarProvider><Sidebar><FaqsPage /></Sidebar></SidebarProvider>
  },
  {
    path: '/support/contact',
    element: <SidebarProvider><Sidebar><ContactSupportPage /></Sidebar></SidebarProvider>
  },
  {
    path: "/instructor/dashboard",
    element: <SidebarProvider><Sidebar><InstructDashboard /></Sidebar></SidebarProvider>
  },
  {
    path: "/instructor/courses/manage",
    element: <SidebarProvider><Sidebar><ManageCourse /></Sidebar></SidebarProvider>
  },
  {
    path: "/instructor/courses/create",
    element: <SidebarProvider><Sidebar><CreateCourse /></Sidebar></SidebarProvider>
  },
  {
    path: "/instructor/courses/addLecture/:courseId",
    element: <SidebarProvider><Sidebar><AddLectures /></Sidebar></SidebarProvider>
  },
]);

function App() {

  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => dispatch(setLoading(false)), 500);
    return () => clearTimeout(timer);
  }, [appRouter]);

  return (
    <div>
       {loading && <Loader />}
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
