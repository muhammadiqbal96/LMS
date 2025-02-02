import { useState } from "react";
import { Button } from "../ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import { ProgressCard } from "../shared/ProgressCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

const CourseHistory = () => {
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "JavaScript Basics",
            instructor: "John Doe",
            rating: 4.5,
            duration: "5 hours",
            category: "Web Development",
            thumbnail: "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/https://builtin.com/sites/www.builtin.com/files/2024-09/programming-languages.jpg",
            progress: 100,
            assignments: 5,
        },
        {
            id: 2,
            title: "Advanced React",
            instructor: "Jane Smith",
            rating: 4.8,
            duration: "8 hours",
            category: "Web Development",
            thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            progress: 100,
            assignments: 8,
        },
        {
            id: 3,
            title: "Python for Data Science",
            instructor: "Sarah Lee",
            rating: 4.7,
            duration: "12 hours",
            category: "Data Science",
            thumbnail: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*zbjSpGnDnr-bYakH",
            progress: 100,
            assignments: 6,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const filteredCourses = courses
        .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((course) => (selectedCategory ? course.category === selectedCategory : true));

    return (
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#395972]/5 to-white rounded min-h-screen">
            <div className="container mx-auto max-w-5xl">
         
                <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#395972]">Your Course History</h1>

                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      
                        <div className="relative flex-1 min-w-[200px]">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full p-2 pl-8 border border-gray-300 rounded-md shadow-sm focus:ring-[#395972] focus:border-[#395972]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-2 top-3 w-4 h-4 text-gray-500" />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="border-[#395972] text-[#395972] flex items-center w-full xxs:w-fit h-10">
                                    <Filter className="w-5 h-5 mr-1" />
                                    {selectedCategory || "Category"}
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedCategory("")}>All Categories</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedCategory("Web Development")}>Web Development</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedCategory("Data Science")}>Data Science</DropdownMenuItem>
                                {/* Add more categories here */}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                    {filteredCourses.map((course) => (
                        <ProgressCard key={course.id} course={course} />
                    ))}
                </div>

           
                {filteredCourses.length === 0 && (
                    <div className="text-center py-6 text-gray-600">
                        <p>No courses found matching your search or filter.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CourseHistory;