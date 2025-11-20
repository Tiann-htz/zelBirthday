import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import Image from 'next/image';
import Head from 'next/head';
import NoteModal from '../components/NoteModal';

export default function Surprise() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [visibleImages, setVisibleImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backgroundGradient = 'bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400';

  const confettiPieces = 200;
  const confettiDuration = 60000;
  const confettiContinuous = true;
  const confettiColors = ['#E9D5FF', '#F3E8FF', '#FDF4FF', '#FCE7F3', '#FBCFE8'];

  const noteWidthDesktop = 400;
  const noteHeightDesktop = 550;
  const noteWidthMobile = 280;
  const noteHeightMobile = 385;
  const noteBounceSpeed = 3;
  const noteZoomDuration = 1.2;

  const cakeWidthDesktop = 450;
  const cakeHeightDesktop = 385;
  const cakeWidthMobile = 260;
  const cakeHeightMobile = -520;
  const cakeOffsetRightDesktop = -150;
  const cakeOffsetBottomDesktop = -2;

  const bear1SizeDesktop = 150;
  const bear1SizeMobile = 80;
  const bear2SizeDesktop = 150;
  const bear2SizeMobile = 80;
  const bear3SizeDesktop = 140;
  const bear3SizeMobile = 75;
  
  const bearFadeDelay = 1.5;
  const bearBounceSpeed = 2;

  const imageWidthDesktop = 200;
  const imageHeightDesktop = 200;
  const imageWidthMobile = 120;
  const imageHeightMobile = 120;
  const imageFadeDelay = 0.8;
  const breathAnimationSpeed = 3;
  const totalImages = 6;

  const imagePositionsDesktop = [
    { top: '8%', left: '8%' },
    { top: '8%', right: '8%' },
    { top: '40%', left: '5%', transform: 'translateY(-50%)' },
    { top: '40%', right: '5%', transform: 'translateY(-50%)' },
    { bottom: '8%', left: '8%' },
    { bottom: '8%', right: '8%' },
  ];

  const imagePositionsMobile = [
    { top: '8%', left: '5%' },
    { top: '8%', right: '5%' },
    { top: '50%', left: '3%', transform: 'translateY(-50%)' },
    { top: '50%', right: '3%', transform: 'translateY(-50%)' },
    { bottom: '8%', left: '5%' },
    { bottom: '8%', right: '5%' },
  ];

  useEffect(() => {
    console.log('🎉 Surprise page loaded!');
    
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    console.log(`📐 Window size: ${window.innerWidth}x${window.innerHeight}`);

    console.log('🎊 Starting confetti animation...');
    setShowConfetti(true);

    const confettiTimer = confettiContinuous ? null : setTimeout(() => {
      console.log('🎊 Confetti animation ended');
      setShowConfetti(false);
    }, confettiDuration);

    if (confettiContinuous) {
      console.log('🎊 Confetti running continuously (never stops)');
    }

    console.log('🖼️ Starting image fade-in sequence...');
    const imageTimers = [];
    for (let i = 0; i < totalImages; i++) {
      const timer = setTimeout(() => {
        setVisibleImages(prev => {
          if (prev.includes(i)) {
            console.log(`⚠️ Image ${i + 1} already visible, skipping...`);
            return prev;
          }
          const newVisible = [...prev, i];
          console.log(`🖼️ Image ${i + 1} appeared at position ${i}`);
          if (newVisible.length === totalImages) {
            console.log('✅ All images visible! Starting breathing animation...');
          }
          return newVisible;
        });
      }, i * imageFadeDelay * 1000);
      imageTimers.push(timer);
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log('📐 Window resized');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (confettiTimer) clearTimeout(confettiTimer);
      imageTimers.forEach(timer => clearTimeout(timer));
      window.removeEventListener('resize', handleResize);
      console.log('🧹 Cleanup completed');
    };
  }, []);

  const handleNoteClick = () => {
    console.log('📝 Note clicked, opening modal...');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    console.log('📝 Modal closed');
    setIsModalOpen(false);
  };

  const allImagesVisible = visibleImages.length === totalImages;

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Leckerli+One&display=swap" rel="stylesheet" />
      </Head>

      <div className={`min-h-screen ${backgroundGradient} flex items-center justify-center p-4 relative overflow-hidden`}>
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={confettiPieces}
            colors={confettiColors}
            recycle={confettiContinuous}
            onConfettiComplete={() => {
              if (!confettiContinuous) {
                console.log('✅ Confetti animation complete!');
              }
            }}
          />
        )}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -20, 0],
          }}
          transition={{
            scale: { duration: noteZoomDuration, ease: "easeOut" },
            opacity: { duration: noteZoomDuration, ease: "easeOut" },
            y: {
              duration: noteBounceSpeed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: noteZoomDuration,
            }
          }}
          className="z-10 relative hidden md:block cursor-pointer"
          style={{ 
            width: noteWidthDesktop, 
            height: noteHeightDesktop,
          }}
          onClick={handleNoteClick}
          onAnimationStart={() => console.log('📝 Note zoom in animation started')}
          onAnimationComplete={() => console.log('📝 Note zoom complete, now bouncing')}
        >
          <Image
            src="/Images/note.png"
            alt="Note"
            width={noteWidthDesktop}
            height={noteHeightDesktop}
            className="object-contain"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: bearFadeDelay, duration: 0.5 },
              scale: { delay: bearFadeDelay, duration: 0.5 },
              y: {
                duration: bearBounceSpeed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bearFadeDelay + 0.5,
              }
            }}
            className="absolute"
            style={{
              top: '0%',
              left: '-80px',
              width: bear1SizeDesktop,
              height: bear1SizeDesktop,
              zIndex: 25,
            }}
            onAnimationStart={() => console.log('🐻 Bear 1 appearing...')}
          >
            <Image
              src="/Gifs/bear1.gif"
              alt="Bear 1"
              width={bear1SizeDesktop}
              height={bear1SizeDesktop}
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: bearFadeDelay + 0.3, duration: 0.5 },
              scale: { delay: bearFadeDelay + 0.3, duration: 0.5 },
              y: {
                duration: bearBounceSpeed + 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bearFadeDelay + 0.8,
              }
            }}
            className="absolute"
            style={{
              bottom: '75%',
              left: '-60px',
              width: bear2SizeDesktop,
              height: bear2SizeDesktop,
              zIndex: 25,
            }}
            onAnimationStart={() => console.log('🐻 Bear 2 appearing...')}
          >
            <Image
              src="/Gifs/bear2.gif"
              alt="Bear 2"
              width={bear2SizeDesktop}
              height={bear2SizeDesktop}
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: bearFadeDelay + 0.6, duration: 0.5 },
              scale: { delay: bearFadeDelay + 0.6, duration: 0.5 },
              y: {
                duration: bearBounceSpeed + 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bearFadeDelay + 1.1,
              }
            }}
            className="absolute"
            style={{
              top: '-15%',
              left: '440px',
              width: bear3SizeDesktop,
              height: bear3SizeDesktop,
              zIndex: 25,
            }}
            onAnimationStart={() => console.log('🐻 Bear 3 appearing...')}
          >
            <Image
              src="/Gifs/bear3.gif"
              alt="Bear 3"
              width={bear3SizeDesktop}
              height={bear3SizeDesktop}
              className="object-contain"
              unoptimized
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -15, 0],
          }}
          transition={{
            scale: { duration: noteZoomDuration, ease: "easeOut" },
            opacity: { duration: noteZoomDuration, ease: "easeOut" },
            y: {
              duration: noteBounceSpeed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: noteZoomDuration,
            }
          }}
          className="z-30 relative block md:hidden cursor-pointer"
          style={{ 
            width: noteWidthMobile, 
            height: noteHeightMobile,
          }}
          onClick={handleNoteClick}
        >
          <Image
            src="/Images/note.png"
            alt="Note"
            width={noteWidthMobile}
            height={noteHeightMobile}
            className="object-contain"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: bearFadeDelay, duration: 0.5 },
              scale: { delay: bearFadeDelay, duration: 0.5 },
              y: {
                duration: bearBounceSpeed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bearFadeDelay + 0.5,
              }
            }}
            className="absolute"
            style={{
              top: '-5px',
              left: '-45px',
              width: bear1SizeMobile,
              height: bear1SizeMobile,
              zIndex: 25,
            }}
          >
            <Image
              src="/Gifs/bear1.gif"
              alt="Bear 1"
              width={bear1SizeMobile}
              height={bear1SizeMobile}
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: bearFadeDelay + 0.3, duration: 0.5 },
              scale: { delay: bearFadeDelay + 0.3, duration: 0.5 },
              y: {
                duration: bearBounceSpeed + 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bearFadeDelay + 0.8,
              }
            }}
            className="absolute"
            style={{
              bottom: '60px',
              left: '-40px',
              width: bear2SizeMobile,
              height: bear2SizeMobile,
              zIndex: 25,
            }}
          >
            <Image
              src="/Gifs/bear2.gif"
              alt="Bear 2"
              width={bear2SizeMobile}
              height={bear2SizeMobile}
              className="object-contain"
              unoptimized
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: bearFadeDelay + 0.6, duration: 0.5 },
              scale: { delay: bearFadeDelay + 0.6, duration: 0.5 },
              y: {
                duration: bearBounceSpeed + 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bearFadeDelay + 1.1,
              }
            }}
            className="absolute"
            style={{
              top: '80px',
              right: '-35px',
              width: bear3SizeMobile,
              height: bear3SizeMobile,
              zIndex: 25,
            }}
          >
            <Image
              src="/Gifs/bear3.gif"
              alt="Bear 3"
              width={bear3SizeMobile}
              height={bear3SizeMobile}
              className="object-contain"
              unoptimized
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            delay: 1,
            duration: 0.8,
            ease: "easeOut",
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }
          }}
          className="absolute z-20 hidden md:block"
          style={{
            bottom: `calc(50% - ${noteHeightDesktop / 2}px + ${cakeOffsetBottomDesktop}px)`,
            right: `calc(50% - ${noteWidthDesktop / 2}px + ${cakeOffsetRightDesktop}px)`,
            width: cakeWidthDesktop,
            height: cakeHeightDesktop,
          }}
          onAnimationStart={() => console.log('🎂 Cake appearing...')}
          onAnimationComplete={() => console.log('🎂 Cake appeared!')}
        >
          <Image
            src="/Images/cake.png"
            alt="Birthday Cake"
            width={cakeWidthDesktop}
            height={cakeHeightDesktop}
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            delay: 1,
            duration: 0.8,
            ease: "easeOut",
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }
          }}
          className="absolute z-40 block md:hidden"
          style={{
            top: '40%',
            right: '15px',
            width: cakeWidthMobile,
            height: cakeHeightMobile,
          }}
        >
          <Image
            src="/Images/cake.png"
            alt="Birthday Cake"
            width={cakeWidthMobile}
            height={cakeHeightMobile}
            className="object-contain drop-shadow-2xl"
          />
        </motion.div>

        {visibleImages.map((imageIndex) => (
          <motion.div
            key={`aizel-${imageIndex}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              allImagesVisible
                ? {
                    opacity: 1,
                    scale: [1, 1.1, 1],
                  }
                : { opacity: 1, scale: 1 }
            }
            transition={
              allImagesVisible
                ? {
                    opacity: { duration: 0.5 },
                    scale: {
                      duration: breathAnimationSpeed,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: imageIndex * 0.2,
                    },
                  }
                : { duration: 1, ease: "easeOut" }
            }
            className="absolute rounded-lg shadow-xl overflow-hidden hidden md:block"
            style={{
              ...imagePositionsDesktop[imageIndex],
              width: imageWidthDesktop,
              height: imageHeightDesktop,
              zIndex: 20 + imageIndex,
            }}
            onAnimationStart={() => {
              if (imageIndex === 0 && allImagesVisible) {
                console.log('💨 Breathing animation started for all images');
              }
            }}
          >
            <Image
              src={`/Aizel/aizel${imageIndex + 1}.jpeg`}
              alt={`Aizel ${imageIndex + 1}`}
              width={imageWidthDesktop}
              height={imageHeightDesktop}
              className="object-cover rounded-lg"
            />
          </motion.div>
        ))}

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 1, 0],
              y: [100, -100],
              x: [0, (i % 2 === 0 ? 50 : -50)]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.7
            }}
            className="absolute text-3xl md:text-4xl hidden md:block"
            style={{ left: `${5 + i * 12}%`, zIndex: 5 }}
          >
            💜
          </motion.div>
        ))}

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`mobile-heart-${i}`}
            initial={{ opacity: 0, y: windowSize.height }}
            animate={{
              opacity: [0, 1, 0],
              y: [windowSize.height, -50],
              x: [0, (i % 2 === 0 ? 30 : -30)]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8
            }}
            className="absolute text-3xl block md:hidden"
            style={{ left: `${10 + i * 12}%`, zIndex: 3 }}
          >
            💜
          </motion.div>
        ))}
      </div>

      <NoteModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
      />
    </>
  );
}