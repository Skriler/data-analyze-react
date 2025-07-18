import React from 'react';

interface AlgorithmHeaderProps {
  config: {
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
  };
}

const AlgorithmHeader: React.FC<AlgorithmHeaderProps> = ({ config }) => {
  const IconComponent = config.icon;

  return (
    <div className="flex items-center space-x-4 pb-4 border-b border-slate-200">
      <div
        className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
      >
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{config.title}</h3>
        <p className="text-sm text-slate-600">{config.description}</p>
      </div>
    </div>
  );
};

export { AlgorithmHeader };
