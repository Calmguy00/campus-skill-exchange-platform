import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { getCurrentUser, addSkill } from "../utils/storage";
import { toast } from "sonner";
import { BookOpen, ArrowLeft } from "lucide-react";

export function AddSkillPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState({
    skill_name: '',
    description: '',
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;

    // Validation
    if (!formData.skill_name || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    // Add skill
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <Card className="border-blue-100 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-blue-900">Add New Skill</CardTitle>
            <CardDescription className="text-gray-600">
              Share your expertise with fellow students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Skill Name */}
              <div className="space-y-2">
                <Label htmlFor="skill_name" className="text-blue-900">Skill Name</Label>
                <Input
                  id="skill_name"
                  type="text"
                  placeholder="e.g., React Development, Graphic Design, Data Analysis"
                  value={formData.skill_name}
                  onChange={(e) => handleChange('skill_name', e.target.value)}
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-blue-900">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your skill and what you can help others with..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="border-blue-200 focus:border-blue-500 min-h-32"
                />
                <p className="text-sm text-gray-500">
                  Provide details about your experience and what you can teach
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6"
              >
                Add Skill
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h3 className="text-lg text-blue-900 mb-3">Tips for adding skills:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Be specific about what you can teach or help with</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Mention your level of expertise (beginner, intermediate, advanced)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Include any relevant projects or experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Keep your description clear and concise</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
