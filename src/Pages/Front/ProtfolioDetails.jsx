import React from 'react';
import { useLoaderData } from 'react-router';

const PortfolioDetails = () => {
  const data = useLoaderData();
  console.log(data) 
  


  return (
         <div className="p-10 bg-base-500">
      {/* Main container */}
      <div className="max-w-5xl mx-auto bg-base-500 shadow-lg rounded-xl p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold ">{data.title}</h1>
          <p className="text-lg  mt-2">{data.subtitle}</p>
        </div>
        {/* Main Thumbnail */}
        <div className="mt-8 text-center">
          <div className="w-full h-96 mt-4 rounded-lg overflow-hidden">
            <img src={data.thumbnail} alt="Main Thumbnail" className="object-cover w-full h-full" />
          </div>
        </div>
        
        {/* Client and Date Section */}
        <div className="flex justify-between items-center">
          <div className="text-sm ">
            <p><strong>Client:</strong> {data.clientName}</p>
            <p><strong>Date:</strong> {data.date}</p>
          </div>
          <div className="text-sm ">
            <p><strong>Service:</strong> {data.service}</p>
            <p><strong>Budget:</strong> {data.budget}</p>
          </div>
        </div>
        
        {/* Short Description */}
        <div>
          <h2 className="text-2xl font-semibold ">Short Description</h2>
          <p className=" mt-2">{data.shortDescription}</p>
        </div>
        
        {/* Strategy and Design */}
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-semibold ">Strategy</h2>
            <p className=" mt-2">{data.strategy}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold ">Design</h2>
            <p className=" mt-2">{data.design}</p>
          </div>
          {/* User Experience */}
        <div>
          <h2 className="text-2xl font-semibold ">User Experience</h2>
          <p className=" mt-2">{data.userExperience}</p>
        </div>
        </div>
        
        

        {/* Long Description */}
        <div>
          <h2 className="text-2xl font-semibold ">Long Description</h2>
          <p className=" mt-2">{data.longDescription}</p>
        </div>

        {/* Image Gallery */}
        <div>
          <h2 className="text-2xl font-semibold ">Images</h2>
          <div className="grid gap-4 mt-4">
            {data.images?.map((image, index) => (
              <div key={index} className="w-full h-96 mt-4 rounded-lg overflow-hidden">
                <img src={image} alt={`image-${index}`} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        

        {/* Live View Link */}
        <div className="mt-8 text-center">
          <a
            href={data.liveView}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-6 py-3 rounded-lg  font-semibold transition duration-300 hover:bg-blue-600"
          >
            View Live Project / Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
