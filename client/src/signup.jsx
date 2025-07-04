import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name, email, password})
        .then(result=> {console.log(result)
          navigate('/login')
        })
        .catch(err=> console.log(err))
    }
  return (
    <div className="min-h-screen bg-black 0 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl w-96 shadow-2xl border border-white/20 relative z-10">
        {/* Header with icon */}
        <div className="text-center mb-8">
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 items-center" >Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/20"
              onChange={(e)=> setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/20"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/20"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-black hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 shadow-lg hover:shadow-xl mb-6">
            <span className="flex items-center justify-center">
              Register
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </form>
        
        <p className="text-white/70 text-center mb-4">Already Have an Account</p>
        <Link to="/login" className="block w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm text-decoration-none text-center">
          Login
        </Link>
        
        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 blur-2xl"></div>
      </div>
    </div>
  );
}
export default Signup;
