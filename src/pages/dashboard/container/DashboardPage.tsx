import { Link } from 'react-router-dom';
import { usePersonas } from '../../../modules/chat/query/usePersonas';
import { Bot, MessageSquare, Sparkles, Loader2 } from 'lucide-react';

function DashboardPage() {
  const { data, isLoading, isError, error } = usePersonas();
  const personas = data?.personas ?? [];

  return (
    <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-tertiary to-card border border-border p-6 rounded-2xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col gap-1 relative z-10">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Interactive AI Playground</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Choose Your AI Persona
          </h1>
          <p className="text-neutral text-xs md:text-sm">
            Select a tailored artificial intelligence and start having immersive conversations.
          </p>
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-neutral text-sm font-mono">Loading personas...</span>
        </div>
      )}

      {isError && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-6 text-center text-danger max-w-md mx-auto my-12">
          <p className="font-semibold">Failed to load personas</p>
          <p className="text-xs mt-1 opacity-80">{error instanceof Error ? error.message : "Connection failed"}</p>
        </div>
      )}

      {/* Personas Grid */}
      {!isLoading && !isError && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona) => (
            <div
              key={persona._id}
              className="bg-card border border-border/80 hover:border-primary/65 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden"
            >
              {/* Card gradient glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl transition-all duration-300 group-hover:bg-primary/10"></div>
              
              <div className="flex flex-col gap-4 relative z-10">
                {/* Persona Avatar */}
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                  {persona.avatarUrl ? (
                    <img
                      src={persona.avatarUrl}
                      alt={persona.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <Bot className="w-6 h-6 text-primary" />
                  )}
                </div>

                {/* Persona Details */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary-100 transition-colors">
                    {persona.name}
                  </h3>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider bg-tertiary border border-border text-primary-200 uppercase">
                    @{persona.slug}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-border/40 flex justify-between items-center relative z-10">
                <span className="text-neutral text-xs font-mono group-hover:text-neutral-200 transition-colors">
                  System Prompt Ready
                </span>
                <Link
                  to={`/chat/${persona.slug}`}
                  className="flex items-center gap-1.5 text-xs font-bold bg-primary hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md group-hover:shadow-primary/20 hover:scale-[1.02]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat Now
                </Link>
              </div>
            </div>
          ))}

          {personas.length === 0 && (
            <div className="col-span-full bg-tertiary/40 border border-border border-dashed rounded-2xl py-16 text-center text-neutral max-w-md mx-auto w-full">
              <Bot className="w-10 h-10 mx-auto opacity-50 mb-3" />
              <p className="font-semibold text-sm">No personas found</p>
              <p className="text-xs mt-1">Make sure the backend database is seeded.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
