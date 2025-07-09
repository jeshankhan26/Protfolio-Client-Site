import React, { useState } from 'react';

const Experience = () => {
    const [experience, setExperience] = useState([]);
    useState(() => {
        fetch('https://server-site-azure.vercel.app/addexperience')
            .then(res => res.json())
            .then(data => {
                setExperience(data);
                console.log(data);
            })
            .catch(err => console.error("Failed to fetch portfolio:", err));
    }, []);
    return (
        <>
        <div className='mb-20'>
            <h1 className='text-center text-red-500'>Experience</h1>
            <p className='text-center text-5xl font-bold mb-10'>My Experience</p>
            <div>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 md:px-20">
                    {
                        experience.map((item,index) => (
                            <div
                                key={index}
                                className=" shadow-lg rounded-xl  transition-transform transform hover:scale-105 hover:shadow-lg duration-300 w-full p-7"
                            >
                                <h2 className="text-2xl md:text-3xl font-semibold">{item.title}</h2>
                                <h2 className="text-2xl md:text-xl font-semibold">{item.institution}</h2>
                                <h2 className="text-2xl md:text-xl font-semibold">{item.year}</h2>
                                <p className='text-base md:text-lg mt-2'>{item.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
            
        </>
    );
};

export default Experience;