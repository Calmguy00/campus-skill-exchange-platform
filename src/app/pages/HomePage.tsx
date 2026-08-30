import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Users, MessageSquare, Star, ArrowRight, Sparkles, BookOpenText } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] text-white">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="animate-fade-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-100 shadow-[0_0_30px_rgba(216,180,255,0.12)] backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-violet-300" />
                Campus collaboration, reimagined
              </div>
              <h1 className="max-w-xl text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                Share skills.<br />
                Grow together.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-violet-100/85 sm:text-xl">
                Connect with fellow students, trade expertise, and unlock new ideas through a vibrant campus exchange network built for learning.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/register">
                  <Button size="lg" className="rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-500 to-amber-400 px-7 py-6 text-base font-semibold text-slate-950 shadow-[0_20px_40px_rgba(217,70,239,0.32)] hover:from-violet-300 hover:via-fuchsia-400 hover:to-amber-300">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="rounded-full border-violet-200/15 bg-white/5 px-7 py-6 text-base font-semibold text-white shadow-[0_10px_30px_rgba(34,22,44,0.5)] hover:bg-white/10">
                    Login
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-violet-100/80">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> 1.2k+ students</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-pink-400" /> 480+ skills shared</div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-violet-400" /> Weekly mentor sessions</div>
              </div>
            </div>

            <div className="relative animate-fade-up animate-delay-150">
              <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl animate-float-soft" />
              <div className="absolute -right-8 bottom-6 h-44 w-44 rounded-full bg-violet-400/25 blur-3xl animate-float-soft" />

              <div className="hero-scene relative mx-auto w-full max-w-[520px]">
                <div className="hero-orbit hero-orbit-one" />
                <div className="hero-orbit hero-orbit-two" />

                <div className="glass-panel hero-dashboard relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_30px_80px_rgba(37,99,235,0.35)] backdrop-blur-2xl">
                  <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-5 text-white shadow-[0_25px_60px_rgba(15,23,42,0.7)]">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-200">
                        live
                      </div>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-blue-200/80">Campus Pulse</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">Skill Exchange</h2>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
                        <BookOpenText className="h-6 w-6 text-cyan-300" />
                      </div>
                    </div>

                    <div className="mb-5 grid grid-cols-3 gap-3">
                      {[
                        { label: 'Mentors', value: '120', tone: 'bg-cyan-500/20 text-cyan-200' },
                        { label: 'Matches', value: '84%', tone: 'bg-violet-500/20 text-violet-200' },
                        { label: 'Hours', value: '32h', tone: 'bg-emerald-500/20 text-emerald-200' },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                          <div className={`mx-auto mb-2 inline-flex rounded-xl px-2 py-1 text-[10px] font-medium ${stat.tone}`}>
                            {stat.label}
                          </div>
                          <div className="text-xl font-bold text-white">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: 'Frontend Design', user: 'Aisha', tone: 'from-blue-500 to-cyan-400', badge: '4.9' },
                        { name: 'Python Help', user: 'Rohan', tone: 'from-violet-500 to-purple-400', badge: 'New' },
                        { name: 'Resume Review', user: 'Nora', tone: 'from-emerald-500 to-teal-400', badge: 'Live' },
                      ].map((item, index) => (
                        <div
                          key={item.name}
                          className="skill-feed-card flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
                          style={{ animationDelay: `${index * 140}ms` }}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.tone}`}>
                              <Star className="h-4 w-4 text-white" />
                            </span>
                            <div>
                              <p className="font-medium text-white">{item.name}</p>
                              <p className="mt-1 text-xs text-slate-300">offered by {item.user}</p>
                            </div>
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-semibold text-cyan-100">
                            {item.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="floating-pill floating-pill-one">
                  <span className="dot" />
                  24 new requests
                </div>
                <div className="floating-pill floating-pill-two">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                  Top skills trending
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">How it works</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">Skill exchange made simple</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(168,85,247,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(168,85,247,0.24)] animate-fade-up backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-300 ring-1 ring-violet-300/25">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Skill sharing</h3>
              <p className="text-violet-100/80 leading-relaxed">
                Publish your strengths and help classmates learn practical skills from real students on campus.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(168,85,247,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(168,85,247,0.24)] animate-fade-up animate-delay-150 backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-400/15 text-pink-300 ring-1 ring-pink-300/25">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Request support</h3>
              <p className="text-violet-100/80 leading-relaxed">
                Ask for guidance, exchange ideas, and discover the right peer for the exact skill you need.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(168,85,247,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(168,85,247,0.24)] animate-fade-up animate-delay-300 backdrop-blur-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/25">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Build your profile</h3>
              <p className="text-violet-100/80 leading-relaxed">
                Showcase your expertise, highlight your strengths, and grow a reputation inside your campus community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-violet-400/20 bg-gradient-to-r from-violet-400/20 via-fuchsia-500/20 to-amber-400/20 p-[1px] shadow-[0_30px_80px_rgba(168,85,247,0.32)]">
          <div className="rounded-[calc(2rem-1px)] bg-gradient-to-r from-[#1b1228] via-[#2d1b3b] to-[#2a1d2e] p-8 text-center text-white sm:p-12">
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">Ready to start learning together?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-100/80">
              Join a growing campus network of students who learn faster, share more, and build meaningful connections.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-violet-300 via-fuchsia-400 to-amber-300 px-7 py-6 text-base font-semibold text-slate-950 shadow-[0_18px_40px_rgba(216,180,255,0.35)] hover:from-violet-200 hover:via-fuchsia-300 hover:to-amber-200">
                  Create your account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="rounded-full border-white/15 bg-white/5 px-7 py-6 text-base font-semibold text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
