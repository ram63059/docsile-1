
function CategoryCard({ title, subtitle, icon, onClick }: any): any {
  return (
    <div className="flex justify-center  mt-5">
      
        <div className="flex border border-main rounded-2xl shadow-lg px-2 py-2.5 hover:shadow-xl cursor-pointer" onClick={onClick}>
          <img src={icon} alt="logo" />
          <div className="flex-col w-2/3">
            <p className="text-base pl-6 font-semibold">{title}</p>
            <p className="text-base pl-6 font-normal">{subtitle}</p>
          </div>
        </div>
     
    </div>
  );
}

export default CategoryCard;
