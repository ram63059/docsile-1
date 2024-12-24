import nomembershipsimg from "../assets/nomemberships.jpg"
function NoMemberships() {
  return (
<div className="flex flex-col justify-center items-center p-4 w-full">
      <div className="flex flex-col  items-center w-full">
        
        <div className="flex justify-center items-center">
          <img className="w-2/4" src={nomembershipsimg} alt="No Experiences" />
        </div>
        <p className="text-sm font-semibold">Add Memberships</p>
      </div>
    </div>   )
}

export default NoMemberships