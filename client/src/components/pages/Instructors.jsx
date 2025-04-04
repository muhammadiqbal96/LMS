import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setInstructors } from "@/redux/instructorsSlice";
import { setLoading } from "@/redux/authSlice";
import { Link } from "react-router-dom";

export default function Instructors() {
    const dispatch = useDispatch();
    const instructors = useSelector((state) => state.instructors?.instructors || []);
    const loading = useSelector((state) => state.auth.loading);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [error, setError] = useState("");
    const [recentOnly, setRecentOnly] = useState(false);
    const [sortOption, setSortOption] = useState("newest");

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get(`${USER_API_END_POINT}/getInsrtuctors`, {
                    withCredentials: true,
                });

                if (response.data?.instructors) {
                    dispatch(setInstructors(response.data.instructors));
                } else {
                    setError("No instructors found.");
                }
            } catch (err) {
                setError("Error fetching instructors: " + err.message);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchInstructors();
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, recentOnly, sortOption]);

    const isRecent = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const daysDiff = (now - date) / (1000 * 60 * 60 * 24);
        return daysDiff <= 30;
    };

    let filteredInstructors = instructors.filter((instructor) =>
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (recentOnly) {
        filteredInstructors = filteredInstructors.filter((instructor) =>
            isRecent(instructor.createdAt)
        );
    }

    if (sortOption === "newest") {
        filteredInstructors.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    } else if (sortOption === "oldest") {
        filteredInstructors.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
    } else if (sortOption === "az") {
        filteredInstructors.sort((a, b) => a.name.localeCompare(b.name));
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredInstructors.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Navbar />
            <div className="lg:container lg:mx-auto px-4 py-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <Input
                            placeholder="Search any instructor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 sm:w-96"
                        />
                        <div className="flex items-center gap-4">
                            <Button
                                variant={recentOnly ? "default" : "outline"}
                                onClick={() => setRecentOnly((prev) => !prev)}
                            >
                                {recentOnly ? "Showing Recent" : "Recent Only"}
                            </Button>

                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 text-sm"
                            >
                                <option value="newest">Sort: Newest</option>
                                <option value="oldest">Sort: Oldest</option>
                                <option value="az">Sort: A-Z</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-center mt-10">Loading instructors...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {currentItems.length > 0 ? (
                                currentItems.map((instructor) => (
                                    <Card key={instructor._id} className="p-4 shadow-md hover:shadow-xl rounded-lg transition">
                                        <div className="flex flex-col items-center gap-4">
                                            <img
                                                src={instructor.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                                alt={instructor.name}
                                                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                                            />
                                            <div className="text-center">
                                                <h3 className="text-xl font-semibold">{instructor.name}</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Joined: {new Date(instructor.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-center">
                                            <Link to={`/instructor/course/${instructor._id}`}><Button variant="outline" className="w-full">
                                                View Courses
                                            </Button></Link>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div>No instructors found.</div>
                            )}
                        </div>
                    )}

                    {filteredInstructors.length > itemsPerPage && (
                        <div className="flex justify-center mt-8 gap-2 flex-wrap">
                            <Button
                                variant="outline"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
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
            <Footer />
        </>
    );
}
