import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useCurrentUser from "../modules/auth/query/useCurrentUser";
import { useLogout } from "../modules/auth/mutation/useLogout";
import { usePersonas } from "../modules/chat/query/usePersonas";
import { LogOut, Menu, X, Bot } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: userData } = useCurrentUser();
  const { data: personasData } = usePersonas();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  
  const user = userData?.user;
  const personas = personasData?.personas ?? [];
  const { mutateAsync: logoutUser } = useLogout();

  const isActive = (slug: string) => {
    return location.pathname === `/chat/${slug}`;
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full h-16 bg-card border-b border-border relative z-50">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 md:px-10 lg:px-16">
        
        {/* Logo and Hamburger Container */}
        <div className="flex items-center gap-4">
          {user && (
            <button
              ref={hamburgerRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-neutral hover:text-white focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="bg-primary/20 p-2 rounded-lg border border-primary/30">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white font-mono">
              masquerade<span className="text-primary">AI</span>
            </span>
          </Link>
        </div>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-9 h-9 rounded-full bg-primary hover:bg-primary-600 transition-all duration-200 flex items-center justify-center text-sm font-bold text-white uppercase focus:outline-none ring-2 ring-primary/30 hover:ring-primary/50"
            >
              {getInitials(user?.fullname)}
            </button>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-sm font-semibold text-neutral hover:text-white transition-colors py-2">
                Sign In
              </Link>
              <Link to="/signup" className="text-sm font-semibold bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                Sign Up
              </Link>
            </div>
          )}

          {user && isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-card rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2 border border-border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-border bg-tertiary/55">
                <p className="text-xs font-semibold text-white truncate">{user?.fullname}</p>
                <p className="text-[10px] font-label text-neutral truncate mt-0.5">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-3 text-xs font-semibold text-danger hover:bg-red-950/20 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Slide-down (AI Persona Selector for Mobile) */}
      {user && isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="absolute top-16 left-0 w-full bg-card shadow-xl border-t border-border md:hidden flex flex-col items-start px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <p className="text-[10px] font-bold font-mono tracking-widest text-neutral uppercase mb-1">
            AI Personas
          </p>
          <div className="w-full flex flex-col gap-2">
            {personas.map((p) => (
              <Link
                key={p._id}
                to={`/chat/${p.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 w-full py-2.5 px-3 rounded-xl transition-all duration-200 border
                  ${isActive(p.slug) 
                    ? 'bg-primary/20 border-primary/30 text-white' 
                    : 'bg-tertiary/20 border-transparent text-neutral hover:text-white'
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border
                  ${isActive(p.slug) ? 'bg-primary/20 border-primary/30 text-primary-200' : 'bg-tertiary border-border text-neutral'}`}
                >
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-mono text-sm font-semibold">{p.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
