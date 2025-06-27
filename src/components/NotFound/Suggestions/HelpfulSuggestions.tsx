import React from 'react';
import { Card, CardContent } from '@components/Ui/Card';
import { Search } from 'lucide-react';
import { SuggestionItem } from './SuggestionItem';

interface HelpfulSuggestionsProps {
  suggestions: string[];
}

const HelpfulSuggestions: React.FC<HelpfulSuggestionsProps> = ({
  suggestions,
}) => {
  return (
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
            <ul className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <SuggestionItem key={index} suggestion={suggestion} />
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { HelpfulSuggestions };
