const { useState, useEffect, useRef } = React;

// Opening Animation Component
const OpeningAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState('entering'); // entering, visible, exiting

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase('visible'), 500);
        const timer2 = setTimeout(() => setPhase('exiting'), 2500);
        const timer3 = setTimeout(() => onComplete(), 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className={`opening-animation ${phase}`}>
            <div className="opening-content">
                <div className="opening-heart">💕</div>
                <h1 className="opening-title">To the Love of My Life</h1>
                <div className="opening-subtitle">❤️</div>
            </div>
        </div>
    );
};

// Hero Section Component
const Hero = () => {
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [isRotating, setIsRotating] = useState(false);
    const photos = [
        'K&V/photo6.jpeg',
        'K&V/photo2.jpeg',
        'images/photo12.jpeg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIsRotating(true);
            setTimeout(() => {
                setCurrentPhoto((prev) => (prev + 1) % photos.length);
                setIsRotating(false);
            }, 400);
        }, 4000);
        return () => clearInterval(interval);
    }, [photos.length]);

    const handlePhotoChange = (index) => {
        if (index !== currentPhoto) {
            setIsRotating(true);
            setTimeout(() => {
                setCurrentPhoto(index);
                setIsRotating(false);
            }, 400);
        }
    };

    return (
        <section className="hero">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="floating-heart" style={{
                    left: `${10 + i * 20}%`,
                    top: `${15 + i * 15}%`,
                    animationDelay: `${i * 0.5}s`
                }}>💕</div>
            ))}
            <h1 className="hero-title">To the Love of My Life ❤️</h1>
            <div className="photo-carousel">
                <div className={`photo-container ${isRotating ? 'rotating' : ''}`}>
                    <img 
                        key={currentPhoto}
                        src={photos[currentPhoto]} 
                        alt="Beautiful moments"
                        className="carousel-image"
                    />
                </div>
                <div className="carousel-controls">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-btn ${index === currentPhoto ? 'active' : ''}`}
                            onClick={() => handlePhotoChange(index)}
                            aria-label={`Go to photo ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Gallery Component
