import { FC } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { BiSolidVideo } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { BsBriefcaseFill } from 'react-icons/bs';

const BottomNav: FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {[
          { icon: <AiFillHome size={24} />, label: 'Home', active: true },
          { icon: <BsQuestionCircleFill size={24} />, label: 'Questions' },
          { icon: <BiSolidVideo size={24} />, label: 'Videos' },
          { icon: <HiUserGroup size={24} />, label: 'Connect' },
          { icon: <BsBriefcaseFill size={24} />, label: 'Careers' },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`${item.active ? 'text-blue-600' : 'text-gray-500'}`}>
              {item.icon}
            </div>
            <span className={`text-xs mt-1 ${item.active ? 'text-blue-600' : 'text-gray-500'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
