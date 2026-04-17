import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHotel = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/hotels/${id}`);
        if(res.ok) {
           const data = await res.json();
           setHotel(data);
        }
      } catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
  if (!hotel) return <div className="min-h-screen flex items-center justify-center pt-20">Hotel not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-indigo-600 flex items-center gap-2 font-medium mb-4 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to results
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {hotel.location}
                </span>
                <span className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded text-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  {hotel.rating} ({hotel.reviews} reviews)
                </span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-gray-500 text-sm font-medium">Starting from</p>
              <div className="text-3xl font-black text-blue-600">₹{hotel.price}</div>
            </div>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 h-[50vh] md:h-[60vh]">
          <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg group relative">
            <img src={hotel.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt={hotel.name} />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg group relative">
              {/* Note: The seeder will provide extra images, but we fallback gracefully */}
              <img src={hotel.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt="Room detail" />
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden shadow-lg group relative">
              <img src={hotel.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" alt="Amenities" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center font-bold text-white tracking-widest uppercase hover:bg-black/40 transition-colors cursor-pointer">
                View All Photos
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-light">
              {hotel.description}
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {Array.isArray(hotel.amenities) && hotel.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700 font-medium bg-white p-4 rounded-md border border-gray-100 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {amenity}
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select a Room</h3>
            <div className="space-y-4">
              {Array.isArray(hotel.rooms) && hotel.rooms.map(room => (
                <div key={room.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h4>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Sleeps {room.capacity}
                    </p>
                  </div>
                  <div className="flex flex-col items-end md:items-center w-full md:w-auto mt-4 md:mt-0">
                    <span className="text-2xl font-black text-gray-900">₹{room.price}<span className="text-sm font-medium text-gray-500">/night</span></span>
                    <button 
                      onClick={() => navigate(`/checkout/${hotel.id}/${room.id}`)}
                      className="mt-3 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-all"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Booking Summary</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Check-in / Check-out</label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-800">
                    Select dates
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Guests</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-800 outline-none">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-black/20">
                Check Availability
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 font-medium">You won't be charged yet</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelDetails;
