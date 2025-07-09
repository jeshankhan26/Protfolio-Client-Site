import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const Feathers = () => {
    const [feathers, setFeathers] = useState([]);

    useEffect(() => {
        fetch('https://server-site-azure.vercel.app/addfeather')
            .then(res => res.json())
            .then(data => setFeathers(data))
            .catch(err => console.error("Failed to fetch feathers:", err));
    }, []);

    return (
        <div className='px-4 md:px-20 py-10'>
            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <p className='text-red-500'>Features</p>
                <h1 className='text-3xl md:text-5xl font-bold'>What I Do</h1>
            </motion.div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {
                    feathers.map((feather, index) => (
                        <motion.div
                            key={feather.id || index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                        >
                            <div className="shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 w-full bg-white">
                                <h2 className="text-2xl md:text-3xl font-semibold">
                                    {feather.title || "Unnamed Feature"}
                                </h2>
                                <p className='text-base md:text-lg mt-2'>
                                    {feather.subtitle || "No description available."}
                                </p>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default Feathers;
