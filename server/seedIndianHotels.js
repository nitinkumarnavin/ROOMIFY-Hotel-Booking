
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

const adjectives = [
  "Royal", "Grand", "Taj", "Imperial", "Serene",
  "Mystic", "Heritage", "Golden", "Emerald", "Platinum",
  "Majestic", "Tranquil", "Lotus", "Paradise", "Oasis"
];

const types = [
  "Palace", "Resort & Spa", "Retreat", "Lodge", "Boutique",
  "Residency", "Heights", "Villas", "Suites", "Inn"
];

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
    // Create tables if they do not exist.
    // IMPORTANT: This does not delete existing records.
    await sequelize.sync();

    const existingHotels = await Hotel.count();

    if (existingHotels > 0) {
      console.log(`Database already contains ${existingHotels} hotels.`);
      console.log("Skipping seeding to avoid duplicate records.");
      return;
    }

    const amenities = [
      "Free WiFi",
      "Air Conditioning",
      "24/7 Room Service",
      "Swimming Pool",
      "Spa",
      "Gym",
      "Breakfast Included",
      "Bar/Lounge"
    ];

    const hotelRecords = [];

    for (const state of states) {
      for (let i = 0; i < 10; i++) {
        const hotelName =
          `${randomSelect(adjectives)} ${state} ${randomSelect(types)}`;

        const basePrice = randomInt(1000, 3500);

        const hotelAmenities = [...amenities]
          .sort(() => Math.random() - 0.5)
          .slice(0, randomInt(3, 5));

        hotelRecords.push({
          name: hotelName,
          location: `${state}, India`,
          price: basePrice,
          rating: Number(
            (Math.random() * 1.5 + 3.5).toFixed(1)
          ),
          reviews: randomInt(10, 500),
          image: randomSelect(images),
          amenities: hotelAmenities,
          description:
            `Experience hospitality at ${hotelName}. ` +
            `Located in ${state}, India, this demonstration property ` +
            `offers comfortable accommodation and modern facilities.`,
          rooms: [
            {
              id: hotelRecords.length * 10 + 1,
              name: "Deluxe Heritage Room",
              price: basePrice,
              capacity: 2
            },
            {
              id: hotelRecords.length * 10 + 2,
              name: "Premium Executive Suite",
              price: basePrice + 3500,
              capacity: 3
            },
            {
              id: hotelRecords.length * 10 + 3,
              name: "Royal Family Suite",
              price: basePrice + 7500,
              capacity: 5
            }
          ]
        });
      }
    }

    await Hotel.bulkCreate(hotelRecords);

    console.log(
      `Successfully inserted ${hotelRecords.length} demonstration hotels.`
    );

  } catch (error) {
    console.error("Hotel seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seed();
