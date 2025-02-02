import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            console.log('Message sent:', formData);
            toast.success('Message sent successfully!');

            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        }
    };

    return (
        <main className="flex-1 p-4 xs:p-6 sm:p-8 md:p-10 space-y-6 bg-gradient-to-b from-[#2c3e50]/5 to-white rounded min-h-screen">
            <div className="mx-auto md:max-w-3xl">
                <div className="bg-white rounded-lg shadow-md p-6 xs:p-8 sm:p-10">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#2c3e50] mb-4">Contact Us</h1>
                    <p className="mt-2 text-base sm:text-lg text-[#7f8c8d] mb-6">
                        {/* ... */}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2c3e50] focus:border-[#2c3e50]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2c3e50] focus:border-[#2c3e50]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2c3e50] focus:border-[#2c3e50]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#2c3e50] focus:border-[#2c3e50]"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-[#2c3e50] text-white px-6 py-2 rounded-md hover:bg-[#34495e] transition duration-300"
                            >
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;