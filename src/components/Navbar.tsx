import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Menu, X, LogOut } from 'lucide-react';
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
            <Heart className="w-8 h-8" />
            <span className="text-2xl font-bold">Lovana.ai</span>
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