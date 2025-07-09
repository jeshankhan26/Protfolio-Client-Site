import React, { use, useState } from 'react';
import { NavLink } from 'react-router';
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Provider/AuthContext';

const Login = () => {
     const [showPassword, setShowPassword] = useState(false);
    const { login } = use(AuthContext);
     const handlelogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const newUser = { name, email, password };
    console.log(newUser);

    login(email,password)
    .then((userCredential) => {
        const user = userCredential.user;
    
        if (user && user.uid) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location = "/dashboard"; // Redirect after alert closes
          });
        }
      })
      .catch((error) => {
        console.error("Error Login account:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });

     }
    return (
        <>
            <div className="min-h-screen bg-[url('https://i.ibb.co/LD79ZLRX/pexels-photo-1103970.webp')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-white bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-coffee text-center mb-6">
             Join My Club
          </h1>
          <form className="space-y-4" onSubmit={handlelogin}>
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
            <button type="submit" className="btn btn-primary w-full">
              Login
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

export default Login;