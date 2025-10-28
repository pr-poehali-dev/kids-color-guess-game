import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
}

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];
    const newPieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < 30; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360
      });
    }
    
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-4 h-4 rounded-full animate-float"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `float 3s ease-in-out ${piece.id * 0.1}s infinite`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
