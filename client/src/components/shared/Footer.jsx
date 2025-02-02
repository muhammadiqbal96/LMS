import { Link } from "react-router-dom";
import { Mail, Clock, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
    return (
        <footer className="bg-[#395972]/95 backdrop-blur-md border-t border-[#2a4357]/10">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Column 1 - Brand Info */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/flow.png"
                                alt="EduFlow Logo"
                                className="h-8 w-10 transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                EduFlow
                            </span>
                        </Link>
                        <p className="text-gray-200 text-sm leading-relaxed">
                            Empowering lifelong learners through interactive education and expert-led courses.
                        </p>
                        <div className="flex items-center gap-2 text-gray-200">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Mon-Fri: 9AM - 5PM</span>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                        <nav className="space-y-2">
                            <Link to="/" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                Home
                            </Link>
                            <Link to="/courses" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                Courses
                            </Link>
                            <Link to="/instructors" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                Instructors
                            </Link>
                            <Link to="/about" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                About Us
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3 - Resources */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold mb-3">Resources</h3>
                        <nav className="space-y-2">
                            <Link to="/blog" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                Blog
                            </Link>
                            <Link to="/docs" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                Documentation
                            </Link>
                            <Link to="/help" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                Help Center
                            </Link>
                            <Link to="/contact" className="block text-gray-200 hover:text-white transition-colors text-sm">
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Column 4 - Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
                        <form className="space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 text-md md:text-sm lg:text-base"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-white text-[#395972] hover:bg-gray-100 font-medium flex items-center justify-center gap-2"
                            >
                                <Mail className="h-4 w-4" />
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/20 pt-8 md:pt-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-200 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-200 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-200 hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-200 hover:text-white transition-colors">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap items-center gap-4 text-center">
                            <Link to="/privacy" className="text-gray-200 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-gray-200 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-gray-200 hover:text-white text-sm transition-colors">
                                Cookie Settings
                            </Link>
                        </div>

                        {/* Copyright */}
                        <p className="text-gray-300 text-sm">
                            © {new Date().getFullYear()} EduFlow. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}