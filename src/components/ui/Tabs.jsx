import React from 'react';

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = ''
}) {
  return (
    <div className={`flex border-b border-[#E6E6E6] gap-8 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              isActive
                ? 'text-[#8A33FD]'
                : 'text-[#807D7E] hover:text-[#3C4242]'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-[#8A33FD] text-white' : 'bg-[#F6F6F6] text-[#807D7E]'
                }`}>
                  {tab.badge}
                </span>
              )}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8A33FD] rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
