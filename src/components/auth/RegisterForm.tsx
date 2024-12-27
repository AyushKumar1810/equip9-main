import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("Registration successful!");
      navigate('/login');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
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
        <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
        <p className="text-gray-500">Enter your details to register</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

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
          {loading ? "Registering..." : "Register"}
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
        Already have an account?{" "}
        <button
          onClick={() => navigate('/login')}
          className="font-medium text-blue-600 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;