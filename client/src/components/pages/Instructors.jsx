import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Card } from "../ui/card";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Label } from "../ui/label";

export default function Instructors() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [ratingRange, setRatingRange] = useState([0, 5]);
    const [courseRange, setCourseRange] = useState([0, 40]);
    const [visibleCategories, setVisibleCategories] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const categories = [
        "UI & UX",
        "Animation",
        "Typography",
        "Web Development",
        "Photography",
        "Game Design",
        "Illustration",
        "Graphic Design"
    ];

    const instructors = [
        ...Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `Instructor ${i + 1}`,
            rating: Math.random() * 5,
            courses: Math.floor(Math.random() * 40),
            students: Math.floor(Math.random() * 500),
            category: [categories[Math.floor(Math.random() * categories.length)]],
            profile: "https://kahubi.com/wp-content/uploads/2022/03/team_4-1.jpg"
        }))
    ];

    const filteredInstructors = instructors.filter(instructor => {
        const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length > 0
            ? instructor.category.some(cat => selectedCategories.includes(cat))
            : true;
        const matchesRating = instructor.rating >= ratingRange[0] && instructor.rating <= ratingRange[1];
        const matchesCourses = instructor.courses >= courseRange[0] && instructor.courses <= courseRange[1];

        return matchesSearch && matchesCategory && matchesRating && matchesCourses;
    });


    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategories, ratingRange, courseRange]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInstructors.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Navbar />
            <div className="lg:container lg:mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    <div className="w-full md:w-72">
                        <Card className="p-6">
                            <div className="mb-6">
                                <Input
                                    placeholder="Search any instructor..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-12"
                                />
                            </div>


                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-semibold mb-4">CATEGORY</h3>
                                <div className="space-y-3">
                                    {categories.slice(0, visibleCategories).map(category => (
                                        <div key={category} className="flex items-center gap-3">
                                            <Checkbox
                                                id={`cat-${category}`}
                                                checked={selectedCategories.includes(category)}
                                                onCheckedChange={() => handleCategoryChange(category)}
                                            />
                                            <Label htmlFor={`cat-${category}`} className="text-sm">
                                                {category}
                                            </Label>
                                        </div>
                                    ))}
                                    {categories.length > visibleCategories && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-blue-600 pl-0"
                                            onClick={() => setVisibleCategories(prev => prev + 5)}
                                        >
                                            Show More
                                        </Button>
                                    )}
                                </div>
                            </div>


                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-semibold mb-4">RATINGS</h3>
                                <div className="space-y-4">
                                    <Slider
                                        min={0}
                                        max={5}
                                        step={0.1}
                                        value={ratingRange}
                                        onValueChange={setRatingRange}
                                    />
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>{ratingRange[0].toFixed(1)}</span>
                                        <span>{ratingRange[1].toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>


                            <div className="mb-6">
                                <h3 className="font-semibold mb-4">Number of Courses</h3>
                                <div className="space-y-4">
                                    <Slider
                                        min={0}
                                        max={40}
                                        step={1}
                                        value={courseRange}
                                        onValueChange={setCourseRange}
                                    />
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>{courseRange[0]}</span>
                                        <span>{courseRange[1]}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex-1">
                        <div className="grid gap-6">
                            {currentItems.map(instructor => (
                                <Card key={instructor.id} className="p-6">
                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <img
                                            src={instructor.profile}
                                            alt={instructor.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-xl font-semibold whitespace-nowrap">{instructor.name}</h3>
                                            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
                                                <span>⭐ {instructor.rating.toFixed(1)}</span>
                                                <span>{instructor.courses} Courses</span>
                                                <span>{instructor.students} Students</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                                                {instructor.category.map(cat => (
                                                    <span
                                                        key={cat}
                                                        className="px-3 py-1 bg-muted rounded text-sm whitespace-nowrap"
                                                    >
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <Button variant="outline" className="mt-4 sm:mt-0">
                                            View Courses
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {filteredInstructors.length > itemsPerPage && (
                            <div className="flex justify-center mt-8 gap-2 flex-wrap">
                                <Button
                                    variant="outline"
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                    <Button
                                        key={number}
                                        variant={currentPage === number ? "default" : "outline"}
                                        onClick={() => paginate(number)}
                                    >
                                        {number}
                                    </Button>
                                ))}

                                <Button
                                    variant="outline"
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}