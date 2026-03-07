'use client';
import { useState, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  audioUrl: string;
  prompt: string;
  createdAt: string;
  lyric?: string;
}

type Language = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh';

interface Translations {
  en: {
    title: string;
    subtitle: string;
    oneTimeNotice: string;
    legalDisclaimer: string;
    generationTime: string;
    howItWorksTitle: string;
    howItWorks1: string;
    howItWorks2: string;
    howItWorks3: string;
    howItWorks4: string;
    showTips: string;
    hideTips: string;
    bestPractices: string;
    avoid: string;
    examplePrompts: string;
    checkCredits: string;
    showHistory: string;
    hideHistory: string;
    yourSongs: string;
    noSongs: string;
    play: string;
    placeholder: string;
    generateButton: string;
    generating: string;
    download: string;
    downloadLyrics: string;
    createdBy: string;
    footerLine1: string;
    footerLine2: string;
    longPromptWarning: string;
    enterPrompt: string;
    sensitiveWarning: string;
    contentModeration: string;
    generationFailed: string;
    timeout: string;
    downloadFailed: string;
    creditsFailed: string;
    songReady: string;
    startingGeneration: string;
    taskCreated: string;
    tips: {
      practice1: string;
      practice2: string;
      practice3: string;
      practice4: string;
      avoid1: string;
      avoid2: string;
      avoid3: string;
      avoid4: string;
      example1: string;
      example2: string;
      example3: string;
      example4: string;
    };
  };
  es: {
    title: string;
    subtitle: string;
    oneTimeNotice: string;
    legalDisclaimer: string;
    generationTime: string;
    howItWorksTitle: string;
    howItWorks1: string;
    howItWorks2: string;
    howItWorks3: string;
    howItWorks4: string;
    showTips: string;
    hideTips: string;
    bestPractices: string;
    avoid: string;
    examplePrompts: string;
    checkCredits: string;
    showHistory: string;
    hideHistory: string;
    yourSongs: string;
    noSongs: string;
    play: string;
    placeholder: string;
    generateButton: string;
    generating: string;
    download: string;
    downloadLyrics: string;
    createdBy: string;
    footerLine1: string;
    footerLine2: string;
    longPromptWarning: string;
    enterPrompt: string;
    sensitiveWarning: string;
    contentModeration: string;
    generationFailed: string;
    timeout: string;
    downloadFailed: string;
    creditsFailed: string;
    songReady: string;
    startingGeneration: string;
    taskCreated: string;
    tips: {
      practice1: string;
      practice2: string;
      practice3: string;
      practice4: string;
      avoid1: string;
      avoid2: string;
      avoid3: string;
      avoid4: string;
      example1: string;
      example2: string;
      example3: string;
      example4: string;
    };
  };
}

