
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
    // Add password reset logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-violet-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-xl p-8">
        <Link to="/login" className="flex items-center text-blue-500 hover:underline mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>

        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        
        {!isSubmitted ? (
          <>
            <p className="text-gray-600 text-center mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Reset Password
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to {email}
            </p>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsSubmitted(false)}
            >
              Back to Reset Form
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
