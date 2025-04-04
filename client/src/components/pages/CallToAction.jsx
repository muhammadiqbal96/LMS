import { CheckCircle, Rocket } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function CallToAction() {
    return (
        <section className="py-16 bg-[#395972]">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <Rocket className="h-12 w-12 text-white mb-6 mx-auto" />
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Start Your Learning Journey Today
                    </h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Join thousands of students advancing their careers with our 
                        comprehensive courses and expert instructors.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {['Expert-Led Content', 'Flexible Learning', 'Practical Projects'].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-400" />
                                <span className="text-gray-200 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 justify-center">
                       <Link to={"/courses"}> <Button 
                            className="bg-white text-[#395972] hover:bg-gray-100 px-4 py-3 sm:px-8 sm:py-6 text-sm md:text-md lg:text-lg"
                            size="lg"
                        >
                            Explore All Courses
                        </Button></Link>
                        <Button 
                            className="bg-white text-[#395972] hover:bg-gray-100 px-4 py-3 sm:px-8 sm:py-6 text-sm md:text-md lg:text-lg"
                            size="lg"
                        >
                            How It Works
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}