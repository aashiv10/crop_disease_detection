
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Github, Twitter, Linkedin } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { username, password });
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-violet-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Welcome */}
          <div className="bg-blue-500 p-8 flex flex-col justify-center items-center text-white">
            <h2 className="text-2xl font-bold mb-2">Hello, Welcome!</h2>
            <p className="text-sm mb-6">Don't have an account?</p>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-blue-600 hover:text-white"
              asChild
            >
              <Link to="/register">Register</Link>
            </Button>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 md:col-span-1 col-span-2">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-8"
                    placeholder="Username"
                    required
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-8"
                    placeholder="Password"
                    required
                  />
                  <span className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Login
              </Button>

              <div className="text-center text-sm text-gray-500">
                <span>Or login with social platforms</span>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Github size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin size={18} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
