import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}

export function Link({ href, children, isScrolled }: LinkProps) {
  return (
    <a
      href={href}
      className={`transition-colors font-medium ${
        isScrolled
          ? 'text-black hover:text-[#0033FF]'
          : 'text-white hover:text-white/80'
      }`}
    >
      {children}
    </a>
  );
}