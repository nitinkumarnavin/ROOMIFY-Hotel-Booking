import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import HotelCard from '../components/HotelCard';

const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const initialLocation = queryParams.get('location') || '';

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchLocation, setSearchLocation] = useState(initialLocation);
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortOrder, setSortOrder] = useState('Recommended');

  useEffect(() => {
    // If the URL changes (e.g. searching from Home), update local state
    setSearchLocation(new URLSearchParams(search).get('location') || '');
  }, [search]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/hotels');
        if (res.ok) {
          const data = await res.json();
          setHotels(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const toggleStar = (star) => {
    setSelectedStars(prev => 
      prev.includes(star) ? prev.filter(s => s !== star) : [...prev, star]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredHotels = useMemo(() => {
    let result = hotels;

    // 1. Filter by Location
    if (searchLocation.trim() !== '') {
      result = result.filter(h => 
        h.location.toLowerCase().includes(searchLocation.toLowerCase()) || 
        h.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // 2. Filter by Price
    result = result.filter(h => h.price <= Number(priceRange));

    // 3. Filter by Star Rating
    if (selectedStars.length > 0) {
      result = result.filter(h => {
        const roundedRating = Math.round(Number(h.rating));
        return selectedStars.includes(roundedRating);
      });
    }

    // 4. Filter by Amenities
    if (selectedAmenities.length > 0) {
      result = result.filter(h => {
        return selectedAmenities.every(amenity => {
          // simple check: see if the amenity string is mapped or exists
          // mapping simpler strings to existing db amenities could be needed
          // typical DB amenities: "Swimming Pool", "Free WiFi", "Spa", "Bar/Lounge"
          const dbAmenities = h.amenities || [];
          if (amenity === 'Pool') return dbAmenities.includes('Swimming Pool');
          if (amenity === 'Restaurant') return dbAmenities.includes('Breakfast Included') || dbAmenities.includes('24/7 Room Service');
          return dbAmenities.includes(amenity);
        });
      });
    }

    // Sort
    if (sortOrder === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'Highest Rated') {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return result;
  }, [hotels, searchLocation, priceRange, selectedStars, selectedAmenities, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Filters</h3>
            
            {/* Location Search in Sidebar */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Destination / Hotel Name</label>
              <input 
                type="text" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Where are you going?"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <label className="flex justify-between text-sm font-semibold text-gray-700 mb-4">
                Max Price
                <span className="text-blue-600">₹{priceRange}</span>
              </label>
              <input 
                type="range" 
                min="1000" 
                max="5000" 
                step="500"
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Star Rating */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Star Rating</h4>
              {[5, 4, 3].map(star => (
                <label key={star} className="flex items-center gap-3 mb-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedStars.includes(star)}
                    onChange={() => toggleStar(star)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                  />
                  <span className="text-gray-600 text-sm">{star} Stars</span>
                </label>
              ))}
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Amenities</h4>
              {['Pool', 'Free WiFi', 'Spa', 'Restaurant'].map(amenity => (
                <label key={amenity} className="flex items-center gap-3 mb-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                  />
                  <span className="text-gray-600 text-sm">{amenity}</span>
                </label>
              ))}
            </div>
            
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Properties</h2>
              <p className="text-gray-500 text-sm mt-1">{filteredHotels.length} hotels found</p>
            </div>
            <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>

          {loading ? (
             <div className="py-20 text-center text-gray-500 font-medium">Loading amazing properties...</div>
          ) : filteredHotels.length === 0 ? (
             <div className="py-20 text-center text-gray-500 font-medium bg-white rounded-2xl border border-gray-100">
                <p className="text-xl mb-2">No hotels found matching your criteria.</p>
                <button onClick={() => {setSearchLocation(''); setPriceRange(5000); setSelectedStars([]); setSelectedAmenities([]);}} className="text-blue-600 font-semibold hover:underline">Clear all filters</button>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
