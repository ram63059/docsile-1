import { createBrowserRouter } from "react-router-dom";
import MainFeed from "../pages/MainFeed";
import Careers from "../pages/Careers";
import Category from "../pages/Category";
import DoctorSignup from "../pages/DoctorSignup";
import OrganisationSignup from "../pages/OrganisationSignup";
import StudentSignup from "../pages/StudentSignup";
import JoinNow from "../pages/JoinNow";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import VerifyOTP from "../pages/VerifyOTP";
import Profile from "../pages/Profile";
import Questions from "../pages/Questions";
import StudentProfile_Profile from "../pages/StudentProfile_Profile";
import StudentProfile_Profile_2 from "../pages/StudentProfile_Profile_2";
import StudentProfile_verify from "../pages/StudentProfile_verify";
import StudentProfile_Interests from "../pages/StudentProfile_Interests";
import StudentProfileComplete from "../pages/StudentProfileComplete";
import DoctorsProfile_profile from "../pages/DoctorsProfile_profile";
import DoctorsProfile_education from "../pages/DoctorsProfile_education";
import DoctorsProfile_interests from "../pages/DoctorsProfile_interests";
import OrganisationsProfile_profile from "../pages/OrganisationsProfile_profile";
import OrganisationProfile_Verify from "../pages/OrganisationProfile_Verify";
import OrganisationProfile_interests from "../pages/OrganisationProfile_interests";
import DoctorProfileComplete from "../pages/DoctorProfileComplete";
import AskQuestion from "@/pages/AskQuestion";
import PublishPost from "@/pages/PublishPost";
import Certifications from "@/pages/Certifications";
import Acheivements from "@/pages/Acheivements";
import Experience from "@/pages/Experience";
import Educations from "@/pages/Educations";
import Memberships from "@/pages/Memberships";
import InvitationsList from "@/pages/InvitationsList";
import ConnectionsProfile from "@/pages/ConnectionsProfile";
import Jobs from "@/pages/Jobs";
import Conferrences from "@/pages/Conferrences";
// import Message from "@/pages/Message";

import Notifications from "@/pages/Notifications";
import QuestionPage from "@/pages/QuestionPage";
import PhoneSignup from "@/pages/PhoneSignup";
// import Safety from "@/pages/Safety";
import Group from "@/pages/Group";
import { SocialFeed } from "@/components/socialFeed/SocialFeed";
import { QuestionFeed } from "@/components/questionFeed/QuestionFeed";
import Networkpage from "@/components/Network/Networkpage";
import CommunityPage from "@/components/Network/CommunityPage";
import OrganizationPage from "@/components/Network/OrganizationPage";
import { ResourcesPage } from "@/components/resouces/ResourcesPage";
import MentorshipPage from "@/components/mentorship/MentorshipPage";
import ConferencePage from "@/components/conferences/ConferencesPage";
import { JobsPage } from "@/components/jobs/JobsPage";
import ReelPlayerPage from "@/components/videos/ReelplayerPage";
import { JobPostingForm } from "@/components/jobPosting/JobPostingForm";
import StoriesSection from "@/components/socialFeed/StoriesPopup";
import EducationPage from "@/components/education/EducationPage";
// import Grpsafety from "@/pages/socketsafe/grpsafety";
import QuestionDetail from "../pages/QuestionDetail";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainFeed />,
  },
  { path: "/careers", element: <Careers /> },
  { path: "/category", element: <Category /> },
  { path: "/signup/doctor/:id", element: <DoctorSignup /> },
  { path: "/signup/organisation/:id", element: <OrganisationSignup /> },
  { path: "/signup/student/:id", element: <StudentSignup /> },
  { path: "/join-now", element: <JoinNow /> },
  { path: "/signin", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
  { path: "/profile/:id", element: <Profile /> },
  { path: "/questions", element: <Questions /> },
  { path: "/student/student-profile", element: <StudentProfile_Profile /> },
  { path: "/student/student-profile-2", element: <StudentProfile_Profile_2 /> },
  { path: "/student/student-verify", element: <StudentProfile_verify /> },
  { path: "/student/student-interests", element: <StudentProfile_Interests /> },
  {
    path: "/student/student-profile-complete",
    element: <StudentProfileComplete />,
  },
  { path: "/doctor/doctor-profile", element: <DoctorsProfile_profile /> },
  { path: "/doctor/doctor-education", element: <DoctorsProfile_education /> },
  { path: "/doctor/doctor-interests", element: <DoctorsProfile_interests /> },
  {
    path: "/doctor/doctor-profile-complete",
    element: <DoctorProfileComplete />,
  },
  {
    path: "/organisation/organisation-profile",
    element: <OrganisationsProfile_profile />,
  },
  {
    path: "/organisation/organisation-verify",
    element: <OrganisationProfile_Verify />,
  },
  {
    path: "/organisation/organisation-interests",
    element: <OrganisationProfile_interests />,
  },
  {
    path: "/organisation/organisation-profile-complete",
    element: <DoctorProfileComplete />,
  },
  { path: "/ask-question/:id", element: <AskQuestion /> },

  { path: "/publish-post/:id", element: <PublishPost /> },
  { path: "/add-certificate/:id", element: <Certifications /> },
  { path: "/add-achievements/:id", element: <Acheivements /> },
  { path: "/add-professional-experience/:id", element: <Experience /> },
  { path: "/add-education/:id", element: <Educations /> },
  { path: "/add-memberships/:id", element: <Memberships /> },
  { path: "/connections/:id", element: <InvitationsList /> },
  { path: "/connections-profile/:id", element: <ConnectionsProfile /> },
  { path: "/jobs/:id", element: <Jobs /> },
  { path: "/conferrences/:id", element: <Conferrences /> },
  {path : "/message/:id", element : <Group/>},
  {path : "/notifications", element : <Notifications/>},
  {path : "question-page", element : <QuestionPage/>},
  {path : "/phonesignup" , element : <PhoneSignup/>},
  {path : "/socialfeed" , element : <SocialFeed/>},
  {path: "/questionsfeed",element:<QuestionFeed/>},
  {path: "/network",element:<Networkpage/>},
  {path: "/network/community",element:<CommunityPage/>},
  {path: "/network/organization",element:<OrganizationPage/>},
  {path: "/resources",element:<ResourcesPage/>},
  {path: "/mentorship",element:<MentorshipPage/>},
  {path: "/conferences",element:<ConferencePage/>},
  {path: "/job",element:<JobsPage/>},
  {path: "/videos",element:<ReelPlayerPage/>},
  {path: "/jobposting",element:<JobPostingForm/>},
  {path: "/stories",element:<StoriesSection/>},
  {path: "/addEducation",element:<EducationPage/>},
  {
    path: "/question/:questionId",
    element: <QuestionDetail />,
  },
]);
