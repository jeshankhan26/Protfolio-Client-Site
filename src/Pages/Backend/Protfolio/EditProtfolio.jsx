import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

// Replace this with your actual IMGBB API key
const imgbbApiKey = `${import.meta.env.VITE_UPLOAD_KEY}`;

const EditPortfolio = () => {
  const data = useLoaderData();

  const [formData, setFormData] = useState({
    title: data.title || "",
    subtitle: data.subtitle || "",
    clientName: data.clientName || "",
    date: data.date || "",
    service: data.service || "",
    budget: data.budget || "",
    shortDescription: data.shortDescription || "",
    liveView: data.liveView || "",
    sourceCode: data.sourceCode || "",
    skill: data.skill || "",
    level: data.level || "",
    strategy: data.strategy || "",
    design: data.design || "",
    userExperience: data.userExperience || "",
    longDescription: data.longDescription || "",
    thumbnail: null,
  });

  const [skill, setSkill] = useState([]);
  const [preview, setPreview] = useState({
    thumbnail: data.thumbnail || null,
  });

  useEffect(() => {
    fetch("https://server-site-azure.vercel.app/addskill")
      .then((res) => res.json())
      .then((data) => setSkill(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview({ ...preview, [name]: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageURL = preview.thumbnail;

      if (formData.thumbnail && typeof formData.thumbnail === "object") {
        const imageData = new FormData();
        imageData.append("image", formData.thumbnail);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const imgbbData = await imgbbRes.json();
        imageURL = imgbbData.data.url;
      }

      const updatedData = {
        ...formData,
        thumbnail: imageURL,
      };

      const res = await fetch(
        `https://server-site-azure.vercel.app/addprotfolio/${data._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        Swal.fire(
          "✅ Updated!",
          "Portfolio updated successfully",
          "success"
        ).then(() => {
          window.location.href = "/dashboard/allportfolio";
        });
      } else {
        Swal.fire("❌ Failed", "Failed to update portfolio", "error");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Swal.fire("❌ Error", "Something went wrong", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto space-y-6 p-8 bg-white shadow-2xl rounded-2xl"
    >
      <h2 className="text-3xl font-bold text-center text-blue-700">
        🛠️ Edit Portfolio
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="title"
          value={formData.title}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="subtitle"
          value={formData.subtitle}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="clientName"
          value={formData.clientName}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="service"
          value={formData.service}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="budget"
          type="number"
          value={formData.budget}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="shortDescription"
          value={formData.shortDescription}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="liveView"
          type="url"
          value={formData.liveView}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
        <input
          name="sourceCode"
          type="url"
          value={formData.sourceCode}
          required
          onChange={handleChange}
          className="input bg-white border-blue-300"
        />
      </div>

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
            {skill.map((item) => (
              <option key={item._id} value={item.skillName || item.name}>
                {item.name}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          name="strategy"
          value={formData.strategy}
          required
          onChange={handleChange}
          className="textarea input bg-white border-blue-300"
        />
        <textarea
          name="design"
          value={formData.design}
          required
          onChange={handleChange}
          className="textarea input bg-white border-blue-300"
        />
        <textarea
          name="userExperience"
          value={formData.userExperience}
          required
          onChange={handleChange}
          className="textarea input bg-white border-blue-300"
        />
        <textarea
          name="longDescription"
          value={formData.longDescription}
          required
          onChange={handleChange}
          className="textarea md:col-span-2 input bg-white border-blue-300"
        />
      </div>

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

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-800 transition"
      >
        🚀 Submit Portfolio
      </button>
    </form>
  );
};

export default EditPortfolio;
