const { useState, useEffect, useRef } = React;

/* ─────────────────────────────────────────
   AURORA + PETAL BACKGROUND
   ───────────────────────────────────────── */
const AuroraBackground = () => {
    const auroraRef = useRef(null);
    const petalRef  = useRef(null);

    useEffect(() => {
        /* ── Aurora canvas ── */
        const ac  = auroraRef.current;
        const actx = ac.getContext('2d');
        let aw, ah, aAnimId;

        const resizeAurora = () => {
            aw = ac.width  = window.innerWidth;
            ah = ac.height = window.innerHeight;
        };
        resizeAurora();
        window.addEventListener('resize', resizeAurora);

        const isNight = () => document.documentElement.getAttribute('data-theme') === 'night';

        let t = 0;
        const drawAurora = () => {
            t += 0.003;
            actx.clearRect(0, 0, aw, ah);

            const blobs = isNight()
                ? [
                    { x: 0.15, y: 0.2,  r: 0.45, c1: 'rgba(80,30,90,0.45)',   c2: 'transparent' },
                    { x: 0.75, y: 0.15, r: 0.4,  c1: 'rgba(45,27,74,0.4)',    c2: 'transparent' },
                    { x: 0.5,  y: 0.65, r: 0.5,  c1: 'rgba(26,15,26,0.5)',    c2: 'transparent' },
                    { x: 0.85, y: 0.7,  r: 0.35, c1: 'rgba(30,19,53,0.38)',   c2: 'transparent' },
                  ]
                : [
                    { x: 0.18, y: 0.22, r: 0.48, c1: 'rgba(255,182,214,0.45)', c2: 'transparent' },
                    { x: 0.78, y: 0.18, r: 0.42, c1: 'rgba(200,160,255,0.38)', c2: 'transparent' },
                    { x: 0.5,  y: 0.7,  r: 0.5,  c1: 'rgba(255,230,242,0.5)',  c2: 'transparent' },
                    { x: 0.1,  y: 0.72, r: 0.38, c1: 'rgba(230,207,255,0.35)', c2: 'transparent' },
                    { x: 0.88, y: 0.65, r: 0.36, c1: 'rgba(255,200,220,0.3)',  c2: 'transparent' },
                  ];

            blobs.forEach((b, i) => {
                const bx = (b.x + Math.sin(t + i * 1.3) * 0.07) * aw;
                const by = (b.y + Math.cos(t + i * 1.1) * 0.06) * ah;
                const br = b.r * Math.max(aw, ah);
                const g  = actx.createRadialGradient(bx, by, 0, bx, by, br);
                g.addColorStop(0, b.c1);
                g.addColorStop(1, b.c2);
                actx.beginPath();
                actx.arc(bx, by, br, 0, Math.PI * 2);
                actx.fillStyle = g;
                actx.fill();
            });

            aAnimId = requestAnimationFrame(drawAurora);
        };
        drawAurora();

        /* ── Petal/heart particle canvas ── */
        const pc   = petalRef.current;
        const pctx = pc.getContext('2d');
        let pw, ph, pAnimId;

        const resizePetal = () => {
            pw = pc.width  = window.innerWidth;
            ph = pc.height = window.innerHeight;
        };
        resizePetal();
        window.addEventListener('resize', resizePetal);

        const PETALS  = 22;
        const EMOJIS  = ['💕','💖','💗','💓','💝','🌸','✨','💫','🌺'];
        const NIGHT_E = ['💜','✨','🌙','💫','⭐','🌟'];

        const particles = Array.from({ length: PETALS }, (_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            speed: 0.015 + Math.random() * 0.025,
            size:  14  + Math.random() * 12,
            drift: (Math.random() - 0.5) * 0.04,
            phase: Math.random() * Math.PI * 2,
            emoji: i % 2 === 0
                ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
                : NIGHT_E[Math.floor(Math.random() * NIGHT_E.length)],
            alpha: 0.3 + Math.random() * 0.45,
        }));

        let pt = 0;
        const drawPetals = () => {
            pt += 1;
            pctx.clearRect(0, 0, pw, ph);

            particles.forEach(p => {
                p.y -= p.speed;
                p.x += p.drift + Math.sin((pt + p.phase * 60) / 80) * 0.04;
                if (p.y < -5) { p.y = 105; p.x = Math.random() * 100; }
                if (p.x < -5) p.x = 105;
                if (p.x > 105) p.x = -5;

                pctx.save();
                pctx.globalAlpha = p.alpha * (0.7 + 0.3 * Math.sin(pt * 0.03 + p.phase));
                pctx.font = `${p.size}px serif`;
                pctx.fillText(p.emoji, (p.x / 100) * pw, (p.y / 100) * ph);
                pctx.restore();
            });

            pAnimId = requestAnimationFrame(drawPetals);
        };
        drawPetals();

        return () => {
            cancelAnimationFrame(aAnimId);
            cancelAnimationFrame(pAnimId);
            window.removeEventListener('resize', resizeAurora);
            window.removeEventListener('resize', resizePetal);
        };
    }, []);

    return (
        <>
            <canvas ref={auroraRef} id="aurora-canvas" />
            <canvas ref={petalRef}  id="petal-canvas"  />
        </>
    );
};

