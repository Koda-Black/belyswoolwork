import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

const LoginScreen = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <h3 className="formTitle">Log in</h3>

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

      <button>Log in</button>

      <div>
        New customer?{" "}
        <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
      </div>
    </form>
  );
};

export default LoginScreen;
