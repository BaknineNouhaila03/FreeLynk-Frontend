<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>
import styles from "./page.module.css";
import SignupForm from "../components/auth/SignupForm.jsx"
import LoginForm from "@/components/auth/LoginForm";
import ResetPassword from "@/components/auth/ResetPassword";
import ResetPassword2 from "@/components/auth/ResetPassword2";
import ResetPassword3 from "@/components/auth/ResetPassword3";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar></Navbar>
     </div>
  );
}
