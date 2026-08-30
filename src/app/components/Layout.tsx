import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { getCurrentUser, logoutUser } from "../utils/storage";
import { Button } from "./ui/button";
import { GraduationCap, LogOut, Moon, SunMedium } from "lucide-react";

export function Layout() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('campus-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('campus-theme', nextDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', nextDark);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100">
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 shadow-lg shadow-violet-200 dark:shadow-violet-900/30">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">Campus Skill Exchange</span>
                <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Learn together</span>
              </div>
            </Link>

            <div className="hidden items-center gap-2 rounded-full border border-violet-100 bg-violet-50/80 p-1 md:flex dark:border-slate-700 dark:bg-slate-900/80">
              {currentUser ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="rounded-full px-4 text-slate-700 hover:bg-white hover:text-violet-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-300">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/add-skill">
                    <Button variant="ghost" className="rounded-full px-4 text-slate-700 hover:bg-white hover:text-violet-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-300">
                      Add Skill
                    </Button>
                  </Link>
                  <Link to="/requests">
                    <Button variant="ghost" className="rounded-full px-4 text-slate-700 hover:bg-white hover:text-violet-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-300">
                      Requests
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="rounded-full px-4 text-slate-700 hover:bg-white hover:text-violet-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-violet-300">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 text-white shadow-md shadow-violet-200 hover:from-violet-500 hover:to-fuchsia-500 dark:shadow-violet-900/30">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={toggleTheme}
                className="rounded-full border-violet-200 bg-white/80 text-violet-700 shadow-sm hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-violet-200 dark:hover:bg-slate-800"
                aria-label="Toggle color theme"
              >
                {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {currentUser && (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="rounded-full border-violet-200 bg-white/80 text-violet-700 shadow-sm hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-violet-200 dark:hover:bg-slate-800"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="page-shell relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.24),transparent_52%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),transparent_52%)]" />
        <Outlet />
      </main>
    </div>
  );
}
