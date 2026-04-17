import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchBookings();
  }, [token]);

  if (!token) return <div className="pt-32 text-center text-xl font-bold">Please login to view bookings.</div>;

  return (
    <div className="min-h-screen pt-28 bg-gray-50 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No upcoming trips</h3>
            <p className="text-gray-500">It's time to pack your bags and book your next premium stay!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Hotel ID: {booking.hotelId}</h3>
                  <p className="text-gray-500 text-sm">Room ID: {booking.roomId}</p>
                  <div className="flex gap-4 mt-3 text-sm font-medium text-gray-700">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{booking.checkInDate} to {booking.checkOutDate}</span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{booking.guests} Guests</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Paid</p>
                  <p className="text-2xl font-black text-gray-900">₹{booking.totalPrice}</p>
                  <span className="inline-block mt-2 text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
