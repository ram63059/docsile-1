import * as React from "react";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";


import { Navigation } from "./Navigation";
import { QuestionPost } from "./questionPost";
import FilterButtons from "./FilterButtons";

export const QuestionFeed: React.FC = () => {
  

  
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAskQuestion = () => {
    console.log("Asking new question");
  };
  
 
  return (
    <div className="flex flex-col min-h-screen max-w-[480px] mx-auto ">
      <Header
        onNotification={() => console.log("Notification clicked")}
        onMessage={() => console.log("Message clicked")}
        onProfile={() => console.log("Profile clicked")}
      />
     
        <SearchBar onSearch={handleSearch} onAddPost={handleAskQuestion} />
        <FilterButtons/>
        <QuestionPost  
        isUrgent={true} 
        avatar="https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
        name="Nampally Sriram"
        bio="Ophthalmologist | AIIMS Delhi'25 | Asp"
        timeAgo="3 days ago"
        title="Ophthalmology: The Future of Eye Care"
        content="Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools. The field continues to evolve with new technologies and treatment methods, promising better outcomes for patients."
        images={[
          "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
          "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
        ]}
        agrees={120}
        date={"22 dec 2024"}
        comments={64}
        shares={37}
        reposts={51}
        onAnswer={() => console.log("answer clicked")}
        onComment={() => console.log("Comment clicked")}
        onShare={() => console.log("Share clicked")}
        onReply={() => console.log("Repost clicked")}
        onMoreOptions={() => console.log("More options clicked")} 
        answers={32} 
        disagrees={54}    
            />

      <Navigation  />
    </div>
  );
};
