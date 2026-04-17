import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        {/* We assume Navbar and Footer are wrapped at the App level, depending on routing */}
        <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-24 md:py-32">
            
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About ROOMIFY</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    We are dedicated to providing you with the ultimate hotel booking experience. Our platform connects travelers with the world's most breathtaking accommodations, ensuring every stay is an unforgettable luxury getaway.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <img 
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="Luxury Resort" 
                        className="rounded-2xl shadow-xl object-cover h-96 w-full"
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        At ROOMIFY, our mission is to redefine luxury travel by bringing transparency, ease, and premium design to the booking process. We carefully curate an exclusive list of hotels that meet the highest standards of hospitality, design, and comfort.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Whether you're looking for a peaceful seaside retreat or an immersive cultural stay in a bustling metropolis, ROOMIFY guarantees a seamless reservation and an extraordinary experience from check-in to check-out.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-12 border-t border-gray-200">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-blue-600 text-4xl mb-4">🌍</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
                    <p className="text-gray-600">Access to thousands of exclusive luxury hotels around the world.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-blue-600 text-4xl mb-4">💎</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                    <p className="text-gray-600">Hand-picked selections to ensure you experience nothing but the absolute best.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-blue-600 text-4xl mb-4">🤝</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-gray-600">Dedicated travel assistants are available at all times to make your journey perfect.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;
