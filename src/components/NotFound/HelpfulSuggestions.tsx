import React from 'react';
import { Search } from 'lucide-react';

interface HelpfulSuggestionsProps {
  suggestions: string[];
}

export const HelpfulSuggestions: React.FC<HelpfulSuggestionsProps> = ({
  suggestions,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
          <Search className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">What you can do:</h3>
          <ul className="text-sm text-gray-600 space-y-1 leading-relaxed">
            {suggestions.map((suggestion, index) => (
              <li key={index}>• {suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
