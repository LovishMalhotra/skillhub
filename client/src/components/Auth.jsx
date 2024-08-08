import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from "jwt-decode"

const Login = () => {
    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({
        email:"",
        password:""
    });

    const handleChange = (e) =>{
        const {name,value} = e.target; 

        setLoginData((prevData)=>({
            ...prevData,
            [name]: value
        }));
    }

    const handleLogin =  async(e) =>{
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8080/auth/login', loginData);
          const { token } = response.data;

          localStorage.setItem('authToken', token);

          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;

          // Redirect based on user role
          if (userRole === 'Admin') {
              navigate('/admin/Dashboard');
          } else {
              navigate('/user/userProfile');
          }

          console.log('Loged in');
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'An error occurred during sign-in';
          alert(`${errorMessage}`);
          console.error('Sign in failed', error);
        }

    };

  return (
    
      <section className="mt-10" >
        <div className="card container" style={{width:"500px"}}>
          <div className="row d-flex mt-5"> 
            <div className="col-lg-8 col-md-6 col-sm-12 mx-auto ">
              <div className="text-center">
                <h2 ><b> Login</b></h2>
              </div>
              <form
                className="mt-5" onSubmit={handleLogin}
              >
                
                <div className="mb-3 form-group ">
                  <label className="form-label text-start">
                    Email Address*
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="name123@gmail.com"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 form-group">
                  <label className="form-label text-start">Password*</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="***********"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className=" d-flex justify-content-between text-muted"> 
                  <div>
                    <input
                    
                      type="checkbox"
                      id="default-checkbox"
                      name="rememberMe"
                    />
                    <label htmlFor="default-checkbox" className="px-2" >
                      Remember me
                    </label>
                  </div>
                  <a href="/">Forgot Password</a>
                </div>
                <button
                  className="btn form-group btn-primary mt-5 mb-5"
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
    confirmPassword:"",
    role: "Employee",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUp((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedRole) => {
    setSignUp((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));
  };

  

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUp.password !== signUp.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/register', signUp);
      setSignUp(response.data);
      console.log('Form data:', signUp);
      navigate('/auth/login');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred during sign-up';
      alert(`${errorMessage}`);
      console.error('Sign up failed', error);
    }
  };

  return (
    <section className="mt-5 ">
      <div className="card container" style={{ width: "500px" }}>
        <div className="row d-flex mt-5">
          <div className="col-lg-8 col-md-6 col-sm-12 mx-auto">
          
            <div className="text-center">
              <h2><b>Sign Up</b></h2>
            </div>
            <form className="mt-5" onSubmit={handleSignUp}>
            <div className="mb-5 form-group">
                <div className="d-flex justify-content-around">
                  <button
                    type="button"
                    className={`btn ${signUp.role === 'Admin' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleRoleChange('Admin')}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    className={`btn ${signUp.role === 'Employee' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleRoleChange('Employee')}
                  >
                    Employee
                  </button>
                </div>
              </div>
              <div className="mb-3 form-group">
                <label className="form-label text-start">Email Address*</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="name123@gmail.com"
                  name="email"
                  value={signUp.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 form-group">
                <label className="form-label text-start">Password*</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="***********"
                  name="password"
                  value={signUp.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 form-group">
                <label className="form-label text-start">Confirm Password*</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="***********"
                  name="confirmPassword"
                  value={signUp.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between text-muted">
                <div>
                  <input
                    type="checkbox"
                    id="default-checkbox"
                    name="rememberMe"
                  />
                  <label htmlFor="default-checkbox" className="px-2">
                    Remember me
                  </label>
                </div>
                <a href="/">Forgot Password</a>
              </div>
              <button
                className="btn form-group btn-primary mt-5 mb-5"
                style={{ width: "100%" }}
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export {Login,SignUp} ;
