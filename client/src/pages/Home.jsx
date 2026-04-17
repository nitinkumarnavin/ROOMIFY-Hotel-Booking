import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import heroImage from '../assets/heroImage.png';

const Home = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/hotels');
        if (res.ok) {
          const data = await res.json();
          // Show only 4 featured hotels on home page
          setHotels(data.slice(0, 4));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      navigate(`/search?location=${encodeURIComponent(searchLocation.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Luxury Hotel Getaway" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 px-4 md:px-16 lg:px-24 xl:px-32 w-full pt-20">
          <div className="max-w-3xl text-left">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-semibold mb-6 border border-white/30">
              The Ultimate Hotel Experience
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight serif-font drop-shadow-lg">
              Discover Your Perfect<br/>Getaway Destination
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-12 font-medium max-w-xl drop-shadow-md">
              Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
            </p>
          </div>

          {/* Search Bar - Figma Clean Style */}
          <form 
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center max-w-5xl gap-2 mt-8"
          >
            <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
              <label className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Destination
              </label>
              <input 
                type="text" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Ex. Goa" 
                className="w-full bg-transparent outline-none font-bold text-gray-900 text-sm placeholder-gray-500"
              />
            </div>
            
            <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
              <label className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Check in
              </label>
              <input 
                type="text" 
                defaultValue="Mar 15, 2025" 
                className="w-full bg-transparent outline-none font-bold text-gray-900 text-sm"
              />
            </div>

            <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
              <label className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Check out
              </label>
              <input 
                type="text" 
                defaultValue="Mar 15, 2025" 
                className="w-full bg-transparent outline-none font-bold text-gray-900 text-sm"
              />
            </div>

            <div className="flex-1 w-full px-6 py-3 flex flex-col">
              <label className="text-xs text-gray-400 font-semibold mb-1">Guests</label>
              <input 
                type="text" 
                defaultValue="2" 
                className="w-full bg-transparent outline-none font-bold text-gray-900 text-sm"
              />
            </div>
            
            <div className="w-full md:w-auto px-2 pb-2 md:pb-0">
              <button 
                type="submit" 
                className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Featured Destinations</h2>
          <p className="text-gray-500 text-lg">Handpicked luxury stays for your next adventure.</p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500 font-medium">Loading featured properties...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
      
      {/* Promo Banner */}
      <section className="py-20 px-4 md:px-16 lg:px-24 xl:px-32 max-w-screen-2xl mx-auto">
        <div className="bg-blue-600 rounded-xl p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Get 20% off your first luxury booking</h2>
            <p className="text-blue-100 text-lg">Sign up for our newsletter to receive exclusive deals, early access to new properties, and VIP perks.</p>
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className="px-6 py-4 rounded-md outline-none min-w-[250px] font-medium" />
              <button className="bg-white text-blue-900 px-8 py-4 rounded-md font-bold shadow-sm hover:bg-gray-50 transition-all">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
