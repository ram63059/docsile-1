import { Header } from "./Header";
import { JobsCard } from "./JobCard";
import { SearchBar } from "./SearchBar";
import { JobDetails } from "./JobDetails";
import { JobApplicationModal } from "./JobApplicationModal";
import job from "../../assets/icon/jobs.svg"
import job2 from "../../assets/icon/njob2.svg"
import resources from "../../assets/icon/resources.svg"
import resources2 from "../../assets/icon/nresources2.svg"
import cme from "../../assets/icon/cme.svg"
import cme2 from "../../assets/icon/ncme2.svg"
import membership from "../../assets/icon/membership.svg"
import membership2 from "../../assets/icon/nmembership2.svg"
import SpecialtySection from "./JobFilterCard";
import { useState } from "react";
import './styles.css';

interface Job {
  department: string;
  image: string;
  date: string;
  name: string;
  location: string;
  amount: string;
  startingDate: string;
  applyBy: string;
  numberOfApplicants: number;
  jobDescription: string;
  responsibilities: string[];
  requirements: string[];
  compensation: {
    salary: string;
    benefits: string[];
  };
  reviews?: {
    rating: number;
    count: number;
    items: Array<{
      name: string;
      rating: number;
      description: string;
      date: string;
      designation: string;
      avatar: string;
    }>;
  };
  faq?: {
    question: string;
    answer: string;
  }[];
}

