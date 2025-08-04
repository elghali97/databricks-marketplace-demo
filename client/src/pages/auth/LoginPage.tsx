import { useState } from 'react';
import { Plane, Database, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoggingIn(false);
      onLogin();
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-databricks-oat-light to-databricks-oat-medium p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-databricks-navy overflow-hidden border border-databricks-oat-medium">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center space-x-3">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-databricks-lava-600 to-databricks-lava-700 rounded-2xl shadow-databricks">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                    <div className="w-3 h-3 bg-white/80 rounded-sm"></div>
                    <div className="w-3 h-3 bg-white/80 rounded-sm"></div>
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl tracking-tight text-databricks-navy-800">
                    databricks
                  </span>
                  <span className="text-sm font-medium text-databricks-lava-600 -mt-1">
                    Travel Data
                  </span>
                </div>
              </div>
              <p className="mt-3 text-databricks-navy-600">
                Sign in to the premier travel data marketplace
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-databricks-navy-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-databricks-navy-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-3 py-3 border border-databricks-oat-medium rounded-lg focus:ring-2 focus:ring-databricks-lava-500 focus:border-databricks-lava-500 text-databricks-navy-900"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-databricks-navy-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-databricks-navy-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-11 py-3 border border-databricks-oat-medium rounded-lg focus:ring-2 focus:ring-databricks-lava-500 focus:border-databricks-lava-500 text-databricks-navy-900"
                    placeholder="•••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-databricks-navy-400 hover:text-databricks-navy-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-databricks-lava-600 focus:ring-databricks-lava-500 border-databricks-oat-medium rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-databricks-navy-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-databricks-lava-600 hover:text-databricks-lava-700">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-databricks text-sm font-medium text-white bg-gradient-to-r from-databricks-lava-600 to-databricks-lava-700 hover:from-databricks-lava-700 hover:to-databricks-lava-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-databricks-lava-500 transition-all duration-200"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-databricks-navy-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-databricks-lava-600 hover:text-databricks-lava-700">
                  Create one now
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-center text-xs text-databricks-navy-500">
          By signing in, you agree to our{' '}
          <a href="#" className="text-databricks-navy-700 hover:text-databricks-navy-800">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-databricks-navy-700 hover:text-databricks-navy-800">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;