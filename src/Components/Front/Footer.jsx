import React, { useEffect, useRef, useState } from 'react';
import { MdDeveloperMode } from "react-icons/md";
import { NavLink } from 'react-router';
import { BiLogoFacebook } from "react-icons/bi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const [about, setAbout] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Fetch data
  useEffect(() => {
    fetch("https://server-site-azure.vercel.app/adduser")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAbout(data[0]);
        } else {
          console.warn("No user data found");
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  const {
    name = "Jeshan Khan",
    email,
    phone,
    address,
    description,
    website,
  } = about || {};

  return (
    <motion.footer
      ref={ref}
      className="footer sm:footer-horizontal p-10 bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <MdDeveloperMode size={40} className="text-blue-600" />
        <p className="text-sm text-gray-700 mt-2">
          <strong>{name}</strong>
          <br />
          {description && <span>{description}</span>}
          <br />
          {email && <span>Email: {email}</span>} <br />
          {phone && <span>Phone: {phone}</span>} <br />
          {address && <span>Address: {address}</span>} <br />
          {website && <a href={website} className="text-blue-500" target="_blank" rel="noreferrer">Website</a>}
        </p>
      </motion.aside>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="flex gap-4">

          {/* GitHub */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <NavLink
              to={about?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-square bg-white border-none"
            >
              <FaGithub className="w-[30px] h-[20px] text-black shadow-2xl" />
            </NavLink>
          </motion.div>

          {/* Facebook */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <NavLink
              to={about?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-square bg-white border-none"
            >
              <BiLogoFacebook className="w-[30px] h-[30px] text-black shadow-2xl" />
            </NavLink>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <NavLink
              to={about?.linkdln}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-square bg-white border-none"
            >
              <FaLinkedinIn className="w-[30px] h-[20px] text-black shadow-2xl" />
            </NavLink>
          </motion.div>

        </div>
      </nav>
    </motion.footer>
  );
};

export default Footer;
