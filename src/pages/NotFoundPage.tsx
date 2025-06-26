import { Card, CardContent } from '@components/Ui/Card';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-2xl mx-4 space-y-6">
        {/* Main 404 Card */}
        <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              {/* Large 404 Icon */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
                <FileQuestion className="h-12 w-12 text-red-600" />
              </div>

              {/* Error Message */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                404 - Page Not Found
              </h1>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The page you're looking for doesn't exist or has been moved.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoHome}
                  className="
                    flex items-center justify-center gap-2 
                    px-6 py-3 
                    bg-blue-500 hover:bg-blue-600 
                    text-white font-semibold 
                    rounded-xl 
                    shadow-lg hover:shadow-xl 
                    transform hover:scale-105 
                    transition-all duration-200
                  "
                >
                  <Home className="h-5 w-5" />
                  Go to Dashboard
                </button>

                <button
                  onClick={handleGoBack}
                  className="
                    flex items-center justify-center gap-2 
                    px-6 py-3 
                    bg-gray-500 hover:bg-gray-600 
                    text-white font-semibold 
                    rounded-xl 
                    shadow-lg hover:shadow-xl 
                    transform hover:scale-105 
                    transition-all duration-200
                  "
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go Back
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Helpful Links Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What you can do:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 leading-relaxed">
                  <li>• Check the URL for typos</li>
                  <li>• Return to the dashboard to navigate properly</li>
                  <li>• Use the browser back button</li>
                  <li>• Contact support if you believe this is an error</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
