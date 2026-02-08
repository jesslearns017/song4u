# 🎵 Songs4u - AI Music Generator

A beautiful Next.js application that generates music using the Suno AI API. Simply describe your song idea, and let AI create it for you!

## ✨ Features

- **AI-Powered Music Generation** - Create songs from text descriptions
- **Real-time Progress Tracking** - Live updates during song generation (2-4 minutes)
- **Song History** - Automatically saves your generated songs locally
- **Download Functionality** - Download your songs and lyrics
- **Lyrics Display** - View and download generated song lyrics
- **Credits Management** - Check your API credits
- **Content Moderation** - Built-in validation for appropriate content
- **Enhanced UI/UX** - Clean, modern design with improved visual hierarchy
- **Rotating Prompt Examples** - Dynamic placeholder suggestions every 4 seconds
- **Interactive Tips Section** - Click-to-use example prompts in two-column layout
- **Progressive Disclosure** - Collapsible sections for cleaner interface
- **Bilingual Support** - English and Spanish interface
- **Mobile-Optimized** - Responsive design with sticky generate button
- **Smart Character Counter** - Visual feedback with warning indicators

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Suno API key from [https://api.sunoapi.org/](https://api.sunoapi.org/)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy the example env file
   copy .env.example .env
   
   # Edit .env and add your Suno API key
   SUNOAPI_ORG=your_actual_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 How to Use

1. **Choose your language** from the top navigation bar
2. **Enter a prompt** describing your song (max 500 characters)
   - **Rotating examples** will appear automatically every 4 seconds
   - Click **"Random Example"** 🎲 for instant inspiration
   - **Click any example** in the tips section to use it instantly
   - Character counter provides visual feedback as you type

3. **Click "Generate Song"** and wait 2-4 minutes
   - Real-time progress tracking with elapsed time
   - Automatic status updates every 30 seconds

4. **Listen and download** your AI-generated music and lyrics!
   - Download audio file and/or lyrics
   - Songs are automatically saved to your history

## 💡 Enhanced Prompt Experience

### 🎲 Random Examples
Click the "Random Example" button to instantly fill the textarea with inspiring prompts like:
- "A melancholic jazz ballad about coffee shops..."
- "Upbeat pop song with catchy chorus about summer love"
- "Electronic dance track with heavy bass drops"
- "Acoustic folk song about nostalgic childhood memories"

### 📋 Interactive Tips Section
- **Two-column layout** on desktop for better organization
- **Click any example** to auto-fill the textarea
- **Best practices** and **what to avoid** clearly outlined
- **Progressive disclosure** - expand when needed, collapse when not

### 🔄 Rotating Placeholders
The textarea automatically cycles through 6 different prompt examples every 4 seconds to inspire creativity.

## 🛠️ Tech Stack

- **Next.js 15.5.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Suno API** - AI music generation

## 📁 Project Structure

```
songs4u/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    # Music generation endpoint
│   │   ├── status/route.ts      # Status polling endpoint
│   │   ├── callback/route.ts    # Webhook callback
│   │   └── credits/route.ts     # Credits check endpoint
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page component
├── .env                         # Environment variables (not in git)
├── .env.example                 # Example env file
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🔧 API Endpoints

- `POST /api/generate` - Initiate music generation
- `GET /api/status?taskId=xxx` - Check generation status
- `POST /api/callback` - Receive Suno callbacks
- `GET /api/credits` - Check remaining API credits

## 🎨 Features in Detail

### Real-time Status Updates
- Polls every 30 seconds (as recommended by Suno API)
- Shows elapsed time in MM:SS format
- Maximum 10-minute timeout with 20 polling attempts

### Local Storage
- Automatically saves up to 50 songs with lyrics
- Persistent across browser sessions
- Quick access to your song history

### Lyrics Support
- Displays generated lyrics below the audio player
- Download lyrics as a text file
- Lyrics saved with song history

### Content Validation
- Client-side prompt length validation
- Server-side sensitive content detection
- User-friendly error messages

## 🚀 Deployment

This app can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- Any Node.js hosting platform

Make sure to set the `SUNOAPI_ORG` environment variable in your deployment platform.

## 🎨 UI Version 2.0 (Current)

### Phase 1 & 2 Improvements ✨

**Visual Hierarchy & Design:**
- ✅ Clean top navigation bar with left/right layout
- ✅ Language selector on left, secondary actions on right
- ✅ Subtle Credits and History buttons with icons
- ✅ Enhanced primary Generate button with hover effects
- ✅ Neutral blue informational banners (removed alarming red warnings)
- ✅ Improved spacing and visual separation between sections

**Enhanced Text Input Experience:**
- ✅ Rotating placeholder examples (6 prompts, 4-second intervals)
- ✅ "Random Example" button with dice icon for instant inspiration
- ✅ Smart character counter with visual feedback and warning icons
- ✅ Larger textarea with better focus states

**Progressive Disclosure:**
- ✅ "How it works" section collapsed by default with subtle styling
- ✅ Tips section with cleaner, more subtle button design
- ✅ Better information architecture to reduce cognitive load

**Interactive Tips Section:**
- ✅ Two-column layout on desktop (practices/avoid vs examples)
- ✅ Click-to-use example prompts with hover states
- ✅ "Click to use →" hints for better UX
- ✅ Better organization and visual hierarchy

**Mobile & Accessibility:**
- ✅ Responsive design improvements
- ✅ Better touch targets and mobile interactions
- ✅ Improved color contrast and readability

### Previous Features Retained:
- Sticky mobile Generate button
- Template chips for quick starts
- Bilingual support (English/Spanish)
- Real-time progress tracking
- Download functionality for audio and lyrics

### Design Philosophy:
- **Clear visual hierarchy** - Generate button is the clear primary action
- **Progressive disclosure** - Advanced features hidden by default
- **Reduced cognitive load** - Cleaner, less overwhelming interface
- **Better UX patterns** - Interactive elements with clear feedback

## 🚀 Roadmap (Phase 3 - Upcoming)

### Mobile-First Responsive Design
- Enhanced mobile breakpoints and touch targets
- Hamburger menu for mobile navigation
- Improved mobile form interactions

### Enhanced User Feedback
- Progress indicators with estimated completion time
- Better loading states and micro-interactions
- Improved empty states and error handling

### Accessibility Improvements
- WCAG AA contrast compliance
- ARIA labels and keyboard navigation
- Focus indicators and screen reader support

### Performance & Polish
- Optimized animations and transitions
- Loading skeletons and error boundaries
- Performance monitoring and optimization

## 📄 License

Created with ❤️ for family and friends by Jessie

Guidance from Dr. Lee

## 🤝 Contributing

This is a learning project. Feel free to fork and modify for your own use!

## 📞 Support

For Suno API support, visit [https://api.sunoapi.org/](https://api.sunoapi.org/)
