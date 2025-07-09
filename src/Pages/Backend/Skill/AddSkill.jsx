import React from "react";
import Swal from "sweetalert2";

const AddSkill = () => {
  const handleform = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const newSkill = { name };
    console.log(newSkill);
    const formData = new FormData(form);

    // Convert FormData to a plain object
    const skillform = Object.fromEntries(formData.entries());

    console.log("Sending data:", skillform);

    // Send the data to the server
    fetch("https://server-site-azure.vercel.app/addskill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skillform),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);
        if (data.insertedId || data.success) {
          Swal.fire({
            title: "Skill Added Successfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            form.reset();
            // Redirect to dashboard after confirmation
            window.location.href = "/dashboard/allskill";
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add Skill.",
            icon: "error",
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
    <>
      <div className=" flex items-center justify-center mt-20">
        <div className="bg-white bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-coffee text-center mb-6">
            Add Skill
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
                className="input bg-white input-bordered input-primary w-full"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Add
            </button>
          </form>
          {/* <p className="text-center text-sm text-gray-600 mt-4">
                    Don't Have an Account?{" "}
                    <NavLink to="/register" className="text-coffee font-semibold hover:underline">
                      Register here
                    </NavLink>
                  </p> */}
        </div>
      </div>
    </>
  );
};

export default AddSkill;
