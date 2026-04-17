import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { assets } from "../assets/assets";

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/search' },
        { name: 'About', path: '/about' }
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { user, logout } = useContext(AuthContext);

    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when scrolling
    React.useEffect(() => {
        if(isScrolled) setIsProfileOpen(false);
    }, [isScrolled]);

    return (
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-300 z-50 ${isScrolled ? "bg-white shadow-sm text-gray-800 py-3 md:py-4 border-b border-gray-100" : "bg-transparent py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to="/" className={`flex items-center font-bold text-2xl tracking-tighter ${isScrolled ? "text-blue-600" : "text-white"}`}>
                    ROOMIFY.
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8 gap-x-8">
                    {navLinks.map((link, i) => (
                        <Link key={i} to={link.path} className={`font-semibold text-[15px] ${isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"} transition-colors`}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-6 relative">
                    <img src={assets.searchIcon} alt="Search" className={`w-5 h-5 cursor-pointer ${isScrolled ? "brightness-0" : "brightness-0 invert"}`} />
                    
                    {user ? (
                        <>
                            <div className="relative">
                                <img 
                                    src={assets.userIcon} 
                                    alt="User" 
                                    className={`w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity ${isScrolled ? "brightness-0" : "brightness-0 invert"}`}
                                    onClick={() => setIsProfileOpen(!isProfileOpen)} 
                                />
                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-4 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 flex flex-col z-50 animate-fade-in text-gray-800">
                                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-semibold truncate">{user.email}</p>
                                        </div>
                                        <Link to="/profile" onClick={()=>setIsProfileOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">My Profile</Link>
                                        <Link to="/my-bookings" onClick={()=>setIsProfileOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">My Bookings</Link>
                                        <button onClick={() => { logout(); setIsProfileOpen(false); }} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 text-left transition-colors w-full">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className={`px-8 py-2.5 rounded-full font-bold transition-all text-sm ${isScrolled ? "bg-gray-900 text-white hover:bg-black" : "bg-gray-900 text-white hover:bg-black"}`}>
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <img src={assets.searchIcon} alt="Search" className={`w-5 h-5 ${isScrolled ? "brightness-0" : "brightness-0 invert"}`} />
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "text-gray-800" : "text-white"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-8 w-8 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-xl">
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <>
                            <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} className="text-xl">My Bookings</Link>
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="bg-gray-900 text-white px-10 py-3 rounded-full font-bold transition-all duration-500 shadow-lg">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-gray-900 text-white px-10 py-3 rounded-full font-bold transition-all duration-500 shadow-lg">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
    );
};

export default Navbar;