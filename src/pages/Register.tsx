
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Github, Twitter, Linkedin } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration attempt with:", formData);
    // Add registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-violet-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Welcome Back */}
          <div className="bg-blue-500 p-8 flex flex-col justify-center items-center text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-sm mb-6">Already have an account?</p>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-blue-600 hover:text-white"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>

          {/* Right Side - Register Form */}
          <div className="p-8 md:col-span-1 col-span-2">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Create Account
              </Button>

              <div className="text-center text-sm text-gray-500">
                <span>Or register with social platforms</span>
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

export default Register;
