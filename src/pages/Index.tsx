
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { CheckSquare, Layers, Clock, Users } from 'lucide-react';
import Header from '@/components/layout/Header';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Organize your tasks, <span className="text-primary">simplify your life</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  UserTaskSphere helps you manage your daily tasks efficiently, 
                  so you can focus on what matters most.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={user ? "/dashboard" : "/signup"}>
                    <Button size="lg" className="w-full sm:w-auto">
                      {user ? 'Go to Dashboard' : 'Get Started'}
                    </Button>
                  </Link>
                  {!user && (
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Log In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full filter blur-2xl opacity-70"></div>
                  <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 p-8 animate-scale-in">
                    <div className="flex flex-col gap-4">
                      {['Create a new website design', 'Review project proposal', 'Schedule team meeting'].map((task, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`h-5 w-5 rounded-full border ${i === 1 ? 'bg-primary border-primary' : 'border-gray-300'} flex-shrink-0`}>
                            {i === 1 && <CheckSquare className="h-4 w-4 text-white" />}
                          </div>
                          <span className={i === 1 ? 'text-gray-500 line-through' : ''}>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-gray-600">
                  Create, organize and track your tasks with ease. Mark them as complete when done.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simple Organization</h3>
                <p className="text-gray-600">
                  Keep your tasks organized in a clean, intuitive interface that makes management effortless.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Due Dates</h3>
                <p className="text-gray-600">
                  Set deadlines for your tasks and get visual indicators when they're approaching.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get organized?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their tasks more efficiently with UserTaskSphere.
            </p>
            <Link to={user ? "/dashboard" : "/signup"}>
              <Button size="lg">
                {user ? 'Go to Dashboard' : 'Get Started for Free'}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CheckSquare className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold text-gray-900">UserTaskSphere</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} UserTaskSphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
