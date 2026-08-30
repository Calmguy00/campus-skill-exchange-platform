import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { registerUser } from "../utils/storage";
import { toast } from "sonner";
import { UserPlus, ArrowRight } from "lucide-react";

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

    if (!formData.name || !formData.email || !formData.department || !formData.year || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

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
    <div className="animate-fade-up flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-violet-100 bg-white/80 shadow-[0_30px_70px_rgba(168,85,247,0.12)] backdrop-blur-lg lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-gradient-to-br from-[#1d112b] via-[#2d1a3d] to-[#754a82] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-100">
              Join the network
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-tight">Build your campus learning profile.</h2>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-100">What you get</p>
            <ul className="mt-4 space-y-3 text-sm text-violet-50">
              <li>• Member-only skill board</li>
              <li>• Direct peer collaboration</li>
              <li>• Personalized learning connections</li>
            </ul>
          </div>
        </div>

        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-3 px-6 pt-8 text-center sm:px-8">
            <div className="flex justify-center">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <UserPlus className="h-8 w-8" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-semibold text-slate-900">Create account</CardTitle>
              <CardDescription className="mt-2 text-slate-600">Join the campus skill exchange community.</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 pt-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="h-12 rounded-xl border-violet-200 bg-violet-50/40 focus:border-violet-500 focus:ring-violet-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="h-12 rounded-xl border-violet-200 bg-violet-50/40 focus:border-violet-500 focus:ring-violet-200"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-slate-700">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                    <SelectTrigger id="department" className="h-12 rounded-xl border-violet-200 bg-violet-50/40 focus:ring-violet-200">
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

                <div className="space-y-2">
                  <Label htmlFor="year" className="text-slate-700">Year</Label>
                  <Select value={formData.year} onValueChange={(value) => handleChange('year', value)}>
                    <SelectTrigger id="year" className="h-12 rounded-xl border-violet-200 bg-violet-50/40 focus:ring-violet-200">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="h-12 rounded-xl border-violet-200 bg-violet-50/40 focus:border-violet-500 focus:ring-violet-200"
                />
              </div>

              <Button type="submit" className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-6 text-base font-semibold text-white shadow-lg shadow-violet-200 hover:from-violet-500 hover:to-fuchsia-500">
                Register
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-violet-600 hover:text-violet-700">
                  Login here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
