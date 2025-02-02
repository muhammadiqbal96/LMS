import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Edit, Lock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "../ui/dialog";
import { setLoading, setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

function AccountSettings() {
    const { user } = useSelector(store => store.auth);
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.profile?.phoneNumber || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: ""
    });

    const [currentpassword, setcurrentpassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const handlePasswordChange = async () => {
        if (!isPasswordValid(password)) {
            toast.error("Password must be at least 8 characters long!");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append("currentpassword", currentpassword);
        formData.append("newpassword", password);
        try {
            dispatch(setLoading(true));
            const res = await axios.put(`${USER_API_END_POINT}/update/password`, formData, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
            setIsChangePasswordDialogOpen(false);
        }
    };

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleProfileUpdate = async () => {
        if (!validateEmail(input.email)) {
            toast.error("Please enter a valid email!");
            return;
        }
    
        try {
            dispatch(setLoading(true));
    
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber || "");
            formData.append("skills", input.skills || "");
            
            if (input.file) {
                formData.append("file", input.file);
            }
    
            const res = await axios.put(`${USER_API_END_POINT}/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" }, 
                withCredentials: true,
            });
    
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error updating profile.");
        } finally {
            dispatch(setLoading(false));
            setIsEditProfileDialogOpen(false);
        }
    };    

    const handleAccountDelete = () => {
        toast.info("Your account will be deleted.");
    };

    return (
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#395972]/5 to-white rounded min-h-screen">
            <div className="container mx-auto max-w-3xl">

                <div className="relative mb-8">
                    <div
                        className="w-full h-40 bg-gradient-to-b from-[#395972] via-[#395972] to-[#284254] bg-pattern rounded"
                        style={{
                            backgroundImage: "url('https://t4.ftcdn.net/jpg/02/98/89/07/240_F_298890723_gxZy7ljKF1pvZcGTpxxUEKPmVXoF2eCZ.jpg')",
                            backgroundSize: 'contain',
                            backgroundPosition: "center"
                        }}
                    >
                        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center space-x-4">
                            <img
                                src={user.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                alt="User Avatar"
                                className="rounded-full w-24 h-24 sm:w-20 sm:h-20 border-4 border-white object-cover"
                            />
                            <div className="text-white">
                                <p className="font-extrabold">{user.name}</p>
                                <p className="text-sm font-mono">{user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="mb-8 border border-gray-200 shadow-lg rounded-lg bg-white">
                    <CardHeader className="flex items-center space-x-3 p-5">
                        <Edit className="text-[#395972] w-7 h-7" />
                        <CardTitle className="text-lg font-semibold">Profile Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <p className="text-sm text-muted-foreground">{user.name}</p>
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>

                        <Button
                            className="bg-[#395972] text-white py-2 px-6 rounded-lg mt-4"
                            onClick={() => setIsEditProfileDialogOpen(true)}
                        >
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-lg rounded-lg bg-white mb-3">
                    <CardHeader className="flex items-center space-x-3 p-5">
                        <Lock className="text-[#395972] w-7 h-7" />
                        <CardTitle className="text-lg font-semibold">Change Password</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Button
                            className="bg-[#395972] text-white py-2 px-4 rounded-lg mt-4"
                            onClick={() => setIsChangePasswordDialogOpen(true)}
                        >
                            Change Password
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-lg rounded-lg bg-white">
                    <CardHeader className="flex items-center space-x-3 p-5">
                        <Trash2 className="text-red-500 w-7 h-7" />
                        <CardTitle className="text-lg font-semibold text-red-500">Delete Account</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="text-sm text-gray-600">This action will permanently delete your account. Are you sure?</p>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="bg-red-500 text-white py-3 px-5 rounded-lg mt-4 hover:bg-red-600 transition-all duration-300">
                                    Delete Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleAccountDelete}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>

                <Dialog open={isEditProfileDialogOpen} onOpenChange={setIsEditProfileDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="e.g., +923249125257"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label htmlFor="skills">Skills</Label>
                            <Input
                                type="text"
                                id="skills"
                                name="skills"
                                placeholder="e.g., Programming, Marketing"
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label htmlFor="file">Profile Photo</Label>
                            <Input
                                type="file"
                                id="file"
                                name="file"
                                onChange={changeFileHandler}
                            />
                        </div>
                        <Button onClick={handleProfileUpdate} disabled={loading}>
                            {loading ? "Updating..." : "Save Changes"}
                        </Button>
                    </DialogContent>
                </Dialog>

                <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
                    <DialogContent>
                        <DialogTitle>Change Password</DialogTitle>
                        <div>
                            <Label htmlFor="currPassword">Current Password</Label>
                            <Input
                                id="currPassword"
                                name="currPassword"
                                type="password"
                                value={currentpassword}
                                onChange={e => setcurrentpassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button onClick={handlePasswordChange}>Change Password</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
    );
}

export default AccountSettings;