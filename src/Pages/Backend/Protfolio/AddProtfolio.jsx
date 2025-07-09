import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddProtfolio = () => {
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    fetch("https://server-site-azure.vercel.app/addskill")
      .then((res) => res.json())
      .then((data) => setSkill(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    clientName: "",
    date: "",
    service: "",
    strategy: "",
    design: "",
    userExperience: "",
    shortDescription: "",
    longDescription: "",
    budget: "",
    liveView: "",
    sourceCode: "",
    thumbnail: null,
    images: [null, null, null, null],
    skill: "",
    level: "", // Added level input
  });

  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [null, null, null, null],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name.startsWith("image")) {
      const index = parseInt(name.replace("image", ""), 10);
      const updatedImages = [...formData.images];
      const updatedPreview = [...preview.images];

      updatedImages[index] = files[0];
      updatedPreview[index] = URL.createObjectURL(files[0]);

      setFormData({ ...formData, images: updatedImages });
      setPreview({ ...preview, images: updatedPreview });
    } else if (name === "thumbnail") {
      setFormData({ ...formData, thumbnail: files[0] });
      setPreview({ ...preview, thumbnail: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadImage = async (image) => {
    const form = new FormData();
    form.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_UPLOAD_KEY
    }`;
    const response = await axios.post(imageUploadUrl, form);
    return response.data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Uploading...",
        text: "Please wait while your images are uploading.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const thumbnailUrl = await uploadImage(formData.thumbnail);
      const imageUrls = await Promise.all(
        formData.images.map((img) => (img ? uploadImage(img) : null))
      );

      const finalData = {
        ...formData,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      };

      const response = await fetch("https://server-site-azure.vercel.app/addprotfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (result.insertedId || result.success) {
        Swal.fire({
          title: "Success!",
          text: "Portfolio Added Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          e.target.reset();
          window.location.href = "/dashboard/allprotfolio";
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto space-y-6 p-8 bg-white shadow-2xl rounded-2xl"
    >
      <h2 className="text-3xl font-bold text-center text-blue-700">
        🛠️ Add Portfolio
      </h2>

      {/* Group 1: Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="subtitle"
          placeholder="Sub-title"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="clientName"
          placeholder="Client Name"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="date"
          type="date"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="service"
          placeholder="Service"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="budget"
          type="number"
          placeholder="Budget"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="shortDescription"
          placeholder="Short Description"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="liveView"
          type="url"
          placeholder="Live View URL"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="sourceCode"
          type="url"
          placeholder="Source Code URL"
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
      </div>

      {/* Group 2: Skill and Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-medium block mb-1">Skill</label>
          <select
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            required
            className="input bg-white border-blue-300"
          >
            <option value="" disabled>
              -- Select a Skill --
            </option>
            {skill &&
              skill.map((item) => (
                <option
                  key={item._id || item.name}
                  value={item.skillName || item.name}
                >
                  {item.name || item.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="font-medium block mb-1">Skill Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="input bg-white border-blue-300"
          >
            <option value="" disabled>
              -- Select Level --
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Group 3: Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          name="strategy"
          placeholder="Strategy"
          required
          onChange={handleChange}
          className="textarea input bg-white border-blue-300"
        />
        <textarea
          name="design"
          placeholder="Design"
          required
          onChange={handleChange}
          className="textarea input bg-white border-blue-300"
        />
        <textarea
          name="userExperience"
          placeholder="User Experience"
          required
          onChange={handleChange}
          className="textarea input bg-white border-blue-300"
        />
        <textarea
          name="longDescription"
          placeholder="Long Description"
          required
          onChange={handleChange}
          className="textarea md:col-span-2 input bg-white border-blue-300"
        />
      </div>

      {/* Group 4: Images */}
      <div>
        <label className="font-medium block mb-2">Thumbnail Image</label>
        <input
          name="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        {preview.thumbnail && (
          <img
            src={preview.thumbnail}
            alt="Thumbnail Preview"
            className="mt-2 w-32 h-32 rounded shadow-md border object-cover"
          />
        )}
      </div>

      <div>
        <label className="font-medium block mb-2">
          Portfolio Images (max 4)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              <input
                name={`image${index}`}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="input bg-white border-blue-300"
              />
              {preview.images[index] && (
                <img
                  src={preview.images[index]}
                  alt={`Preview ${index + 1}`}
                  className="mt-2 w-full h-32 rounded shadow-md border object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
      >
        🚀 Submit Portfolio
      </button>
    </form>
  );
};

export default AddProtfolio;
