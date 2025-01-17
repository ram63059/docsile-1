import { Header } from "./Header";
import { JobsCard } from "./JobCard";
import { SearchBar } from "./SearchBar";

const jobs = [
  {
    department: 'Opthomology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '3 days ago ',
    name:'Bhaktivedanta Hospital & Research Institute',
    location:'Mira Road, Mumbai, Maharashtra' ,
    amount: '₹22,000 - ₹40,000/month',
  },
  {
    department: 'Opthomology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '3 days ago ',
    name:'Bhaktivedanta Hospital & Research Institute',
    location:'Mira Road, Mumbai, Maharashtra' ,
    amount: '₹22,000 - ₹40,000/month',
  },
  {
    department: 'Opthomology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '3 days ago ',
    name:'Bhaktivedanta Hospital & Research Institute',
    location:'Mira Road, Mumbai, Maharashtra' ,
    amount: '₹22,000 - ₹40,000/month',
  },
  {
    department: 'Opthomology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '3 days ago ',
    name:'Bhaktivedanta Hospital & Research Institute',
    location:'Mira Road, Mumbai, Maharashtra' ,
    amount: '₹22,000 - ₹40,000/month',
  },
  {
    department: 'Opthomology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '3 days ago ',
    name:'Bhaktivedanta Hospital & Research Institute',
    location:'Mira Road, Mumbai, Maharashtra' ,
    amount: '₹22,000 - ₹40,000/month',
  },
  {
    department: 'Opthomology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '3 days ago ',
    name:'Bhaktivedanta Hospital & Research Institute',
    location:'Mira Road, Mumbai, Maharashtra' ,
    amount: '₹22,000 - ₹40,000/month',
  },
  
  // Repeated for all articles with their specific data
];

export function JobsPage() {
    
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAddJob = () => {
    console.log("Asking new question");
  };
  

  return (
    <div className="flex overflow-hidden flex-col items-center mx-auto w-full bg-white max-w-[480px]  min-h-screen ">
     
      <Header
       onNotification={() => console.log("Notification clicked")}
       onMessage={() => console.log("Message clicked")}
       onProfile={() => console.log("Profile clicked")}/>
    <SearchBar onSearch={handleSearch} onAddJob={handleAddJob} />      
      
      <div className="flex z-10 flex-col mt-6  w-full mx-auto p-7">
        <div className="flex flex-col w-full">
          {jobs.map((job, index) => (
            <JobsCard key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
}