import { Outlet, Link, useNavigate } from "react-router";
import { getCurrentUser, logoutUser } from "../utils/storage";
import { Button } from "./ui/button";
import { GraduationCap, LogOut } from "lucide-react";

export function Layout() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-900">Campus Skill Exchange</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/add-skill">
                    <Button variant="ghost" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50">
                      Add Skill
                    </Button>
                  </Link>
                  <Link to="/requests">
                    <Button variant="ghost" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50">
                      Requests
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout} 
                    variant="outline" 
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
