import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import docsile from "../../assets/icon/docsile.svg";
import { useNavigate } from 'react-router-dom';
import LandingFooter from './LandingFooter';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQData {
  [category: string]: FAQItem[];
}

interface OpenSections {
  [key: string]: boolean;
}

const LandingPage4: React.FC = () => {
  const [openSections, setOpenSections] = useState<OpenSections>({
    'what-is-docsile': true,
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
     const navigate = useNavigate();
  

  const faqData: FAQData = {
    'General Questions': [
      {
        id: 'what-is-docsile',
        question: 'What is Docsile?',
        answer: 'Docsile is a professional networking platform designed specifically for the medical field. It connects medical students, doctors, organizations and other medical professionals, allowing them to collaborate, share knowledge, and find opportunities within the medical industry.'
      },
      {
        id: 'who-can-use',
        question: 'Who can use Docsile?',
        answer: 'Healthcare professionals, medical students, and organizations in the medical field can use Docsile.'
      },
      {
        id: 'is-free',
        question: 'Is Docsile free to use?',
        answer: 'Yes, basic features are available for free. Premium features may require a subscription.'
      }
    ],
    'Account & Profile': [
      {
        id: 'create-account',
        question: 'How do I create an account on Docsile?',
        answer: 'You can create an account by clicking "Join Now" and following the registration process.'
      },
      {
        id: 'edit-profile',
        question: 'Can I edit my profile after signing up?',
        answer: 'Yes, you can edit your profile information at any time through your account settings.'
      },
      {
        id: 'delete-account',
        question: 'How do I delete my Docsile account?',
        answer: 'You can delete your account through the account settings page.'
      }
    ],
    'Networking & Connections': [
      {
        id: 'find-connect',
        question: 'How can I find and connect with medical professionals?',
        answer: 'Use our search feature to find professionals by specialty, location, or name.'
      },
      {
        id: 'messaging',
        question: 'Can I message other users on Docsile?',
        answer: 'Yes, you can message other users through our secure messaging system.'
      },
      {
        id: 'join-groups',
        question: 'Is there a way to join groups or communities?',
        answer: 'Yes, you can join or create professional groups based on specialties or interests.'
      }
    ],
    'Learning & Tutoring': [
      {
        id: 'find-tutor',
        question: 'How can I find a tutor or mentor on Docsile?',
        answer: 'Use our mentorship matching system to find suitable tutors or mentors.'
      },
      {
        id: 'offer-tutoring',
        question: 'Can I offer my services as a tutor?',
        answer: 'Yes, qualified professionals can offer tutoring services through our platform.'
      }
    ],
    'Privacy & Security': [
      {
        id: 'data-protection',
        question: 'How does Docsile protect my data?',
        answer: 'We use industry-standard encryption and security measures to protect your data.'
      },
      {
        id: 'privacy-controls',
        question: 'Can I control who sees my profile and posts?',
        answer: 'Yes, you have full control over your privacy settings and who can view your content.'
      },
      {
        id: 'inappropriate-content',
        question: 'What should I do if I encounter inappropriate content or behavior?',
        answer: 'Report it immediately using our reporting system, and our team will investigate.'
      }
    ]
  };

  return (
    <div className="relative font-fontsm bg-white min-h-screen">
      {/* Navigation */}
      <header className="flex justify-between items-center px-4 w-full lg:px-16 py-4">
        <div className="flex items-center space-x-3">
          <img src={docsile} alt="Docsile Logo" className="h-6 md:h-8" />
        </div>
        <nav className="hidden md:flex space-x-4 lg:space-x-14">
          <a href="#" className="text-main text-sm lg:text-base font-mainfont  hover:text-gray-700">
            About Us
           
          </a>
          <a href="#" className="text-main text-sm lg:text-base font-mainfont hover:text-gray-700">
            Contact
          </a>
          <a href="#" className="text-main text-sm lg:text-base font-mainfont hover:text-gray-700">
            FAQs
            <div className="border-b-2 border-maincl pt-1 " />

          </a>
        </nav>
        <div className="flex space-x-2 md:space-x-4">
          <button onClick={() => navigate("/category")} className="text-main hover:underline font-mainfont text-xs md:text-base">
            Join Now
          </button>
          <button onClick={() => console.log("clicked")} className="border border-blue-700 text-main px-2 md:px-4 py-1 md:py-2 text-xs md:text-base font-mainfont rounded-full hover:bg-main hover:text-white">
            Sign In
          </button>
        </div>
      </header>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-maincl mb-4">
            Got questions? We've got answers to help you get started
          </h2>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {Object.entries(faqData).map(([category, questions]) => (
            <div key={category} className="space-y-4">
              <h3 className="lg:text-2xl text-xl font-medium text-gray-800">{category}</h3>
              <div className="space-y-2">
                {questions.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-400 last:border-b"
                  >
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex justify-between items-center py-4 text-left hover:text-maincl focus:outline-none"
                    >
                      <span className="text-base md:text-lg">{item.question}</span>
                      {openSections[item.id] ? (
                        <Minus className="flex-shrink-0 ml-4" size={20} />
                      ) : (
                        <Plus className="flex-shrink-0 ml-4" size={20} />
                      )}
                    </button>
                    {openSections[item.id] && (
                      <div className="pb-4 text-gray-600">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full">
        <LandingFooter />
      </footer>
     
    </div>
  );
};

export default LandingPage4;