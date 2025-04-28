import Image from "next/image";
import styles from "./page.module.css";
import SignUpForm from "../components/auth/SignupForm"
export default function Home() {
  return (
    <div className={styles.page}>
      <SignUpForm/>
    </div>
  );
}
