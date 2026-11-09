import React from 'react';
import { Award, HeartHandshake, Sparkles, UtensilsCrossed } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: UtensilsCrossed,
      title: 'Freshly Made',
      description: 'Prepared fresh, every time.',
      color: 'text-[#FFBE24]',
      bg: 'bg-[#FFBE24]/10',
    },
    {
      icon: Award,
      title: 'Quality Ingredients',
      description: 'Only the best, always.',
      color: 'text-[#F5A623]',
      bg: 'bg-[#F5A623]/10',
    },
    {
      icon: Sparkles,
      title: 'Great Ambience',
      description: 'A place to hangout and enjoy.',
      color: 'text-[#FFBE24]',
      bg: 'bg-[#FFBE24]/10',
    },
    {
      icon: HeartHandshake,
      title: 'Food for Everyone',
      description: 'Vegetarian, non-vegetarian and more.',
      color: 'text-[#F5A623]',
      bg: 'bg-[#F5A623]/10',
    },
  ];

  return (
    <section className="bg-white py-14 lg:py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-200">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center px-4 sm:px-6 py-2 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                >
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wide text-neutral-950 mb-1 group-hover:text-[#F5A623] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-600 max-w-xs font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
