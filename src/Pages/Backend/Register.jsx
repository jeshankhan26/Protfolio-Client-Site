import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { NavLink } from "react-router"; // ✅ FIXED
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthContext";

const Register = () => {
  const { createAccountwithEmail } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleregister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const email = formdata.get("email");
    const password = formdata.get("password");
    const name = formdata.get("name");

    const userprofile = Object.fromEntries(formdata.entries());

    try {
      const result = await createAccountwithEmail(email, password);
      const user = result.user;

      // ✅ Update Firebase profile
      await updateProfile(user, { displayName: name });

      // ✅ Save to backend
      const response = await fetch("https://server-site-azure.vercel.app/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userprofile),
      });

      const data = await response.json();

      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Done",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/dashboard";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User data not saved!",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://i.ibb.co/LD79ZLRX/pexels-photo-1103970.webp')] bg-cover bg-center flex items-center justify-center">
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-coffee text-center mb-6">
          ☕ Join Coffee Club
        </h1>
        <form className="space-y-4" onSubmit={handleregister}>
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Name</span>
            </label>
            <input
              type="text"
              placeholder="Jeshan Khan"
              name="name"
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-coffee">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@coffee.com"
              name="email"
              className="input bg-white input-bordered input-primary w-full"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-coffee">Password</span>
            </label>
            <input
              placeholder="••••••"
              name="password"
              type={showPassword ? "text" : "password"}
              className="input bg-white input-bordered input-primary w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already a member?{" "}
          <NavLink to="/login" className="text-coffee font-semibold hover:underline">
            login here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