const Gallery = () => {
    const moments = [
        { 
            image: 'images/photo1.jpeg',
            caption: 'Every moment with you feels like a dream come true 💕'
        },
        { 
            image: 'images/photo2.jpeg',
            caption: 'Your smile is my favorite thing in the whole world 😊✨'
        },
        { 
            image: 'images/photo3.jpeg',
            caption: 'Falling in love with you was the easiest thing I\'ve ever done 💖'
        },
        { 
            image: 'images/photo4.jpeg',
            caption: 'You make my heart skip a beat every single day 💓'
        },
        { 
            image: 'images/photo5.jpeg',
            caption: 'Being with you feels like home, safe and warm 🏠💕'
        },
        { 
            image: 'images/photo6.jpeg',
            caption: 'You are my sunshine, my moon, and all my stars 🌙⭐'
        },
        { 
            image: 'images/photo7.jpeg',
            caption: 'In your eyes, I found my forever home 👀💕'
        },
        { 
            image: 'images/photo8.jpeg',
            caption: 'You turned my world into a beautiful place 🌍✨'
        },
        { 
            image: 'images/photo9.jpeg',
            caption: 'Loving you is the best decision I\'ve ever made 💖'
        },
        { 
            image: 'images/photo10.jpeg',
            caption: 'Every day with you is a new adventure 🗺️💕'
        },
        { 
            image: 'images/photo11.jpeg',
            caption: 'You are my today and all of my tomorrows 📅💖'
        },
        { 
            image: 'images/photo13.jpeg',
            caption: 'I fall in love with you more every single day 💕✨'
        },
        { 
            image: 'images/photo14.jpeg',
            caption: 'You are my happy place, my peace, my everything 🧘💖'
        },
        { 
            image: 'images/photo16.jpeg',
            caption: 'You are the missing piece I never knew I needed 🧩💖'
        },
        { 
            image: 'images/photo17.jpeg',
            caption: 'Your love makes everything brighter and more beautiful ✨💕'
        },
        { 
            image: 'images/photo18.jpeg',
            caption: 'I love how you make ordinary moments feel extraordinary 🌟💖'
        },
        { 
            image: 'images/photo19.jpeg',
            caption: 'You are my favorite hello and my hardest goodbye 👋💕'
        },
        { 
            image: 'images/photo20.jpeg',
            caption: 'Being yours is the greatest honor of my life 💍💖'
        },
        { 
            image: 'images/photo21.jpeg',
            caption: 'Your love is the anchor that keeps me grounded ⚓💕'
        },
        { 
            image: 'images/photo22.jpeg',
            caption: 'I love you more than words could ever express 📝💖'
        },
        { 
            image: 'images/photo23.jpeg',
            caption: 'You are my always and forever, my one and only 💕✨'
        }
    ];

    const totalItems = moments.length;
    const angleStep = 360 / totalItems;

    return (
        <section className="section" id="moments">
            <h2 className="section-title">Our Moments</h2>
            <div className="gallery-3d-container">
                <div className="gallery-3d-disc">
                    {moments.map((moment, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={index}
                                className="gallery-3d-item"
                                style={{
                                    '--angle': `${angle}deg`,
                                    '--index': index
                                }}
                            >
                                <div className="gallery-item">
                                    <img src={moment.image} alt={`Memory ${index + 1}`} />
                                    <div className="gallery-caption">{moment.caption}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// Dates Component
const Dates = () => {
    const dates = [
        {
            type: 'Realisation Day',
            icon: '💕',
            date: '18th October 2025',
            title: 'Sitting on bench together',
        },
        {
            type: 'Confession Day',
            icon: '💑',
            date: '19th October 2025',
            title: 'Online Chatting',
        },
        {
            type: 'Proposal Day',
            icon: '💍',
            date: '27th October 2025',
            title: 'Unprepared Proposal with so much of effort',
        },
        {
            type: '1st Bouquet Gift',
            icon: '💐',
            date: '31st October 2025',
            title: 'Surprising you with bouquet.',
        },
        {
            type: '1st Double Date & Long Drive',
            icon: '😘',
            date: '1st November 2025',
            title: 'Went to McDonald as a surprise long drive with Shlok & Varda',
        },
        {
            type: '1 Month Anniversary',
            icon: '💌',
            date: '27th November 2025',
            title: 'Went to Champa Gali had a deep convo and good bike ride.',
        },
        {
            type: 'Special Day',
            icon: '💖',
            date: '30th November 2025',
            title: 'Made love for the first time (one big step).',
        },
        {
            type: '2 Month Anniversary',
            icon: '💝',
            date: '27th December 2025',
            title: 'Celebrated on video call together.',
        },
        {
            type: 'Long distance ended',
            icon: '🫂',
            date: '4th January 2026',
            title: 'Finally meeting each other after a winter break of 15 days which felt more than a year.',
        },
        {
            type: '3 Month Anniversary',
            icon: '💘',
            date: '27th January 2026',
            title: 'Postponed our date, went to Kake da Hotel with group.',
        },
        {
            type: 'First Night Stay',
            icon: '💕',
            date: '1st February 2026',
            title: 'Stayed at PG, drank first time together.',
        },
        {
            type: 'Valentine Week Started',
            icon: '💖',
            date: '7th February 2026',
            title: 'Valentine Week Started with flowers and chocolates.',
        },
    ];

    return (
        <section className="section" id="dates">
            <h2 className="section-title">Our Dates</h2>
            <div className="dates-timeline">
                <div className="timeline-line"></div>
                {dates.map((date, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            {date.date && (
                                <div className="timeline-date">
                                    {date.icon && <span>{date.icon} </span>}
                                    <span>{date.date}</span>
                                </div>
                            )}
                            {date.type && (
                                <div className="timeline-type">{date.type}</div>
                            )}
                            <h3 className="timeline-title">{date.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Typewriter Component
const Typewriter = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span className="typewriter-text">
            {displayedText}
            {!isComplete && <span className="typewriter-cursor">|</span>}
        </span>
    );
};

// Love Notes Component
const LoveNotes = () => {
    const notes = [
        'Every moment with you feels like a dream I never want to wake up from.',
        'Your voice is my favorite sound, and your smile is my favorite view.',
        'Distance means nothing when someone means everything.',
        'I fall in love with you more every single day, even when we\'re apart.'
    ];

    return (
        <section className="section" id="love-notes">
            <h2 className="section-title">Love Notes</h2>
            <div className="love-notes">
                {notes.map((note, index) => (
                    <div key={index} className="note-card">
                        <span className="note-heart">💖</span>
                        <Typewriter text={note} speed={30} />
                    </div>
                ))}
            </div>
        </section>
    );
};

// Surprise Modal Component
const SurpriseModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={`surprise-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className="surprise-content" onClick={(e) => e.stopPropagation()}>
                <button className="surprise-close" onClick={onClose}>×</button>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>
                    💝 A Special Message 💝
                </h2>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                    You mean the world to me, and I wanted to create something special just for you.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    Hey love, I left a few little surprises around the room for you.
                    Your first clue is waiting below 💛”
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>

                    “I am small, Vinu loves me, and I share your name.
                    Check where something crunchy waits patiently.”
                </p>
            </div>
        </div>
    );
};

// Controls Component
const Controls = ({ theme, onThemeToggle, musicPlaying, onMusicToggle, hasMusicInteraction }) => {
    // Show a pulsing music button if user hasn't interacted with music yet
    const getMusicButtonContent = () => {
        if (!hasMusicInteraction) {
            return (
                <span className="pulse-music" title="Click to enable music">
                    🔊
                </span>
            );
        }
        return musicPlaying ? '🔊' : '🔇';
    };

    return (
        <div className="controls">
            <button 
                className="control-btn" 
                onClick={onThemeToggle}
                title="Toggle Day/Night Theme"
            >
                {theme === 'day' ? '🌙' : '☀️'}
            </button>
            <button 
                className={`control-btn ${!hasMusicInteraction ? 'pulse' : ''}`} 
                onClick={onMusicToggle}
                title={hasMusicInteraction ? "Toggle Background Music" : "Click to enable background music"}
            >
                {getMusicButtonContent()}
            </button>
        </div>
    );
};

// Surprise Button Component
const SurpriseButton = ({ onClick }) => {
    return (
        <div className="surprise-button-container">
            <button 
                className="surprise-button"
                onClick={onClick}
            >
                <span className="surprise-button-heart">💝</span>
                <span className="surprise-button-text">Click for a Special Surprise!</span>
                <span className="surprise-button-heart">💝</span>
            </button>
            <p className="surprise-button-hint">A heartfelt message awaits you!</p>
        </div>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">Made with ❤️ just for you</p>
        </footer>
    );
};

// Main App Component
const App = () => {
    const [theme, setTheme] = useState('day');
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [showSurprise, setShowSurprise] = useState(false);
    const [showOpening, setShowOpening] = useState(true);
    const [hasMusicInteraction, setHasMusicInteraction] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme === 'day' ? 'day' : 'night');
    }, [theme]);

    // Initialize audio on first user interaction
    useEffect(() => {
        const initializeAudio = () => {
            if (!audioRef.current) {
                audioRef.current = new Audio('music.mp3');
                audioRef.current.loop = true;
                audioRef.current.volume = 0.5;
            }
        };

        // Listen for any user interaction to initialize audio
        const handleUserInteraction = () => {
            initializeAudio();
            setHasMusicInteraction(true);
            
            // Remove event listeners after first interaction
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };

        // Add event listeners for user interaction
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
    }, []);

    const handleThemeToggle = () => {
        setTheme(theme === 'day' ? 'night' : 'day');
    };

    const handleMusicToggle = () => {
        // On first click, initialize and play music
        if (!hasMusicInteraction) {
            setHasMusicInteraction(true);
            if (!audioRef.current) {
                audioRef.current = new Audio('music.mp3');
                audioRef.current.loop = true;
                audioRef.current.volume = 0.5;
            }
            
            audioRef.current.play().then(() => {
                setMusicPlaying(true);
            }).catch(error => {
                console.log('Failed to play audio:', error);
                setMusicPlaying(false);
            });
            return;
        }

        // Regular toggle after initialization
        if (!audioRef.current) return;

        if (musicPlaying) {
            audioRef.current.pause();
            setMusicPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setMusicPlaying(true);
            }).catch(error => {
                console.log('Failed to play audio:', error);
            });
        }
    };

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.section, .note-card, .timeline-item, .surprise-button-container');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    return (
        <>
            {showOpening && (
                <OpeningAnimation onComplete={() => setShowOpening(false)} />
            )}
            
            {!showOpening && (
                <>
                    <Controls 
                        theme={theme}
                        onThemeToggle={handleThemeToggle}
                        musicPlaying={musicPlaying}
                        onMusicToggle={handleMusicToggle}
                        hasMusicInteraction={hasMusicInteraction}
                    />
                    
                    <Hero />
                    <Gallery />
                    <Dates />
                    <LoveNotes />
                    
                    {/* Surprise button placed above footer */}
                    <SurpriseButton onClick={() => setShowSurprise(true)} />
                    
                    <Footer />
                    
                    <SurpriseModal 
                        isOpen={showSurprise} 
                        onClose={() => setShowSurprise(false)} 
                    />
                </>
            )}
        </>
    );
};

// Render the app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    });
} else {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
}