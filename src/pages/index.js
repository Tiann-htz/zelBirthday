import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);
  const [showClosed, setShowClosed] = useState(true);

  const gradientColors = 'from-purple-300 via-purple-200 to-pink-200';
  
  const envelopeWidthDesktop = 400;
  const envelopeHeightDesktop = 300;
  const envelopeWidthMobile = 280;
  const envelopeHeightMobile = 210;
  
  const bounceSpeed = 2;
  const zoomOutSpeed = 0.8;
  const zoomInSpeed = 0.8;
  const pageTransitionDelay = 2.5;
  const wordWaveDelay = 0.3;
  const wordWaveDuration = 1.2;

  const handleEnvelopeClick = () => {
    console.log('🎯 Envelope clicked!');
    setIsOpening(true);
    console.log('📤 Opening animation started...');
    
    setTimeout(() => {
      console.log('🔍 Closed envelope zooming out...');
      setShowClosed(false);
    }, zoomOutSpeed * 1000);
    
    setTimeout(() => {
      console.log('✅ Opening animation complete!');
      console.log('🚀 Navigating to surprise page...');
      router.push('/surprise');
    }, pageTransitionDelay * 1000);
  };

  console.log('🎨 Envelope page loaded');
  console.log(`📊 Current state - isOpening: ${isOpening}, showClosed: ${showClosed}`);

  const text = "I made something special for you...";
  const words = text.split(' ');

  const wordVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        delay: i * wordWaveDelay,
        duration: wordWaveDuration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: (words.length * wordWaveDelay)
      }
    })
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Leckerli+One&display=swap" rel="stylesheet" />
      </Head>

      <div className={`min-h-screen bg-gradient-to-br ${gradientColors} flex flex-col items-center justify-center p-4`}>
        <motion.h1
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-purple-600 mb-6 md:mb-8 text-center flex flex-wrap justify-center gap-x-2 md:gap-x-3 px-2"
          style={{ fontFamily: "'Berkshire Swash', serif" }}
          onAnimationComplete={() => console.log('🌊 Continuous wave animation running')}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              custom={index}
              animate="animate"
              variants={wordVariants}
              onAnimationStart={() => {
                if (index === 0) console.log('🌊 Continuous word wave started (loops forever)');
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <div 
          className="relative cursor-pointer hidden md:block" 
          onClick={handleEnvelopeClick}
          style={{ width: envelopeWidthDesktop, height: envelopeHeightDesktop }}
        >
          <AnimatePresence>
            {showClosed && (
              <motion.div
                animate={!isOpening ? {
                  y: [0, -20, 0],
                  rotate: [0, -2, 2, -2, 0]
                } : {}}
                exit={{ 
                  scale: 0,
                  transition: { 
                    duration: zoomOutSpeed,
                    ease: "easeIn"
                  }
                }}
                transition={{
                  duration: bounceSpeed,
                  repeat: isOpening ? 0 : Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-0 left-0"
                style={{ width: envelopeWidthDesktop, height: envelopeHeightDesktop }}
                onAnimationComplete={() => {
                  if (isOpening) {
                    console.log('✅ Closed envelope zoomed out complete!');
                  }
                }}
              >
                <Image
                  src="/Images/enveloped_closed.png"
                  alt="Closed Envelope"
                  width={envelopeWidthDesktop}
                  height={envelopeHeightDesktop}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpening && !showClosed && (
              <motion.div
                initial={{ 
                  scale: 0
                }}
                animate={{ 
                  scale: [0, 1.1, 1],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: zoomInSpeed,
                  times: [0, 0.7, 1],
                  ease: "easeOut"
                }}
                className="absolute top-0 left-0"
                style={{ width: envelopeWidthDesktop, height: envelopeHeightDesktop }}
                onAnimationStart={() => console.log('🎬 Opened envelope zooming in...')}
                onAnimationComplete={() => console.log('🎉 Opened envelope zoom in complete!')}
              >
                <Image
                  src="/Images/enveloped_opened.png"
                  alt="Opened Envelope"
                  width={envelopeWidthDesktop}
                  height={envelopeHeightDesktop}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div 
          className="relative cursor-pointer block md:hidden" 
          onClick={handleEnvelopeClick}
          style={{ width: envelopeWidthMobile, height: envelopeHeightMobile }}
        >
          <AnimatePresence>
            {showClosed && (
              <motion.div
                animate={!isOpening ? {
                  y: [0, -15, 0],
                  rotate: [0, -2, 2, -2, 0]
                } : {}}
                exit={{ 
                  scale: 0,
                  transition: { 
                    duration: zoomOutSpeed,
                    ease: "easeIn"
                  }
                }}
                transition={{
                  duration: bounceSpeed,
                  repeat: isOpening ? 0 : Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-0 left-0"
                style={{ width: envelopeWidthMobile, height: envelopeHeightMobile }}
              >
                <Image
                  src="/Images/enveloped_closed.png"
                  alt="Closed Envelope"
                  width={envelopeWidthMobile}
                  height={envelopeHeightMobile}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpening && !showClosed && (
              <motion.div
                initial={{ 
                  scale: 0
                }}
                animate={{ 
                  scale: [0, 1.1, 1],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: zoomInSpeed,
                  times: [0, 0.7, 1],
                  ease: "easeOut"
                }}
                className="absolute top-0 left-0"
                style={{ width: envelopeWidthMobile, height: envelopeHeightMobile }}
              >
                <Image
                  src="/Images/enveloped_opened.png"
                  alt="Opened Envelope"
                  width={envelopeWidthMobile}
                  height={envelopeHeightMobile}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 1, 0],
              y: [100, -100],
              x: [0, (i % 2 === 0 ? 50 : -50)]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-3xl md:text-4xl"
            style={{ left: `${10 + i * 15}%` }}
          >
            💜
          </motion.div>
        ))}
      </div>
    </>
  );
}