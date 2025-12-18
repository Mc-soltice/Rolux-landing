import React from 'react';

interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ to, className, children, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const targetId = to.replace('/', '');
    const element = document.getElementById(targetId || 'hero');
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (to === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (onClick) onClick();
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;