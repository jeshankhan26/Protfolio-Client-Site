import React, { useEffect, useState } from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const Contact = () => {
  const [about, setUser] = useState(null);
  console.log(about);
  useEffect(() => {
    fetch("https://server-site-azure.vercel.app/adduser")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[0]); // ✅ only set the first user
        } else {
          console.warn("No user data found");
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <p className="text-pink-500 uppercase text-sm mb-2">Contact</p>
        <h2 className="lg:text-4xl text-3xl font-bold mb-10">
          Contact With Me
        </h2>
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* Left Side - Profile Card */}
          <motion.div
            className="rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://i.ibb.co.com/M5Myrcsg/contact1.png"
              alt="Handshake"
              className="rounded-md mb-4 block mx-auto"
            />

            <h3 className="text-xl font-bold mb-1">{about?.name}</h3>
            <p className="text-sm mb-4">CEO</p>
            <p className="text-sm mb-4">
              I am available for freelance work. Connect with me via and call in
              to my account.
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span> {about?.number}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Email:</span>{" "}
              {about?.professional_email}
            </p>
            <p className="text-sm mb-2">Find with me</p>
            <div className="flex gap-4">
              <NavLink
                to={about?.github}
                className="btn btn-square bg-white border-none"
              >
                <FaGithub className="w-[30px] h-[20px] text-black shadow-2xl" />
              </NavLink>
              <NavLink
                to={about?.facebook}
                className="btn btn-square bg-white border-none"
              >
                <BiLogoFacebook className="w-[30px] h-[30px] text-black shadow-2xl" />
              </NavLink>
              <NavLink
                to={about?.linkdln}
                className="btn btn-square bg-white border-none"
              >
                <FaLinkedinIn className="w-[30px] h-[20px] text-black shadow-2xl" />
              </NavLink>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label>Your Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="bg-white border-blue-500 input input-bordered w-full"
                  />
                </div>
                <div>
                  <label>Your Phone</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="bg-white border-blue-500 input input-bordered w-full"
                  />
                </div>
              </div>
              <label>Your E-mail</label>
              <input
                type="email"
                placeholder="Email"
                className="bg-white border-blue-500 input input-bordered w-full"
              />
              <label>Enter Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="bg-white border-blue-500 input input-bordered w-full"
              />
              <label>Enter Your Message</label>
              <textarea
                className="textarea textarea-bordered bg-white border-blue-500 w-full h-32"
                placeholder="Your Message"
              ></textarea>
              <button className="btn btn-primary w-full h-15">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
