import { useNavigate, useParams } from "react-router-dom"
import post_moti_logo from "../assets/post_moti_logo.jpg"

function NoPosts() {
    const {id} = useParams()
    const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center p-4">
    <p className="text-base font-semibold">No Posts or Questions</p>
    <div className="flex justify-center items-center">
      <img className="w-2/3" src={post_moti_logo} alt="post motivation logo" />
    </div>
    <p className="text-sm font-medium mt-4 text-center" >"The best insights come from real experiences. Share yours today."</p>

    <div onClick={() => {
      navigate(`/publish-post/${id}`)
    }} className="flex justify-center items-center mt-4 cursor-pointer">
         <p className="text-base font-semibold text-blue-500">Post now</p>
    </div>

 
  </div>
  )
}

export default NoPosts