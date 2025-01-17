import save1 from "../../assets/icon/save1.svg";
import save2 from "../../assets/icon/save2.svg";
import money from "../../assets/icon/money.svg";
import locations from "../../assets/icon/location.svg";
import { useState } from "react";

export interface JobCardProps {
  department: string;
  date: string;
  image: string;
  name: string;
  location: string;
  amount: string;
}

export const JobsCard: React.FC<JobCardProps> = ({
  department,
  image,
  date,
  name,
  location,
  amount,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className=" ">
      <div className="overflow-x-auto   gap-2 font-fontsm ">
        <div className="min-w-[250px] bg-white rounded-xl p-3   shadow-md mb-3 border border-gray-100 ">

          <div className="flex justify-between">
            <div className="flex">

            
              <div className="flex justify-center ">
                 <img src={image} alt="" className=" mt-1 mr-2 w-14 h-14" />
                </div>
              <div className="flex  flex-col justify-start items-start p-1  mb-1">
                  <p className="font-medium text-sm   text-fillc">{department}</p>
                 <p className="text-xs text-gray-600 font-light  line-clamp-1">{name}</p>
                   <p className="text-xs font-normal text-gray-500">{date} </p>
              </div>
              </div>

              <div className="flex justify-end pr-2">
                 <img
                   src={isSaved ? save2 : save1}
                   onClick={() => setIsSaved(!isSaved)}
                   alt=""
                  />
                </div>
            </div>
          <div className="p-3 text-start ">
            

            {/* Mutual info with line clamp */}
            <div className="flex flex-col items- mb-2 ">
              <div className="text-fontlit text-gray-400 pt-1 line-clamp-2 flex">
                <img src={locations} alt="" className="w-3 mr-1" /> {location}
              </div>
              <div className="text-fontlit text-gray-400 pt-1 line-clamp-2 flex">
                <img src={money} alt="" className="w-3 mr-1" /> {amount}
              </div>
            </div>

            <button className="mt-2 py-1 px-6 mr-1 text-xs text-white bg-maincl rounded-xl font-light">
              Apply 
            </button>
            <button className="mt-2 py-1 px-2 text-xs  text-maincl border border-gray-100 rounded-xl font-light">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
