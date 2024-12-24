import shareicon from "../assets/shareicon.svg";
import likeicon from "../assets/likeicon.svg";
import reposticon from "../assets/reposticon.svg";
import defaultpostimg from "../assets/post_moti_logo.jpg"

function PostCard({
  cardprofileimg,
  poster,
  posterdetails,
  date,
  posttitle,
  postimg = {defaultpostimg},
  postcontent,
}: any) {
  return (
    <div className="flex flex-col border border-gray-400 p-4 rounded-xl  mt-4">
      <div className="flex flex-row ">
        <div className="flex items-center rounded-full">
          <img
            className="rounded-full w-12"
            src={cardprofileimg}
            alt="card profile img"
          />
        </div>

        <div className="flex flex-col p-2">
          <div>
            <p className="text-sm font-medium">
              {poster}{" "}
              <span className="text-xs font-normal">{posterdetails}</span>
              <span className="text-xs font-normal"> | </span>
              <span className="text-xs font-normal">{date}</span>
            </p>
          </div>

          <div>
            <p className="text-xs font-normal">Published a post</p>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-main pb-2">
        <div className="pt-3 ">
          <p className="text-sm font-medium">{posttitle} </p>
        </div>

        <div className="py-2">
          <img
            className="w-full rounded-2xl py-2"
            src={postimg}
            alt="question image"
          />
        </div>
        <div className="py-2 ">
          <p className="text-sm">{postcontent}</p>
        </div>
      </div>

      <div className="flex flex-row justify-between mt-3 px-1 items-center gap-3">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex items-center">
            <img className="w-6" src={likeicon} alt="insightful icon" />
          </div>
        </div>

        <div className="w-full pl-1.5">
          <input
            className="text-xs w-full border border-main rounded-full shadow-sm py-1.5 px-2"
            placeholder="Comment on Post"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="text-slate-500">
            <img className="w-7" src={reposticon} alt="answer icon" />
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="text-slate-400">
            <img
              className="w-5 text-slate-500"
              src={shareicon}
              alt="share icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



export default PostCard;


