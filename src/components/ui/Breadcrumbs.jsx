import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [], className = '' }) {
  return (
    <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
      <ol className="flex items-center flex-wrap gap-2 text-xs font-semibold text-[#807D7E]">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#8A33FD] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-[#BEBCBD] shrink-0" />
              {isLast || !item.to ? (
                <span className="text-[#3C4242] font-bold truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-[#8A33FD] transition-colors truncate max-w-[160px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
