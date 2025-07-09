import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Basic",
    features: ["Front-End", "Html", "Css", "Javascript"],
    unavailable: ["React", "Node.JS", "Express.JS", "MongoDB", "Firebase"],
  },
  {
    name: "Standard",
    features: ["Front-End", "Html", "Css", "Javascript", "React"],
    unavailable: ["Node.JS", "Express.JS", "MongoDB", "Firebase"],
  },
  {
    name: "Premium",
    features: ["Front-End", "Html", "Css", "Javascript", "React", "Node.JS", "Express.JS", "MongoDB", "Firebase"],
    unavailable: [],
  },
];

const Services = () => {
  return (
    <div className="px-6 py-10 lg:mx-30">
      <motion.h1
        className="lg:text-5xl text-3xl text-center pb-10 font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Services I Provide for My Clients
      </motion.h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 justify-items-center">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className="card w-full shadow-2xl border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
          >
            <div className="card-body">
              <h2 className="text-center text-3xl font-bold">{plan.name}</h2>
              <ul className="mt-6 flex flex-col gap-2 text-sm">
                {plan.features.map((item) => (
                  <li key={item} className="text-success">
                    ✅ <span>{item}</span>
                  </li>
                ))}
                {plan.unavailable.map((item) => (
                  <li key={item} className="text-gray-400 line-through">
                    ❌ <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary mt-6 btn-block">Subscribe</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
