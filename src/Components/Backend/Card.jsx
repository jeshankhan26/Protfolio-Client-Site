import React, { useEffect, useState } from 'react';

const Card = () => {
    const [skill,setskill]=useState(0)

   useEffect(() => {
    fetch("https://server-site-gamma-roan.vercel.app/addskill")
      .then((res) => res.json())  // parse JSON from response
      .then((data) => {
        setskill(data);  // set the fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching skill:", error);
      });
  }, []);  // empty dependency array to run once on mount
    return (
        <div className=" mx-auto px-4 py-8 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
      
      {/* Skill Card */}
      <div className="card bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Skills</h2>
          <p className="text-5xl font-extrabold">{skill.length}</p>
          <p className="opacity-80">Number of skills you have</p>
        </div>
      </div>

      {/* Project Card */}
      <div className="card bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Projects</h2>
          <p className="text-5xl font-extrabold">32</p>
          <p className="opacity-80">Projects completed</p>
        </div>
      </div>

      {/* Service Card */}
      <div className="card bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Services</h2>
          <p className="text-5xl font-extrabold">12</p>
          <p className="opacity-80">Services offered</p>
        </div>
      </div>

    </div>
    );
};

export default Card;