const { sequelize } = require('./config/db');
const Hotel = require('./models/Hotel');

const mockHotels = [
  {
    id: 1,
    name: "Oceanview Resort & Spa",
    location: "Maldives",
    price: 350,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    amenities: ["Free WiFi", "Pool", "Spa", "Ocean View"],
    description: "Experience the ultimate luxury at Oceanview Resort & Spa. Nested in the heart of the Maldives, featuring crystal clear waters and overwater bungalows.",
    rooms: [
      { id: 101, name: "Deluxe Overwater Villa", price: 350, capacity: 2 },
      { id: 102, name: "Premium beachfront Suite", price: 550, capacity: 4 }
    ]
  },
  {
    id: 2,
    name: "Urban Boutique Hotel",
    location: "New York, USA",
    price: 220,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    amenities: ["Free WiFi", "Gym", "City View", "Restaurant"],
    description: "Located right in the center of Manhattan, the Urban Boutique Hotel offers modern amenities, breathtaking city views, and easy access to all landmarks.",
    rooms: [
      { id: 201, name: "Standard City Room", price: 220, capacity: 2 },
      { id: 202, name: "Executive Suite", price: 380, capacity: 2 }
    ]
  },
  {
    id: 3,
    name: "Alpine Retreat Lodge",
    location: "Swiss Alps, Switzerland",
    price: 410,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    amenities: ["Free WiFi", "Ski Access", "Fireplace", "Spa"],
    description: "Your perfect winter getaway. The Alpine Retreat Lodge offers ski-in/ski-out access, cozy rooms with fireplaces, and a world-class heated pool.",
    rooms: [
      { id: 301, name: "Cozy Cabin", price: 410, capacity: 2 },
      { id: 302, name: "Family Chalet", price: 650, capacity: 6 }
    ]
  },
  {
    id: 4,
    name: "Tropical Paradise Inn",
    location: "Bali, Indonesia",
    price: 150,
    rating: 4.6,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    amenities: ["Free WiFi", "Pool", "Breakfast Included"],
    description: "Discover the serenity of Bali at the Tropical Paradise Inn. Surrounded by lush greenery, it's the perfect escape from the city hustle.",
    rooms: [
      { id: 401, name: "Garden Room", price: 150, capacity: 2 },
      { id: 402, name: "Poolside Villa", price: 250, capacity: 3 }
    ]
  }
];

const seed = async () => {
  await sequelize.sync({ alter: true });
  for (let hotel of mockHotels) {
    const exists = await Hotel.findByPk(hotel.id);
    if (!exists) {
      await Hotel.create(hotel);
    }
  }
  console.log('seeded');
  process.exit(0);
};

seed();
