import type { PropsWithChildren } from "react";
import { useParams, Link } from "react-router-dom";
import { usePersonas } from "../modules/chat/query/usePersonas";
import { Navbar } from "../components";
import { Bot, Loader2 } from "lucide-react";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { personaSlug } = useParams<{ personaSlug: string }>();
    const { data, isLoading } = usePersonas();
    const personas = data?.personas ?? [];

    return (
        <div className="flex flex-col w-screen h-screen overflow-hidden bg-app text-white">
            <div className="shrink-0">
                <Navbar />
            </div>
            
            <div className="flex-grow flex w-full overflow-hidden">
                {/* Left Sidebar - Persona List */}
                <aside className="w-76 border-r border-border bg-card flex flex-col shrink-0 hidden md:flex h-full">
                    <div className="p-4 border-b border-border/60 bg-tertiary/20">
                        <h3 className="text-[10px] font-bold font-mono tracking-widest text-neutral uppercase">
                            AI Personas ({personas.length})
                        </h3>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-3 space-y-1">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-10 gap-2">
                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                <span className="text-xs font-mono text-neutral">Loading...</span>
                            </div>
                        )}
                        
                        {!isLoading && personas.map((p) => {
                            const isActive = p.slug === personaSlug;
                            return (
                                <Link
                                    key={p._id}
                                    to={`/chat/${p.slug}`}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                                        ${isActive 
                                            ? 'bg-primary/20 border border-primary/30 text-white shadow-inner shadow-primary/5' 
                                            : 'border border-transparent hover:bg-tertiary/45 text-neutral hover:text-white'
                                        }`}
                                >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200
                                        ${isActive 
                                            ? 'bg-primary/25 border-primary/40 text-primary-200' 
                                            : 'bg-tertiary border-border text-neutral group-hover:text-primary group-hover:border-primary/40'
                                        }`}
                                    >
                                        {p.avatarUrl ? (
                                            <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <Bot className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="text-sm font-semibold truncate leading-tight">{p.name}</div>
                                        <div className="text-[10px] font-mono text-neutral/70 group-hover:text-neutral truncate mt-0.5">@{p.slug}</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    
                    {/* Footnote inside sidebar */}
                    <div className="p-3.5 border-t border-border bg-tertiary/10 text-center shrink-0">
                        <p className="text-[10px] font-label text-neutral/50">
                            © {new Date().getFullYear()} masqueradeAI
                        </p>
                    </div>
                </aside>
                
                {/* Right Chat Area */}
                <main className="flex-grow flex flex-col min-w-0 h-full overflow-hidden bg-app">
                    {children}
                </main>
            </div>
        </div>
    );
};
