import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Users, MessageSquare, Star, ArrowRight } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl mb-6">
              Share Skills, Build Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with fellow students to share knowledge, learn new skills, and grow together on campus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl text-blue-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple platform designed to help students collaborate and share their expertise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1: Skill Sharing */}
          <Card className="border-blue-100 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-3 text-blue-900">
                Skill Sharing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Share your expertise with classmates. Whether it's programming, design, or study tips, your knowledge helps others grow.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2: Request System */}
          <Card className="border-blue-100 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-3 text-blue-900">
                Request System
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Need help with something? Send a request to students who have the skills you're looking for and connect instantly.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3: Community Ratings */}
          <Card className="border-blue-100 hover:shadow-lg transition-shadow bg-white">
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-3 text-blue-900">
                Build Your Profile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Showcase your skills, manage requests, and build meaningful connections with peers across campus.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-blue-50 rounded-2xl p-12 border border-blue-100">
          <h2 className="text-3xl text-blue-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of students already sharing knowledge on campus
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
