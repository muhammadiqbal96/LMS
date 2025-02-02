import { Link } from "react-router-dom";
import { PlayCircle, Rocket, ShieldCheck, Clock, Award } from "lucide-react";
import { Button } from "../ui/button";

function HeroSection() {
    return (
        <section className="relative bg-gradient-to-b from-[#395972]/5 to-white">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Unlock Your
                            <span className="bg-gradient-to-r from-[#395972] to-[#2a4357] bg-clip-text text-transparent">
                                {" "}Potential{" "}
                            </span>
                            with Interactive Learning
                        </h1>

                        <p className="text-lg text-gray-600 md:pr-8">
                            Join thousands of learners worldwide mastering new skills through our comprehensive courses and expert-led instruction.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                asChild
                                className="h-12 px-8 text-lg bg-[#395972] hover:bg-[#2d475e] transition-colors shadow-lg hover:shadow-xl"
                            >
                                <Link to="/courses">
                                    <Rocket className="mr-2 h-5 w-5" />
                                    Start Learning Now
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-12 px-8 text-lg border-gray-300 hover:border-[#395972] text-gray-700 hover:text-[#395972]"
                            >
                                <PlayCircle className="mr-2 h-5 w-5" />
                                Watch Demo
                            </Button>
                        </div>


                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-[#395972]" />
                                <span className="text-sm font-medium text-gray-600">Certified Courses</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-[#395972]" />
                                <span className="text-sm font-medium text-gray-600">Self-Paced Learning</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-[#395972]" />
                                <span className="text-sm font-medium text-gray-600">Expert Instructors</span>
                            </div>
                        </div>
                    </div>


                    <div className="md:w-1/2 md:mb-44 lg:mb-0">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/hero.jpg"
                                alt="Students learning online"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#395972]/30 to-transparent" />

                            {/* Floating Stats Card */}
                            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#395972]/10 p-2 rounded-lg">
                                        <Award className="h-6 w-6 text-[#395972]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Certified Students</p>
                                        <p className="text-xl font-bold text-gray-900">250K+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="absolute -bottom-1 left-0 right-0">
                <svg
                    viewBox="0 0 1440 100"
                    fill="none"
                    className="text-white w-full h-16 md:h-24"
                >
                    <path
                        d="M0 24.9999C0 24.9999 287 99 720 99C1153 99 1440 24.9999 1440 24.9999V100H0V24.9999Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </section>
    );
}

export default HeroSection;