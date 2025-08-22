import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Color palette definitions for different moods
const colorPalettes = {
  light: {
    primary: {
      50: '#f0f9f4',
      100: '#dcf2e3',
      200: '#bce5cc',
      300: '#8dd1a8',
      400: '#5bb57e',
      500: '#7C9885',
      600: '#5a8a6a',
      700: '#4a6f56',
      800: '#3f5a47',
      900: '#354a3c',
    },
    secondary: {
      50: '#f8f7ff',
      100: '#f0effe',
      200: '#e6e6fa',
      300: '#d1d0f7',
      400: '#b3b1f2',
      500: '#9b98ed',
      600: '#8a87e8',
      700: '#7a77d8',
      800: '#6663c0',
      900: '#56539b',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      tertiary: '#94a3b8',
    }
  },
  dark: {
    primary: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#7C9885',
      600: '#94a3b8',
      700: '#cbd5e1',
      800: '#e2e8f0',
      900: '#f1f5f9',
    },
    secondary: {
      50: '#0f0f23',
      100: '#1a1a2e',
      200: '#16213e',
      300: '#0f3460',
      400: '#533483',
      500: '#9b98ed',
      600: '#a78bfa',
      700: '#c084fc',
      800: '#e879f9',
      900: '#f0abfc',
    },
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
    }
  },
  warm: {
    primary: {
      50: '#fef7ed',
      100: '#fed7aa',
      200: '#fdba74',
      300: '#fb923c',
      400: '#f97316',
      500: '#ea580c',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    secondary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    background: {
      primary: '#fef7ed',
      secondary: '#fed7aa',
      tertiary: '#fdba74',
    },
    text: {
      primary: '#451a03',
      secondary: '#92400e',
      tertiary: '#c2410c',
    }
  },
  cool: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    background: {
      primary: '#eff6ff',
      secondary: '#dbeafe',
      tertiary: '#bfdbfe',
    },
    text: {
      primary: '#1e3a8a',
      secondary: '#1d4ed8',
      tertiary: '#3b82f6',
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const [colorPalette, setColorPalette] = useState(() => {
    const savedPalette = localStorage.getItem('colorPalette');
    return savedPalette || 'default';
  });

  const [autoTheme, setAutoTheme] = useState(() => {
    const savedAutoTheme = localStorage.getItem('autoTheme');
    return savedAutoTheme === 'true';
  });

  const [highContrast, setHighContrast] = useState(() => {
    const savedContrast = localStorage.getItem('highContrast');
    return savedContrast === 'true';
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    const savedMotion = localStorage.getItem('reducedMotion');
    return savedMotion === 'true';
  });

  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize || 'medium';
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark', 'warm', 'cool', 'high-contrast', 'reduced-motion');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Add color palette class
    if (colorPalette !== 'default') {
      root.classList.add(`palette-${colorPalette}`);
    }
    
    // Add high contrast class if enabled
    if (highContrast) {
      root.classList.add('high-contrast');
    }
    
    // Add reduced motion class if enabled
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    }
    
    // Apply font size
    root.style.fontSize = getFontSizeValue(fontSize);
    
    // Apply CSS custom properties for colors
    const currentPalette = colorPalettes[theme] || colorPalettes.light;
    Object.entries(currentPalette).forEach(([category, colors]) => {
      Object.entries(colors).forEach(([shade, color]) => {
        root.style.setProperty(`--color-${category}-${shade}`, color);
      });
    });
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorPalette', colorPalette);
    localStorage.setItem('autoTheme', autoTheme.toString());
    localStorage.setItem('highContrast', highContrast.toString());
    localStorage.setItem('reducedMotion', reducedMotion.toString());
    localStorage.setItem('fontSize', fontSize);
    
  }, [theme, colorPalette, autoTheme, highContrast, reducedMotion, fontSize]);

  // Listen for system theme changes and auto theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (autoTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Set initial theme based on system preference if auto theme is enabled
    if (autoTheme && !localStorage.getItem('theme')) {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [autoTheme]);

  // Dynamic theming based on time of day
  useEffect(() => {
    if (!autoTheme) return;

    const updateThemeByTime = () => {
      const hour = new Date().getHours();
      let newTheme = 'light';
      let newPalette = 'default';

      if (hour >= 6 && hour < 12) {
        // Morning: Light theme with cool palette
        newTheme = 'light';
        newPalette = 'cool';
      } else if (hour >= 12 && hour < 18) {
        // Afternoon: Light theme with default palette
        newTheme = 'light';
        newPalette = 'default';
      } else if (hour >= 18 && hour < 22) {
        // Evening: Warm theme
        newTheme = 'warm';
        newPalette = 'warm';
      } else {
        // Night: Dark theme
        newTheme = 'dark';
        newPalette = 'default';
      }

      setTheme(newTheme);
      setColorPalette(newPalette);
    };

    updateThemeByTime();
    const interval = setInterval(updateThemeByTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [autoTheme]);

  // Listen for system motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      if (!localStorage.getItem('reducedMotion')) {
        setReducedMotion(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getFontSizeValue = (size) => {
    switch (size) {
      case 'small':
        return '14px';
      case 'large':
        return '18px';
      case 'xlarge':
        return '20px';
      default:
        return '16px';
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setColorPaletteTheme = (newPalette) => {
    setColorPalette(newPalette);
  };

  const toggleAutoTheme = () => {
    setAutoTheme(prev => !prev);
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  const increaseFontSize = () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const sizes = ['small', 'medium', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const resetFontSize = () => {
    setFontSize('medium');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    colorPalette,
    setColorPaletteTheme,
    autoTheme,
    toggleAutoTheme,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    colorPalettes,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 