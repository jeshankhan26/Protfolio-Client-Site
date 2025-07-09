import React, { useState } from 'react';
import Hero from '../../Components/Front/Hero';
import Services from '../../Components/Front/Services';
import Feathers from '../../Components/Front/Feathers';
import Education from '../../Components/Front/Education';
import Skills from '../../Components/Front/Skills';
import Experience from '../../Components/Front/Experience';
import Portfolio from '../../Components/Front/Portfolio';
import Contact from '../../Components/Front/Contact';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
     const [activeSection, setActiveSection] = useState('education');
     const buttonVariants = {
    hover: {
      scale: 1.05,
      color: '#ef4444',
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
    return (
        <>
            <Hero></Hero>
            <Feathers></Feathers>
           <div>
       <div>
      <motion.h1
        className="text-center text-red-500 text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        2+ Years of Experience
      </motion.h1>

      <motion.p
        className="text-center text-4xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        My Resume
      </motion.p>
    </div>

      <div className="grid md:grid-cols-3 justify-center mt-10 gap-4">
        {['education', 'skills', 'experience'].map((section) => (
          <motion.button
            key={section}
            className="btn bg-white text-black border-none shadow-lg text-2xl py-7 px-6"
            whileHover="hover"
            variants={buttonVariants}
            onClick={() => setActiveSection(section)}
          >
            {section === 'education' && 'Education'}
            {section === 'skills' && 'Profession Skill'}
            {section === 'experience' && 'Experience'}
          </motion.button>
        ))}
      </div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          {activeSection === 'education' && (
            <motion.div
              key="education"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Education />
            </motion.div>
          )}
          {activeSection === 'skills' && (
            <motion.div
              key="skills"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Skills />
            </motion.div>
          )}
          {activeSection === 'experience' && (
            <motion.div
              key="experience"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <Experience />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    <Portfolio></Portfolio>
    <Contact></Contact>
        </>
    );
};

export default Home;