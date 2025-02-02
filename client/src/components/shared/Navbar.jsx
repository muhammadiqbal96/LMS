import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Group, Home, Menu, X, LogOut, LayoutDashboardIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

function Navbar() {
    const loaction = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const [activeLink, setActiveLink] = useState(loaction.pathname);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);
    const { user } = useSelector(store => store.auth);

    const logoutHandler = async () => {
        try {
            dispatch(setLoading(true));
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true, });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <header className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link
                    to="/"
                    className="flex items-center gap-2 group"
                    onClick={() => setActiveLink("/")}
                >
                    <img
                        src="/flow.png"
                        alt="EduFlow Logo"
                        className="h-9 w-11 transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="text-xl font-bold bg-gradient-to-r from-[#395972] to-[#2a4357] bg-clip-text text-transparent">
                        EduFlow
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    <Link to="/">
                        <Button
                            variant="ghost"
                            className={`gap-2 px-4 hover:bg-gray-100/80 rounded-lg ${activeLink === "/" ? "text-[#395972] font-semibold bg-gray-100" : "text-gray-600"}`}
                            onClick={() => setActiveLink("/")}
                        >
                            <Home className="h-4 w-4" />
                            Home
                        </Button>
                    </Link>
                    <Link to="/courses">
                        <Button
                            variant="ghost"
                            className={`gap-2 px-4 hover:bg-gray-100/80 rounded-lg ${activeLink === "/courses" ? "text-[#395972] font-semibold bg-gray-100" : "text-gray-600"}`}
                            onClick={() => setActiveLink("/courses")}
                        >
                            <BookOpen className="h-4 w-4" />
                            Courses
                        </Button>
                    </Link>
                    <Link to="/instructors">
                        <Button
                            variant="ghost"
                            className={`gap-2 px-4 hover:bg-gray-100/80 rounded-lg ${activeLink === "/instructors" ? "text-[#395972] font-semibold bg-gray-100" : "text-gray-600"}`}
                            onClick={() => setActiveLink("/instructors")}
                        >
                            <Group className="h-4 w-4" />
                            Instructors
                        </Button>
                    </Link>
                </div>

                {/* Auth Section */}
                <div className="hidden md:flex items-center gap-2">
                    {!user ? (
                        <>
                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    className="border-gray-300 hover:border-[#395972] text-gray-700 hover:text-[#395972] px-6 h-10 rounded-lg transition-colors"
                                    onClick={() => setActiveLink("")}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button
                                    className="bg-[#395972] hover:bg-[#2d475e] text-white px-6 h-10 rounded-lg transition-colors shadow-sm hover:shadow-md"
                                    onClick={() => setActiveLink("")}
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-white shadow-sm hover:border-[#395972] transition-colors">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                        alt="User Avatar"
                                        className="object-cover"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 max-w-md p-2 rounded-xl shadow-lg border border-gray-100 mt-2">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                                alt="User Avatar"
                                                className="object-cover"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.name || "Muhammad Iqbal"}</h4>
                                            <p className="text-xs text-gray-500">{user.email || "iqbaljutt96"}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-2">
                                        <Link to={user.role == "student" ? "/profile" : "/instructor/dashboard"} className="flex items-center gap-2 text-gray-600">
                                            <LayoutDashboardIcon className="h-5 w-5" />
                                            <Button variant="outline" className="w-full">Dashboard</Button>
                                        </Link>
                                        <Link
                                            onClick={logoutHandler}
                                            className="flex items-center gap-2 text-gray-600"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <Button variant="outline" className="w-full  bg-[#395972] hover:bg-[#2d475e] hover:text-white text-white shadow-sm">Logout</Button>
                                        </Link>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <Menu className="h-6 w-6 text-gray-700" />
                </Button>
            </nav>

            {/* Enhanced Mobile Menu */}
            <div className={`fixed top-0 left-0 h-screen w-full bg-white/95 backdrop-blur-lg transition-transform duration-300 ease-out transform z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    {/* Header Section */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center gap-2">
                            <img
                                src="/flow.png"
                                alt="EduFlow Logo"
                                className="h-8 w-10"
                            />
                            <span className="text-lg font-semibold text-[#395972]">EduFlow</span>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={toggleMenu}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="h-6 w-6 text-gray-600" />
                        </Button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
                        <Link
                            to="/"
                            className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={toggleMenu}
                        >
                            <div className="flex items-center gap-3">
                                <Home className="h-5 w-5 text-[#395972]" />
                                <span className="text-gray-700 font-medium">Home</span>
                            </div>
                        </Link>
                        <Link
                            to="/courses"
                            className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={toggleMenu}
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className="h-5 w-5 text-[#395972]" />
                                <span className="text-gray-700 font-medium">Courses</span>
                            </div>
                        </Link>
                        <Link
                            to="/instructors"
                            className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={toggleMenu}
                        >
                            <div className="flex items-center gap-3">
                                <Group className="h-5 w-5 text-[#395972]" />
                                <span className="text-gray-700 font-medium">Instructors</span>
                            </div>
                        </Link>

                        <div className="mt-4 pt-4 border-t">
                            {user ? (
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <Avatar className="border-2 border-[#395972]">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                                alt="User Avatar"
                                                className="object-cover"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium text-gray-800">{user?.name || "Muhammad Iqbal"}</h4>
                                            <p className="text-sm text-gray-500">{user?.email || "iqbaljutt96"}</p>
                                        </div>
                                    </div>

                                    <button className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-left -mb-2">
                                        <Link to={user.role == "student" ? "/profile" : "/instructor/dashboard"} className="flex items-center gap-3 text-gray-700 w-full">
                                            <LayoutDashboardIcon className="h-5 w-5" />
                                            <Button variant="outline" className="font-medium w-full">Dashboard</Button>
                                        </Link>
                                    </button>
                                    <button
                                        onClick={logoutHandler}
                                        className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <div className="w-full flex items-center gap-3 text-gray-700">
                                            <LogOut className="h-5 w-5" />
                                            <Button variant="outline" className="w-full  bg-[#395972] hover:bg-[#2d475e] hover:text-white text-white shadow-sm">Log Out</Button>
                                        </div>
                                    </button>

                                </div>
                            ) : (
                                // Auth Buttons
                                <div className="flex flex-col gap-3">
                                    <Link
                                        to="/login"
                                        className="w-full"
                                        onClick={toggleMenu}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full h-12 rounded-lg border-gray-300 text-gray-700 hover:border-[#395972] hover:text-[#395972]"
                                            onClick={() => setActiveLink("")}
                                        >
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="w-full"
                                        onClick={toggleMenu}
                                    >
                                        <Button
                                            className="w-full h-12 rounded-lg bg-[#395972] hover:bg-[#2d475e] text-white shadow-sm"
                                            onClick={() => setActiveLink("")}
                                        >
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;