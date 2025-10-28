import { useState } from 'react';

interface ColorCharacterProps {
  color: string;
  name: string;
  emoji: string;
  onClick?: () => void;
  isSelected?: boolean;
  animate?: boolean;
}

const ColorCharacter = ({ color, name, emoji, onClick, isSelected, animate }: ColorCharacterProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative flex flex-col items-center gap-3 p-6 rounded-3xl cursor-pointer
        transition-all duration-300 transform
        ${animate ? 'animate-bounce-in' : ''}
        ${isHovered ? 'scale-110' : 'scale-100'}
        ${isSelected ? 'ring-8 ring-white shadow-2xl scale-110' : 'shadow-lg hover:shadow-2xl'}
      `}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`text-7xl ${isHovered ? 'animate-wiggle' : ''}`}>
        {emoji}
      </div>
      <div className="bg-white px-6 py-3 rounded-full shadow-lg">
        <p className="text-2xl font-bold text-gray-800">{name}</p>
      </div>
      {isSelected && (
        <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-pop shadow-xl">
          <span className="text-3xl">⭐</span>
        </div>
      )}
    </div>
  );
};

export default ColorCharacter;
