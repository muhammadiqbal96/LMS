import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import { CourseCard } from "../shared/CourseCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import getAllPublishedCourses from "@/hooks/getAllPublishedCourses";
import { useSelector } from "react-redux";

const BrowseCourses = () => {
    getAllPublishedCourses()

    const { courses } = useSelector(store => store.course);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOrder, setSortOrder] = useState("none");
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    const categories = Array.from(new Set(courses.map(c => c.category)));

    const filteredCourses = courses
        .filter((course) => course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((course) => (selectedCategory ? course.category === selectedCategory : true))
        .filter((course) => (selectedDifficulty ? course.courseLevel === selectedDifficulty : true))
        .filter((course) => (
            priceRange[0] !== 0 || priceRange[1] !== 1000
                ? course.coursePrice >= priceRange[0] && course.coursePrice <= priceRange[1]
                : true
        ))
        .sort((a, b) => {
            if (sortOrder === "high-to-low") return b.coursePrice - a.coursePrice;
            if (sortOrder === "low-to-high") return a.coursePrice - b.coursePrice;
            return 0;
        });

    return (
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#395972]/5 to-white rounded min-h-screen">
            <div className="mx-auto">
                <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#395972]">Browse Courses</h1>
                    <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
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
                                {
                                    categories.map(category => (
                                        <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                                            {category}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                            <DialogTrigger className="w-full xs:w-auto">
                                <Button variant="outline" className="border-[#395972] text-[#395972] flex items-center w-full xs:w-fit h-10">
                                    <Filter className="w-5 h-5 mr-1" />
                                    More Filters
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Filter Courses</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full">Difficulty: {selectedDifficulty || "All"}</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setSelectedDifficulty("")}>All Levels</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSelectedDifficulty("Beginner")}>Beginner</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSelectedDifficulty("Intermediate")}>Intermediate</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSelectedDifficulty("Advanced")}>Advanced</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <div>
                                        <label className="block text-sm font-medium">Price Range</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                            className="w-full appearance-none h-2 bg-gray-300 rounded-lg outline-none"
                                            style={{
                                                background: `linear-gradient(to right, #395972 ${priceRange[1] / 1005 * 100}%, #e2e8f0 0%)`,
                                            }}
                                        />
                                        <p className="text-sm text-gray-500">Up to ${priceRange[1]}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full">Sort: {sortOrder === "none" ? "None" : sortOrder === "high-to-low" ? "High to Low" : "Low to High"}</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => setSortOrder("none")}>None</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSortOrder("high-to-low")}>Price: High to Low</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setSortOrder("low-to-high")}>Price: Low to High</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsFilterDialogOpen(false)}>Close</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                    {filteredCourses.map((course, index) => (
                        <CourseCard key={index} course={course} />
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

export default BrowseCourses;
