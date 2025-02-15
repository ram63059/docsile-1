import { useNavigate } from "react-router-dom";
import docsile from "../../assets/icon/docsile.svg";
import LandingFooter from "./LandingFooter";
import HorizontalScrollCards from "./HorizontalScrollCards";
import bookmark from "../../assets/icon/bookmark.svg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative font-fontsm bg-white min-h-screen ">
      {/* Header */}
      <header className="flex justify-between items-center px-4 w-full lg:px-16 py-4">
        <div className="flex items-center space-x-3">
          <img src={docsile} alt="Docsile Logo" className="h-6 md:h-8" />
        </div>
        <nav className="hidden md:flex space-x-4 lg:space-x-14">
          <a href="#" className="text-main text-sm lg:text-base font-mainfont  hover:text-gray-700">
            About Us
            <div className="border-b-2 border-maincl pt-1 " />
          </a>
          <a href="#" className="text-main text-sm lg:text-base font-mainfont hover:text-gray-700">
            Contact
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

      {/* Hero Section */}
      <section className="px-4 md:px-16 lg:px-40 pt-6 md:pt-10">
        <h1 className="text-3xl  md:text-5xl lg:text-[64px] text-[#3b5d8f] font-medium  leading-tight text-balance  max-w-full lg:max-w-[736px]">
          Connecting the Medical Community for a Healthier Future
        </h1>
      </section>

      {/* Hero Image */}
      <div className="w-[90%] md:w-[85%] lg:w-[80%] h-[160px] md:h-[300px] lg:h-[400px] mx-auto mt-8 md:mt-12 lg:mt-20 bg-[#f0f0f0] rounded-[20px] md:rounded-[40px]" />

      {/* Mission & Vision */}
      <section className="px-4 md:px-16 lg:px-40 py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          <div className="flex-1">
            <h2 className="text-2xl md:text-[32px] text-[#3b5d8f] font-semibold mb-4">
              Our Mission
            </h2>
            <div className="h-0 border-2 border-[#3f3f3f] lg:max-w-56 max-w-44  mb-4 md:mb-8"></div>
            <p className="text-lg md:text-2xl text-[#3f3f3f]">
              To create a global hub where healthcare professionals can network,
              learn, and advance their careers—fostering better medical
              practices and patient care.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-[32px] text-[#3b5d8f] font-semibold mb-4">
              Our Vision
            </h2>
            <div className="h-0 border-2 border-[#3f3f3f] lg:max-w-56 max-w-44 mb-4 md:mb-8"></div>
            <p className="text-lg md:text-2xl text-[#3f3f3f]">
              To be the leading professional network for the medical field,
              revolutionizing how healthcare experts connect, collaborate, and
              innovate.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 md:px-16 lg:px-40 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <div className="flex items-center gap-2">

          <div className="w-24 md:w-32 h-24 md:h-32 relative " >
            <img src={bookmark} alt="" />
          </div>
          <h2 className="text-3xl md:text-[40px] text-[#3b5d8f] font-semibold mb-4 md:hidden">
              Our Story
            </h2>
          </div>

          <div>
            <h2 className="text-3xl md:text-[40px] text-[#3b5d8f] hidden md:block lg:block font-semibold mb-4">
              Our Story
            </h2>
            <p className="text-lg md:text-2xl text-[#3f3f3f] max-w-full md:max-w-[925px]">
              Docsile was founded with a simple idea: Medical professionals need
              a dedicated space to network, share insights, and grow
              professionally. Unlike traditional social networks, Docsile is
              built specifically for the medical community, offering a trusted
              space for collaboration, mentorship, and career advancement.
            </p>
          </div>
        </div>
      </section>
      

      {/* Professional Networking */}
      <section className="px-4 py-12 md:py-2">
      <div>
        <HorizontalScrollCards/>
      </div>
      </section>

      {/* Meet the Team */}
      <section className="px-4 md:px-16 lg:px-[116px] py-8 md:py-10">
        <h2 className="text-3xl md:text-[40px] text-[#3b5d8f] font-semibold mb-8 md:mb-10">
          Meet the Team
        </h2>

        {/* Founder & Co-founder */}
        <div className="space-y-12 md:space-y-20">
          {/* Founder */}
          <div className="flex  md:flex-row gap-8 md:gap-20">
            <div className="w-full md:w-80 h-[200px] md:h-[400px] bg-[#d9d9d9]" />
            <div className="pt-4 md:pt-8">
              <h3 className="text-xl md:text-[32px] font-semibold mb-10   md:mb-[190px]">Founder</h3>
              <p className="text-lg md:text-[28px] mb-2 md:mb-8">Full name</p>
              <p className="text-base md:text-xl font-light text-balance leading-tight max-w-full md:w-[440px]">
                Motive of the founder. Lorem ipsum is a placeholder or dummy
                
              </p>
            </div>
          </div>

          {/* Co-founder */}
          <div className="flex  md:flex-row gap-8 md:gap-20">
            <div className="w-full md:w-80 h-[200px] md:h-[400px] bg-[#d9d9d9]" />
            <div className="pt-4 md:pt-8">
              <h3 className="text-2xl md:text-[32px] font-semibold mb-8 md:mb-[190px]">
                Co-founder
              </h3>
              <p className="text-xl md:text-[28px] mb-4 md:mb-8">Full name</p>
              <p className="text-base md:text-xl font-light max-w-full md:w-[440px]">
                Motive of the co-founder. Lorem ipsum is a placeholder or dummy
              </p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 md:mt-20">
          {[1, 2, 3, 4, 5, 6].map((member) => (
            <div key={member} className="w-full">
              <div className="h-28 md:h-60 bg-[#d9d9d9] mb-4" />
              <h3 className="text-xl md:text-[28px] mb-2 md:mb-4">Full name</h3>
              <p className="text-base md:text-xl font-light mb-2 md:mb-4">designation/position</p>
              <p className="text-sm md:text-xl font-light">
                Motive of the person. Lorem ipsum is a placeholder or dummy text
                
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 md:px-16 lg:px-[244px] py-12 md:py-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl md:text-4xl text-[#3b5d8f] font-bold leading-normal md:leading-[56px]">
            Your medical journey deserves the right network. Let's build it
            together—join us today!
          </h2>
          <button className="px-8 md:px-16 py-2 md:py-3 border border-[#3b5d8f] rounded-[26px] w-fit">
            <span className="text-[#3b5d8f] text-sm md:text-base font-medium">
              Join now
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full">
        <LandingFooter />
      </footer>
    </div>
  );
};

export default LandingPage;