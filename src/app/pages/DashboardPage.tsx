import { useEffect, useMemo, useState } from "react";
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
  type Skill,
} from "../utils/storage";
import { toast } from "sonner";
import { User, BookOpen, Plus, Send, GraduationCap, Users, Sparkles, Search } from "lucide-react";
import { Input } from "../components/ui/input";

export function DashboardPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [otherSkills, setOtherSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setMySkills(getUserSkills(currentUser.user_id));
    setOtherSkills(getOtherUsersSkills(currentUser.user_id));
  }, [currentUser, navigate]);

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return otherSkills;

    return otherSkills.filter((skill) => {
      const owner = getUserById(skill.user_id);
      return (
        skill.skill_name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        owner?.name.toLowerCase().includes(query) ||
        owner?.department.toLowerCase().includes(query)
      );
    });
  }, [otherSkills, searchQuery]);

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

  const stats = [
    { label: 'Skills shared', value: String(mySkills.length), accent: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200' },
    { label: 'Available peers', value: String(otherSkills.length), accent: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200' },
    { label: 'Profile match', value: '92%', accent: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200' },
  ];

  return (
    <div className="animate-fade-up min-h-[calc(100vh-5rem)] px-4 py-8 sm:px-6 lg:px-8 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        <Card className="mb-8 overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-800 text-white shadow-[0_28px_70px_rgba(59,130,246,0.2)]">
          <CardContent className="p-8 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                  <User className="h-8 w-8 text-cyan-200" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-blue-100">
                    <Sparkles className="h-3.5 w-3.5" />
                    Student profile
                  </span>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight">{currentUser.name}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-blue-100">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4" />
                      {currentUser.department}
                    </span>
                    <span>Year {currentUser.year}</span>
                    <span>{currentUser.email}</span>
                  </div>
                </div>
              </div>

              <Link to="/add-skill">
                <Button className="rounded-full bg-white px-5 py-5 text-base font-semibold text-blue-700 shadow-lg hover:bg-blue-50">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Skill
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-blue-100 bg-white/80 shadow-[0_12px_40px_rgba(59,130,246,0.06)] dark:border-slate-700 dark:bg-slate-900/85">
              <CardContent className="p-5">
                <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${stat.accent}`}>
                  {stat.label}
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
              <BookOpen className="h-6 w-6 text-blue-600" />
              My Skills
            </h2>
          </div>

          {mySkills.length === 0 ? (
            <Card className="border border-dashed border-blue-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/85">
              <CardContent className="p-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-blue-300" />
                <p className="mb-4 text-slate-600 dark:text-slate-300">You haven’t added any skills yet.</p>
                <Link to="/add-skill">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Skill
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {mySkills.map((skill) => (
                <Card key={skill.skill_id} className="border border-blue-100 bg-white/80 shadow-[0_16px_35px_rgba(59,130,246,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_45px_rgba(59,130,246,0.1)] dark:border-slate-700 dark:bg-slate-900/85">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50">{skill.skill_name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">
              <Users className="h-6 w-6 text-violet-600" />
              Available Skills from Other Students
            </h2>

            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search skills, people, or departments"
                className="h-11 rounded-full border-blue-200 bg-white/90 pl-9 text-sm dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-50"
              />
            </div>
          </div>

          {filteredSkills.length === 0 ? (
            <Card className="border border-blue-100 bg-white/80 dark:border-slate-700 dark:bg-slate-900/85">
              <CardContent className="p-12 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-blue-300" />
                <p className="text-slate-600 dark:text-slate-300">No matching skills were found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredSkills.map((skill) => {
                const skillOwner = getUserById(skill.user_id);
                return (
                  <Card key={skill.skill_id} className="border border-blue-100 bg-white/80 shadow-[0_16px_35px_rgba(59,130,246,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_24px_45px_rgba(59,130,246,0.1)] dark:border-slate-700 dark:bg-slate-900/85">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50">{skill.skill_name}</CardTitle>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200">
                          {skillOwner?.department}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-300">
                        by {skillOwner?.name} ({skillOwner?.year}th year)
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{skill.description}</p>
                      <Button
                        onClick={() => handleSendRequest(skill)}
                        className="w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 hover:from-blue-500 hover:to-indigo-500 dark:shadow-blue-900/30"
                        size="sm"
                      >
                        <Send className="mr-2 h-4 w-4" />
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
