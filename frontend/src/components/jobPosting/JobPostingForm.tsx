import * as React from "react";
import backbutton from "../../assets/icon/backbutton.svg"
import more from "../../assets/icon/more1.svg"
interface InputFieldProps {
  label: string;
  placeholder: string;
  supportText?: string;
  type?: "text" | "date" | "file";
  hasDropdown?: boolean;
}

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  minHeight?: string;
}



const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  supportText,
  type = "text",
  hasDropdown
}) => {
  const inputId = React.useId();

  const [file, setFile] = React.useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
  };




  return (
    <div className="flex flex-col w-full text-xs font-fontsm mb-6">
      <div className="flex gap-2 items-center">
        <label htmlFor={inputId} className="text-neutral-700">
          {label}
        </label>
        {supportText && (
          <span className="text-fontvlit font-light text-neutral-500">
            {supportText}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center px-1 py-1 mt-2 w-full font-light bg-white rounded-lg border-neutral-200 shadow-[0px_0px_4px_rgba(0,0,0,0.1)] text-zinc-400">
        <div className="flex flex-col w-full">
          <div className="flex gap-10 justify-between items-center w-full relative">
          {type === "file" ? (
              <>
                {/* Hidden file input */}
                <input
                  id={inputId}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                {!file ? (
                  <label
                    htmlFor={inputId}
                    className="cursor-pointer text-neutral-700 px-4 py-2 bg-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Choose File
                  </label>
                ) : (
                  <div className="flex justify-between items-center w-full bg-neutral-100 px-4 py-2 my-1   rounded-lg">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-neutral-800">{file.name}</span>
                      <span className="text-xs text-neutral-500">{(file.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile();
                      }}
                      className="text-black text-lg font-semibold cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <input
                id={inputId}
                type={type}
                placeholder={placeholder}
                className="w-full bg-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute"
              />
            )}
            {hasDropdown && (
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d8c9f9ed8ae7740306f8df362d5c19c1aee82493896d1a8de3ec62aaf942937?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-2 aspect-[2]"
              />
            )}
           {type === "date" && (
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ca6fbd53d488c4200316fbc2aa9449043d08afa49c513f81526c39bf0310a9b?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08"
                alt=""
                className="object-contain absolute right-4 w-4 aspect-square cursor-pointer"
                onClick={() => {
                  const input = document.getElementById(inputId) as HTMLInputElement;
                  input?.showPicker();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder = "Type here...",
  minHeight = "120px"
}) => {
  const textareaId = React.useId();

  return (
    <div className="flex flex-col w-full text-xs mb-4 font-font-sm">
      <label htmlFor={textareaId} className="text-neutral-700">
        {label}
      </label>
      <div className={`flex flex-col justify-center p-3 mt-2 w-full font-light bg-white rounded-lg border-neutral-200 shadow-[0px_0px_4px_rgba(0,0,0,0.1)] text-zinc-400`} style={{ minHeight }}>
        <div className="flex flex-col flex-1 w-full">
          <textarea
            id={textareaId}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none resize-none"
            aria-label={label}
          />
        </div>
      </div>
    </div>
  );
};


export const JobPostingForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex overflow-hidden flex-col items-center pb-16 mx-auto w-full bg-white max-w-[480px] font-fontsm">
      
      <div className="flex gap-10 justify-between items-center mt-5 w-full max-w-[340px]">
        <div className="flex gap-3 items-center self-stretch my-auto text-xl font-medium text-slate-600">
          <img
            loading="lazy"
            src={backbutton}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          />
          <div className="gap-2 self-stretch my-auto">Post Job</div>
        </div>
        <div className="flex gap-3 items-center self-stretch my-auto">
          <div className="flex gap-3 justify-center items-center self-stretch px-1.5 my-auto ">
            <div className="flex self-stretch my-auto min-h-[16px]" />
            <button>
            <img src={more} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6 w-full max-w-[335px]">
        <div className="flex w-full bg-gray-100 mb-5  min-h-[1px]" />
        
        <InputField
          label="Job Title"
          placeholder="Eg. Optometrist"
        />
        
        <InputField
          label="Organization Name"
          placeholder="Eg. Mumbai"
        />
        
        <InputField
          label="Organization Logo"
          type="file"
          placeholder="Choose File"
          supportText="(Suprtd.. Format: .doc/.docx/.pdf; Max size: n MB)"
        />
        
        <InputField
          label="Location"
          placeholder="Eg. Hyderabad"
          
        />
        
        <InputField
          label="Job Type"
          placeholder="Eg. Full Time"
          hasDropdown
        />
        
        <InputField
          label="Experience Level"
          placeholder="Eg. >3"
          hasDropdown
        />
        
        <InputField
          label="No. of Openings"
          placeholder="Eg.3"
        />
        
        <InputField
          label="Start Date"
          type="date"
          placeholder="DDMMYYYY"
        />
        
        <InputField
          label="Apply By Date"
          type="date"
          placeholder="DDMMYYYY"
        />
        
        <TextAreaField
          label="Job Description"
        />
        
        <TextAreaField
          label="Requirements"
        />
        
        <TextAreaField
          label="Compensation and Benefits"
        />
        
        <TextAreaField
          label="About Organization"
        />
        
        <div className="flex flex-col mt-5 w-full text-xs">
          <div className="flex w-full min-h-0 bg-neutral-200" />
          <div className="flex gap-10 justify-between items-start mt-6 w-full">
          <button className="bg-white border  border-maincl border-opacity-20  text-maincl px-3 py-1 rounded-xl">Reset</button>
          <div className="flex gap-2 items-center">
            <button className="bg-white border  border-maincl border-opacity-20  text-maincl px-3 py-1 rounded-xl">Cancel</button>
              <button className="bg-maincl text-white px-3 py-1 rounded-xl">Post Job</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};