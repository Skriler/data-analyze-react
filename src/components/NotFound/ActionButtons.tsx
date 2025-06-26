import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

interface ActionButtonsProps {
  navigation: {
    goHome: () => void;
    goBack: () => void;
  };
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ navigation }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={navigation.goHome}
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
        onClick={navigation.goBack}
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
  );
};
