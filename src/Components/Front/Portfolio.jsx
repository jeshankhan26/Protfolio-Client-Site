import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';

const PortfolioCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
    >
      <div className="shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg duration-300 w-full bg-white">
        <img src={item.thumbnail} alt="Portfolio Thumbnail" className="rounded-lg mb-4" />
        <h2 className="text-2xl md:text-3xl font-semibold">{item.title}</h2>
        <p className="text-base md:text-lg mt-2">{item.shortDescription}</p>
        <div className="flex justify-end mt-4">
          <NavLink to={`/details/${item._id}`} className="btn btn-primary">
            View More
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [port, setPortfolio] = useState([]);

  useEffect(() => {
    fetch('https://server-site-azure.vercel.app/addprotfolio')
      .then(res => res.json())
      .then(data => {
        setPortfolio(data);
        console.log(data);
      })
      .catch(err => console.error("Failed to fetch portfolio:", err));
  }, []);

  return (
    <div className="py-10 bg-gray-50">
      <h1 className="text-center text-red-500">Visit my portfolio and keep your feedback</h1>
      <p className="text-center lg:text-5xl text-3xl font-bold mb-10">My Portfolio</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 md:px-20">
        {
          port.slice(0, 3).map((item, index) => (
            <PortfolioCard key={item.id || index} item={item} index={index} />
          ))
        }
      </div>
    </div>
  );
};

export default Portfolio;
