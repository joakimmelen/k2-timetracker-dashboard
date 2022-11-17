import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("user", "token");
    navigate("/dashboard");
  };
  return (
    <div className="login">
      <h2>Welcome to login</h2>
      <p>please login to continue</p>
      <button onClick={login}>login</button>
    </div>
  );
};
export default Login;
