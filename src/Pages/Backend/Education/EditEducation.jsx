import React from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const EditEducation = () => {
  const data = useLoaderData();

  const handleform = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedEducation = {
      degree: form.degree.value,
      institution: form.institution.value,
      year: form.year.value,
      description: form.description.value,
    };

    fetch(`https://server-site-azure.vercel.app/addeducation/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEducation),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0 || result.success) {
          Swal.fire({
            title: "Education Updated Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.href = "/dashboard/alleducation";
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
          Add Feather
        </h1>
        <form className="space-y-4" onSubmit={handleform}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Degree</span>
            </label>
            <input
              type="text"
              placeholder="Scc"
              name="degree"
              defaultValue={data.degree}
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
              placeholder="Jalalabad College"
              name="institution"
              defaultValue={data.institution}
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Passing Year</span>
            </label>
            <input
              type="text"
              placeholder="2019"
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
              defaultValue={data.description}
              className="textarea bg-white input-bordered input-primary w-full h-24"
              name="description"
              placeholder="Short Description"
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

export default EditEducation;
