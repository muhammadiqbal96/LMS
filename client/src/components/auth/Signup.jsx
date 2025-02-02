import { Link, useNavigate } from "react-router-dom";
import { Rocket, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import Loader from "../shared/Loader";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email!");
      return;
    }
    
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
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
    <>
      {loading && <Loader />}
      <div>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-[#395972]/5 to-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-[auto_minmax(33vw,1fr)] gap-8 items-center">
                {/* Illustration Section */}
                <div className="hidden md:block max-w-[280px] lg:max-w-[40vw]">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#395972]/10 p-6">
                    <img
                      src="/signup-illustration.png"
                      alt="People collaborating on digital devices"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 p-4 rounded-xl shadow-lg">
                      <div className="flex items-center gap-3">
                        <Rocket className="h-7 w-7 text-[#395972]" />
                        <div>
                          <h3 className="text-base font-semibold text-gray-800">
                            Start Your Journey
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            Join our community of learners and educators
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signup Form Section */}
                <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100 w-full min-w-[33vw]">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Join <span className="text-[#395972]">EduFlow</span>
                    </h1>
                    <p className="text-gray-600">
                      Create your account to start your educational journey
                    </p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        required
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2 text-gray-500 hover:text-[#395972]"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          autoComplete="new-password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2 text-gray-500 hover:text-[#395972]"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Role
                      </Label>
                      <RadioGroup
                        value={formData.role}
                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                        className="flex gap-4"
                      >
                        {["student", "instructor"].map((role) => (
                          <div key={role} className="flex items-center">
                            <RadioGroupItem
                              value={role}
                              id={`role-${role}`}
                              className="text-[#395972]"
                            />
                            <Label
                              htmlFor={`role-${role}`}
                              className="ml-2 text-sm text-gray-700 capitalize"
                            >
                              {role}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#395972] hover:bg-[#2d475e] text-white py-6 text-lg"
                    >
                      Create Account
                    </Button>

                    <div className="text-center text-sm text-gray-600 mt-6">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-[#395972] hover:text-[#2d475e] font-medium"
                      >
                        Sign in
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}