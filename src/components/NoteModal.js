import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function NoteModal({ isOpen, onClose }) {
  const [showStickers, setShowStickers] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [stickerPositions, setStickerPositions] = useState([
   { top: '-35px', left: '-25px', rotate: -15, delay: 0 },
    { top: '-30px', right: '-20px', rotate: 12, delay: 0.2 },
    { top: '35%', left: '-20px', rotate: -10, delay: 0.4 },
    { top: '50%', right: '-15px', rotate: 15, delay: 0.6 },
    { bottom: '110px', left: '-10px', rotate: 8, delay: 0.8 },
    { bottom: '-35px', right: '-10px', rotate: -12, delay: 1 },
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setShowStickers(true);
        console.log('🖼️ Aizel stickers appearing...');
      }, 1000);
    } else {
      document.body.style.overflow = 'unset';
      setShowStickers(false);
      setSelectedImage(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageClick = (index, e) => {
    e.stopPropagation();
    console.log(`🖼️ Image ${index + 1} clicked, opening preview...`);
    setSelectedImage(index);
  };

  const handleImageModalClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log('🖼️ Image preview closed');
      setSelectedImage(null);
    }
  };

  const handleDragEnd = (index, event, info) => {
    const newPositions = [...stickerPositions];
    const currentPos = newPositions[index];
    
    if (currentPos.top && currentPos.left) {
      newPositions[index] = {
        ...currentPos,
        top: `calc(${currentPos.top} + ${info.offset.y}px)`,
        left: `calc(${currentPos.left} + ${info.offset.x}px)`,
      };
    } else if (currentPos.top && currentPos.right) {
      newPositions[index] = {
        ...currentPos,
        top: `calc(${currentPos.top} + ${info.offset.y}px)`,
        right: `calc(${currentPos.right} - ${info.offset.x}px)`,
      };
    } else if (currentPos.bottom && currentPos.left) {
      newPositions[index] = {
        ...currentPos,
        bottom: `calc(${currentPos.bottom} - ${info.offset.y}px)`,
        left: `calc(${currentPos.left} + ${info.offset.x}px)`,
      };
    } else if (currentPos.bottom && currentPos.right) {
      newPositions[index] = {
        ...currentPos,
        bottom: `calc(${currentPos.bottom} - ${info.offset.y}px)`,
        right: `calc(${currentPos.right} - ${info.offset.x}px)`,
      };
    }
    
    setStickerPositions(newPositions);
    console.log(`📍 Sticker ${index + 1} moved to new position`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-amber-50 rounded-lg shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto p-8 relative"
              style={{
                backgroundImage: 'linear-gradient(to bottom, #fffbeb 0%, #fef3c7 100%)',
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-purple-600 hover:text-purple-800 text-2xl font-bold z-50"
              >
                ×
              </button>

              <div className="space-y-4 relative z-10" style={{ fontFamily: "'Berkshire Swash', serif" }}>
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-purple-700 text-center mb-6"
                >
                  Happy Birthday Babe! 🎂
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4 text-purple-800"
                  style={{ fontFamily: "'Leckerli One', cursive" }}
                >
                  <p className="text-lg leading-relaxed">
                    I created this special website just for you because words alone could never capture how much you mean to me.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Every moment with you feels like a beautiful dream I never want to wake up from. Your smile lights up my darkest days, and your laughter is the sweetest melody I've ever heard.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Thank you for being my comfort, my joy, and my home. You make everything better just by being you.
                  </p>

                  <p className="text-lg leading-relaxed">
                    On this special day, I want you to know that you deserve all the happiness in the world, and I promise to do everything I can to make you smile every single day.
                  </p>

                  <p className="text-xl leading-relaxed text-center font-bold text-purple-900 mt-6">
                    I love you more than words can say. 💖
                  </p>

                  <p className="text-lg leading-relaxed text-right italic">
                    Forever yours,
                    <br />
                    Your Love - Tiann
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full font-semibold text-lg shadow-lg"
                >
                  Close 💝
                </motion.button>
              </div>
            </div>

            {showStickers && stickerPositions.map((pos, index) => (
              <motion.div
                key={`sticker-${index}`}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: pos.rotate 
                }}
                transition={{
                  delay: pos.delay,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                drag
                dragMomentum={false}
                dragElastic={0.1}
                onDragEnd={(event, info) => handleDragEnd(index, event, info)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95, cursor: 'grabbing' }}
                className="absolute rounded-lg shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  left: pos.left,
                  right: pos.right,
                  width: '80px',
                  height: '80px',
                  zIndex: 60,
                }}
                onClick={(e) => handleImageClick(index, e)}
              >
                <Image
                  src={`/Aizel/aizel${index + 1}.jpeg`}
                  alt={`Sticker ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover rounded-lg border-4 border-white shadow-2xl pointer-events-none"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4"
            onClick={handleImageModalClick}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/Aizel/aizel${selectedImage + 1}.jpeg`}
                alt={`Full view ${selectedImage + 1}`}
                width={800}
                height={800}
                className="object-contain rounded-2xl shadow-2xl border-8 border-white w-full h-auto max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}