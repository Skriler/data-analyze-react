import React from 'react';

interface SuggestionItemProps {
  suggestion: string;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ suggestion }) => {
  return (
    <li className="text-sm text-gray-600 leading-relaxed">• {suggestion}</li>
  );
};

export { SuggestionItem };
