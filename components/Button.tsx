import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-light' | 'text' | 'whatsapp';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-serif tracking-widest uppercase transition-all duration-500 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm relative overflow-hidden group";
  
  const variants = {
    // Primary: Gold BG with Brown Text (Luxury Standard)
    primary: "bg-brand-gold text-brand-brown hover:shadow-xl hover:-translate-y-1 rounded-sm",
    
    // Outline: Brown Border/Text (For light backgrounds)
    outline: "border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-brand-gold rounded-sm",
    
    // Outline Light: White Border/Text (For dark images/overlays)
    'outline-light': "border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-brown rounded-sm",
    
    // Text: Simple Link style
    text: "text-brand-brown hover:text-brand-gold underline-offset-8 hover:underline p-0",
    
    // WhatsApp: Specific Brand Color
    whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-lg hover:shadow-xl font-sans font-bold tracking-normal normal-case rounded-full px-6 py-3"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;