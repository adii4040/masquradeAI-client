import { Link } from 'react-router-dom';
import useCurrentUser from '../../../modules/auth/query/useCurrentUser';
import { Bot, User, ArrowRight, Sparkles } from 'lucide-react';

function LandingPage() {
  const { data: userData } = useCurrentUser();
  const user = userData?.user;

  return (
    <div className="min-h-screen bg-[#070b13] text-white flex flex-col font-sans selection:bg-primary/30 selection:text-white">
      {/* Sleek Top Header */}
      <header className="h-16 border-b border-border bg-[#070b13]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold font-mono tracking-tight text-white">
              masquerade<span className="text-primary">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="text-xs font-bold font-mono bg-primary/25 border border-primary/30 text-primary-200 px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                CONSOLE
              </Link>
            ) : (
              <div className="flex gap-4 items-center">
                <Link to="/login" className="text-xs font-bold font-mono text-neutral hover:text-white transition-colors">
                  SIGN IN
                </Link>
                <Link
                  to="/signup"
                  className="text-xs font-bold font-mono bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-primary/15"
                >
                  GET STARTED
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 max-w-5xl mx-auto flex flex-col items-center text-center gap-8 z-10">
        {/* Glow Effects */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-3xl">
          Chat with digital replicas of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-100 via-primary-200 to-primary">tech mentors.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-neutral text-sm sm:text-base max-w-xl leading-relaxed">
          A development sandbox containing speech-blended AI models trained on system architecture preferences, lectures, and conversational patterns of popular educators.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-xl shadow-primary/15 hover:scale-[1.02]"
            >
              Enter Sandbox Console
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-xl shadow-primary/15 hover:scale-[1.02]"
              >
                Start your 1st Conversation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-tertiary border border-border text-neutral hover:text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:bg-card"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Realistic Chat Workspace Mockup */}
      <section className="px-4 pb-24 max-w-5xl mx-auto w-full relative">
        <div className="border border-border/80 bg-card rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-[420px]">
          {/* Mock Sidebar */}
          <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-border bg-[#0b0f19] flex flex-col shrink-0">
            <div className="p-3 border-b border-border/40 bg-tertiary/20 flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold tracking-widest text-neutral uppercase">PERSONAS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            </div>
            <div className="p-2 space-y-1">
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-primary/10 border border-primary/20 text-white">
                <div className="w-7 h-7 rounded bg-primary/25 border border-primary/40 flex items-center justify-center text-primary-200">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Hitesh Chaudhary</div>
                  <div className="text-[8px] font-mono text-neutral">@hitesh-chaudhary</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg border border-transparent text-neutral/80 opacity-60">
                <div className="w-7 h-7 rounded bg-tertiary border border-border flex items-center justify-center text-neutral">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Piyush Garg</div>
                  <div className="text-[8px] font-mono text-neutral">@piyush-garg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Chat Box */}
          <div className="flex-1 flex flex-col bg-[#070b13] min-w-0">
            <div className="h-11 border-b border-border bg-card px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="text-xs font-bold text-white leading-tight">Hitesh Chaudhary</span>
              </div>
            </div>

            {/* Thread Area (Bubble UI) */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 text-xs flex flex-col justify-end">
              {/* Message 1 (User) */}
              <div className="flex gap-2 max-w-md ml-auto flex-row-reverse">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border bg-primary/10 border-primary/20 text-primary">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="rounded-xl px-3 py-2 leading-relaxed bg-primary text-white rounded-tr-none shadow-md text-left">
                  Hitesh sir, what is your approach to learning AI? Everything feels like a cash-grab right now.
                </div>
              </div>

              {/* Message 2 (Model) */}
              <div className="flex gap-2 max-w-lg mr-auto text-left">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border bg-tertiary border-border text-neutral">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="rounded-xl px-3 py-2 leading-relaxed bg-[#0b0f19] border border-border text-gray-100 rounded-tl-none shadow-md">
                  Haan ji, main agree ki market mein abhi bohot saare log plain wrappers bana kar hype train par baithe hain, obvious si baat hai business hai toh chalega. But realistic approach ye hai ki fundamentals par dhyan do. Simple baat hai ji!
                </div>
              </div>
            </div>

            {/* Input area mockup */}
            <div className="p-3 bg-card border-t border-border shrink-0 flex gap-2">
              <div className="flex-grow bg-tertiary rounded-lg border border-border px-3 py-2 text-xs text-neutral/50 flex items-center">
                Message Hitesh Chaudhary...
              </div>
              <div className="px-3.5 py-2 bg-primary rounded-lg text-white text-xs font-bold flex items-center justify-center">
                SEND
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Dev Footer */}
      <footer className="mt-auto py-8 text-center text-neutral/45 text-[11px] font-mono border-t border-border bg-[#070b13]">
        <span>© {new Date().getFullYear()} masqueradeAI.</span>
      </footer>
    </div>
  );
}

export default LandingPage;
