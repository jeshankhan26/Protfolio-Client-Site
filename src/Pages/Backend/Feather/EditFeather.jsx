import React from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const EditFeather = () => {
  const data = useLoaderData();

  const handleform = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const featherform = Object.fromEntries(formData.entries());

    console.log("Sending data:", featherform);

    // Correct the API endpoint to match your backend
    fetch(`https://server-site-azure.vercel.app/addfeather/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featherform),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update feather");
        }
        return res.json();
      })
      .then((resData) => {
        console.log("Server Response:", resData);
        if (resData.modifiedCount > 0 || resData.success) {
          Swal.fire({
            title: "Feather Updated Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            form.reset();
            window.location.href="/dashboard/allfeather";
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
              <span className="label-text text-coffee">Title</span>
            </label>
            <input
              type="text"
              placeholder="SMM"
              name="title"
              defaultValue={data.title}
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Sub-Title</span>
            </label>
            <textarea
              defaultValue={data.subtitle}
              className="textarea bg-white input-bordered input-primary w-full h-24"
              name="subtitle"
              placeholder="Sub-Title"
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

export default EditFeather;
