import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { loginUser } from "../utils/storage";
import { toast } from "sonner";
import { LogIn, ArrowRight } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = loginUser(formData.email, formData.password);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
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
        <div className="hidden bg-gradient-to-br from-[#1d112b] via-[#2d1a3d] to-[#57336d] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-100">
              Campus hub
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-tight">Welcome back to your learning circle.</h2>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-100">Today’s momentum</p>
            <div className="mt-4 space-y-4 text-sm text-violet-50">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                <span>Skill requests</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                <span>Mentors online</span>
                <span className="font-semibold">8</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-3 px-6 pt-8 text-center sm:px-8">
            <div className="flex justify-center">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                <LogIn className="h-8 w-8" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-semibold text-slate-900">Welcome back</CardTitle>
              <CardDescription className="mt-2 text-slate-600">Sign in to access your dashboard and connect with peers.</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 pt-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="h-12 rounded-xl border-violet-200 bg-violet-50/40 focus:border-violet-500 focus:ring-violet-200"
                />
              </div>

              <Button type="submit" className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-6 text-base font-semibold text-white shadow-lg shadow-violet-200 hover:from-violet-500 hover:to-fuchsia-500">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-slate-600">
                Don’t have an account?{' '}
                <Link to="/register" className="font-semibold text-violet-600 hover:text-violet-700">
                  Register here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
