import React, { useEffect, useState } from 'react';

const Education = () => {
    const [education, setEducation] = useState([]);
    
        useEffect(() => {
            fetch('https://server-site-azure.vercel.app/addeducation')
                .then(res => res.json())
                .then(data => {
                    setEducation(data);
                    console.log(data);
                })
                .catch(err => console.error("Failed to fetch portfolio:", err));
        }, []);
    return (
        <>
      <div className='px-4 md:px-20 py-10 '>
            <h1 className='text-center text-red-500 text-xl md:text-2xl'>Education</h1>
            <p className='text-center text-3xl md:text-5xl font-bold mb-10'>My Education</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-4 md:px-10">
                {education.map((item, index) => (
                    <div
                        key={index}
                        className="shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 duration-300 "
                    >
                        <h2 className="text-xl md:text-2xl font-semibold">{item.course_name}</h2>
                        <h3 className="text-lg md:text-xl font-medium mt-1">{item.institution}</h3>
                        <h4 className="text-md md:text-lg mt-1">{item.passing_year}</h4>
                        <p className='text-base mt-3'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
            
        </>
    );
};

export default Education;