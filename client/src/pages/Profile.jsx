import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { assets } from '../assets/assets';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match!");
            return;
        }
        // Mocking a successful password update
        setMessage("Password successfully updated. (Placeholder functionality)");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    if (!user) {
        return (
            <div className="flex-1 flex items-center justify-center pt-24 font-sans">
                <p className="text-xl text-gray-600 font-semibold">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-32 font-sans">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - User Info */}
                <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center h-fit">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 border-4 border-white shadow-md">
                        <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="User Avatar" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Guest User</h2>
                    <p className="text-sm text-gray-500 font-medium mb-4">{user.email}</p>
                    
                    <div className="w-full border-t border-gray-100 pt-4 mt-2">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-500">Member Since</span>
                            <span className="font-semibold text-gray-800">1st Jan, 2025</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Role</span>
                            <span className="font-semibold text-gray-800">Standard User</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Forms */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
                    
                    {/* Account Settings */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                disabled 
                                value={user.email} 
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md text-gray-500 cursor-not-allowed font-medium"
                            />
                            <p className="text-xs text-gray-400 mt-2">Your email address is used for logging in and cannot be changed.</p>
                        </div>
                    </div>

                    {/* Reset Password */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Reset Password</h3>
                        
                        {message && (
                            <div className={`p-4 rounded-md mb-6 font-medium text-sm ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                <input 
                                    type="password" 
                                    required 
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                    <input 
                                        type="password" 
                                        required 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="New password"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        required 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full p-3 bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-4">
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition-all shadow-sm"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
