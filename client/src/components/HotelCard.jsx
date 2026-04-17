import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 border border-gray-100 flex flex-col h-full">
      {/* Image Container with Hover Effect */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          onError={(e) => {
            e.currentTarget.onerror = null; // prevent infinite loop
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80';
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-sm font-bold text-gray-800 shadow-sm flex items-center gap-1">
          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {hotel.rating}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="text-sm text-blue-600 font-semibold mb-2 uppercase tracking-wider">{hotel.location}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 truncate">{hotel.name}</h3>
        
        {/* Amenities Preview */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {hotel.amenities.slice(0, 2).map((amenity, i) => (
            <span key={i} className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 2 && (
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
              +{hotel.amenities.length - 2}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Starting from</span>
            <div className="text-2xl font-black text-gray-900">₹{hotel.price}<span className="text-sm font-medium text-gray-500">/night</span></div>
          </div>
          <Link 
            to={`/hotel/${hotel.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm hover:-translate-y-0.5 duration-200"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
