# How to View Your Website on Your Phone Locally

## Method 1: Using Python HTTP Server (Easiest)

### Step 1: Find Your Computer's IP Address

**On Windows:**
1. Open Command Prompt (Press `Win + R`, type `cmd`, press Enter)
2. Type: `ipconfig`
3. Look for "IPv4 Address" under your active network adapter (usually starts with 192.168.x.x or 10.x.x.x)
   - Example: `192.168.1.100`

**On Mac/Linux:**
1. Open Terminal
2. Type: `ifconfig` or `ip addr`
3. Look for your local IP address (usually starts with 192.168.x.x)

### Step 2: Start a Local Server

**On Windows:**
1. Open Command Prompt
2. Navigate to your project folder:
   ```
   cd "C:\Personal Projects\romantic-website"
   ```
3. Start the server:
   ```
   python -m http.server 8000
   ```
   (If Python 3 doesn't work, try: `python3 -m http.server 8000`)

**On Mac/Linux:**
1. Open Terminal
2. Navigate to your project folder:
   ```
   cd ~/path/to/romantic-website
   ```
3. Start the server:
   ```
   python3 -m http.server 8000
   ```

### Step 3: Connect Your Phone

1. Make sure your phone is connected to the **same Wi-Fi network** as your computer
2. Open a web browser on your phone (Chrome, Safari, etc.)
3. Type in the address bar:
   ```
   http://YOUR_IP_ADDRESS:8000
   ```
   Example: `http://192.168.1.100:8000`
4. Press Enter and your website should load!

---

## Method 2: Using Node.js http-server

If you have Node.js installed:

1. Install http-server globally (one time only):
   ```
   npm install -g http-server
   ```

2. Navigate to your project folder and run:
   ```
   http-server -p 8000 -a 0.0.0.0
   ```
   **Important:** The `-a 0.0.0.0` flag makes the server accessible from other devices on your network.

3. Follow Step 3 from Method 1 to access from your phone.

**If still not working:**
- Try: `http-server -p 8000 -a 0.0.0.0 --cors`
- Check Windows Firewall settings (allow Node.js through firewall)
- Make sure you're using your computer's IP address, not `localhost` or `127.0.0.1`

---

## Method 3: Using PHP (if installed)

1. Navigate to your project folder in Terminal/Command Prompt
2. Run:
   ```
   php -S 0.0.0.0:8000
   ```
3. Access from phone using: `http://YOUR_IP_ADDRESS:8000`

---

## Method 4: Using VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The extension will show the local and network URLs
5. Use the network URL on your phone

---

## Troubleshooting

### Can't access from phone?
- ✅ Make sure both devices are on the same Wi-Fi network
- ✅ Check Windows Firewall - allow Python/Node.js through firewall
- ✅ Try disabling firewall temporarily to test
- ✅ Make sure the server is still running (don't close the terminal)

### Firewall Settings (Windows):
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find Python or your server app and check both Private and Public

### Images not loading?
- Make sure all image paths are relative (like `images/photo1.jpeg`)
- Don't use absolute paths like `C:/...`

---

## Quick Reference

**Your server will show something like:**
```
Serving HTTP on 0.0.0.0 port 8000 ...
```

**On your phone, use:**
```
http://YOUR_COMPUTER_IP:8000
```

**To stop the server:**
Press `Ctrl + C` in the terminal/command prompt

---

## Pro Tip
Bookmark the URL on your phone so you can easily access it again!

