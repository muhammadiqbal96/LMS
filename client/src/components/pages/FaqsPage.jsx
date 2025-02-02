import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';

const FaqsPage = () => {
    const faqs = [
        {
            question: 'What is the LMS?',
            answer: 'Our Learning Management System (LMS) allows students to access and manage online courses and learning materials effectively.',
        },
        {
            question: 'How can I enroll in a course?',
            answer: 'To enroll in a course, simply browse through our course catalog, select your desired course, and click "Enroll".',
        },
        {
            question: 'Can I get a certificate after completing a course?',
            answer: 'Yes! After completing any course, you will receive a certificate of completion that you can share or print.',
        },
        {
            question: 'What if I forget my password?',
            answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions.',
        },
        {
            question: 'How do I contact support?',
            answer: 'You can contact our support team by emailing us at support@example.com or by filling out the contact form on our website.',
        },
        {
            question: 'Are there any prerequisites for the courses?',
            answer: 'Some courses may have prerequisites.  Please check the course description page for details.',
        },
        {
            question: 'How long do I have access to the courses?',
            answer: 'Typically, you will have access to the courses for a specified period.  Check the course information for details.',
        },
        {
            question: 'Can I access the courses on my mobile device?',
            answer: 'Yes! Our LMS is designed to be responsive, so you can access it on any device with an internet browser.',
        },
    ];

    return (
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 bg-gradient-to-b from-[#395972]/5 to-white rounded min-h-screen">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-2xl sm:text-3xl font-semibold text-[#395972] text-center mb-8">Frequently Asked Questions</h1>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-sm xxs:text-base">{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                
            </div>
        </main>
    );
};

export default FaqsPage;



