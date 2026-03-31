# 💕 Romantic Website - To the Love of My Life

A beautiful, modern single-page website dedicated to your special someone. Built with React, featuring smooth animations, glassmorphism effects, and a warm, dreamy aesthetic.

## 🌟 Features

### Core Sections
- **Hero Section**: Circular photo carousel with auto-rotation, glow effects, and floating heart animations
- **Our Moments Gallery**: Interactive photo gallery with hover effects and captions
- **Video Calls Section**: Card-based layout showcasing special moments
- **Dates Timeline**: Beautiful timeline showing virtual, real, and planned dates
- **Love Notes**: Typewriter animation with heart beat effects
- **Countdown Timer**: Live countdown to your next date
- **Footer**: Elegant footer with floating animation

### Design Features
- **Soft Color Palette**: Warm pinks, lavender, and beige gradients
- **Smooth Animations**: Fade-in, slide-in, and floating effects
- **Glassmorphism**: Modern frosted glass card effects
- **Fully Responsive**: Works beautifully on mobile and desktop
- **Day/Night Theme Toggle**: Switch between light and dark themes
- **Background Music Toggle**: Optional background music support

### Special Features
- **Hidden Surprise Button**: Click to reveal a special message
- **Auto-rotating Photo Carousel**: Manual controls + automatic rotation
- **Scroll Animations**: Elements fade in as you scroll
- **Interactive Hover Effects**: Cards and images respond to hover

## 🚀 Getting Started

### Option 1: Direct Browser Opening
Simply open `index.html` in your web browser. The page uses CDN links for React, so an internet connection is required.

### Option 2: Local Server (Recommended)
For the best experience, run a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Adding Your Photos
Replace the placeholder image URLs in `app.js`:

1. **Hero Section Photos** (line ~8):
   ```javascript
   const photos = [
       'path/to/your/photo1.jpg',
       'path/to/your/photo2.jpg',
       'path/to/your/photo3.jpg'
   ];
   ```

2. **Gallery Photos** (line ~48):
   ```javascript
   const moments = [
       { 
           image: 'path/to/moment1.jpg',
           caption: 'Your custom caption'
       },
       // ... more moments
   ];
   ```

### Customizing Text
- **Hero Title**: Edit the text in the `Hero` component
- **Love Notes**: Update the `notes` array in the `LoveNotes` component
- **Video Calls**: Modify the `calls` array in the `VideoCalls` component
- **Dates**: Edit the `dates` array in the `Dates` component

### Adding Background Music
1. Add your music file to the project folder (e.g., `background-music.mp3`)
2. In `app.js`, uncomment and update the audio source:
   ```javascript
   <audio ref={audioRef} loop>
       <source src="background-music.mp3" type="audio/mpeg" />
   </audio>
   ```
3. Uncomment the play/pause code in `handleMusicToggle`

### Adjusting Countdown Date
In the `Countdown` component, modify the target date:
```javascript
const targetDate = new Date('2024-12-31'); // Your target date
```

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --pink-soft: #ffd6e8;
    --pink-medium: #ffb3d9;
    --pink-deep: #ff91c7;
    /* ... customize as needed */
}
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 💡 Tips

- Use high-quality images for the best visual effect
- Keep image aspect ratios consistent (square works best for gallery)
- Test on mobile devices to ensure everything looks perfect
- Consider adding your own personal touches and inside jokes

## 🎁 Special Touches

- The surprise button reveals a heartfelt message
- All animations are smooth and performant
- The design is elegant and romantic without being overly flashy
- Every element has been crafted with love and attention to detail

## 📝 License

This project is created with love. Feel free to customize it however you'd like!

---

Made with ❤️ for someone special



