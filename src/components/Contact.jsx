import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section id="contact" className="py-24 relative max-w-[600px] mx-auto min-h-[80vh] flex flex-col items-center justify-center text-center">
            <div className="container mx-auto px-6 sm:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-mint-base font-mono text-sm md:text-base mb-5 tracking-widest before:content-['03._'] font-normal">
                        What's Next?
                    </h2>

                    <h3 className="text-slate-light font-sans font-bold text-4xl sm:text-5xl md:text-6xl mb-6">
                        Get In Touch
                    </h3>

                    <p className="text-slate-base font-sans text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                        My inbox is always open. Whether you have a new project in mind, inquiries and proposals, or just want to connect, I'd love to hear from you!
                    </p>

                    <a
                        href="mailto:nasux1222@gmail.com?subject=Inquiry%20from%20Portfolio%20Website"
                        id="contact-btn"
                        className="btn-outline inline-block px-7 py-4 text-[14px] transition-all duration-300 hover:bg-mint-tint/20 hover:text-mint-base"
                    >
                        Say Hello
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
