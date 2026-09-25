import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import defaultAvatar from '../../assets/images/tolibov/contact-details/user-profile-avatar.webp';

export default function Header() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const currentCat = searchParams.get('cat');

  const isLinkActive = (to) => {
    if (to === '/products') {
      return location.pathname === '/products' && !currentCat;
    }
    if (to.startsWith('/products?cat=')) {
      const linkCat = to.split('=')[1];
      return location.pathname === '/products' && currentCat === linkCat;
    }
    return location.pathname === to;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Shop', to: '/products' },
    { label: 'Men', to: '/products?cat=men' },
    { label: 'Women', to: '/products?cat=women' },
    { label: 'Combos', to: '/products?cat=combos' },
    { label: 'Joggers', to: '/products?cat=joggers' }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-md shadow-black/5 py-0.5'
          : 'bg-white/95 backdrop-blur-md border-b border-[#BEBCBD]/30 shadow-xs py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >
          
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#3C4242] hover:text-[#8A33FD]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 group shrink-0">
            <span className="font-extrabold text-2xl tracking-tighter text-[#3C4242] group-hover:text-[#8A33FD] transition-colors">
              Euphoria<span className="text-[#8A33FD]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative py-1 text-sm font-bold tracking-wide transition-colors ${
                    active ? 'text-[#8A33FD]' : 'text-[#807D7E] hover:text-[#3C4242]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#8A33FD] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center relative w-72"
          >
            <Search className="w-4 h-4 text-[#807D7E] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F6F6F6] text-xs font-semibold text-[#3C4242] rounded-lg border border-transparent focus:border-[#8A33FD] focus:bg-white focus:outline-none transition-all"
            />
          </form>

          {/* Actions / Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative w-10 h-10 rounded-lg bg-[#F6F6F6] hover:bg-[#8A33FD]/10 text-[#3C4242] hover:text-[#8A33FD] flex items-center justify-center transition-colors"
              aria-label="Wishlist"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key="wishlist-counter"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#EC4899] text-white text-[10px] font-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart Bag */}
            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-lg bg-[#F6F6F6] hover:bg-[#8A33FD]/10 text-[#3C4242] hover:text-[#8A33FD] flex items-center justify-center transition-colors"
              aria-label="Shopping Cart"
              title="My Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="cart-counter"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1.5 -right-1.5 bg-[#8A33FD] text-white text-[10px] font-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* User Profile / Sign In */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#8A33FD] hover:ring-2 hover:ring-[#8A33FD]/40 transition-all flex items-center justify-center bg-[#F6F6F6] shrink-0 active:scale-95 shadow-xs"
                aria-label="User Profile"
                title={user?.name ? `${user.name} (My Profile)` : 'My Profile'}
              >
                <img
                  src={user?.avatar || defaultAvatar}
                  alt={user?.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              </Link>
            ) : (
              <Link
                to="/signin"
                className="h-10 px-4 rounded-xl bg-[#8A33FD] text-white text-xs font-bold hover:bg-[#6610F2] transition-all shadow-xs flex items-center gap-1.5 active:scale-95 shrink-0"
                aria-label="Sign In"
                title="Sign In to your account"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E6E6E6] flex flex-col gap-3 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-2">
              <Search className="w-4 h-4 text-[#807D7E] absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F6F6F6] text-xs font-semibold text-[#3C4242] rounded-lg border border-transparent focus:border-[#8A33FD] focus:outline-none"
              />
            </form>

            {navLinks.map((link) => {
              const active = isLinkActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold py-2 px-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-[#8A33FD]/10 text-[#8A33FD]'
                      : 'text-[#3C4242] hover:bg-[#F6F6F6] hover:text-[#8A33FD]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-[#F6F6F6] flex items-center gap-3">
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#807D7E] hover:text-[#8A33FD] py-1.5"
              >
                My Orders
              </Link>
              <span className="text-[#BEBCBD]">•</span>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-[#8A33FD] py-1.5 flex items-center gap-1.5"
                  >
                    <img
                      src={user?.avatar || defaultAvatar}
                      alt="Avatar"
                      className="w-4 h-4 rounded-full object-cover border border-[#8A33FD]"
                    />
                    <span>{user?.name || 'My Profile'}</span>
                  </Link>
                  <span className="text-[#BEBCBD]">•</span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-red-500 hover:text-red-700 py-1.5 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#8A33FD] py-1.5"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