const jobs: Job[] = [
  {
    department: 'Optometry',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '3 days ago',
    name: 'Bhaktivedanta Hospital & Research Institute',
    location: 'Mira Road, Mumbai, Maharashtra',
    amount: '₹40,000 - ₹80,000 per annum',
    startingDate: '25 January 2025',
    applyBy: '30 January 2025',
    numberOfApplicants: 44,
    jobDescription: 'We are seeking a dedicated and skilled Optometrist to join our growing team at VisionCare Clinics. As an Optometrist, you will be vital in providing high-quality eye care services to our patients, ensuring their vision health and satisfaction.',
    responsibilities: [
      'Conduct comprehensive eye exams to assess vision and detect eye abnormalities',
      'Prescribe corrective lenses, contact lenses, and other treatments as needed',
      'Diagnose and manage eye conditions such as glaucoma, cataracts, and retinal diseases',
      'Collaborate with ophthalmologists and other healthcare professionals for specialized treatments',
      'Maintain accurate and thorough patient records',
      'Stay updated on advancements in optometry and integrate new practices as needed'
    ],
    requirements: [
      'Bachelor\'s or Master\'s degree in Optometry (B.Optom or M.Optom)',
      'Valid registration license in India',
      '1-3 years of experience preferred, but fresh graduates are welcome to apply',
      'Strong communication and interpersonal skills to interact effectively with patients',
      'Proficiency in using diagnostic tools (e.g., ophthalmoscope, tonometer) is a plus'
    ],
    compensation: {
      salary: '₹40,000 - ₹80,000 per annum, based on experience',
      benefits: [
        'Incentives for meeting performance goals',
        'Health insurance coverage',
        'Paid time off and holidays',
        'Professional development opportunities (conferences, workshops)'
      ]
    },
    reviews: {
      rating: 4.5,
      count: 12,
      items: [
        {
          name: 'Dr. Priya Shah',
          rating: 5,
          description: 'Great opportunity for growth! The clinic is well-equipped, and the team is supportive. Perfect for honing optometry skills and building patient relationships.',
          date: '2 months ago',
          designation: 'Senior Optometrist',
          avatar:'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08',
        }
      ]
    },
    faq: [
      {
        question: 'What are the working hours?',
        answer: 'Standard working hours are 9 AM to 6 PM, Monday to Saturday with one weekly off.'
      },
      {
        question: 'Is there a probation period?',
        answer: 'Yes, there is a 3-month probation period with performance review.'
      }
    ]
  },
  {
    department: 'Cardiology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '1 day ago',
    name: 'Apollo Hospitals',
    location: 'Bangalore, Karnataka',
    amount: '₹120,000 - ₹180,000 per annum',
    startingDate: '1 February 2025',
    applyBy: '28 January 2025',
    numberOfApplicants: 28,
    jobDescription: 'Apollo Hospitals is seeking an experienced Cardiologist to join our renowned cardiac care team. The ideal candidate will be passionate about patient care and committed to maintaining our high standards of medical excellence.',
    responsibilities: [
      'Diagnose and treat cardiovascular diseases',
      'Perform and interpret cardiac diagnostic tests',
      'Provide consultation for cardiac emergencies',
      'Participate in cardiac rehabilitation programs',
      'Collaborate with cardiac surgery team for patient care'
    ],
    requirements: [
      'MD/DNB in Cardiology',
      'DM in Cardiology preferred',
      'Minimum 5 years of experience in cardiac care',
      'Experience with cardiac catheterization procedures',
      'Strong research background is a plus'
    ],
    compensation: {
      salary: '₹120,000 - ₹180,000 per annum, based on experience',
      benefits: [
        'Performance-based incentives',
        'Comprehensive health coverage',
        'Research funding opportunities',
        'Conference attendance support'
      ]
    },
    reviews: {
      rating: 4.8,
      count: 15,
      items: [
        {
          name: 'Dr. Rajesh Kumar',
          rating: 5,
          description: 'Excellent work environment with state-of-the-art facilities. Great opportunity for career growth.',
          date: '1 month ago',
          designation: 'Senior Cardiologist',
          avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
        }
      ]
    },
    faq: [
      {
        question: 'Are there on-call duties?',
        answer: 'Yes, on-call rotation is part of the role, typically one week per month.'
      },
      {
        question: 'Is relocation assistance provided?',
        answer: 'Yes, we offer comprehensive relocation support for candidates from other cities.'
      }
    ]
  },
  {
    department: 'Pediatrics',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '2 days ago',
    name: 'Rainbow Children\'s Hospital',
    location: 'Hyderabad, Telangana',
    amount: '₹60,000 - ₹90,000 per annum',
    startingDate: '10 February 2025',
    applyBy: '31 January 2025',
    numberOfApplicants: 32,
    jobDescription: 'Join our dynamic pediatric team at Rainbow Children\'s Hospital. We\'re looking for a compassionate Pediatrician who can provide exceptional care to our young patients while working collaboratively with our multidisciplinary team.',
    responsibilities: [
      'Provide primary care to children from newborn to adolescence',
      'Conduct regular health check-ups and vaccinations',
      'Diagnose and treat common childhood illnesses',
      'Coordinate with specialists for complex cases',
      'Educate parents about child health and development'
    ],
    requirements: [
      'MD/DNB in Pediatrics',
      '2-4 years of experience in pediatric care',
      'Strong communication skills with children and parents',
      'Experience in handling pediatric emergencies',
      'Knowledge of latest vaccination schedules'
    ],
    compensation: {
      salary: '₹60,000 - ₹90,000 per annum, based on experience',
      benefits: [
        'Annual performance bonus',
        'Medical insurance for family',
        'Continued medical education support',
        'Child care benefits'
      ]
    },
    reviews: {
      rating: 4.6,
      count: 8,
      items: [
        {
          name: 'Dr. Meera Reddy',
          rating: 4,
          description: 'Wonderful environment for pediatricians. Great learning opportunities with supportive senior staff.',
          date: '3 months ago',
          designation: 'Pediatrician',
          avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
        }
      ]
    },
    faq: [
      {
        question: 'What are the working hours?',
        answer: '9 AM to 5 PM with rotating emergency duties'
      },
      {
        question: 'Is there scope for academic activities?',
        answer: 'Yes, we regularly conduct CME programs and case discussions'
      }
    ]
  },
  {
    department: 'Neurology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '5 days ago',
    name: 'Fortis Healthcare',
    location: 'Delhi NCR',
    amount: '₹150,000 - ₹200,000 per annum',
    startingDate: '15 February 2025',
    applyBy: '5 February 2025',
    numberOfApplicants: 19,
    jobDescription: 'Fortis Healthcare is seeking a skilled Neurologist to join our Center of Excellence in Neurosciences. The ideal candidate will have expertise in treating complex neurological disorders and a passion for patient care.',
    responsibilities: [
      'Diagnose and treat neurological disorders',
      'Perform neurological examinations and procedures',
      'Interpret diagnostic tests including EEG and EMG',
      'Manage stroke and epilepsy cases',
      'Participate in clinical research activities'
    ],
    requirements: [
      'DM/DNB in Neurology',
      'Minimum 7 years of experience',
      'Experience with neuro-interventional procedures',
      'Research publications preferred',
      'Leadership abilities'
    ],
    compensation: {
      salary: '₹150,000 - ₹200,000 per annum, based on experience',
      benefits: [
        'Quarterly performance incentives',
        'International conference allowance',
        'Research grants',
        'Premium health insurance'
      ]
    },
    reviews: {
      rating: 4.7,
      count: 10,
      items: [
        {
          name: 'Dr. Amit Sharma',
          rating: 5,
          description: 'World-class infrastructure and excellent team. Great place for career advancement in neurology.',
          date: '2 months ago',
          designation: 'Senior Neurologist',
          avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
        }
      ]
    },
    faq: [
      {
        question: 'Is there opportunity for private practice?',
        answer: 'Yes, after regular hospital hours with revenue sharing model'
      },
      {
        question: 'What is the patient load like?',
        answer: 'Average 15-20 patients per day with complex neurological cases'
      }
    ]
  },
  {
    department: 'Dermatology',
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/13d83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08",
    date: '4 days ago',
    name: 'Manipal Hospitals',
    location: 'Chennai, Tamil Nadu',
    amount: '₹80,000 - ₹120,000 per annum',
    startingDate: '5 February 2025',
    applyBy: '29 January 2025',
    numberOfApplicants: 25,
    jobDescription: 'Manipal Hospitals is looking for an experienced Dermatologist to join our expanding department. The ideal candidate will have expertise in both medical and cosmetic dermatology.',
    responsibilities: [
      'Diagnose and treat skin conditions',
      'Perform dermatologic surgeries and procedures',
      'Provide cosmetic treatments',
      'Conduct skin cancer screenings',
      'Supervise junior dermatologists'
    ],
    requirements: [
      'MD/DNB in Dermatology',
      '3-5 years of experience',
      'Experience with laser treatments',
      'Certification in cosmetic procedures',
      'Good aesthetic sense'
    ],
    compensation: {
      salary: '₹80,000 - ₹120,000 per annum, based on experience',
      benefits: [
        'Revenue sharing for cosmetic procedures',
        'Advanced training opportunities',
        'Medical coverage',
        'Annual leave benefits'
      ]
    },
    reviews: {
      rating: 4.4,
      count: 7,
      items: [
        {
          name: 'Dr. Sneha Patel',
          rating: 4,
          description: 'Modern facilities with latest equipment. Great balance of medical and cosmetic dermatology.',
          date: '1 month ago',
          designation: 'Consultant Dermatologist',
          avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/55f83c993760da19a222234c3cbcb356d551631f91a34653bf73ab3984455ff6?placeholderIfAbsent=true&apiKey=90dc9675c54b49f9aa0dc15eba780c08'
        }
      ]
    },
    faq: [
      {
        question: 'What types of lasers are available?',
        answer: 'We have the latest CO2, Nd:YAG, and Q-switched lasers'
      },
      {
        question: 'Is there flexibility in working hours?',
        answer: 'Yes, we offer flexible scheduling with core hours requirement'
      }
    ]
  },
  // Add more similar job entries here...
];

