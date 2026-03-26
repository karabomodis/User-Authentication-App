import { Link } from "react-router-dom";
import SignupForm from "../Components/SignupForm";

export default function SignupPage() {
  return (
    <div>
      {/* <h1>Signup</h1> */}
      <SignupForm />

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}