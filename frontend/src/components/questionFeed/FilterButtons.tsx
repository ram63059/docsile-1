
const FilterButtons = () => {
  return (
    <div className="flex gap-3 items-center pt-4 pb-2 pl-5">
      {/* Specialty Dropdown */}
      <button className="flex items-center gap-1 px-6 py-1 border border-blue-200 rounded-full text-fillc bg-white hover:bg-blue-50">
        Specialty
        <span className="text-sm">▼</span>
      </button>

      {/* All Button */}
      <button className="px-6 py-1 text-white bg-fillc rounded-full ">
        All
      </button>

      {/* Pulse Questions Button */}
      <button className="px-4 py-1 border border-blue-200 text-fillc rounded-3xl bg-blue-50 hover:bg-blue-100">
        Pulse Questions
      </button>
    </div>
  );
};

export default FilterButtons;
