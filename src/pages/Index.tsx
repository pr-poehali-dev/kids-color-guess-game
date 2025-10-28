import { useState } from 'react';
import ColorCharacter from '@/components/ColorCharacter';
import Confetti from '@/components/Confetti';
import { Button } from '@/components/ui/button';

const colors = [
  { name: 'Красный', color: '#FF6B6B', emoji: '🍎' },
  { name: 'Синий', color: '#4ECDC4', emoji: '🦋' },
  { name: 'Жёлтый', color: '#FFE66D', emoji: '🌟' },
  { name: 'Зелёный', color: '#95E1D3', emoji: '🐸' },
  { name: 'Розовый', color: '#F38181', emoji: '🌸' },
  { name: 'Фиолетовый', color: '#AA96DA', emoji: '🍇' }
];

type GameMode = 'menu' | 'learning' | 'playing';

const Index = () => {
  const [mode, setMode] = useState<GameMode>('menu');
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleLearningNext = () => {
    if (currentColorIndex < colors.length - 1) {
      setCurrentColorIndex(currentColorIndex + 1);
    } else {
      setMode('menu');
      setCurrentColorIndex(0);
    }
  };

  const handleLearningPrev = () => {
    if (currentColorIndex > 0) {
      setCurrentColorIndex(currentColorIndex - 1);
    }
  };

  const handleGameColorClick = (colorName: string) => {
    setSelectedColor(colorName);
    const currentColor = colors[currentColorIndex];
    
    if (colorName === currentColor.name) {
      setScore(score + 1);
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
        setSelectedColor(null);
        
        if (currentColorIndex < colors.length - 1) {
          setCurrentColorIndex(currentColorIndex + 1);
        } else {
          setMode('menu');
          setCurrentColorIndex(0);
        }
      }, 2000);
    } else {
      setTimeout(() => {
        setSelectedColor(null);
      }, 1000);
    }
  };

  const startGame = () => {
    setMode('playing');
    setScore(0);
    setCurrentColorIndex(0);
    setSelectedColor(null);
  };

  if (mode === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100">
        <div className="text-center space-y-8 max-w-2xl">
          <h1 className="text-7xl font-bold text-gray-800 mb-4 animate-bounce-in">
            Радуга Цветов 🌈
          </h1>
          <p className="text-3xl text-gray-700 mb-12">
            Играй и учи цвета!
          </p>
          
          <div className="flex flex-col gap-6">
            <Button
              onClick={() => setMode('learning')}
              className="text-3xl py-12 px-16 rounded-3xl bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
            >
              📚 Обучение
            </Button>
            
            <Button
              onClick={startGame}
              className="text-3xl py-12 px-16 rounded-3xl bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
            >
              🎮 Играть
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'learning') {
    const currentColor = colors[currentColorIndex];
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Режим обучения
            </h2>
            <p className="text-2xl text-gray-600">
              Цвет {currentColorIndex + 1} из {colors.length}
            </p>
          </div>

          <div className="flex justify-center">
            <ColorCharacter
              color={currentColor.color}
              name={currentColor.name}
              emoji={currentColor.emoji}
              animate={true}
            />
          </div>

          <div className="flex justify-center gap-6">
            <Button
              onClick={handleLearningPrev}
              disabled={currentColorIndex === 0}
              className="text-2xl py-8 px-12 rounded-2xl bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50"
            >
              ← Назад
            </Button>
            
            <Button
              onClick={handleLearningNext}
              className="text-2xl py-8 px-12 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white"
            >
              {currentColorIndex === colors.length - 1 ? 'Готово! ✓' : 'Дальше →'}
            </Button>
          </div>

          <div className="text-center">
            <Button
              onClick={() => {
                setMode('menu');
                setCurrentColorIndex(0);
              }}
              variant="outline"
              className="text-xl py-6 px-10 rounded-2xl"
            >
              В меню
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'playing') {
    const currentColor = colors[currentColorIndex];
    
    return (
      <div className="min-h-screen flex flex-col p-8 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100">
        {showConfetti && <Confetti />}
        
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => {
              setMode('menu');
              setCurrentColorIndex(0);
              setScore(0);
            }}
            variant="outline"
            className="text-xl py-4 px-8 rounded-2xl"
          >
            В меню
          </Button>
          
          <div className="bg-white px-8 py-4 rounded-3xl shadow-xl">
            <p className="text-3xl font-bold text-gray-800">
              Звёзды: {score} ⭐
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold text-gray-800">
              Найди цвет:
            </h2>
            <div 
              className="inline-block px-12 py-6 rounded-3xl shadow-2xl animate-pop"
              style={{ backgroundColor: currentColor.color }}
            >
              <p className="text-6xl">{currentColor.emoji}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl">
            {colors.map((color) => (
              <ColorCharacter
                key={color.name}
                color={color.color}
                name={color.name}
                emoji={color.emoji}
                onClick={() => handleGameColorClick(color.name)}
                isSelected={selectedColor === color.name && selectedColor === currentColor.name}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
