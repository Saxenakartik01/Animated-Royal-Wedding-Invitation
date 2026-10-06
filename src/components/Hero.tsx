import { useEffect, useRef, useState } from 'react';
import { wedding as w } from '../wedding';

type IntroStage = 'ganesh' | 'ready' | 'playing' | 'finished';

export default function Hero({
  onHeroContentVisible,
  onAudioUnlock,
}: {
  onHeroContentVisible?: () => void;
  onAudioUnlock?: () => void;
}) {
  const coupleVideoRef = useRef<HTMLVideoElement>(null);
  const plantVideoRef = useRef<HTMLVideoElement>(null);

  const [introStage, setIntroStage] = useState<IntroStage>('ganesh');
  const [isFadingGanesh, setIsFadingGanesh] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [secondTransition, setSecondTransition] = useState(false);
  const [secondVideoActive, setSecondVideoActive] = useState(false);

  const secondPreparedRef = useRef(false);
  const introFinished = introStage === 'finished';

  useEffect(() => {
    if (showHeroContent) {
      onHeroContentVisible?.();
    }
  }, [showHeroContent, onHeroContentVisible]);

  useEffect(() => {
    const shouldLock = !introFinished;

    if (shouldLock) {
      document.documentElement.classList.add('intro-locked');
      document.body.classList.add('intro-locked');
    } else {
      document.documentElement.classList.remove('intro-locked');
      document.body.classList.remove('intro-locked');
    }

    return () => {
      document.documentElement.classList.remove('intro-locked');
      document.body.classList.remove('intro-locked');
    };
  }, [introFinished]);

  const handleHeroClick = () => {
    if (introStage === 'ganesh') {
      if (!isFadingGanesh) {
        setIsFadingGanesh(true);
        setTimeout(() => {
          setIntroStage('ready');
          setIsFadingGanesh(false);
        }, 750);
      }
      return;
    }

    if (introStage === 'ready') {
      if (coupleVideoRef.current) {
        coupleVideoRef.current.play().catch(() => {});
      }
      onAudioUnlock?.();
      setIntroStage('playing');
    }
  };

  const prepareSecondVideo = () => {
    if (secondPreparedRef.current) return;
    secondPreparedRef.current = true;
    const second = plantVideoRef.current;
    if (!second) return;

    second.currentTime = 0;
    second
      .play()
      .then(() => {
        setSecondTransition(true);
        window.setTimeout(() => {
          setSecondVideoActive(true);
        }, 350);
      })
      .catch(() => {
        setSecondTransition(true);
        setSecondVideoActive(true);
      });
  };

  const handleSkip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onAudioUnlock?.();
    const first = coupleVideoRef.current;
    if (first) {
      first.pause();
    }
    prepareSecondVideo();
    setSecondTransition(true);
    setSecondVideoActive(true);
    setShowHeroContent(true);
    setIntroStage('finished');
  };

  const handleCoupleTimeUpdate = () => {
    const first = coupleVideoRef.current;
    if (!first || !Number.isFinite(first.duration)) return;

    if (first.currentTime >= first.duration - 0.45 && !secondPreparedRef.current) {
      prepareSecondVideo();
    }

    if (first.currentTime >= first.duration - 1) {
      setShowHeroContent(true);
    }
  };

  const handleCoupleVideoEnd = () => {
    if (!secondPreparedRef.current) {
      prepareSecondVideo();
    } else if (!secondVideoActive) {
      setSecondTransition(true);
      setSecondVideoActive(true);
    }
    setShowHeroContent(true);
    setIntroStage('finished');
  };

  return (
    <section className="hero" id="home" onClick={handleHeroClick}>
      {(introStage === 'ganesh' || isFadingGanesh) && (
        <div className={`ganesh-overlay ${isFadingGanesh ? 'fading' : ''}`}>
          <div className="ganesh-card">
            <img
              src={`${import.meta.env.BASE_URL}images/ganesh-ji.png`}
              alt="Shree Ganesha"
              className="ganesh-image"
            />
            <p className="ganesh-mantra">
              वक्रतुंड महाकाय सूर्यकोटि समप्रभ ।<br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
          </div>
        </div>
      )}

      <div
        className={`hero-video-wrapper ${
          secondVideoActive ? 'second-active' : secondTransition ? 'second-transition' : ''
        }`}
      >
        <video
          ref={coupleVideoRef}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleCoupleTimeUpdate}
          onEnded={handleCoupleVideoEnd}
          className="hero-bg-video hero-couple-video"
        >
          <source src={`${import.meta.env.BASE_URL}images/couple.mp4`} type="video/mp4" />
        </video>

        <video
          ref={plantVideoRef}
          muted
          playsInline
          loop
          preload="auto"
          className="hero-bg-video hero-plant-video"
        >
          <source src={`${import.meta.env.BASE_URL}images/plant-moment.mp4`} type="video/mp4" />
        </video>
      </div>

      {introStage === 'playing' && (
        <button className="hero-skip-button" onClick={handleSkip} aria-label="Skip video intro">
          Skip
        </button>
      )}

      {introStage === 'ready' && (
        <div className="hero-tap-text">
          <span>Tap anywhere to open</span>
        </div>
      )}

      <div className={`hero-content ${showHeroContent ? 'hero-reveal' : 'hero-hidden'}`}>
        <p className="script invitation">You're invited</p>
        <p className="eyebrow">to the wedding of</p>
        <h1>{w.groom} <em>&</em> {w.bride}</h1>
        <div className="date-line"><span />{w.dateLabel}<span /></div>
      </div>
    </section>
  );
}
