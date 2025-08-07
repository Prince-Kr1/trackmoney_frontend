import { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Context hook to store user

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔵 handleLogin triggered");  // Add this line
    setError("");

    // Validate inputs
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    const userData = { email, password };
    console.log("Sending user data:", userData);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, userData);

      console.log("API endpoint:", API_PATHS.AUTH.LOGIN); //DEBUG LINE

      const { token, user: loggedInUser } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        setUser(loggedInUser); // Store user in context
        console.log("User set in context:", loggedInUser); 
        navigate("/dashboard");

        console.log("Login successful", response);
        alert("Login successful!");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="might@example.com"
            label="Email Address"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Min 8 Characters"
            label="Password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>

          <p className="text-[12px] text-gray-500 mt-3">
            Demo account: Email-shoto@mha.com, Password-Shoto@123
          </p>
          
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
