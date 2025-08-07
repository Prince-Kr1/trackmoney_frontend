import { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';

const SignUp = () => {

  // const [formData, setFormData] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // For saving user data after signup


  //Handle signup form submit
  const handleSignUp = async(e) => {
    e.preventDefault();
    setError("");
    
  // Frontend validation
    if(!username.trim()) {
      setError("Please enter your name.");
      return;
    }
    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Construct JSON data properly
    const newUser  = {
      username,
      email,
      password,
    };
    console.log("Sending user data:", newUser );

    // SignUp API Call
    try {
      console.log("About to make POST request to signup");

      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, newUser);
      const { token, user: createdUser } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        setUser(createdUser); // Set the logged-in user
        navigate("/login");
        console.log("Signup  successfully", response.data);
        alert("Signup  successful!");
      }else {
        // If no token is returned, assume success & go to login
        alert("Signup successful. Please login.");
        navigate("/login");
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
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>

        <form onSubmit={handleSignUp}>

          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            type="text"
            placeholder="Larry"
            label="Full Name"
          />

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

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p> }

          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login"> 
              Login
            </Link>
          </p>

        </form>

      </div>
    </AuthLayout>
  )
}

export default SignUp