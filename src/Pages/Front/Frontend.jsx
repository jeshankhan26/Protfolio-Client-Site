import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router'; // Use 'react-router-dom' not 'react-router'
import { motion } from 'framer-motion';

const Frontend = () => {
    const [port, setPortfolio] = useState([]);

    useEffect(() => {
        fetch('https://server-site-azure.vercel.app/addprotfolio')
            .then(res => res.json())
            .then(data => {
                const filteredData = data.filter(item => item.skill === 'React');
                setPortfolio(filteredData);
                console.log(filteredData);
            })
            .catch(err => console.error("Failed to fetch portfolio:", err));
    }, []);

    return (
        <>
            <div className="py-20">
                <motion.p
                    className='text-center lg:text-5xl text-3xl font-bold mb-10'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Frontend Portfolio
                </motion.p>
                <motion.p
                    className='text-center text-xl mb-10'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    React Project without any server or backend part (CRUD Operation)
                </motion.p>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 md:px-20">
                {
                    port.map((item, index) => (
                        <motion.div
                            key={index}
                            className="shadow-lg rounded-xl p-6 w-full bg-white"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
                        >
                            <img src={item.thumbnail} alt={item.title} className="rounded-lg mb-4 w-full h-48 object-cover" />
                            <h2 className="text-2xl md:text-3xl font-semibold">{item.title}</h2>
                            <p className="md:text-lg mt-2">{item.shortDescription}</p>
                            <div className="flex justify-end mt-4">
                                <NavLink to={`/details/${item._id}`} className="btn btn-primary">
                                    View More
                                </NavLink>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
            </div>
        </>
    );
};

export default Frontend;
