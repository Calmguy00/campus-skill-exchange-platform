import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  getCurrentUser, 
  getUserSkills, 
  getOtherUsersSkills, 
  getUserById,
  sendRequest,
  type Skill 
} from "../utils/storage";
import { toast } from "sonner";
import { User, BookOpen, Plus, Send, GraduationCap } from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [otherSkills, setOtherSkills] = useState<Skill[]>([]);

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Load skills
    loadSkills();
  }, [currentUser, navigate]);

  const loadSkills = () => {
    if (currentUser) {
      setMySkills(getUserSkills(currentUser.user_id));
      setOtherSkills(getOtherUsersSkills(currentUser.user_id));
    }
  };

  const handleSendRequest = (skill: Skill) => {
    if (!currentUser) return;

    const result = sendRequest({
      sender_id: currentUser.user_id,
      receiver_id: skill.user_id,
      skill_id: skill.skill_id,
    });

    if (result.success) {
      toast.success('Request sent successfully!');
    } else {
      toast.error(result.message);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <Card className="mb-8 border-blue-100 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h1 className="text-3xl mb-2">{currentUser.name}</h1>
                  <div className="flex items-center gap-4 text-blue-100">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {currentUser.department}
                    </span>
                    <span>Year {currentUser.year}</span>
                    <span>{currentUser.email}</span>
                  </div>
                </div>
              </div>
              <Link to="/add-skill">
                <Button className="bg-white text-blue-700 hover:bg-blue-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Skill
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* My Skills Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-blue-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              My Skills
            </h2>
          </div>
          
          {mySkills.length === 0 ? (
            <Card className="border-blue-100 border-dashed">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You haven't added any skills yet</p>
                <Link to="/add-skill">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Skill
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mySkills.map((skill) => (
                <Card key={skill.skill_id} className="border-blue-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900">{skill.skill_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Available Skills from Other Students */}
        <div>
          <h2 className="text-2xl text-blue-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Available Skills from Other Students
          </h2>
          
          {otherSkills.length === 0 ? (
            <Card className="border-blue-100">
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                <p className="text-gray-600">No skills available from other students yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherSkills.map((skill) => {
                const skillOwner = getUserById(skill.user_id);
                return (
                  <Card key={skill.skill_id} className="border-blue-100 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg text-blue-900">{skill.skill_name}</CardTitle>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {skillOwner?.department}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        by {skillOwner?.name} ({skillOwner?.year}th year)
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
                      <Button 
                        onClick={() => handleSendRequest(skill)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Request
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Import Users icon
import { Users } from "lucide-react";
