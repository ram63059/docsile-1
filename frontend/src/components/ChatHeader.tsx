import { IoVideocamOutline } from "react-icons/io5";
import dots from "../assets/3dots.svg";
import profileimg from "../assets/profile.svg";

interface UserInfo {
  name: string;
  lastActive: string;
}

const ChatHeader = ({ user }: { user: UserInfo }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <button className="text-gray-600 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <img src={profileimg} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
        <div>
          <h2 className="text-lg font-medium text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.lastActive}</p>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-4">
        <button className="text-gray-600 pr-4">
          <IoVideocamOutline size={23} />
        </button>
        <button className="text-gray-600">
          <img src={dots} width={17} alt="Options" className="pr-3" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
