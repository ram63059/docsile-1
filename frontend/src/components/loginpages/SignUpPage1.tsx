import React, { useState } from "react";
import loginsidepic from "../../assets/icon/loginsidepic.svg"
import docsilelogo from "../../assets/icon/docsilelogo.svg";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData); // Replace with API call or state management logic
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full font-fontsm " >
      {/* Left Section (Hidden on Small Screens) */}
      <div className="hidden md:flex  flex-1 justify-center items-center pl-8  bg-white">
        <div className="text-center max-w-lg">
          <p className="mt-4 text-2xl  text-balance text-maincl">
            Step into a network where medical students learn, connect with mentors, and prepare for a future in healthcare
          </p>
          <div className="lg:p-4">

          <img src={loginsidepic} alt="Medical Network" className="w-[80%] max-w-md mx-auto" />
          </div>
        </div>
      </div>
      
      {/* Right Section (Always Visible) */}
      <div className="flex flex-1 lg:justify-start justify-center items-center lg:pr-4 p-2  ">
        <div className="w-full max-w-lg bg-white shadow-xl border border-gray-200  rounded-3xl p-6 flex flex-col justify-center lg:max-h-[90%] max-h-[80%]   lg:p-24 h-[90vh] my-auto ">
          <div className="flex items-center  text-center mb-14 lg:mb-6 w-full">
            <img src={docsilelogo} alt="Docsile Logo" className="lg:w-8 lg:h-8 w-14 h-14 mr-2" />
            <h1 className="lg:text-4xl text-6xl  text-maincl font-medium ">Docsile</h1>
          </div>
          <h2 className="lg:text-md text-lg   text-gray-800 mb-4">
            Tell us your name to personalize your professional profile
          </h2>
          <p className="text-xs text-gray-600 mb-6">
            Enter your name to build your medical profile.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border text-gray-800 bg-buttonclr border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-fillc mb-5"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border bg-buttonclr text-gray-800 border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-fillc mb-8"
            />
            <button
              type="submit"
              className="w-full bg-maincl text-white p-3 rounded-3xl hover:bg-fillc transition"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
