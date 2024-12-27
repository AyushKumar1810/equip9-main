import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

// Mock registered user - In a real app, this would come from your backend
const MOCK_USER = {
  mobile: "1234567890",
  password: "password123",
  firstName: "Ayush",
  lastName: "Kumar"
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call and JWT verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (formData.mobile === MOCK_USER.mobile && formData.password === MOCK_USER.password) {
        // In a real app, you would receive and store the JWT token here
        localStorage.setItem('user', JSON.stringify({
          firstName: MOCK_USER.firstName,
          lastName: MOCK_USER.lastName
        }));
        
        toast.success("Login successful!");
        navigate('/dashboard');
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl animate-fadeIn">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-gray-500">Enter your credentials to login</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="1234567890"
            pattern="[0-9]{10}"
            required
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Google')}
          className="hover:bg-gray-50"
        >
          <FcGoogle className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Facebook')}
          className="hover:bg-gray-50"
        >
          <FaFacebook className="h-5 w-5 text-blue-600" />
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Apple')}
          className="hover:bg-gray-50"
        >
          <FaApple className="h-5 w-5" />
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          onClick={() => navigate('/register')}
          className="font-medium text-blue-600 hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;