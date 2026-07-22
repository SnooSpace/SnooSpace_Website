import React from 'react';

interface CategorySvgProps {
  className?: string;
  size?: number;
}

// 1. Co-Work & Study (Blue Theme)
export const CoWorkSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="13" width="20" height="7" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round" />
    <path d="M6 13V8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V13" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 10H14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1.2" fill="#2563EB" />
  </svg>
);

// 2. Gym & Fitness (Emerald Green Theme)
export const GymSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.5 4V20M17.5 4V20" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <rect x="4.5" y="7" width="4" height="10" rx="1.5" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
    <rect x="15.5" y="7" width="4" height="10" rx="1.5" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
    <path d="M2.5 9.5V14.5M21.5 9.5V14.5" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M8.5 12H15.5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3. Ride & Cycling (Teal Theme)
export const RideSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="5.5" cy="16.5" r="3.5" fill="#F0FDFA" stroke="#1E293B" strokeWidth="2" />
    <circle cx="18.5" cy="16.5" r="3.5" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
    <path d="M5.5 16.5L9.5 9.5H14.5L18.5 16.5" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 9.5L12 16.5" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
    <path d="M13.5 7H16.5" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
    <circle cx="15" cy="4.5" r="1.5" fill="#0D9488" />
  </svg>
);

// 4. Yoga & Flow (Refined Lotus Pose & Aura Theme - Violet/Purple)
export const YogaSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Lotus Petal Base */}
    <path d="M12 20.5C7.5 20.5 3.5 18 3.5 16C6 16 8.5 17.5 12 19.5C15.5 17.5 18 16 20.5 16C20.5 18 16.5 20.5 12 20.5Z" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Head / Sun */}
    <circle cx="12" cy="4.5" r="2.2" fill="#7C3AED" />
    {/* Meditating Lotus Body & Arms */}
    <path d="M12 7V13" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M6 11.5C8 9.5 10 9 12 9C14 9 16 9.5 18 11.5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 16L8.5 13.5L12 16L15.5 13.5L19 16" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. Shopping (Hot Pink Theme)
export const ShoppingSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6 9L4 20H20L18 9H6Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V11" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 13H15" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 6. Bar & Drinks (Ruby Red Theme)
export const BarSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M5 4H19L13 12V19H17V21H7V19H11V12L5 4Z" fill="#FFE4E6" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
    <path d="M7.5 7H16.5" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 9.5L14.5 7" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="4" r="1.5" fill="#FECDD3" stroke="#E11D48" strokeWidth="1" />
  </svg>
);

// 7. Cafe & Coffee (Amber Gold Theme)
export const CafeSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 9H17V14C17 16.2091 15.2091 18 13 18H8C5.79086 18 4 16.2091 4 14V9Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
    <path d="M17 10H19C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14H17" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 21H18" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 4C7 4 8 5 8 6.5C8 8 7 9 7 9" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 3.5C11 3.5 12 4.5 12 6C12 7.5 11 8.5 11 8.5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 4C15 4 16 5 16 6.5C16 8 15 9 15 9" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 8. Hangout (Group Social Chillout Theme - Fuchsia Magenta)
export const HangoutSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Center Main Friend */}
    <circle cx="12" cy="7" r="2.5" fill="#E879F9" stroke="#C084FC" strokeWidth="1.5" />
    <path d="M7.5 17.5C7.5 14.8 9.5 13 12 13C14.5 13 16.5 14.8 16.5 17.5" stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" />
    
    {/* Left Friend */}
    <circle cx="6" cy="8.5" r="2" fill="#FAE8FF" stroke="#D946EF" strokeWidth="1.5" />
    <path d="M2.5 18C2.5 15.8 4 14.2 6 14.2C6.8 14.2 7.5 14.5 8.2 15" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Right Friend */}
    <circle cx="18" cy="8.5" r="2" fill="#FAE8FF" stroke="#D946EF" strokeWidth="1.5" />
    <path d="M15.8 15C16.5 14.5 17.2 14.2 18 14.2C20 14.2 21.5 15.8 21.5 18" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Social Chat Sparkle */}
    <path d="M12 2L12.5 3.5L14 4L12.5 4.5L12 6L11.5 4.5L10 4L11.5 3.5L12 2Z" fill="#D946EF" />
  </svg>
);

// 9. Gaming (Indigo Electric Theme)
export const GamingSvgIcon: React.FC<CategorySvgProps> = ({ className = "w-5 h-5", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="6" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
    <path d="M6 12H10M8 10V14" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <circle cx="15.5" cy="10.5" r="1.2" fill="#4F46E5" />
    <circle cx="17.5" cy="13.5" r="1.2" fill="#4F46E5" />
    <path d="M9 18L10.5 21M15 18L13.5 21" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
