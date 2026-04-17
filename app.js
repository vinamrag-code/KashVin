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
    const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
    const photos = [
        'K&V/photo6.jpeg',
        'K&V/photo2.jpeg',
        'images/photo12.jpeg',
        'images/photo1.jpeg',
        'images/photo3.jpeg'
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
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="floating-heart"
                    style={{
                        left: `${Math.random() * 90}%`,
                        top: `${Math.random() * 90}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        fontSize: `${Math.random() * 1 + 1.5}rem`,
                        opacity: `${Math.random() * 0.3 + 0.4}`,
                        filter: `hue-rotate(${Math.random() * 60}deg)`
                    }}
                >
                    {['💕', '💖', '💗', '💓', '💝', '💘'][Math.floor(Math.random() * 6)]}
                </div>
            ))}

            {[...Array(20)].map((_, i) => (
                <div
                    key={`sparkle-${i}`}
                    className="sparkle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        width: `${Math.random() * 4 + 4}px`,
                        height: `${Math.random() * 4 + 4}px`
                    }}
                />
            ))}
            <h1 className="hero-title">To the Love of My Life ❤️</h1>
            <div className="photo-carousel">
                <div
                    className={`photo-container ${isRotating ? 'rotating' : ''}`}
                    onMouseEnter={() => setIsHoveringPhoto(true)}
                    onMouseLeave={() => setIsHoveringPhoto(false)}
                >
                    <img
                        key={currentPhoto}
                        src={photos[currentPhoto]}
                        alt="Beautiful moments"
                        className="carousel-image"
                        style={{
                            transform: isHoveringPhoto ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 0.4s ease'
                        }}
                    />
                </div>
                <div className="carousel-controls">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-btn ${index === currentPhoto ? 'active' : ''}`}
                            onClick={() => handlePhotoChange(index)}
                            aria-label={`Go to photo ${index + 1}`}
                            style={{
                                background: index === currentPhoto
                                    ? 'linear-gradient(135deg, var(--pink-deep), var(--pink-medium))'
                                    : 'var(--pink-medium)',
                                transform: index === currentPhoto ? 'scale(1.3)' : 'scale(1)'
                            }}
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
            <h2 className="section-title">Our Beautiful Moments 💖</h2>
            <div className="gallery-3d-container">
                <div className="gallery-3d-disc">
                    {moments.map((moment, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={index}
                                className="gallery-3d-item"
                                style={{
                                    '--angle': `${angle}deg`
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
    const [visibleItems, setVisibleItems] = useState({});
    const timelineRef = useRef(null);

    const dates = [
        {
            type: 'Realisation Day',
            icon: '💕',
            date: '18th October 2025',
            title: 'Sitting on bench together',
            color: 'var(--pink-soft)',
            sparkles: true
        },
        {
            type: 'Confession Day',
            icon: '💑',
            date: '19th October 2025',
            title: 'Online Chatting',
            color: 'var(--pink-medium)',
            sparkles: true
        },
        {
            type: 'Proposal Day',
            icon: '💍',
            date: '27th October 2025',
            title: 'Unprepared Proposal with so much of effort',
            color: 'var(--pink-deep)',
            sparkles: true
        },
        {
            type: '1st Bouquet Gift',
            icon: '💐',
            date: '31st October 2025',
            title: 'Surprising you with bouquet.',
            color: 'var(--lavender)',
            sparkles: true
        },
        {
            type: '1st Double Date & Long Drive',
            icon: '😘',
            date: '1st November 2025',
            title: 'Went to McDonald as a surprise long drive with Shlok & Varda',
            color: 'var(--gold)',
            sparkles: true
        },
        {
            type: '1 Month Anniversary',
            icon: '💌',
            date: '27th November 2025',
            title: 'Went to Champa Gali had a deep convo and good bike ride.',
            color: 'var(--pink-medium)',
            sparkles: true
        },
        {
            type: 'Special Day',
            icon: '💖',
            date: '30th November 2025',
            title: 'Made love for the first time (one big step).',
            color: 'var(--pink-deep)',
            sparkles: true
        },
        {
            type: '2 Month Anniversary',
            icon: '💝',
            date: '27th December 2025',
            title: 'Celebrated on video call together.',
            color: 'var(--lavender-dark)',
            sparkles: true
        },
        {
            type: 'Long distance ended',
            icon: '🫂',
            date: '4th January 2026',
            title: 'Finally meeting each other after a winter break of 15 days which felt more than a year.',
            color: 'var(--pink-soft)',
            sparkles: true
        },
        {
            type: '3 Month Anniversary',
            icon: '💘',
            date: '27th January 2026',
            title: 'Postponed our date, went to Kake da Hotel with group.',
            color: 'var(--pink-medium)',
            sparkles: true
        },
        {
            type: 'First Night Stay',
            icon: '💕',
            date: '1st February 2026',
            title: 'Stayed at PG, drank first time together.',
            color: 'var(--pink-deep)',
            sparkles: true
        },
        {
            type: 'Valentine Week Started',
            icon: '💖',
            date: '7th February 2026',
            title: 'Valentine Week Started with flowers and chocolates.',
            color: 'var(--lavender)',
            sparkles: true
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleItems(prev => ({...prev, [index]: true}));
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            item.dataset.index = index;
            observer.observe(item);
        });

        return () => {
            items.forEach(item => observer.unobserve(item));
        };
    }, []);

    return (
        <section className="section" id="dates">
            <h2 className="section-title">Our Love Timeline 💕</h2>
            <div className="dates-timeline" ref={timelineRef}>
                <div className="timeline-line"></div>
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className={`timeline-item ${visibleItems[index] ? 'visible' : ''}`}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            transitionDelay: `${index * 0.1}s`
                        }}
                        data-index={index}
                    >
                        <div
                            className="timeline-dot"
                            style={{
                                background: date.color,
                                boxShadow: `0 0 30px ${date.color.replace(')', ', 0.5)').replace('rgb', 'rgba')},
                                0 0 50px ${date.color.replace(')', ', 0.3)').replace('rgb', 'rgba')}`
                            }}
                            title={`Click to highlight`}
                            onClick={() => {
                                const item = document.querySelector(`.timeline-item:nth-child(${index + 1}) .timeline-content`);
                                if (item) {
                                    item.style.transform = 'translateY(-15px) scale(1.05)';
                                    item.style.boxShadow = `0 30px 70px ${date.color.replace(')', ', 0.4)').replace('rgb', 'rgba')}`;

                                    setTimeout(() => {
                                        item.style.transform = 'translateY(-10px) scale(1.03)';
                                        item.style.boxShadow = '0 25px 60px var(--shadow-medium)';
                                    }, 1000);
                                }
                            }}
                        ></div>
                        <div
                            className="timeline-content"
                            style={{
                                borderColor: date.color.replace(')', ', 0.3)').replace('rgb', 'rgba'),
                                '--timeline-color': date.color
                            }}
                        >
                            {date.date && (
                                <div className="timeline-date">
                                    {date.icon && <span className="timeline-date-icon">{date.icon}</span>}
                                    <span>{date.date}</span>
                                </div>
                            )}
                            {date.type && (
                                <div
                                    className="timeline-type"
                                    style={{ color: date.color }}
                                >
                                    {date.type}
                                </div>
                            )}
                            <h3 className="timeline-title">{date.title}</h3>

                            {date.sparkles && (
                                <div className="sparkle" style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    width: '8px',
                                    height: '8px',
                                    animation: 'sparkle 2s ease-in-out infinite'
                                }} />
                            )}
                        </div>
                    </div>
                ))}

                {/* Timeline floating hearts */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`timeline-heart-${i}`}
                        className="floating-heart"
                        style={{
                            left: `${Math.random() * 90 + 5}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            fontSize: `${Math.random() * 1 + 1.2}rem`,
                            opacity: `${Math.random() * 0.2 + 0.3}`
                        }}
                    >
                        {['💕', '💖', '💗'][Math.floor(Math.random() * 3)]}
                    </div>
                ))}
            </div>
        </section>
    );
};

// Typewriter Component
const Typewriter = ({ text, speed = 50, onComplete }) => {
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
                if (onComplete) {
                    onComplete();
                }
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return (
        <span className="typewriter-text">
            {displayedText}
            {!isComplete && <span className="typewriter-cursor">|</span>}
        </span>
    );
};

// Love Notes Component
const LoveNotes = () => {
    const [visibleNotes, setVisibleNotes] = useState({});
    const notesRef = useRef(null);

    const notes = [
        {
            text: 'Every moment with you feels like a dream I never want to wake up from.',
            icon: '💭',
            color: 'var(--pink-soft)'
        },
        {
            text: 'Your voice is my favorite sound, and your smile is my favorite view.',
            icon: '😊',
            color: 'var(--pink-medium)'
        },
        {
            text: 'Distance means nothing when someone means everything.',
            icon: '💕',
            color: 'var(--pink-deep)'
        },
        {
            text: 'I fall in love with you more every single day, even when we\'re apart.',
            icon: '💘',
            color: 'var(--lavender)'
        },
        {
            text: 'You are the reason I believe in love at first sight, and every sight after.',
            icon: '👀',
            color: 'var(--gold)'
        },
        {
            text: 'In your arms is where I feel most at home, most loved, and most myself.',
            icon: '🏠',
            color: 'var(--lavender-dark)'
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        setVisibleNotes(prev => ({...prev, [index]: true}));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const noteCards = document.querySelectorAll('.note-card');
        noteCards.forEach((card, index) => {
            card.dataset.index = index;
            observer.observe(card);
        });

        return () => {
            noteCards.forEach(card => observer.unobserve(card));
        };
    }, []);

    return (
        <section className="section" id="love-notes" ref={notesRef}>
            <h2 className="section-title">Love Notes from My Heart 💌</h2>
            <div className="love-notes">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className="note-card"
                        data-index={index}
                        style={{
                            opacity: visibleNotes[index] ? 1 : 0,
                            transform: visibleNotes[index] ? 'translateY(0)' : 'translateY(30px)',
                            transition: `all 0.6s ease-out ${index * 0.1}s`,
                            borderColor: note.color.replace(')', ', 0.4)').replace('rgb', 'rgba'),
                            '--note-color': note.color
                        }}
                    >
                        <span
                            className="note-heart"
                            style={{
                                color: note.color,
                                fontSize: '2.5rem',
                                animationDelay: `${index * 0.2}s`
                            }}
                        >
                            {note.icon}
                        </span>
                        <Typewriter
                            text={note.text}
                            speed={25}
                            onComplete={() => {
                                // Add a subtle animation when typing completes
                                const heart = document.querySelector(`.note-card:nth-child(${index + 1}) .note-heart`);
                                if (heart) {
                                    heart.style.animation = 'heartbeat 1s ease-in-out, float 3s ease-in-out infinite';
                                }
                            }}
                        />

                        {/* Decorative sparkles */}
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="sparkle"
                                style={{
                                    position: 'absolute',
                                    left: `${Math.random() * 80 + 10}%`,
                                    top: `${Math.random() * 60 + 20}%`,
                                    width: `${Math.random() * 3 + 3}px`,
                                    height: `${Math.random() * 3 + 3}px`,
                                    background: note.color,
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Floating hearts around notes section */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={`notes-heart-${i}`}
                    className="floating-heart"
                    style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 30 + 35}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        fontSize: `${Math.random() * 1 + 1.5}rem`,
                        opacity: `${Math.random() * 0.2 + 0.4}`
                    }}
                >
                    {['💕', '💖', '💗', '💓'][Math.floor(Math.random() * 4)]}
                </div>
            ))}
        </section>
    );
};

// Surprise Modal Component
const SurpriseModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={`surprise-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
            {/* Floating hearts in modal */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="surprise-heart"
                    style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top: `${Math.random() * 90 + 5}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        fontSize: `${Math.random() * 1 + 1.5}rem`,
                        opacity: `${Math.random() * 0.3 + 0.5}`
                    }}
                >
                    {['💕', '💖', '💗', '💓', '💝', '💘'][Math.floor(Math.random() * 6)]}
                </div>
            ))}

            <div className="surprise-content" onClick={(e) => e.stopPropagation()}>
                <button className="surprise-close" onClick={onClose}>×</button>
                <h2 style={{
                    fontSize: '2.2rem',
                    marginBottom: '1.5rem',
                    fontFamily: "'Playfair Display', serif",
                    color: 'var(--pink-deep)',
                    textShadow: '0 2px 4px var(--shadow-soft)'
                }}>
                    💝 A Special Message Just For You 💝
                </h2>
                <p style={{
                    fontSize: '1.3rem',
                    lineHeight: '1.8',
                    marginBottom: '1.5rem',
                    color: 'var(--text-dark)'
                }}>
                    You mean the world to me, and I wanted to create something special just for you.
                </p>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    borderLeft: '4px solid var(--pink-deep)'
                }}>
                    <p style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.7',
                        color: 'var(--text-dark)',
                        fontStyle: 'italic'
                    }}>
                        "Hey love, I left a few little surprises around the room for you.
                        Your first clue is waiting below 💛"
                    </p>
                </div>
                <div style={{
                    background: 'rgba(255, 182, 193, 0.1)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 182, 193, 0.3)'
                }}>
                    <p style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.7',
                        color: 'var(--text-dark)',
                        fontWeight: '500'
                    }}>
                        "I am small, Vinu loves me, and I share your name.<br/>
                        Check where something crunchy waits patiently."
                    </p>
                </div>
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--text-light)',
                    marginTop: '1.5rem',
                    fontStyle: 'italic'
                }}>
                    With all my love, forever and always ❤️
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

// Romantic Quotes Component
const RomanticQuotes = () => {
    const quotes = [
        {
            quote: "You are my today and all of my tomorrows.",
            author: "- Leo Christopher",
            icon: "✨"
        },
        {
            quote: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
            author: "- Angelita Lim",
            icon: "💫"
        },
        {
            quote: "I love you not only for what you are, but for what I am when I am with you.",
            author: "- Elizabeth Barrett Browning",
            icon: "🌟"
        },
        {
            quote: "If I had a flower for every time I thought of you... I could walk through my garden forever.",
            author: "- Alfred Tennyson",
            icon: "🌸"
        }
    ];

    return (
        <section className="section" id="quotes">
            <h2 className="section-title">Words That Describe Us 💬</h2>
            <div className="quotes-container">
                {quotes.map((item, index) => (
                    <div
                        key={index}
                        className="quote-card"
                        style={{
                            animationDelay: `${index * 0.2}s`
                        }}
                    >
                        <div className="quote-icon">{item.icon}</div>
                        <p className="quote-text">{item.quote}</p>
                        <p className="quote-author">{item.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-hearts">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className="footer-heart"
                        style={{
                            animationDelay: `${i * 0.3}s`,
                            fontSize: `${Math.random() * 1 + 1.5}rem`
                        }}
                    >
                        {['💕', '💖', '💗', '💓', '💝'][i]}
                    </span>
                ))}
            </div>
            <p className="footer-text">Made with infinite love ❤️ just for you</p>
            <p className="footer-subtext">Every moment with you is a treasure</p>
            <p className="footer-year">© {currentYear} • Forever Yours</p>
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
                    <RomanticQuotes />

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