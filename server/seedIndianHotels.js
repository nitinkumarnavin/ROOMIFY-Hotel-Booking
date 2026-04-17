const { sequelize } = require('./config/db');
const Hotel = require('./models/Hotel');

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const adjectives = ["Royal", "Grand", "Taj", "Imperial", "Serene", "Mystic", "Heritage", "Golden", "Emerald", "Platinum", "Majestic", "Tranquil", "Lotus", "Paradise", "Oasis"];
const types = ["Palace", "Resort & Spa", "Retreat", "Lodge", "Boutique", "Residency", "Heights", "Villas", "Suites", "Inn"];

const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1542314831-c53cd4b85ca4?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c0d13c4a?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1000&q=80"
];

function randomSelect(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // DANGER: This will drop tables. But fine for local mock DB!
    console.log("Database reset!");

    let count = 0;
    
    // For each of the 28 states, generate 10 hotels
    for (const state of states) {
      for (let i = 0; i < 10; i++) {
        const hotelName = `${randomSelect(adjectives)} ${state} ${randomSelect(types)}`;
        
        // Base price in INR: between 1500 and 4800 to ensure we stay under 5000
        const basePrice = randomInt(1000, 3500);
        
        const amenities = ["Free WiFi", "Air Conditioning", "24/7 Room Service", "Swimming Pool", "Spa", "Gym", "Breakfast Included", "Bar/Lounge"];
        // pick 3 - 5 random amenities
        const hotelAmenities = amenities.sort(() => 0.5 - Math.random()).slice(0, randomInt(3, 5));

        const hotelData = {
          name: hotelName,
          location: `${state}, India`,
          price: basePrice,
          rating: (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1), // Random rating between 3.5 and 5.0
          reviews: randomInt(10, 500),
          image: randomSelect(images),
          amenities: hotelAmenities,
          description: `Experience the finest hospitality at ${hotelName}. Located in the vibrant state of ${state}, this property is equipped with world-class amenities to ensure your stay is memorable. Enjoy authentic cuisine, luxurious settings, and highly rated services.`,
          rooms: [
            { id: count * 10 + 1, name: "Deluxe Heritage Room", price: basePrice, capacity: 2 },
            { id: count * 10 + 2, name: "Premium Executive Suite", price: basePrice + 3500, capacity: 3 },
            { id: count * 10 + 3, name: "Royal Family Suite", price: basePrice + 7500, capacity: 5 }
          ]
        };

        await Hotel.create(hotelData);
        count++;
      }
    }

    console.log(`Successfully generated and seeded ${count} hotels across India in INR!`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
