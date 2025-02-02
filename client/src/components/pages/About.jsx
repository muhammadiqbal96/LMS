import React from 'react'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">

                <div className="mb-20 text-center">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Trusted by leading companies
                    </h3>
                    <div className="flex justify-around items-center">
                        <img
                            src="/company-logo-1.svg"
                            alt="Company 1"
                            className="h-16 opacity-70 hover:opacity-100 transition-opacity mt-2"
                        />
                        <img
                            src="/company-logo-2.svg"
                            alt="Company 2"
                            className="h-16 opacity-70 hover:opacity-100 transition-opacity"
                        />
                        <img
                            src="/company-logo-3.svg"
                            alt="Company 3"
                            className="h-20 opacity-70 hover:opacity-100 transition-opacity"
                        />
                        <img
                            src="/company-logo-4.svg"
                            alt="Company 4"
                            className="hidden sm:block h-9 opacity-70 hover:opacity-100 transition-opacity"
                        />
                        <img
                            src="/company-logo-5.svg"
                            alt="Company 5"
                            className="hidden md:block h-8 opacity-70 hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>


                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="relative rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                            alt="Learning community"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#395972]/40 to-transparent" />
                    </div>


                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Transforming Education Through
                            <span className="text-[#395972]"> Innovation</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            At EduFlow, we're redefining online learning by combining cutting-edge technology
                            with expert-led instruction. Our platform empowers learners worldwide to achieve
                            their goals through flexible, engaging, and career-relevant courses.
                        </p>


                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="text-center p-4">
                                <div className="text-2xl font-bold text-[#395972]">2500+</div>
                                <div className="text-sm text-gray-600">Courses Available</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-2xl font-bold text-[#395972]">98%</div>
                                <div className="text-sm text-gray-600">Completion Rate</div>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-2xl font-bold text-[#395972]">500K+</div>
                                <div className="text-sm text-gray-600">Global Learners</div>
                            </div>
                        </div>

                        <Button
                            asChild
                            className="mt-6 h-12 px-8 text-lg bg-[#395972] hover:bg-[#2d475e]"
                        >
                            <Link to="/about">
                                Learn More About Us
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}