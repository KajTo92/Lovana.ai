import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Menu, X, LogOut, Star, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-primary text-white">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/lovanaailogo.png" alt="Lovana.ai" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/photo-analysis"
              className={`font-medium transition-colors hover:text-white/80 ${isActive('/photo-analysis') ? 'underline underline-offset-4' : ''}`}
            >
              Analyze Photos
            </Link>
            <Link
              to="/bio-analysis"
              className={`font-medium transition-colors hover:text-white/80 ${isActive('/bio-analysis') ? 'underline underline-offset-4' : ''}`}
            >
              Improve Bio
            </Link>
            <Link
              to="/message-assistance"
              className={`font-medium transition-colors hover:text-white/80 ${isActive('/message-assistance') ? 'underline underline-offset-4' : ''}`}
            >
              Message Help
            </Link>
            <Link
              to="/first-message"
              className={`font-medium transition-colors hover:text-white/80 ${isActive('/first-message') ? 'underline underline-offset-4' : ''}`}
            >
              First Message
            </Link>
            
            {/* Premium Button */}
            <Link
              to="/pricing"
              className="relative bg-gradient-to-r from-accent via-accent/90 to-accent/80 hover:from-accent/90 hover:via-accent/80 hover:to-accent/70 text-gray-900 font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 group"
            >
              <Sparkles size={18} className="group-hover:animate-pulse" />
              <span>Go Premium</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 font-medium hover:text-white/80"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/photo-analysis"
              className="block py-2 font-medium"
              onClick={toggleMenu}
            >
              Analyze Photos
            </Link>
            <Link
              to="/bio-analysis"
              className="block py-2 font-medium"
              onClick={toggleMenu}
            >
              Improve Bio
            </Link>
            <Link
              to="/message-assistance"
              className="block py-2 font-medium"
              onClick={toggleMenu}
            >
              Message Help
            </Link>
            <Link
              to="/first-message"
              className="block py-2 font-medium"
              onClick={toggleMenu}
            >
              First Message
            </Link>
            
            {/* Mobile Premium Button */}
            <Link
              to="/pricing"
              className="block bg-gradient-to-r from-accent via-accent/90 to-accent/80 text-gray-900 font-semibold px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 w-fit"
              onClick={toggleMenu}
            >
              <Sparkles size={18} />
              <span>Go Premium</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;