import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { mockHotels } from '../data/mockData';

const CheckoutPage = () => {
  const { id, roomId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);

  // Form State
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState(1);
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '' });

  useEffect(() => {
    // Ideally we fetch from API: /api/hotels/:id
    // But since API integration is next, we'll gracefully fallback to mock data if API is not fully wired for UI yet
    const h = mockHotels.find(h => h.id === parseInt(id));
    if (h) {
      setHotel(h);
      setRoom(h.rooms.find(r => r.id === parseInt(roomId)) || h.rooms[0]);
    }
  }, [id, roomId]);

  if (!hotel || !room) return <div className="pt-32 text-center">Loading...</div>;

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first to book a room!");
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          hotelId: hotel.id,
          roomId: room.id,
          checkInDate: dates.checkIn || new Date().toISOString().split('T')[0],
          checkOutDate: dates.checkOut || new Date().toISOString().split('T')[0],
          guests: guests,
          totalPrice: room.price * 1 // assuming 1 night
        })
      });

      if (response.ok) {
        alert("Booking Successful!");
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.message || "Failed to create booking");
      }
    } catch (err) {
      console.error(err);
      alert("Error confirming payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Payment Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h2>
            
            <form onSubmit={handlePayment} className="space-y-8">
              {/* Trip Details */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">1. Your Trip</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                    <input type="date" required value={dates.checkIn} onChange={(e)=>setDates({...dates, checkIn: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                    <input type="date" required value={dates.checkOut} onChange={(e)=>setDates({...dates, checkOut: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Guests</label>
                    <select required value={guests} onChange={(e)=>setGuests(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      {[...Array(room.capacity)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1} Guest{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">2. Payment Method</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" maxLength="5" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">CVC</label>
                      <input type="text" placeholder="123" maxLength="3" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                    </div>
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-md font-bold shadow-sm transition-all text-lg">
                Confirm & Pay ₹{room.price}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Booking Summary Array */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">Booking Summary</h3>
            <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h4 className="font-bold text-lg text-gray-800">{hotel.name}</h4>
            <p className="text-gray-500 text-sm mb-4">{hotel.location}</p>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
              <p className="font-semibold text-gray-700 mb-1">{room.name}</p>
              <p className="text-sm text-gray-500">Max Capacity: {room.capacity} Guests</p>
            </div>

            <div className="space-y-2 text-sm text-gray-600 pt-2 border-t mt-4">
              <div className="flex justify-between">
                <span>1 Night Rate</span>
                <span>₹{room.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>₹{(room.price * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-4 border-t mt-4">
                <span>Total</span>
                <span>₹{(room.price * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;

