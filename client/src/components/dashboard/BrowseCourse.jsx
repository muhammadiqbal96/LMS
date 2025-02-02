import { useState } from "react";
import { Button } from "../ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import { CourseCard } from "../shared/CourseCard";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

const BrowseCourses = () => {
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: "Complete Web Development Bootcamp",
            instructor: "John Doe",
            rating: "4.9",
            duration: "32 hours",
            difficulty: "Beginner",
            originalPrice: 199,
            discountedPrice: 149,
            category: "Development",
            thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        },
        {
            id: 2,
            title: "Introduction to Machine Learning",
            instructor: "Alice Johnson",
            rating: "4.7",
            duration: "25 hours",
            difficulty: "Intermediate",
            originalPrice: 249,
            discountedPrice: 199,
            category: "Data Science",
            thumbnail: "https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg",
        },
        {
            id: 3,
            title: "Graphic Design Masterclass",
            instructor: "Emma Wilson",
            rating: "4.8",
            duration: "20 hours",
            difficulty: "All Levels",
            originalPrice: 149,
            discountedPrice: 99,
            category: "Design",
            thumbnail: "https://img.freepik.com/free-photo/ui-ux-representations-with-laptop_23-2150201871.jpg?semt=ais_hybrid",
        },
        {
            id: 4,
            title: "Advanced Python Programming",
            instructor: "Jane Smith",
            rating: "4.8",
            duration: "24 hours",
            difficulty: "Advanced",
            originalPrice: 179,
            discountedPrice: 149,
            category: "Programming",
            thumbnail: "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/https://builtin.com/sites/www.builtin.com/files/2024-09/programming-languages.jpg",
        },
        {
            id: 5,
            title: "Digital Marketing Strategies",
            instructor: "Michael Brown",
            rating: "4.6",
            duration: "18 hours",
            difficulty: "Intermediate",
            originalPrice: 129,
            discountedPrice: 89,
            category: "Marketing",
            thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        },
        {
            id: 6,
            title: "Photography Essentials",
            instructor: "Sophia Lee",
            rating: "4.5",
            duration: "15 hours",
            difficulty: "Beginner",
            originalPrice: 99,
            discountedPrice: 69,
            category: "Photography",
            thumbnail: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*zbjSpGnDnr-bYakH",
        },
        {
            id: 7,
            title: "Digital Marketing Strategies",
            instructor: "Michael Brown",
            rating: "4.6",
            duration: "18 hours",
            difficulty: "Intermediate",
            originalPrice: 129,
            discountedPrice: 89,
            category: "Marketing",
            thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        },
        {
            id: 8,
            title: "Photography Essentials",
            instructor: "Sophia Lee",
            rating: "4.5",
            duration: "15 hours",
            difficulty: "Beginner",
            originalPrice: 99,
            discountedPrice: 69,
            category: "Photography",
            thumbnail: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*zbjSpGnDnr-bYakH",
        },
        {
            id: 9,
            title: "Photography Essentials",
            instructor: "Sophia Lee",
            rating: "4.5",
            duration: "15 hours",
            difficulty: "Beginner",
            originalPrice: 99,
            discountedPrice: 69,
            category: "Photography",
            thumbnail: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*zbjSpGnDnr-bYakH",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [priceRange, setPriceRange] = useState([0, 300]);
    const [sortOrder, setSortOrder] = useState("none");
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    const categories = Array.from(new Set(courses.map(c => c.category)));
    const difficulties = Array.from(new Set(courses.map(c => c.difficulty)));

    const filteredCourses = courses
        .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((course) => (selectedCategory ? course.category === selectedCategory : true))
        .filter((course) => (selectedDifficulty ? course.difficulty === selectedDifficulty : true))
        .filter((course) => course.discountedPrice >= priceRange[0] && course.discountedPrice <= priceRange[1])
        .sort((a, b) => {
            if (sortOrder === "high-to-low") return b.discountedPrice - a.discountedPrice;
            if (sortOrder === "low-to-high") return a.discountedPrice - b.discountedPrice;
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
                                        <DropdownMenuItem key={categories} onClick={() => setSelectedCategory({category})}>{category}</DropdownMenuItem>
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
                                            max="300"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                            className="w-full appearance-none h-2 bg-gray-300 rounded-lg outline-none"
                                            style={{
                                                background: `linear-gradient(to right, #395972 ${priceRange[1] / 300 * 100}%, #e2e8f0 0%)`,
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
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
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
