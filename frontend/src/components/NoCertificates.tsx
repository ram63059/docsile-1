import noCertificateImg from "../assets/nocertificates.jpg";

function NoCertificates() {
  return (
    <div className="flex flex-col justify-center items-center p-4 w-full">
      <div className="flex flex-col  items-center w-full">
        
        <div className="flex justify-center items-center">
          <img className="w-2/4" src={noCertificateImg} alt="No certificates" />
        </div>
        <p className="text-sm font-semibold">Add Certificates</p>
      </div>
    </div>
  );
}

export default NoCertificates;
