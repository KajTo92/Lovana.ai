import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Menu, X, LogOut, CreditCard } from 'lucide-react';
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
            <Link
              to="/pricing"
              className={`font-medium transition-colors hover:text-white/80 flex items-center space-x-1 ${isActive('/pricing') ? 'underline underline-offset-4' : ''}`}
            >
              <CreditCard size={18} />
              <span>Pricing</span>
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
            <Link
              to="/pricing"
              className="block py-2 font-medium"
              onClick={toggleMenu}
            >
              Pricing
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