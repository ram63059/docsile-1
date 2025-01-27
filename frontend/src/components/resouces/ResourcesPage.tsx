import { useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import ResourceDetails from "./ResourceDetails"; // Assuming ResourceDetails component is defined in a separate file

import job from "../../assets/icon/jobs.svg"
import job2 from "../../assets/icon/njob2.svg"
import resources from "../../assets/icon/resources.svg"
import resources2 from "../../assets/icon/nresources2.svg"
import cme from "../../assets/icon/cme.svg"
import cme2 from "../../assets/icon/ncme2.svg"
import membership from "../../assets/icon/membership.svg"
import membership2 from "../../assets/icon/nmembership2.svg"
import JobFilterStatic from "./JobFilterCard";



const articles = [
  {
    type: "Article",
    readTime: "10 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: true
  },
  {
    type: "Article",
    readTime: "15 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: false
  },
  {
    type: "Article",
    readTime: "25 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: true
  },
  {
    type: "Article",
    readTime: "10 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: true
  },
  {
    type: "Journal",
    readTime: "10 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: true
  },
  {
    type: "Notes",
    readTime: "15 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: false
  },
  {
    type: "Journal",
    readTime: "25 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: true
  },
  {
    type: "Notes",
    readTime: "10 min read",
    date: "22 Dec 2024",
    title: "The Future of AI in Ophthalmology",
    description: "Discover how AI is revolutionizing eye care through early disease detection, advanced diagnostics, and personaliz...",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/e6f21b8e48966c867e6781375245b708b2595a844a18bfe5cb5ae20e42019372?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    hasBookmark: true
  },
  // Repeated for all articles with their specific data
];

export function ResourcesPage() {
  const [selectedOption, setSelectedOption] = useState<string>("resources");
  const [selectedResource, setSelectedResource] = useState<typeof articles[0] | null>(null);
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
    
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAdd = () => {
    console.log("Asking new question");
  };

  const handleResourceClick = (resource: typeof articles[0]) => {
    setSelectedResource(resource);
  };

  const handleCloseResource = () => {
    setSelectedResource(null);
  };

  if (selectedResource) {
    return (
      <ResourceDetails
        resource={{
          ...selectedResource,
          content: "The future of AI in ophthalmology is poised to significantly enhance patient care, streamline diagnostic processes, and improve treatment outcomes. AI's most promising applications are in diagnostics, where it aids in the early detection of retinal conditions like diabetic retinopathy, macular degeneration, and glaucoma. Tools such as DeepMind's AI system have already demonstrated diagnostic accuracy comparable to that of trained ophthalmologists, enabling earlier intervention.\n\nThe future of AI in ophthalmology is poised to significantly enhance patient care, streamline diagnostic processes, and improve treatment outcomes. AI's most promising applications are in diagnostics, where it aids in the early detection of retinal conditions like diabetic retinopathy, macular degeneration, and glaucoma. Tools such as DeepMind's AI system have already demonstrated diagnostic accuracy comparable to that of trained ophthalmologists, enabling earlier intervention.\n\nThe future of AI in ophthalmology is poised to significantly enhance patient care, streamline diagnostic processes, and improve treatment outcomes. AI's most promising applications are in diagnostics, where it aids in the early detection of retinal conditions like diabetic retinopathy, macular degeneration, and glaucoma. Tools such as DeepMind's AI system have already demonstrated diagnostic accuracy comparable to that of trained ophthalmologists, enabling earlier intervention."
        }}
        onClose={handleCloseResource}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen  mx-auto ">
     
     <div className="bg-white border-b sticky top-0 z-50">
     
           <Header
            onNotification={() => console.log("Notification clicked")}
            onMessage={() => console.log("Message clicked")}
            onProfile={() => console.log("Profile clicked")}
            onSearch={() => console.log("Profile clicked")}
            
            />
            </div>



                  
          {/* Main Content Area */}
          <div className="flex flex-1  px-4 lg:pl-16 max-w-7xl mx-auto w-full gap-4 ">
                  

                        {/* Left Sidebar */}

                    <div className="hidden lg:block w-[230px] flex-shrink-0 font-fontsm">
                      <div className="top-[calc(theme(spacing.24)+1px)] space-y-2">

                        {/* Explore careers */}
                        <p className="text-maincl font-medium mb-6 mt-4"> Explore Careers</p>

                      
                        <div
                          className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                            selectedOption === "jobs" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
                          }`}
                          onClick={() => handleOptionSelect("jobs")}
                        >
                          <img
                            src={selectedOption === "jobs" ? job2 : job}
                            alt="Jobs"
                          />
                          <p>Jobs</p>
                        </div>
                        <div
                          className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                            selectedOption === "cme" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
                          }`}
                          onClick={() => handleOptionSelect("cme")}
                        >
                          <img
                            src={selectedOption === "cme" ? cme2 : cme}
                            alt="Conference"
                          />
                          <p>Conference</p>
                        </div>
                        <div
                          className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                            selectedOption === "mentorship" ? "bg-fillc text-white " : "bg-buttonclr"
                          }`}
                          onClick={() => handleOptionSelect("mentorship")}
                        >
                          <img
                            src={selectedOption === "mentorship" ? membership2 : membership}
                            alt="Mentorship"
                          />
                          <p>Mentorship</p>
                        </div>
                        <div
                          className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                            selectedOption === "resources" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
                          }`}
                          onClick={() => handleOptionSelect("resources")}
                        >
                          <img
                            src={selectedOption === "resources" ? resources2 : resources}
                            alt="Resources"
                          />
                          <p>Resources</p>
                        </div>

                    </div>

                    </div>



                    {/* Main Feed */}
        <div className="flex-1 max-w-[650px] mx- w-full ">
              

                  <div className="lg:hidden">
                  <SearchBar onSearch={handleSearch} onAdd={handleAdd} />      


                  </div>



            <div className="flex z-10 flex-col  w-full mx-auto p-7">
            <div className="flex flex-col w-full">
              {articles.map((article, index) => (
                <ArticleCard 
                  key={index} 
                  {...article} 
                  onClick={() => handleResourceClick(article)}
                />
              ))}
            </div>
          </div>
        </div>



                         {/* Right Sidebar */}
        <div className="hidden lg:block w-[320px] flex-shrink-0 font-fontsm">

            <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-4">
                    
                  <JobFilterStatic              />

            </div>
            </div>





          </div>




      
     
    </div>
  );
}