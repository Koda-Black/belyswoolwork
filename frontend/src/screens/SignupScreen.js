import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

const SignupScreen = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <h3 className="formTitle">Sign up</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button>Sign up</button>
      {/* {error && <div className="error">{error}</div>} */}
      <div>
        Have an account? <Link to={`/login?redirect=${redirect}`}>Login</Link>
      </div>
    </form>
  );
};

export default SignupScreen;
