import { NavLink, useLoaderData } from 'react-router'; // Fixed import for React Router v6+
import { motion } from 'framer-motion';

const Projects = () => {
 const port =useLoaderData();

    return (
        <div className="py-20">
            <p className="text-center lg:text-5xl text-3xl font-bold mb-10">My Portfolio</p>
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
    );
};

export default Projects;
