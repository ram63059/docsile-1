import * as React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface HeaderProps {
  onNotification: () => void;
  onMessage: () => void;
  onProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNotification,
  onMessage,
  onProfile,
}) => {
  return (
    <header className="flex gap-10 justify-between items-center w-full px-5 py-4 text-fontlit text-maincl">
      <div className="flex gap-2 items-center text-2xl font-medium">
      <FaArrowLeft size={16}/>

      <span>Conferences</span>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={onNotification}
          aria-label="Notifications"
          className="p-1 hover:bg-slate-100 rounded-full transition-colors flex shrink-0"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fab538458494b7aa7bac372529c9270e51447dc519ddb2bef40c2959fb5a4741?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt=""
            className="w-6 h-6"
          />
        </button>
        <button
          onClick={onMessage}
          aria-label="Messages"
          className="p-1 hover:bg-slate-100 rounded-full transition-colors flex shrink-0"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89793a4a0e540436f40d998b9a47df9b85b1f339f9654fb5f3bb1a090fe02142?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt=""
            className="w-[22px] aspect-[0.92]"
          />
        </button>
        <button
          onClick={onProfile}
          aria-label="Profile"
          className="p-1 hover:bg-slate-100 rounded-full transition-colors flex shrink-0"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d6a37aa68c806868e46fc0d99e42c21115610fa1b71c977a03eb08090c9e74c?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
            alt="Profile picture"
            className="w-7 h-7 rounded-full"
          />
        </button>
      </div>
    </header>
  );
};