const translations: Translations = {
  en: {
    title: 'Songs4u – AI Music Generator',
    subtitle: 'Describe your track and let AI turn it into music.',
    oneTimeNotice: 'This is a one-time song generator. Please download your song and lyrics immediately after generation. They are not stored permanently.',
    legalDisclaimer: 'Legal notice: Music and lyrics generated here are for personal entertainment purposes only. There is no intention to copy, imitate, or infringe any artist, song, or copyrighted work.',
    generationTime: '⏱️ Generation typically takes 2-4 minutes',
    howItWorksTitle: 'How it works',
    howItWorks1: '1. Describe your song – mood, genre, instruments, tempo, vibe.',
    howItWorks2: '2. Click “Generate Song” – we send your prompt securely to the AI music engine.',
    howItWorks3: '3. Listen & download – preview your track and save it for personal use.',
    howItWorks4: '4. (Optional) Add your own Suno API key to use your own credits.',
    showTips: 'Show Prompt Tips & Best Practices',
    hideTips: 'Hide Prompt Tips & Best Practices',
    bestPractices: '✅ Best Practices:',
    avoid: '❌ Avoid:',
    examplePrompts: '🎵 Example Prompts:',
    checkCredits: '💰 Check Credits',
    showHistory: '🎵 Show Song History',
    hideHistory: '🎵 Hide Song History',
    yourSongs: 'Your Songs',
    noSongs: 'No songs yet. Generate your first one!',
    play: 'Play',
    placeholder: 'A melancholic jazz ballad about coffee shops...',
    generateButton: 'Generate Song',
    generating: 'Creating your song...',
    download: 'Download Song',
    downloadLyrics: 'Download Lyrics (if available)',
    createdBy: 'Created by Jessie, with guidance from Dr. Lee',
    footerLine1: '❤️ From Jessie with love ❤️',
    footerLine2: 'For family and friends',
    longPromptWarning: '⚠️ Long prompts may have issues',
    enterPrompt: 'Please enter a song idea',
    sensitiveWarning: '⚠️ Warning: Your prompt may contain sensitive content that could be rejected. Consider using more neutral language.',
    contentModeration: '⚠️ Content Moderation: Your prompt contains words that are not allowed. Please try:\n• Avoiding violent, explicit, or offensive content\n• Using more general descriptions\n• Focusing on musical style and mood instead of specific topics',
    generationFailed: 'Music generation failed. Please try again.',
    timeout: 'Generation timed out after 10 minutes. The song may still be processing. Please check back later or try again.',
    downloadFailed: 'Failed to download song. Please try again.',
    creditsFailed: 'Failed to fetch credits',
    songReady: 'Song ready!',
    startingGeneration: 'Starting generation...',
    taskCreated: 'Task created, waiting for generation...',
    tips: {
      practice1: 'Keep prompts under 1000 characters for optimal results',
      practice2: 'Focus on musical style, mood, and tempo (e.g., upbeat jazz, slow ballad)',
      practice3: 'Describe instruments, genre, and vocal style specifically',
      practice4: 'Use vivid imagery and emotions to inspire the AI',
      avoid1: 'Real names of people, brands, or specific locations',
      avoid2: 'Violent, explicit, or controversial content',
      avoid3: 'Overly complex or confusing descriptions',
      avoid4: 'Personal, private, or copyrighted content',
      example1: 'Upbeat hip-hop track with heavy bass and confident rap vocals. Themes of fresh starts, overcoming obstacles, and self-belief. Modern trap beats with energetic tempo around 140 BPM.',
      example2: 'Smooth jazz ballad featuring soft piano melodies and warm saxophone. Slow tempo, romantic mood perfect for intimate evenings. Gentle vocals with emotional depth and subtle string accompaniment.',
      example3: 'High-energy rock anthem with powerful electric guitars and driving drums. Inspiring lyrics about chasing dreams and perseverance. Stadium-rock style with anthemic chorus and motivational message.',
      example4: 'Mellow acoustic folk song with fingerpicked guitar and soft vocals. Nostalgic themes of home, memories, and simpler times. Warm, intimate atmosphere with gentle harmonica touches.',
    },
  },
  es: {
    title: 'Songs4u – Generador de Música IA',
    subtitle: 'Describe tu pista y deja que la IA la convierta en música.',
    oneTimeNotice: 'Este es un generador de canciones de uso puntual. Descarga tu canción y letra inmediatamente después de generarla. No se almacenan de forma permanente.',
    legalDisclaimer: 'Aviso legal: La música y letras generadas aquí son solo para fines de entretenimiento personal. No existe intención de copiar, imitar ni infringir a ningún artista, canción u obra protegida por derechos de autor.',
    generationTime: '⏱️ La generación suele tardar 2-4 minutos',
    howItWorksTitle: 'Cómo funciona',
    howItWorks1: '1. Describe tu canción: estado de ánimo, género, instrumentos, tempo y ambiente.',
    howItWorks2: '2. Haz clic en “Generar Canción”: enviamos tu prompt de forma segura al motor de música IA.',
    howItWorks3: '3. Escucha y descarga: cuando esté lista, prévala y guárdala para uso personal.',
    howItWorks4: '4. (Opcional) Agrega tu propia clave de Suno para usar tus créditos.',
    showTips: 'Mostrar Consejos y Mejores Prácticas',
    hideTips: 'Ocultar Consejos y Mejores Prácticas',
    bestPractices: '✅ Mejores Prácticas:',
    avoid: '❌ Evitar:',
    examplePrompts: '🎵 Ejemplos de Prompts:',
    checkCredits: '💰 Verificar Créditos',
    showHistory: '🎵 Mostrar Historial',
    hideHistory: '🎵 Ocultar Historial',
    yourSongs: 'Tus Canciones',
    noSongs: '¡Aún no hay canciones. Genera tu primera!',
    play: 'Reproducir',
    placeholder: 'Una balada de jazz melancólica sobre cafeterías...',
    generateButton: 'Generar Canción',
    generating: 'Creando tu canción...',
    download: 'Descargar Canción',
    downloadLyrics: 'Descargar Letra (si disponible)',
    createdBy: 'Creado por Jessie, con la guía del Dr. Lee',
    footerLine1: '❤️ De parte de Jessie ❤️',
    footerLine2: 'Para familia y amigos',
    longPromptWarning: '⚠️ Los prompts largos pueden tener problemas',
    enterPrompt: 'Por favor ingresa una idea de canción',
    sensitiveWarning: '⚠️ Advertencia: Tu prompt puede contener contenido sensible que podría ser rechazado. Considera usar un lenguaje más neutral.',
    contentModeration: '⚠️ Moderación de Contenido: Tu prompt contiene palabras que no están permitidas. Por favor intenta:\n• Evitar contenido violento, explícito u ofensivo\n• Usar descripciones más generales\n• Enfocarte en el estilo musical y el estado de ánimo en lugar de temas específicos',
    generationFailed: 'La generación de música falló. Por favor intenta de nuevo.',
    timeout: 'La generación expiró después de 10 minutos. La canción aún puede estar procesándose. Por favor verifica más tarde o intenta de nuevo.',
    downloadFailed: 'Error al descargar la canción. Por favor intenta de nuevo.',
    creditsFailed: 'Error al obtener créditos',
    songReady: '¡Canción lista!',
    startingGeneration: 'Iniciando generación...',
    taskCreated: 'Tarea creada, esperando generación...',
    tips: {
      practice1: 'Mantén los prompts bajo 1000 caracteres para resultados óptimos',
      practice2: 'Enfócate en estilo musical, estado de ánimo y tempo (ej. jazz alegre, balada lenta)',
      practice3: 'Describe instrumentos, género y estilo vocal específicamente',
      practice4: 'Usa imágenes vívidas y emociones para inspirar a la IA',
      avoid1: 'Nombres reales de personas, marcas o ubicaciones específicas',
      avoid2: 'Contenido violento, explícito o controvertido',
      avoid3: 'Descripciones demasiado complejas o confusas',
      avoid4: 'Contenido personal, privado o con derechos de autor',
      example1: 'Pista hip-hop alegre con bajo potente y voces de rap confiadas. Temas de nuevos comienzos, superación de obstáculos y autoconfianza. Beats trap modernos con tempo energético alrededor de 140 BPM.',
      example2: 'Balada de jazz suave con melodías de piano suaves y saxofón cálido. Tempo lento, ambiente romántico perfecto para veladas íntimas. Voces gentiles con profundidad emocional y acompañamiento sutil de cuerdas.',
      example3: 'Himno de rock de alta energía con guitarras eléctricas potentes y batería contundente. Letras inspiradoras sobre perseguir sueños y perseverancia. Estilo rock de estadio con coro épico y mensaje motivacional.',
      example4: 'Canción folk acústica melódica con guitarra punteada y voces suaves. Temas nostálgicos de hogar, recuerdos y tiempos más simples. Atmósfera cálida e íntima con toques gentiles de armónica.',
    },
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [prompt, setPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [credits, setCredits] = useState<number | null>(null);
  const [showSongs, setShowSongs] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [showTips, setShowTips] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [userApiKey, setUserApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Fall back to English for languages without full translations yet
  const t = translations[language as 'en' | 'es'] || translations.en;

  // Load API key from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('sunoApiKey');
      if (savedKey) {
        setUserApiKey(savedKey);
      }
    }
  }, []);

  // Rotating placeholder examples
  const placeholderExamples = [
    'A melancholic jazz ballad about coffee shops...',
    'Upbeat pop song with catchy chorus about summer love',
    'Electronic dance track with heavy bass drops',
    'Acoustic folk song about nostalgic childhood memories',
    'Rock anthem with powerful guitar solos and drums',
    'Peaceful piano melody for meditation and relaxation'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentPlaceholder = placeholderExamples[placeholderIndex];

  const checkStatus = async (taskId: string) => {
    const maxAttempts = 20; // 10 minutes max (20 * 30 seconds) - following API recommendations
    let attempts = 0;
    const startTime = Date.now();

    // Update timer display every second for smooth countdown
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const elapsedMinutes = Math.floor(elapsed / 60);
      const elapsedSeconds = elapsed % 60;
      const generatingText = language === 'en' ? 'Generating your song...' : 'Generando tu canción...';
      setStatusMessage(`${generatingText} ${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, '0')}`);
    }, 1000);

    while (attempts < maxAttempts) {
      attempts++;

      try {
        const response = await fetch(`/api/status?taskId=${taskId}`);

        if (!response.ok) {
          console.error('Status check failed:', response.status);
          await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds as recommended
          continue;
        }

        const data = await response.json();

        // Log for debugging
        console.log('Poll response:', data);

        if (data.error) {
          // Check if it's a sensitive word error
          if (data.sensitiveWordError) {
            setError(t.contentModeration);
          } else {
            setError(data.error);
          }
          setLoading(false);
          return;
        }

        if (data.status === 'SUCCESS' && data.audioUrl) {
          clearInterval(timerInterval); // Stop the timer
          setAudioUrl(data.audioUrl);
          setSongTitle(data.title || (language === 'en' ? 'Your Song' : 'Tu Canción'));
          setLyrics(data.lyric || '');
          setStatusMessage(t.songReady);
          setLoading(false);

          // Alert user that song is ready
          const alertMessage = language === 'en' 
            ? `🎵 Your song "${data.title || 'Your Song'}" is ready!` 
            : `🎵 ¡Tu canción "${data.title || 'Tu Canción'}" está lista!`;
          alert(alertMessage);

          // Save to localStorage
          const song: Song = {
            id: taskId,
            title: data.title || (language === 'en' ? 'Your Song' : 'Tu Canción'),
            audioUrl: data.audioUrl,
            prompt: prompt,
            createdAt: new Date().toISOString(),
            lyric: data.lyric || ''
          };
          const saved = JSON.parse(localStorage.getItem('sunoSongs') || '[]') as Song[];
          saved.unshift(song);
          localStorage.setItem('sunoSongs', JSON.stringify(saved.slice(0, 50))); // Keep last 50

          return;
        } else if (data.status === 'FAILED') {
          clearInterval(timerInterval); // Stop the timer
          setError(t.generationFailed);
          setLoading(false);
          return;
        } else if (data.status === 'GENERATING' || data.status === 'PENDING') {
          await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds as recommended by API docs
        } else {
          // Unknown status, keep polling
          await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds as recommended
        }
      } catch {
        console.error('Status check error');
        await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds as recommended
      }
    }

    clearInterval(timerInterval); // Stop the timer on timeout
    setError(t.timeout);
    setLoading(false);
  };

  const generateSong = async () => {
    if (!prompt.trim()) {
      setError(t.enterPrompt);
      return;
    }

    // Basic content validation
    const sensitivePatterns = /\b(kill|death|violence|explicit|nsfw|sexual|drug|hate)\b/i;
    if (sensitivePatterns.test(prompt)) {
      setError(t.sensitiveWarning);
      // Still allow submission, just warn
    }

    setLoading(true);
    setError('');
    setAudioUrl('');
    setSongTitle('');
    setStatusMessage(t.startingGeneration);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, userApiKey }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else if (data.taskId) {
        setStatusMessage(t.taskCreated);
        await checkStatus(data.taskId);
      }
    } catch {
      setError(t.generationFailed);
      setLoading(false);
    }
  };

  const downloadSong = async () => {
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${songTitle || 'song'}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      setError(t.downloadFailed);
    }
  };

  const downloadLyrics = () => {
    if (!lyrics) return;

    const blob = new Blob([lyrics], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${songTitle || 'song'}_lyrics.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const checkCredits = async () => {
    try {
      const response = await fetch('/api/credits');
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCredits(data.credits);
      }
    } catch {
      setError(t.creditsFailed);
    }
  };

  const loadSongHistory = () => {
    const saved = JSON.parse(localStorage.getItem('sunoSongs') || '[]') as Song[];
    setSongs(saved);
    setShowSongs(!showSongs);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Simplified background - removed decorative music icons for cleaner look */}
      <div className="absolute inset-0 pointer-events-none">
      </div>

      <div className="max-w-3xl w-full bg-purple-50 rounded-2xl shadow-2xl p-12 pb-28 sm:pb-12 relative z-10" style={{boxShadow: '0 0 60px rgba(168, 85, 247, 0.4), 0 0 100px rgba(236, 72, 153, 0.3)'}}>
        {/* Clean top navigation bar */}
        <div className="mb-6 flex items-center justify-between">
          {/* Left side - Language selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="pt">🇧🇷 Português</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="it">🇮🇹 Italiano</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="ko">🇰🇷 한국어</option>
            <option value="zh">🇨🇳 中文</option>
          </select>
          
          {/* Right side - Secondary actions */}
          <div className="flex items-center gap-2">
            {/* Credits button - subtle */}
            <button
              onClick={checkCredits}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200 rounded-lg transition font-medium"
              title="Check available credits"
            >
              <span>💰</span>
              <span>{credits !== null ? credits : 'Check'}</span>
            </button>
            {/* History button - subtle */}
            <button
              onClick={loadSongHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200 rounded-lg transition font-medium"
              title={showSongs ? 'Hide song history' : 'Show song history'}
            >
              <span>🕘</span>
              <span>{showSongs ? 'Hide' : 'History'}</span>
            </button>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <h1 className="text-3xl font-bold text-gray-800 text-center flex items-center justify-center gap-3 leading-tight">
            <span>🎵</span>
            <span className="flex flex-col items-center">
              <span>Songs4u</span>
              <span className="text-2xl font-semibold">Music Generator</span>
            </span>
            <span>🎶</span>
          </h1>
        </div>
        {/* How it works - progressive disclosure, collapsed by default */}
        <details className="mb-6 text-center">
          <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700 transition list-none flex items-center justify-center gap-1 py-2">
            <span className="text-gray-400">ℹ️</span>
            <span>{t.howItWorksTitle}</span>
            <span className="text-gray-400 text-[10px]">({language === 'en' ? 'tap to expand' : 'toca para expandir'})</span>
          </summary>
          <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">1.</span>
                <span>{t.howItWorks1}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">2.</span>
                <span>{t.howItWorks2}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">3.</span>
                <span>{t.howItWorks3}</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">4.</span>
                <span>{t.howItWorks4}</span>
              </p>
            </div>
          </div>
        </details>


        <div className="mb-8">
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full text-xs text-gray-500 hover:text-gray-700 transition flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50"
          >
            <span>💡</span>
            <span className="font-medium">
              {showTips ? t.hideTips : t.showTips}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform ${showTips ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showTips && (
            <div className="mt-3 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Two-column layout for desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left column - Best Practices and Avoid */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-green-500">✅</span> {t.bestPractices}
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-2 ml-6">
                      <li>• {t.tips.practice1}</li>
                      <li>• {t.tips.practice2}</li>
                      <li>• {t.tips.practice3}</li>
                      <li>• {t.tips.practice4}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-red-500">❌</span> {t.avoid}
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-2 ml-6">
                      <li>• {t.tips.avoid1}</li>
                      <li>• {t.tips.avoid2}</li>
                      <li>• {t.tips.avoid3}</li>
                      <li>• {t.tips.avoid4}</li>
                    </ul>
                  </div>
                </div>

                {/* Right column - Example Prompts */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-blue-500">🎵</span> {t.examplePrompts}
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 hover:bg-gray-100 transition cursor-pointer" onClick={() => setPrompt(t.tips.example1)}>
                      <p className="text-sm text-gray-700">{t.tips.example1}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to use →</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 hover:bg-gray-100 transition cursor-pointer" onClick={() => setPrompt(t.tips.example2)}>
                      <p className="text-sm text-gray-700">{t.tips.example2}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to use →</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 hover:bg-gray-100 transition cursor-pointer" onClick={() => setPrompt(t.tips.example3)}>
                      <p className="text-sm text-gray-700">{t.tips.example3}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to use →</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 hover:bg-gray-100 transition cursor-pointer" onClick={() => setPrompt(t.tips.example4)}>
                      <p className="text-sm text-gray-700">{t.tips.example4}</p>
                      <p className="text-xs text-gray-500 mt-1">Click to use →</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showSongs && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
            <h3 className="font-bold mb-3">{t.yourSongs} ({songs.length})</h3>
            {songs.length === 0 ? (
              <p className="text-gray-500 text-sm">{t.noSongs}</p>
            ) : (
              <div className="space-y-3">
                {songs.map((song: Song) => (
                  <div key={song.id} className="p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-purple-800">{song.title}</p>
                        <p className="text-xs text-gray-500">{new Date(song.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 italic line-clamp-2">{song.prompt}</p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => {
                          setAudioUrl(song.audioUrl);
                          setSongTitle(song.title);
                          setLyrics(song.lyric || '');
                          setShowSongs(false);
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }}
                        className="flex-1 min-w-[80px] px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-lg hover:from-purple-600 hover:to-pink-600 transition shadow-sm font-semibold"
                      >
                        ▶️ {t.play}
                      </button>
                      <button
                        onClick={() => {
                          setPrompt(song.prompt);
                          setShowSongs(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex-1 min-w-[80px] px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-lg hover:from-blue-600 hover:to-cyan-600 transition shadow-sm font-semibold"
                      >
                        ✏️ {language === 'en' ? 'Refine' : 'Refinar'}
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const response = await fetch(song.audioUrl);
                            const blob = await response.blob();
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${song.title}.mp3`;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                          } catch {
                            setError(t.downloadFailed);
                          }
                        }}
                        className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-lg hover:from-green-600 hover:to-emerald-600 transition shadow-sm font-semibold"
                      >
                        🎵
                      </button>
                      {song.lyric && (
                        <button
                          onClick={() => {
                            const blob = new Blob([song.lyric || ''], { type: 'text/plain' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${song.title}_lyrics.txt`;
                            document.body.appendChild(a);
                            a.click();
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                          }}
                          className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs rounded-lg hover:from-indigo-600 hover:to-blue-600 transition shadow-sm font-semibold"
                        >
                          📝
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const updated = songs.filter(s => s.id !== song.id);
                          setSongs(updated);
                          localStorage.setItem('sunoSongs', JSON.stringify(updated));
                        }}
                        className="px-3 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs rounded-lg hover:from-red-600 hover:to-rose-600 transition shadow-sm font-semibold"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          {/* Template chips - horizontally scrollable on mobile */}
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible">
              {(language === 'en'
                ? [
                    { label: 'Pop', text: 'Upbeat pop, catchy chorus, bright synths, positive lyrics, 120 BPM.' },
                    { label: 'Dance', text: 'Dance/EDM, energetic beat, big chorus drop, clean pop vocals, festival vibe.' },
                    { label: 'Country', text: 'Modern country, acoustic guitar + light drums, storytelling lyrics, warm chorus.' },
                    { label: 'Latin', text: 'Latin pop/reggaeton vibe, syncopated rhythm, upbeat, summer feel, catchy hook.' },
                    { label: 'Worship', text: 'Peaceful worship song with acoustic guitar, heartfelt lyrics, uplifting chorus.' },
                  ]
                : [
                    { label: 'Pop', text: 'Pop alegre, coro pegajoso, sintetizadores brillantes, letra positiva, 120 BPM.' },
                    { label: 'Dance', text: 'Dance/EDM, ritmo enérgico, gran "drop" en el coro, voces pop limpias, vibra de festival.' },
                    { label: 'Country', text: 'Country moderno, guitarra acústica + percusión suave, letra narrativa, coro cálido.' },
                    { label: 'Latin', text: 'Vibra de pop latino/reggaetón, ritmo sincopado, animado, sensación de verano, gancho pegajoso.' },
                    { label: 'Alabanza', text: 'Canción de alabanza tranquila con guitarra acústica, letra sincera y coro inspirador.' },
                  ]
              ).map((tmpl) => (
                <button
                  key={tmpl.label}
                  type="button"
                  onClick={() => setPrompt(tmpl.text)}
                  className="px-3 py-1.5 rounded-full bg-white border border-purple-200 text-xs font-semibold text-purple-700 hover:bg-purple-50 transition shadow-sm whitespace-nowrap flex-shrink-0"
                >
                  {tmpl.label}
                </button>
              ))}
              {/* Examples button */}
              <button
                type="button"
                onClick={() => setShowTips(true)}
                className="px-3 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-xs font-semibold text-purple-700 hover:bg-purple-200 transition shadow-sm whitespace-nowrap flex-shrink-0"
              >
                {language === 'en' ? '💡 Examples' : '💡 Ejemplos'}
              </button>
            </div>
            {/* Fade hint on right edge for mobile */}
            <div className="absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-purple-50 to-transparent pointer-events-none sm:hidden"></div>
          </div>

          {/* Subtitle moved above textarea */}
          <p className="text-gray-500 text-center text-sm">
            {t.subtitle}
          </p>

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={currentPlaceholder}
              className="w-full h-64 p-4 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 resize-y text-base bg-white text-gray-800 shadow-sm transition-all"
              disabled={loading}
              maxLength={500}
            />
            <div className={`absolute bottom-3 right-3 text-sm font-semibold px-2 py-1 rounded-md transition-all ${
              prompt.length > 450 ? 'text-red-600 bg-red-50 border border-red-200' : 
              prompt.length > 350 ? 'text-orange-600 bg-orange-50 border border-orange-200' : 
              'text-gray-500 bg-gray-50 border border-gray-200'
            }`}>
              <span className="flex items-center gap-1">
                <span>{prompt.length}/500</span>
                {prompt.length > 400 && <span className="text-xs">⚠️</span>}
              </span>
            </div>
          </div>
          
          {/* Random Example button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={() => {
                const randomIndex = Math.floor(Math.random() * placeholderExamples.length);
                setPrompt(placeholderExamples[randomIndex]);
              }}
              className="text-xs text-blue-600 hover:text-blue-700 transition flex items-center gap-1 px-3 py-1 rounded-full hover:bg-blue-50"
            >
              <span>🎲</span>
              <span>Random Example</span>
            </button>
          </div>

          {/* Usage notice - neutral informational banner */}
          <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-gray-700">
            <div className="text-center">
              <p className="font-medium text-blue-700 mb-1">ℹ️ {language === 'en' ? 'Usage Information' : 'Información de Uso'}</p>
              <p className="text-[11px] leading-snug text-gray-600">{t.oneTimeNotice}</p>
              <p className="text-[10px] leading-snug text-gray-500 mt-1">{t.legalDisclaimer}</p>
            </div>
          </div>

          {/* Generation time - moved above Generate button */}
          <p className="text-xs text-gray-500 text-center">
            {t.generationTime} ⏱️
          </p>

          {/* Generate button - enhanced primary CTA */}
          <button
            onClick={generateSong}
            disabled={loading}
            className="hidden sm:block w-full bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            {loading ? t.generating : '🎵 ' + t.generateButton}
          </button>

          {loading && statusMessage && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-700">
              <div className="flex items-center space-x-3">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{statusMessage}</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              <div className="whitespace-pre-line">{error}</div>
            </div>
          )}

          {audioUrl && (
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg space-y-4">
              <p className="text-purple-800 font-semibold text-lg">{songTitle}</p>
              <audio controls className="w-full" src={audioUrl}>
                Your browser does not support audio playback.
              </audio>
              {/* Download buttons - stack on mobile, row on desktop */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:rounded-lg sm:overflow-hidden sm:shadow-md">
                <button
                  onClick={downloadSong}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 font-semibold hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center space-x-2 rounded-lg sm:rounded-none shadow-md sm:shadow-none"
                >
                  <span>🎵</span>
                  <span>{language === 'en' ? 'Download Song' : 'Descargar Canción'}</span>
                </button>
                {lyrics && (
                  <>
                    <button
                      onClick={() => {
                        const lyricsDiv = document.getElementById('lyrics-display');
                        if (lyricsDiv) {
                          lyricsDiv.classList.toggle('hidden');
                        }
                      }}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 font-semibold hover:from-indigo-600 hover:to-indigo-700 transition flex items-center justify-center space-x-2 rounded-lg sm:rounded-none shadow-md sm:shadow-none"
                    >
                      <span>👁️</span>
                      <span>{language === 'en' ? 'View Lyrics' : 'Ver Letra'}</span>
                    </button>
                    <button
                      onClick={downloadLyrics}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 font-semibold hover:from-purple-600 hover:to-purple-700 transition flex items-center justify-center space-x-2 rounded-lg sm:rounded-none shadow-md sm:shadow-none"
                    >
                      <span>📝</span>
                      <span>{language === 'en' ? 'Download Lyrics' : 'Descargar Letra'}</span>
                    </button>
                  </>
                )}
              </div>
              {lyrics && (
                <div id="lyrics-display" className="hidden p-4 bg-white border border-purple-200 rounded-lg">
                  <p className="text-sm font-semibold text-purple-700 mb-2">📝 {language === 'en' ? 'Lyrics' : 'Letra'}</p>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">{lyrics}</pre>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-purple-600">{t.footerLine1}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-semibold text-purple-600">{t.footerLine2}</span>
          </p>
        </div>
      </div>

      {/* Mobile sticky generate bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-20">
        <div className="mx-auto max-w-3xl px-4 pb-[env(safe-area-inset-bottom)]">
          <div className="bg-white/95 backdrop-blur border border-purple-200 rounded-t-xl shadow-lg p-3 flex items-center gap-3">
            <div className="text-xs font-semibold text-gray-500 tabular-nums">
              {prompt.length}/500
            </div>
            <button
              onClick={generateSong}
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold disabled:opacity-50 shadow-md transition-all"
            >
              {loading ? t.generating : '🎵 ' + t.generateButton}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
