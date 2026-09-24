import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Shop', to: '/' },
    { label: 'Men', to: '/products?cat=men' },
    { label: 'Women', to: '/products?cat=women' },
    { label: 'Combos', to: '/products?cat=men' },
    { label: 'Joggers', to: '/products?cat=men' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#BEBCBD]/30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
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
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-bold tracking-wide transition-colors ${
                    isActive && link.to === '/'
                      ? 'text-[#8A33FD]'
                      : 'text-[#807D7E] hover:text-[#3C4242]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
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
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EC4899] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Profile */}
            <Link
              to="/profile"
              className="w-10 h-10 rounded-lg bg-[#F6F6F6] hover:bg-[#8A33FD]/10 text-[#3C4242] hover:text-[#8A33FD] flex items-center justify-center transition-colors"
              aria-label="User Profile"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Bag */}
            <Link
              to="/cart"
              className="relative w-10 h-10 rounded-lg bg-[#F6F6F6] hover:bg-[#8A33FD]/10 text-[#3C4242] hover:text-[#8A33FD] flex items-center justify-center transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8A33FD] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>
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

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-[#3C4242] py-2 px-2 rounded-lg hover:bg-[#F6F6F6] hover:text-[#8A33FD]"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t border-[#F6F6F6] flex gap-2">
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#807D7E] hover:text-[#8A33FD] py-1.5"
              >
                My Orders
              </Link>
              <span className="text-[#BEBCBD]">•</span>
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-[#807D7E] hover:text-[#8A33FD] py-1.5"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
