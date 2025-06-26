import React from 'react';
import { ErrorIcon } from './ErrorIcon';
import { ActionButtons } from './ActionButtons';
import { HelpfulSuggestions } from './HelpfulSuggestions';

interface NotFoundContentProps {
  navigation: {
    goHome: () => void;
    goBack: () => void;
  };
  suggestions: string[];
}

export const NotFoundContent: React.FC<NotFoundContentProps> = ({
  navigation,
  suggestions,
}) => {
  return (
    <div className="w-full max-w-2xl mx-4 space-y-6">
      <div className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl rounded-lg p-8">
        <div className="text-center">
          <ErrorIcon />
          <ActionButtons navigation={navigation} />
        </div>
      </div>

      <HelpfulSuggestions suggestions={suggestions} />
    </div>
  );
};
