import React, { useEffect, useState } from 'react';
import { FaDownload } from "react-icons/fa6";
import { motion } from "framer-motion";
import { NavLink } from 'react-router';

const Hero = () => {
  const words = ["Laravel Developer", "React Developer"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && subIndex === words[index].length) {
        setTimeout(() => setIsDeleting(true), 1000);
        return;
      }

      if (isDeleting && subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index]);

  return (
    <div className="hero">
      <div className="lg:hero-content flex-col lg:flex-row-reverse lg:gap-50">
        {/* Animate Image from Left */}
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          src="https://i.ibb.co/HTWCPMzY/My-1-removebg-preview.png"
          className="lg:max-w-lg md:max-w-md max-w-sm  rounded-lg shadow-2xl"
        />

        {/* Animate Text Content from Right */}
        <motion.div
          className="pt-3 md:pt-0 pl-5 md:pl-0"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <h1 className="lg:text-7xl text-5xl font-bold">
            Hello I'm <br />Jeshan Khan
          </h1>
          <p className="lg:py-6 py-2 text-3xl">
            <span className="font-semibold h-14">
              a <span className="text-red-500">
                <motion.span
                  key={index}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {words[index].substring(0, subIndex)}
                  <span className="animate-pulse">|</span>
                </motion.span>
              </span>
            </span>
          </p>
          <NavLink to={'https://drive.google.com/file/d/14ULJV4jOwJnWWU33rmokdP06DM3FIIZX/view?usp=drive_link'} target='_blank' className="btn bg-white heartbeat ml-5 lg:ml-0 text-gray-600 border-gray-600 rounded-3xl lg:text-xl lg:py-6 lg:px-8">
            Get Resume <FaDownload />
          </NavLink>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
