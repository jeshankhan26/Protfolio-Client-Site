import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const EditExperience = () => {
  const data = useLoaderData();

  const handleform = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedExperience = Object.fromEntries(formData.entries());

    console.log("Sending data:", updatedExperience);

    fetch(`https://server-site-azure.vercel.app/addexperience/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExperience),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Server Response:", result);
        if (result.modifiedCount > 0 || result.success) {
          Swal.fire({
            title: "Experience Updated Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.href = "/dashboard/allexperience";
          });
        } else {
          Swal.fire({
            title: "No Changes Made",
            icon: "info",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-coffee text-center mb-6">
          Add Experience
        </h1>
        <form className="space-y-4" onSubmit={handleform}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Title</span>
            </label>
            <input
              type="text"
              placeholder="Smm"
              name="title"
              defaultValue={data.title}
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Institution Name</span>
            </label>
            <input
              type="text"
              placeholder="Opstel IT"
              name="institution"
              defaultValue={data.institution}
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Experience Duration</span>
            </label>
            <input
              type="text"
              placeholder="6 month+"
              name="year"
              defaultValue={data.year}
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Description</span>
            </label>
            <textarea
              className="textarea bg-white input-bordered input-primary w-full h-24"
              name="description"
              placeholder="Short Description"
              defaultValue={data.description}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExperience;
