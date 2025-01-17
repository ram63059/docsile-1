import { ArticleCard } from "./ArticleCard";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";

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
    
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAdd = () => {
    console.log("Asking new question");
  };
  

  return (
    <div className="flex overflow-hidden flex-col items-center mx-auto w-full bg-white max-w-[480px]  min-h-screen ">
     
      <Header
       onNotification={() => console.log("Notification clicked")}
       onMessage={() => console.log("Message clicked")}
       onProfile={() => console.log("Profile clicked")}/>
    <SearchBar onSearch={handleSearch} onAdd={handleAdd} />      
      
      <div className="flex z-10 flex-col mt-6  w-full mx-auto p-7">
        <div className="flex flex-col w-full">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}