import React from 'react';

const LogoIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M13.3,18.8l-1.5-1.5c-3.1-3.1-6-5.6-6-8.6C5.8,5.4,7.9,3.3,10.6,3.3c1.5,0,2.9,0.7,3.9,1.8c1-1.1,2.4-1.8,3.9-1.8c2.7,0,4.8,2.1,4.8,4.8c0,3-2.9,5.5-6,8.6L14.7,18.8z" transform="translate(-2.8 -1.3)" fill="#FFF" stroke="#FFF" strokeWidth="0.5"/>
        <text x="7" y="14" fontFamily="serif" fontSize="6px" fill="#FFF" fontWeight="bold">CN</text>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 shadow-md shrink-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center text-center">
        <LogoIcon className="h-8 w-8 mr-3 text-blue-400"/>
        <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Sua Opinião é Muito Importante Para Nós</h1>
            <p className="text-blue-300 text-xs md:text-sm">Clube Naval - Sede Social</p>
        </div>
      </div>
    </header>
  );
};