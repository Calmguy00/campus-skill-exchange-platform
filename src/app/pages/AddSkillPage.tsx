import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { getCurrentUser, addSkill } from "../utils/storage";
import { toast } from "sonner";
import { BookOpen, ArrowLeft, Sparkles } from "lucide-react";

export function AddSkillPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    skill_name: '',
    description: '',
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    if (!formData.skill_name || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = addSkill({
      user_id: currentUser.user_id,
      skill_name: formData.skill_name,
      description: formData.description,
    });

    if (result.success) {
      toast.success('Skill added successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="animate-fade-up min-h-[calc(100vh-5rem)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors hover:text-blue-800">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="overflow-hidden border-0 bg-white/80 shadow-[0_30px_70px_rgba(59,130,246,0.12)] backdrop-blur-lg">
            <CardHeader className="space-y-4 px-6 pt-8 text-center sm:px-8">
              <div className="flex justify-center">
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 p-3 text-blue-700 shadow-sm">
                  <BookOpen className="h-8 w-8" />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-semibold text-slate-900">Add a new skill</CardTitle>
                <CardDescription className="mt-2 text-slate-600">Share your expertise and help other students grow.</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-8 pt-4 sm:px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="skill_name" className="text-slate-700">Skill name</Label>
                  <Input
                    id="skill_name"
                    type="text"
                    placeholder="e.g., React development, graphic design, data analysis"
                    value={formData.skill_name}
                    onChange={(e) => handleChange('skill_name', e.target.value)}
                    className="h-12 rounded-xl border-blue-200 bg-blue-50/40 focus:border-blue-500 focus:ring-blue-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you can teach, your experience level, and the kind of help you can offer..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="min-h-36 rounded-xl border-blue-200 bg-blue-50/40 focus:border-blue-500 focus:ring-blue-200"
                  />
                  <p className="text-sm text-slate-500">Be specific about your experience and what peers can learn from you.</p>
                </div>

                <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-6 text-base font-semibold text-white shadow-lg shadow-blue-200 hover:from-blue-500 hover:to-indigo-500">
                  Add Skill
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-[0_18px_45px_rgba(59,130,246,0.08)]">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Tips for a strong listing</h3>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-slate-700">
              {[
                'Be specific about what you can teach or help with.',
                'Mention your level of expertise, such as beginner, intermediate, or advanced.',
                'Include relevant projects or real-world experience when helpful.',
                'Keep the description concise, clear, and easy to scan.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3 shadow-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
