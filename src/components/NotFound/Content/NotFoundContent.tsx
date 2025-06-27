import React from 'react';
import { Card, CardContent } from '@components/Ui/Card';
import { ActionButtons } from '../Actions';
import { HelpfulSuggestions } from '../Suggestions';
import { ErrorMessage } from './ErrorMessage';

interface NotFoundContentProps {
  navigation: {
    goHome: () => void;
    goBack: () => void;
  };
  suggestions: string[];
}

const NotFoundContent: React.FC<NotFoundContentProps> = ({
  navigation,
  suggestions,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
        <CardContent className="pt-8 pb-8">
          <ErrorMessage />
          <ActionButtons navigation={navigation} />
        </CardContent>
      </Card>

      <HelpfulSuggestions suggestions={suggestions} />
    </div>
  );
};

export { NotFoundContent };
