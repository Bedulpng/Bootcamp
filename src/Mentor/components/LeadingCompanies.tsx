import React from 'react';

const LeadingComp: React.FC = () => {
  return (
        <div className="leading-companies-section text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Trusted by Leading Companies</h2>
        <p className="text-gray-600 mb-8">
            We have partnered with leading businesses through corporate training and
            collaboration with industry professionals to support our transformational
            learning experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
            <img src="/com/bca.png" alt="BCA" className="logo-image" />
            <img src="/com/Nutrifood.png" alt="Nutrifood" className="h-12" />
            <img src="/com/kereta.png" alt="KAI" className="h-12" />
            <img src="/com/bank_jago.png" alt="Jago" className="h-12" />
            <img src="/com/sinarmas.png" alt="Sinarmas Land" className="h-12" />
            <img src="/com/djp.png" alt="DJP" className="h-12" />
        </div>
        </div>
  );
};

export default LeadingComp;
