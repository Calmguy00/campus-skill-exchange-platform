import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { registerUser } from "../utils/storage";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.department || !formData.year || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Register user
    const result = registerUser({
      name: formData.name,
      email: formData.email,
      department: formData.department,
      year: parseInt(formData.year),
      password: formData.password,
    });

    if (result.success) {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-blue-100 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-blue-900">Create Account</CardTitle>
          <CardDescription className="text-gray-600">
            Join the campus skill exchange community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-900">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@college.edu"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-blue-900">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                <SelectTrigger id="department" className="border-blue-200">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Information Technology">Information Technology</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year" className="text-blue-900">Year</Label>
              <Select value={formData.year} onValueChange={(value) => handleChange('year', value)}>
                <SelectTrigger id="year" className="border-blue-200">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
            >
              Register
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Login here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
