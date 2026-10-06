import { useRef, useState } from 'react';
import { wedding as w } from './wedding';
import Hero from './components/Hero';

export default function App() {
  const [musicVisible, setMusicVisible] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicUnlockedRef = useRef(false);
  const musicStartedRef = useRef(false);

  const musicUrl = w.musicUrl ? `${import.meta.env.BASE_URL}${w.musicUrl}` : '';

  const unlockMusic = async () => {
    if (musicUnlockedRef.current) return;
    musicUnlockedRef.current = true;

    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.currentTime = 0;
      audio.volume = 0;
      await audio.play();
    } catch (error) {
      console.error('Audio unlock failed:', error);
    }
  };

  const startWeddingMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset song to 0:00 only the first time text & music button appear
    audio.currentTime = 0;
    audio.volume = 0.5;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error('Music play failed:', error);
      }
    }

    setMusicVisible(true);
    setIsMusicPlaying(true);
  };

  const handleHeroContentVisible = () => {
    if (!musicStartedRef.current) {
      musicStartedRef.current = true;
      startWeddingMusic();
    }
  };

  const toggleMusic = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsMusicPlaying(true);
      } else {
        audio.pause();
        setIsMusicPlaying(false);
      }
    } catch (error) {
      console.error('Music toggle failed:', error);
    }
  };

  return (
    <>
      <main>
        <Hero
          onAudioUnlock={unlockMusic}
          onHeroContentVisible={handleHeroContentVisible}
        />
      </main>

      {musicUrl && (
        <>
          <audio
            ref={audioRef}
            src={musicUrl}
            preload="auto"
            loop
            onPlay={() => setIsMusicPlaying(true)}
            onPause={() => setIsMusicPlaying(false)}
            onEnded={() => setIsMusicPlaying(false)}
          />
          {musicVisible && (
            <button
              type="button"
              className={`music-button ${isMusicPlaying ? 'playing' : ''}`}
              onClick={toggleMusic}
              aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
            >
              {isMusicPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18V5l10-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="16" cy="16" r="3" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18V5l10-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="16" cy="16" r="3" />
                  <path d="M4 4l16 16" />
                </svg>
              )}
            </button>
          )}
        </>
      )}
    </>
  );
}