/* ─────────────────────────────────────────
   OPENING ANIMATION
   ───────────────────────────────────────── */
const OpeningAnimation = ({ onComplete }) => {
    const [phase, setPhase] = useState('entering');

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('visible'),  500);
        const t2 = setTimeout(() => setPhase('exiting'), 2600);
        const t3 = setTimeout(() => onComplete(),         3200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
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

/* ─────────────────────────────────────────
   HERO
   ───────────────────────────────────────── */
const Hero = () => {
    const [currentPhoto, setCurrentPhoto]   = useState(0);
    const [isRotating,   setIsRotating]     = useState(false);
    const [isHovering,   setIsHovering]     = useState(false);

    const photos = [
        'K&V/photo6.jpeg',
        'K&V/photo2.jpeg',
        'images/photo12.jpeg',
        'images/photo1.jpeg',
        'images/photo3.jpeg',
    ];

    useEffect(() => {
        const iv = setInterval(() => {
            setIsRotating(true);
            setTimeout(() => {
                setCurrentPhoto(p => (p + 1) % photos.length);
                setIsRotating(false);
            }, 420);
        }, 4000);
        return () => clearInterval(iv);
    }, [photos.length]);

    const goTo = i => {
        if (i === currentPhoto) return;
        setIsRotating(true);
        setTimeout(() => { setCurrentPhoto(i); setIsRotating(false); }, 420);
    };

    return (
        <section className="hero">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="floating-heart" style={{
                    left: `${Math.random() * 90}%`,
                    top:  `${Math.random() * 90}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    fontSize: `${Math.random() * 1 + 1.5}rem`,
                    opacity: `${Math.random() * 0.3 + 0.4}`,
                    filter: `hue-rotate(${Math.random() * 60}deg)`,
                }}>
                    {['💕','💖','💗','💓','💝','💘'][Math.floor(Math.random() * 6)]}
                </div>
            ))}
            {[...Array(18)].map((_, i) => (
                <div key={`sp-${i}`} className="sparkle" style={{
                    left:           `${Math.random() * 100}%`,
                    top:            `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    width:          `${Math.random() * 4 + 4}px`,
                    height:         `${Math.random() * 4 + 4}px`,
                }} />
            ))}

            <h1 className="hero-title">To the Love of My Life ❤️</h1>

            <div className="photo-carousel">
                <div
                    className={`photo-container ${isRotating ? 'rotating' : ''}`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <img
                        key={currentPhoto}
                        src={photos[currentPhoto]}
                        alt="Our beautiful moments"
                        className="carousel-image"
                        style={{
                            transform:  isHovering ? 'scale(1.06)' : 'scale(1)',
                            transition: 'transform 0.4s ease',
                        }}
                    />
                </div>
                <div className="carousel-controls">
                    {photos.map((_, i) => (
                        <button
                            key={i}
                            className={`carousel-btn ${i === currentPhoto ? 'active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to photo ${i + 1}`}
                            style={{
                                background:  i === currentPhoto
                                    ? 'linear-gradient(135deg, var(--pink-deep), var(--pink-medium))'
                                    : 'var(--pink-medium)',
                                transform: i === currentPhoto ? 'scale(1.3)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────
   GALLERY
   ───────────────────────────────────────── */
const Gallery = () => {
    const moments = [
        { image:'images/photo1.jpeg',  caption:'Every moment with you feels like a dream come true 💕' },
        { image:'images/photo2.jpeg',  caption:'Your smile is my favorite thing in the whole world 😊✨' },
        { image:'images/photo3.jpeg',  caption:'Falling in love with you was the easiest thing I\'ve ever done 💖' },
        { image:'images/photo4.jpeg',  caption:'You make my heart skip a beat every single day 💓' },
        { image:'images/photo5.jpeg',  caption:'Being with you feels like home, safe and warm 🏠💕' },
        { image:'images/photo6.jpeg',  caption:'You are my sunshine, my moon, and all my stars 🌙⭐' },
        { image:'images/photo7.jpeg',  caption:'In your eyes, I found my forever home 👀💕' },
        { image:'images/photo8.jpeg',  caption:'You turned my world into a beautiful place 🌍✨' },
        { image:'images/photo9.jpeg',  caption:'Loving you is the best decision I\'ve ever made 💖' },
        { image:'images/photo10.jpeg', caption:'Every day with you is a new adventure 🗺️💕' },
        { image:'images/photo11.jpeg', caption:'You are my today and all of my tomorrows 📅💖' },
        { image:'images/photo13.jpeg', caption:'I fall in love with you more every single day 💕✨' },
        { image:'images/photo14.jpeg', caption:'You are my happy place, my peace, my everything 🧘💖' },
        { image:'images/photo16.jpeg', caption:'You are the missing piece I never knew I needed 🧩💖' },
        { image:'images/photo17.jpeg', caption:'Your love makes everything brighter and more beautiful ✨💕' },
        { image:'images/photo18.jpeg', caption:'I love how you make ordinary moments feel extraordinary 🌟💖' },
        { image:'images/photo19.jpeg', caption:'You are my favorite hello and my hardest goodbye 👋💕' },
        { image:'images/photo20.jpeg', caption:'Being yours is the greatest honor of my life 💍💖' },
        { image:'images/photo21.jpeg', caption:'Your love is the anchor that keeps me grounded ⚓💕' },
        { image:'images/photo22.jpeg', caption:'I love you more than words could ever express 📝💖' },
        { image:'images/photo23.jpeg', caption:'You are my always and forever, my one and only 💕✨' },
    ];
    const angleStep = 360 / moments.length;

    return (
        <section className="section" id="moments">
            <h2 className="section-title">Our Moments</h2>
            <div className="gallery-3d-container">
                <div className="gallery-3d-disc">
                    {moments.map((m, i) => (
                        <div key={i} className="gallery-3d-item"
                            style={{ '--angle': `${i * angleStep}deg`, '--index': i }}>
                            <div className="gallery-item">
                                <img src={m.image} alt={`Memory ${i + 1}`} />
                                <div className="gallery-caption">{m.caption}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────
   DATES TIMELINE
   ───────────────────────────────────────── */
const Dates = () => {
    const [visibleItems, setVisibleItems] = useState({});

    const dates = [
        { type:'Realisation Day',              icon:'💕', date:'18th October 2025',   title:'Sitting on bench together',                                                              color:'var(--pink-soft)',     sparkles:true },
        { type:'Confession Day',               icon:'💑', date:'19th October 2025',   title:'Online Chatting',                                                                       color:'var(--pink-medium)',   sparkles:true },
        { type:'Proposal Day',                 icon:'💍', date:'27th October 2025',   title:'Unprepared Proposal with so much of effort',                                            color:'var(--pink-deep)',     sparkles:true },
        { type:'1st Bouquet Gift',             icon:'💐', date:'31st October 2025',   title:'Surprising you with bouquet.',                                                          color:'var(--lavender)',      sparkles:true },
        { type:'1st Double Date & Long Drive', icon:'😘', date:'1st November 2025',   title:'Went to McDonald as a surprise long drive with Shlok & Varda',                         color:'var(--gold)',          sparkles:true },
        { type:'1 Month Anniversary',          icon:'💌', date:'27th November 2025',  title:'Went to Champa Gali had a deep convo and good bike ride.',                             color:'var(--pink-medium)',   sparkles:true },
        { type:'Special Day',                  icon:'💖', date:'30th November 2025',  title:'Made love for the first time (one big step).',                                         color:'var(--pink-deep)',     sparkles:true },
        { type:'2 Month Anniversary',          icon:'💝', date:'27th December 2025',  title:'Celebrated on video call together.',                                                    color:'var(--lavender-dark)', sparkles:true },
        { type:'Long distance ended',          icon:'🫂', date:'4th January 2026',    title:'Finally meeting each other after a winter break of 15 days which felt more than a year.',color:'var(--pink-soft)',    sparkles:true },
        { type:'3 Month Anniversary',          icon:'💘', date:'27th January 2026',   title:'Postponed our date, went to Kake da Hotel with group.',                                color:'var(--pink-medium)',   sparkles:true },
        { type:'First Night Stay',             icon:'💕', date:'1st February 2026',   title:'Stayed at PG, drank first time together.',                                             color:'var(--pink-deep)',     sparkles:true },
        { type:'Valentine Week Started',       icon:'💖', date:'7th February 2026',   title:'Valentine Week Started with flowers and chocolates.',                                  color:'var(--lavender)',      sparkles:true },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) {
                    const idx = parseInt(e.target.dataset.index);
                    setVisibleItems(prev => ({ ...prev, [idx]: true }));
                }
            }),
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((el, i) => { el.dataset.index = i; observer.observe(el); });
        return () => items.forEach(el => observer.unobserve(el));
    }, []);

    return (
        <section className="section" id="dates">
            <h2 className="section-title">Our Love Timeline 💕</h2>
            <div className="dates-timeline">
                <div className="timeline-line" />
                {dates.map((d, i) => (
                    <div key={i} className={`timeline-item ${visibleItems[i] ? 'visible' : ''}`}
                        style={{ transitionDelay: `${i * 0.08}s` }}
                        data-index={i}>
                        <div className="timeline-dot"
                            style={{ background: d.color,
                                boxShadow: `0 0 30px ${d.color.includes('var') ? 'var(--shadow-medium)' : d.color}, 0 0 50px var(--shadow-soft)` }}
                        />
                        <div className="timeline-content"
                            style={{ borderColor: 'rgba(255,182,214,0.25)', '--timeline-color': d.color }}>
                            {d.date && (
                                <div className="timeline-date">
                                    {d.icon && <span className="timeline-date-icon">{d.icon}</span>}
                                    <span>{d.date}</span>
                                </div>
                            )}
                            {d.type  && <div className="timeline-type"  style={{ color: d.color }}>{d.type}</div>}
                            <h3 className="timeline-title">{d.title}</h3>
                            {d.sparkles && (
                                <div className="sparkle" style={{ position:'absolute', top:'10px', right:'10px', width:'8px', height:'8px', animation:'sparkle 2s ease-in-out infinite' }} />
                            )}
                        </div>
                    </div>
                ))}
                {[...Array(8)].map((_, i) => (
                    <div key={`th-${i}`} className="floating-heart" style={{
                        left: `${Math.random() * 90 + 5}%`,
                        top:  `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        fontSize: `${Math.random() * 1 + 1.2}rem`,
                        opacity: `${Math.random() * 0.2 + 0.3}`,
                    }}>
                        {['💕','💖','💗'][Math.floor(Math.random() * 3)]}
                    </div>
                ))}
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────
   TYPEWRITER
   ───────────────────────────────────────── */
const Typewriter = ({ text, speed = 50, onComplete }) => {
    const [displayed, setDisplayed] = useState('');
    const [done,      setDone]      = useState(false);

    useEffect(() => {
        let idx = 0;
        const iv = setInterval(() => {
            if (idx < text.length) {
                setDisplayed(text.slice(0, ++idx));
            } else {
                setDone(true);
                clearInterval(iv);
                onComplete?.();
            }
        }, speed);
        return () => clearInterval(iv);
    }, [text, speed, onComplete]);

    return (
        <span className="typewriter-text">
            {displayed}
            {!done && <span className="typewriter-cursor">|</span>}
        </span>
    );
};

/* ─────────────────────────────────────────
   LOVE NOTES
   ───────────────────────────────────────── */
const LoveNotes = () => {
    const [visibleNotes, setVisibleNotes] = useState({});

    const notes = [
        { text:'Every moment with you feels like a dream I never want to wake up from.',                         icon:'💭', color:'var(--pink-soft)' },
        { text:'Your voice is my favorite sound, and your smile is my favorite view.',                           icon:'😊', color:'var(--pink-medium)' },
        { text:'Distance means nothing when someone means everything.',                                          icon:'💕', color:'var(--pink-deep)' },
        { text:'I fall in love with you more every single day, even when we\'re apart.',                         icon:'💘', color:'var(--lavender)' },
        { text:'You are the reason I believe in love at first sight, and every sight after.',                    icon:'👀', color:'var(--gold)' },
        { text:'In your arms is where I feel most at home, most loved, and most myself.',                        icon:'🏠', color:'var(--lavender-dark)' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) {
                    const idx = parseInt(e.target.dataset.index);
                    setVisibleNotes(prev => ({ ...prev, [idx]: true }));
                }
            }),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        const cards = document.querySelectorAll('.note-card');
        cards.forEach((c, i) => { c.dataset.index = i; observer.observe(c); });
        return () => cards.forEach(c => observer.unobserve(c));
    }, []);

    return (
        <section className="section" id="love-notes">
            <h2 className="section-title">Love Notes from My Heart 💌</h2>
            <div className="love-notes">
                {notes.map((n, i) => (
                    <div key={i} className="note-card" data-index={i}
                        style={{
                            opacity:   visibleNotes[i] ? 1 : 0,
                            transform: visibleNotes[i] ? 'translateY(0)' : 'translateY(32px)',
                            transition: `all 0.65s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.1}s`,
                            borderColor: 'rgba(255,182,214,0.3)',
                        }}>
                        <span className="note-heart"
                            style={{ color: n.color, fontSize:'2.5rem', animationDelay:`${i*0.2}s` }}>
                            {n.icon}
                        </span>
                        <Typewriter text={n.text} speed={28} />
                        {[...Array(3)].map((_, j) => (
                            <div key={j} className="sparkle" style={{
                                position:'absolute',
                                left:`${Math.random()*80+10}%`,
                                top:`${Math.random()*60+20}%`,
                                width:`${Math.random()*3+3}px`,
                                height:`${Math.random()*3+3}px`,
                                background: n.color,
                                animationDelay:`${Math.random()*2}s`,
                            }} />
                        ))}
                    </div>
                ))}
            </div>
            {[...Array(6)].map((_, i) => (
                <div key={`nh-${i}`} className="floating-heart" style={{
                    left:`${Math.random()*90+5}%`,
                    top:`${Math.random()*30+35}%`,
                    animationDelay:`${Math.random()*3}s`,
                    fontSize:`${Math.random()*1+1.5}rem`,
                    opacity:`${Math.random()*0.2+0.4}`,
                }}>
                    {['💕','💖','💗','💓'][Math.floor(Math.random()*4)]}
                </div>
            ))}
        </section>
    );
};

/* ─────────────────────────────────────────
   ROMANTIC QUOTES
   ───────────────────────────────────────── */
const RomanticQuotes = () => {
    const quotes = [
        { quote:'You are my today and all of my tomorrows.',                                                      author:'— Leo Christopher',           icon:'✨' },
        { quote:'I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.', author:'— Angelita Lim', icon:'💫' },
        { quote:'I love you not only for what you are, but for what I am when I am with you.',                    author:'— Elizabeth Barrett Browning', icon:'🌟' },
        { quote:'If I had a flower for every time I thought of you... I could walk through my garden forever.',   author:'— Alfred Tennyson',           icon:'🌸' },
    ];

    return (
        <section className="section" id="quotes">
            <h2 className="section-title">Words That Describe Us 💬</h2>
            <div className="quotes-container">
                {quotes.map((q, i) => (
                    <div key={i} className="quote-card" style={{ animationDelay:`${i*0.2}s` }}>
                        <div className="quote-icon">{q.icon}</div>
                        <p className="quote-text">{q.quote}</p>
                        <p className="quote-author">{q.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────
   LOVE LETTER MODAL  (replaces old surprise)
   ───────────────────────────────────────── */
const LoveLetterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    /* Raining hearts */
    const rainHearts = [...Array(14)].map((_, i) => ({
        left:  `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 4}s`,
        dur:   `${4 + Math.random() * 5}s`,
        size:  `${14 + Math.random() * 18}px`,
        emoji: ['💕','💖','💗','💓','💝','🌸','✨','💫'][Math.floor(Math.random() * 8)],
    }));

    return (
        <div className={`surprise-modal ${isOpen ? 'active' : ''}`} onClick={onClose}>
            {/* Raining hearts */}
            {rainHearts.map((h, i) => (
                <div key={i} className="surprise-heart" style={{
                    left: h.left,
                    top: '-40px',
                    fontSize: h.size,
                    animationDelay: h.delay,
                    animationDuration: h.dur,
                }}>
                    {h.emoji}
                </div>
            ))}

            <div className="surprise-content" onClick={e => e.stopPropagation()}>
                <button className="surprise-close" onClick={onClose}>×</button>

                <span className="letter-envelope-icon">💌</span>

                <h2 className="letter-main-title">I'm Sorry & I Love You 💗</h2>

                <p className="letter-intro">
                    I know I hurt you, and I'm genuinely, deeply sorry. You deserved so much better in that moment, and I hate that I let you down.
                </p>

                <div className="letter-block letter-block-pink">
                    <p>
                        You are <strong>not just a part of my life — you are the best part of it.</strong> The one I look for in a crowd. The one whose laugh makes everything feel okay. I never want to imagine a single day without you.
                    </p>
                </div>

                <div className="letter-block letter-block-lavender">
                    <p>
                        My love for you isn't tied to conditions or perfect moments. It's unconditional — the kind that stays through mistakes, through hard days, through <em>all</em> of it. <strong>I love you equally on your easiest days and your hardest ones.</strong>
                    </p>
                </div>

                <div className="letter-heart-row">
                    {['❤️','🧡','💛','💜','💖'].map((h, i) => (
                        <span key={i} className="lhr">{h}</span>
                    ))}
                </div>

                <div className="letter-reasons">
                    <div className="letter-reasons-title">Why I can't let you go 🌹</div>
                    {[
                        { ico:'🌊', text:'Because the world feels quieter and calmer when you\'re around — and way too loud when you\'re not.' },
                        { ico:'🌙', text:'Because you\'re the first thought I have in the morning and the last one I hold onto at night.' },
                        { ico:'🫂', text:'Because being with you doesn\'t just feel like happiness — it feels like home.' },
                        { ico:'💫', text:'Because I\'ve never met anyone who makes me want to be a better person the way you do, just by being yourself.' },
                    ].map((r, i) => (
                        <div key={i} className="letter-reason-item">
                            <span className="ico">{r.ico}</span>
                            <span>{r.text}</span>
                        </div>
                    ))}
                </div>

                <p className="letter-sign-off">Yours, always &amp; completely 💌</p>
                <div className="letter-never-give-up">
                    🚫 I am <em>never</em> gonna give up on us 💪💗
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────
   SURPRISE BUTTON
   ───────────────────────────────────────── */
const SurpriseButton = ({ onClick }) => (
    <div className="surprise-button-container">
        <button className="surprise-button" onClick={onClick}>
            <span className="surprise-button-heart">💝</span>
            <span className="surprise-button-text">A Message Just For You</span>
            <span className="surprise-button-heart">💝</span>
        </button>
        <p className="surprise-button-hint">Open this when you need a reminder of how loved you are 🌸</p>
    </div>
);

/* ─────────────────────────────────────────
   CONTROLS
   ───────────────────────────────────────── */
const Controls = ({ theme, onThemeToggle, musicPlaying, onMusicToggle, hasMusicInteraction }) => (
    <div className="controls">
        <button className="control-btn" onClick={onThemeToggle} title="Toggle Day/Night Theme">
            {theme === 'day' ? '🌙' : '☀️'}
        </button>
        <button
            className={`control-btn ${!hasMusicInteraction ? 'pulse' : ''}`}
            onClick={onMusicToggle}
            title={hasMusicInteraction ? 'Toggle Background Music' : 'Enable background music'}
        >
            {!hasMusicInteraction ? <span className="pulse-music" title="Click to enable music">🔊</span>
                                  : (musicPlaying ? '🔊' : '🔇')}
        </button>
    </div>
);

/* ─────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────── */
const Footer = () => (
    <footer className="footer">
        <div className="footer-hearts">
            {['💕','💖','💗','💓','💝'].map((h, i) => (
                <span key={i} className="footer-heart"
                    style={{ animationDelay:`${i*0.3}s`, fontSize:`${1.5 + Math.random()*0.8}rem` }}>
                    {h}
                </span>
            ))}
        </div>
        <p className="footer-text">Made with infinite love ❤️ just for you</p>
        <p className="footer-subtext">Every moment with you is a treasure</p>
        <p className="footer-year">© {new Date().getFullYear()} • Forever Yours</p>
    </footer>
);

/* ─────────────────────────────────────────
   MAIN APP
   ───────────────────────────────────────── */
const App = () => {
    const [theme,              setTheme]              = useState('day');
    const [musicPlaying,       setMusicPlaying]       = useState(false);
    const [showLetter,         setShowLetter]         = useState(false);
    const [showOpening,        setShowOpening]        = useState(true);
    const [hasMusicInteraction,setHasMusicInteraction]= useState(false);
    const audioRef = useRef(null);

    /* Theme */
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme === 'day' ? 'day' : 'night');
    }, [theme]);

    /* Audio init on first interaction */
    useEffect(() => {
        const init = () => {
            if (!audioRef.current) {
                audioRef.current = new Audio('music.mp3');
                audioRef.current.loop   = true;
                audioRef.current.volume = 0.5;
            }
            setHasMusicInteraction(true);
            document.removeEventListener('click',      init);
            document.removeEventListener('touchstart', init);
        };
        document.addEventListener('click',      init);
        document.addEventListener('touchstart', init);
        return () => {
            document.removeEventListener('click',      init);
            document.removeEventListener('touchstart', init);
        };
    }, []);

    const handleThemeToggle = () => setTheme(t => t === 'day' ? 'night' : 'day');

    const handleMusicToggle = () => {
        if (!hasMusicInteraction) {
            setHasMusicInteraction(true);
            if (!audioRef.current) {
                audioRef.current = new Audio('music.mp3');
                audioRef.current.loop   = true;
                audioRef.current.volume = 0.5;
            }
            audioRef.current.play()
                .then(() => setMusicPlaying(true))
                .catch(() => setMusicPlaying(false));
            return;
        }
        if (!audioRef.current) return;
        if (musicPlaying) {
            audioRef.current.pause();
            setMusicPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setMusicPlaying(true))
                .catch(() => {});
        }
    };

    /* Scroll reveal */
    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.opacity   = '1';
                    e.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const els = document.querySelectorAll('.section, .note-card, .timeline-item, .surprise-button-container');
        els.forEach(el => obs.observe(el));
        return () => els.forEach(el => obs.unobserve(el));
    }, []);

    return (
        <>
            {showOpening && <OpeningAnimation onComplete={() => setShowOpening(false)} />}

            {!showOpening && (
                <>
                    <AuroraBackground />

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

                    <SurpriseButton onClick={() => setShowLetter(true)} />

                    <Footer />

                    <LoveLetterModal
                        isOpen={showLetter}
                        onClose={() => setShowLetter(false)}
                    />
                </>
            )}
        </>
    );
};

/* ─── Render ─── */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    });
} else {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
