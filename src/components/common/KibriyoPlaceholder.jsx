import React from 'react';

export default function KibriyoPlaceholder({ pageName }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3C4242]">
        Часть Кибриё: {pageName}
      </h1>
    </div>
  );
}
