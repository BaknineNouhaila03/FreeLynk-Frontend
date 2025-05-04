<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>
import styles from "./page.module.css";
import SignupForm from "../components/auth/SignupForm.jsx"
import LoginForm from "@/components/auth/LoginForm";
import ResetPassword from "@/components/auth/ResetPassword";
import ResetPassword2 from "@/components/auth/ResetPassword2";
import ResetPassword3 from "@/components/auth/ResetPassword3";

import Home from '@/components/home/Home'; 
import RatingFreelancer from "@/components/rating/RatingComponent";
import AddProject from "@/components/AddProject/AddProject";
import ProjectInterface from "@/components/MyProjectDetails/ProjectDetails";
import MyProjects from "@/components/MyProjects/MyProjects";
import SavedFreelancers from "@/components/SavedFreelancers/SavedFreelancers";
import BrowseProjects from "@/components/BrowseProjects/BrowseProjects";

export default function IndexPage() {
  return <BrowseProjects  />;
}
