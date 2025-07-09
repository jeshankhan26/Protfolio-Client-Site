import React from 'react';
import Swal from 'sweetalert2';

const AddEducation = () => {
        const handleform=e=>{
            e.preventDefault();
            const form =e.target
            const formData = new FormData(form);
            
                // Convert FormData to a plain object
                const featherform = Object.fromEntries(formData.entries());
            
                console.log("Sending data:", featherform);
            
               // Send the data to the server
            fetch("https://server-site-azure.vercel.app/addeducation", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(featherform),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Server Response:", data);
                if (data.insertedId || data.success) {
                  Swal.fire({
                    title: "Education Added Successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                  }).then(() => {
                    form.reset();
                    // Redirect to dashboard after confirmation
                   window.location.href="/dashboard/alleducation";
                  });
                } else {
                  Swal.fire({
                    title: "Error!",
                    text: "Failed to add Education.",
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
        }
    return (
        <>
         <div className=" flex items-center justify-center mt-20">
                <div className="bg-white bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-md">
                  <h1 className="text-3xl font-bold text-coffee text-center mb-6">
                     Add Education
                  </h1>
                  {/*  */}
                  <form className="space-y-4" onSubmit={handleform} >
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-coffee">Degree</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Scc"
                        name="degree"
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
                        className="input bg-white input-bordered input-primary w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-coffee">Description</span>
                      </label><br />
                       <textarea className="textarea bg-white input-bordered input-primary w-full h-24" name='description' placeholder="Short Description"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                      Add
                    </button>
                  </form>
                </div>
              </div> 
            
        </>
    );
};

export default AddEducation;