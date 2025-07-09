import React from 'react';
import { useLoaderData } from 'react-router'; // ✅ use `react-router-dom` not just `react-router`
import Swal from 'sweetalert2';

const EditSkill = () => {
  const data = useLoaderData();

  const handleform = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedSkill = {
      name: form.name.value,
    };

    fetch(`https://server-site-azure.vercel.app/addskill/${data._id}`, {
      method: "PUT", // 👈 Use PUT for editing
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSkill),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0 || result.success) {
          Swal.fire({
            title: "Skill Updated Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.href = "/dashboard/allskill";
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
          Edit Skill
        </h1>
        <form className="space-y-4" onSubmit={handleform}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Skill</span>
            </label>
            <input
              type="text"
              placeholder="Laravel/React"
              name="name"
              defaultValue={data.name}
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSkill;
