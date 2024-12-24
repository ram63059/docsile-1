import noAwardsImg from "../assets/noAwards.jpg"

function NoAwards() {
  return (
<div className="flex flex-col justify-center items-center p-4 w-full">
      <div className="flex flex-col  items-center w-full">
        
        <div className="flex justify-center items-center">
          <img className="w-2/4" src={noAwardsImg} alt="No certificates" />
        </div>
        <p className="text-sm font-semibold">Add Achievements or Awards</p>
      </div>
    </div>  )
}

export default NoAwards