export function JobsPage() {
    
  const [selectedOption, setSelectedOption] = useState<string>("jobs");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleAddJob = () => {
    console.log("Asking new question");
  };

 

  return (
    <div className="flex flex-col min-h-screen mx-auto">
     <div className="bg-white border-b sticky top-0 z-50">
      <Header
       onNotification={() => console.log("Notification clicked")}
       onMessage={() => console.log("Message clicked")}
       onProfile={() => console.log("Profile clicked")}
       onSearch={() => console.log("Profile clicked")}
       />
     </div>

    {/* Main Content Area */}
    <div className="flex flex-1 px-4 lg:pl-10 max-w-7xl mx-auto w-full gap-2 pt-2">
       
      {/* Left Sidebar - Explore Careers */}
      {!selectedJob && (
        <div className="hidden lg:block w-[230px] flex-shrink-0 font-fontsm transition-all duration-300">
          <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-2">
            <p className="text-maincl font-medium mb-6 mt-4">Explore Careers</p>

            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "jobs" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("jobs")}
            >
              <img
                src={selectedOption === "jobs" ? job2 : job}
                alt="Jobs"
              />
              <p>Jobs</p>
            </div>
            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "cme" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("cme")}
            >
              <img
                src={selectedOption === "cme" ? cme2 : cme}
                alt="Conference"
              />
              <p>Conference</p>
            </div>
            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "mentorship" ? "bg-fillc text-white " : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("mentorship")}
            >
              <img
                src={selectedOption === "mentorship" ? membership2 : membership}
                alt="Mentorship"
              />
              <p>Mentorship</p>
            </div>
            <div
              className={`flex gap-3 p-2 cursor-pointer rounded-lg ${
                selectedOption === "resources" ? "bg-fillc text-white rounded-lg" : "bg-buttonclr"
              }`}
              onClick={() => handleOptionSelect("resources")}
            >
              <img
                src={selectedOption === "resources" ? resources2 : resources}
                alt="Resources"
              />
              <p>Resources</p>
            </div>

          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex ${selectedJob ? 'lg:ml-0' : ''}`}>
        {/* Job Cards Section */}
        <div className={`${selectedJob ? 'lg:w-[350px] transition-all duration-300' : 'w-full'}`}>
          <div className="lg:hidden">
            <SearchBar onSearch={handleSearch} onAddJob={handleAddJob} />      
          </div>

          <div className="flex flex-col w-full p-4 lg:sticky lg:top-[80px]">
            {jobs.map((job, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setSelectedJob(job);
                  window.scrollTo(0, 0);
                  const detailsContainer = document.getElementById('job-details-container');
                  if (detailsContainer) {
                    detailsContainer.scrollTop = 0;
                  }
                }}
                className={`cursor-pointer transition-all duration-300 ${selectedJob === job ? 'scale-95 opacity-75' : ''}`}
              >
                <JobsCard 
                  job={job}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Job Details Section */}
        {selectedJob && (
          <div className="fixed lg:static top-[64px] left-0 right-0 bottom-0 bg-white lg:bg-transparent lg:flex-1 lg:min-w-[60px]">
            <div 
              id="job-details-container"
              className="h-full p-4 lg:p-0 overflow-auto scrollbar-hide"
              style={{ 
                height: 'calc(100vh - 64px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <JobDetails 
                job={selectedJob}
                onApply={() => setIsApplicationModalOpen(true)}
                onClose={() => setSelectedJob(null)} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Filters */}
      <div className="hidden lg:block w-[320px] flex-shrink-0 font-fontsm">
        <div className="sticky top-[calc(theme(spacing.24)+1px)] space-y-4">
          <SpecialtySection />
        </div>
      </div>

    </div>
    {selectedJob && (
      <JobApplicationModal
        open={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        jobTitle={selectedJob?.department || ''}
        companyLogo={selectedJob?.image || ''}
        companyName={selectedJob?.name || ''}
        job={{
          location: selectedJob?.location || '',
          amount: selectedJob?.amount || '',
          applyBy: selectedJob?.applyBy || '',
          numberOfApplicants: selectedJob?.numberOfApplicants || 0
        }}
      />
    )}
    </div>
  );
}