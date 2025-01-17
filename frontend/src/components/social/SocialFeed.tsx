import * as React from "react";
import { StoryItem } from "./StoryItem";
import { NavigationItem } from "./NavigationItem";
import { Post } from "./Post";

const stories = [
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6093fa78a5975dce5cacdd69f3dc074d8a56ed1eef07c3b930dd6fa85cb956fe?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    name: "Your Story",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    name: "Dr. Mahesh",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b527f110a2eb672ae9e0b0bead1abbd22bc9bc28130e5503cc3abf13d16bee60?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    name: "Dr. Swathi",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ab6937e93ef1ee7bddbbbf77a39d383095f69738f6470ae4ea7d346c46d2b699?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    name: "Dr. Mahesh",
  },
  {
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e11116406a9a6bca6e5c1de6ab87ff490cd336445d55d98097f72dbe60e3241d?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    name: "Dr. Swathi",
  },
];

const navItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/44f8cb44e5becefaa3383cd94c29b7f18ab3690d9cabc37c08f524f69d184fec?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    label: "Home",
    isActive: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dd8a158b5334a5d19c2a0374f78f9cfa24bbed190684415c1ccb81151caecdad?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    label: "Questions",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d268e1589cf40432eb8a71f29a56cd6d68b80aa8dc18d111bfe797382f084e11?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    label: "Videos",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6afad3671eb4a389e048e5051fb6c07b3272db69a8e6d0115990ab4fd1506955?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    label: "Connect",
  },
  { icon: "http://b.io/ext_26-", label: "Careers" },
];

const post = {
  avatar:
    "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
  name: "Nampally Sriram",
  bio: "Ophthalmologist | AIIMS Delhi'25 | Aspiring Medical Professional",
  timeAgo: "3 days ago",
  title: "Ophthalmology: The Future of Eye Care",
  content:
    "Ophthalmology has seen incredible advancements in recent years, particularly in surgical techniques and diagnostic tools.",
  images: [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/1f352924c9d23559e8c19e6d726091def0f7346d30feaddbf142d2c74bc2e05e?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/3179d893d2c64d78a71042d4bbe19d82929393a4cc746e57df0407426f7a4992?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/bacdf5b5cd530c209ad1b1cdb72874c3b55ba49a818704cd3a277725a590f529?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/6939df2c7edaf176e0907ced793a5e28a1df342e59d4610b8999ddc4aed782a9?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
  ],
  stats: {
    likes: 120,
    comments: 64,
    shares: 37,
    reposts: 51,
  },
};

export function SocialFeed() {
  return (
    <div className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
      <header className="flex flex-col w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/76db955a402a6b6ecdb9b07e23aa163eba269111d461c373d419e19b7d933e20?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
          alt="Header banner"
          className="object-contain w-full aspect-[8.7]"
        />
        <div className="flex flex-col items-start pl-5 mt-5 w-full">
          <div className="flex gap-10 justify-between items-center w-full">
            <div className="flex gap-2 items-center self-stretch my-auto text-2xl font-medium whitespace-nowrap text-slate-600">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e026847d49c6384e9ff3e6753813971d077ca33d6044a8e61581beb3afbdabcc?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                alt="Docsile logo"
                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
              />
              <div className="self-stretch my-auto">Docsile</div>
            </div>
            <nav className="flex gap-3 items-center self-stretch my-auto">
              <button aria-label="Notifications">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fab538458494b7aa7bac372529c9270e51447dc519ddb2bef40c2959fb5a4741?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
              </button>
              <button aria-label="Messages">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/89793a4a0e540436f40d998b9a47df9b85b1f339f9654fb5f3bb1a090fe02142?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.92] w-[22px]"
                />
              </button>
              <button aria-label="Profile">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-7 rounded-full aspect-square"
                />
              </button>
            </nav>
          </div>

          <div className="flex gap-3 items-center self-stretch mt-6 text-xs text-center text-neutral-700">
            {stories.map((story, index) => (
              <StoryItem key={index} {...story} />
            ))}
          </div>

          <div className="flex flex-col mt-6 w-full">
            <div className="flex gap-3 items-center w-full">
              <form className="flex-1" role="search">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="flex gap-2 items-center px-3 py-2 text-xs font-light text-center whitespace-nowrap rounded-2xl bg-neutral-200 bg-opacity-60 min-h-[29px] text-neutral-500">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/98ce968e6a6ee75443b0bfff06bf1ae0bd9ff7aa3370320c797ee468c90e5a5f?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                  />
                  <input
                    id="search"
                    type="search"
                    placeholder="Search"
                    className="bg-transparent border-none outline-none"
                  />
                </div>
              </form>
              <button className="flex gap-2 justify-center items-center py-1.5 px-3 text-xs text-white rounded-2xl bg-slate-600 min-h-[29px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ee2fecfef7edf0f14d1ab33f1ada2f9d06a0c54e3ab3d353dc2c647c253134f?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                />
                Add Post
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex z-10 flex-col self-center mt-28 w-full max-w-[335px]">
        <Post {...post} />
      </main>

      <nav className="flex z-10 flex-col justify-center p-5 mt-0 w-full bg-white shadow-[4px_0px_4px_rgba(0,0,0,0.16)]">
        <div className="flex gap-5 justify-between w-full">
          {navItems.map((item, index) => (
            <NavigationItem key={index} {...item} />
          ))}
        </div>
      </nav>
    </div>
  );
}
