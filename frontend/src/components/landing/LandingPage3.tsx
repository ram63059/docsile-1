import React, { useState } from 'react';
import docsile from "../../assets/icon/docsile.svg";
import LandingFooter from './LandingFooter';
import { useNavigate } from "react-router-dom";


const LandingPage3: React.FC  =  () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
   const navigate = useNavigate();

  return (
    <div className="relative font-fontsm bg-white min-h-screen">
      {/* Navigation */}
      <header className="flex justify-between items-center px-4 w-full lg:px-16 py-4">
        <div className="flex items-center space-x-3">
          <img src={docsile} alt="Docsile Logo" className="h-6 md:h-8" />
        </div>
        <nav className="hidden md:flex space-x-4 lg:space-x-14">
          <a href="#" className="text-main text-sm lg:text-base font-mainfont  hover:text-gray-700">
            About Us
           
          </a>
          <a href="#" className="text-main text-sm lg:text-base font-mainfont hover:text-gray-700">
            Contact
            <div className="border-b-2 border-maincl pt-1 " />
          </a>
          <a href="#" className="text-main text-sm lg:text-base font-mainfont hover:text-gray-700">
            FAQs
          </a>
        </nav>
        <div className="flex space-x-2 md:space-x-4">
          <button onClick={() => navigate("/category")} className="text-main hover:underline font-mainfont text-xs md:text-base">
            Join Now
          </button>
          <button onClick={() => console.log("clicked")} className="border border-blue-700 text-main px-2 md:px-4 py-1 md:py-2 text-xs md:text-base font-mainfont rounded-full hover:bg-main hover:text-white">
            Sign In
          </button>
        </div>
      </header>

      {/* Contact Form Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-maincl mb-4">Let's get in touch</h2>
          <div className='flex justify-center '>

          <p className="text-gray-600 md:w-[50%] ">
            Whether you have a question, need support, or want to collaborate, we're here to help
          </p>
          </div>
        </div>

        <div className="flex flex-col ">
          {/* Form */}
          <div className='flex justify-center max-w-7xl ' >
            <form onSubmit={handleSubmit} className="space-y-6 w-[440px] ">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-maincl"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-maincl"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-maincl"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-maincl text-white py-3 rounded-3xl hover:bg-fillc transition-colors"
              >
                Verify
              </button>
            </form>
          </div>

          {/* Location and Map */}
          <div className='flex-row  justify-around lg:grid lg:grid-cols-2   pt-16'>

            <div>

            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <address className="not-italic text-gray-600 space-y-1 mb-6">
            <p>100 Feet Rd,Ayyappa Society,</p>
              <p>Chanda Naik Nagar,</p>
              <p>HITEC City ,Madhapur </p>
              <p>Hyderabad</p>
              <p>Telangana</p>
              <p>India - 500018</p>
            </address>

            </div>
            <div>

            {/* Map placeholder - Replace with actual map integration */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.894350432946!2d78.37534531487661!3d17.4276716882926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557a7c86!2s100%20Feet%20Rd%2C%20Ayyappa%20Society%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana%20500081!5e0!3m2!1sen!2sin!4v1665159138"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2 text-gray-600">
              <p>docsile@gmail.com</p>
              <p>+91 98765 43210</p>
            </div>
                </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full">
        <LandingFooter />
      </footer>
    </div>
  );
};

export default LandingPage3;