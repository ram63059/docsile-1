import noeducationimg from "../assets/noeducation.jpg"
function NoEducation() {
  return (
<div className="flex flex-col justify-center items-center p-4 w-full">
      <div className="flex flex-col  items-center w-full">
        
        <div className="flex justify-center items-center">
          <img className="w-2/4" src={noeducationimg} alt="No Experiences" />
        </div>
        <p className="text-sm font-semibold">Add Education</p>
      </div>
    </div>   )
}

export default NoEducation