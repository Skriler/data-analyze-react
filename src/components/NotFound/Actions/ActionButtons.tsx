import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { NavigationButton } from './NavigationButton';

interface ActionButtonsProps {
  navigation: {
    goHome: () => void;
    goBack: () => void;
  };
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ navigation }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <NavigationButton
        onClick={navigation.goHome}
        icon={Home}
        label="Go to Dashboard"
        variant="primary"
      />

      <NavigationButton
        onClick={navigation.goBack}
        icon={ArrowLeft}
        label="Go Back"
        variant="secondary"
      />
    </div>
  );
};

export { ActionButtons };
