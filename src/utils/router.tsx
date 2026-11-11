import React, { useState, useEffect, useCallback } from 'react';

export type AppRoute =
  | '/'
  | '/about'
  | '/atelier'
  | '/institutional'
  | '/contact'
  | '/authenticity'
  | '/privacy'
  | '/terms'
  | '/404';

// Helper to normalize path (remove trailing slash except for root)
export const normalizePath = (path: string): string => {
  if (!path) return '/';
  const clean = path.split('?')[0].split('#')[0];
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1);
  }
  return clean || '/';
};

// Custom navigation dispatcher
export const navigate = (to: string, replace = false): void => {
  if (to.startsWith('#')) {
    // Anchor link handling
    const hashTarget = document.getElementById(to.substring(1));
    if (hashTarget) {
      hashTarget.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }

  if (replace) {
    window.history.replaceState({}, '', to);
  } else {
    window.history.pushState({}, '', to);
  }

  // Dispatch custom popstate event so all router hooks update
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Hook to subscribe to browser route changes
export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return {
    currentPath,
    navigate: useCallback((to: string, replace = false) => navigate(to, replace), []),
  };
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  className = '',
  activeClassName = '',
  children,
  onClick,
  ...props
}) => {
  const { currentPath } = useRouter();
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  const isAnchor = href.startsWith('#');
  const isActive = !isExternal && !isAnchor && normalizePath(href) === currentPath;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    if (e.defaultPrevented || isExternal) return;

    // Handle normal anchor jumps
    if (isAnchor) {
      if (currentPath !== '/') {
        // If not on home page, navigate to home with hash
        e.preventDefault();
        navigate(`/${href}`);
      }
      return;
    }

    // Intercept standard left-clicks without modifier keys
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
};
