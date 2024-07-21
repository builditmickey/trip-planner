/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// const {
// 	GoogleGenerativeAI,
// 	HarmCategory,
// 	HarmBlockThreshold,
// } = require("@google/generative-ai");

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
	model: "gemini-1.5-flash",
});

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: "application/json",
};

export const chatSession = model.startChat({
	generationConfig,
	history: [
		{
			role: "user",
			parts: [
				{
					text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
				},
			],
		},
		{
			role: "model",
			parts: [
				{
					text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50 - $100 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898964/898964_144_b.jpg",\n      "geoCoordinates": "36.1699, -115.1423",\n      "rating": 4.0,\n      "description": "A centrally located hotel with a retro vibe, known for its affordable rates and proximity to the Fremont Street Experience."\n    },\n    {\n      "hotelName": "The Golden Nugget",\n      "hotelAddress": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$70 - $150 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898893/898893_144_b.jpg",\n      "geoCoordinates": "36.1688, -115.1435",\n      "rating": 4.5,\n      "description": "A historic hotel with a casino, pool, and restaurants. Known for its lavish decor and shark tank."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$40 - $80 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898847/898847_144_b.jpg",\n      "geoCoordinates": "36.1137, -115.1730",\n      "rating": 3.5,\n      "description": "A family-friendly hotel with a circus theme, offering budget-friendly accommodations and entertainment."\n    },\n    {\n      "hotelName": "The Strat Hotel, Casino & SkyPod",\n      "hotelAddress": "2000 Las Vegas Blvd S, Las Vegas, NV 89104",\n      "price": "$60 - $120 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898661/898661_144_b.jpg",\n      "geoCoordinates": "36.1237, -115.1684",\n      "rating": 4.0,\n      "description": "A hotel with a unique observation deck and thrilling rides, offering a different perspective of Las Vegas."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "startTime": "10:00 AM",\n      "places": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A pedestrian-friendly street with a canopy of LED lights, featuring live entertainment, street performers, and casinos.",\n          "placeImageUrl": "https://www.vegasexperience.com/wp-content/uploads/2020/05/Fremont-Street-Experience-Lights-Aerial-View.jpg",\n          "geoCoordinates": "36.1699, -115.1423",\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "timeTravel": "2-3 hours"\n        },\n        {\n          "placeName": "Neon Museum",\n          "placeDetails": "A museum showcasing historic Las Vegas neon signs, offering guided tours and a glimpse into the city\'s past.",\n          "placeImageUrl": "https://www.neonmuseum.org/wp-content/uploads/2022/01/IMG_8358-scaled.jpg",\n          "geoCoordinates": "36.1702, -115.1510",\n          "ticketPricing": "$25",\n          "rating": 4.0,\n          "timeTravel": "1-2 hours"\n        }\n      ],\n      "endTime": "6:00 PM"\n    },\n    "day2": {\n      "startTime": "10:00 AM",\n      "places": [\n        {\n          "placeName": "Bellagio Conservatory & Botanical Garden",\n          "placeDetails": "A stunning botanical garden with seasonal displays, showcasing elaborate floral arrangements and sculptures.",\n          "placeImageUrl": "https://www.bellagio.com/content/dam/mgmresorts/bellagio/images/bellagio-conservatory/2023/fall/Fall-Conservatory-Hero-Image.jpg",\n          "geoCoordinates": "36.1143, -115.1727",\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "timeTravel": "1 hour"\n        },\n        {\n          "placeName": "The LINQ Promenade",\n          "placeDetails": "An outdoor shopping and dining destination with a variety of restaurants, bars, and shops.",\n          "placeImageUrl": "https://www.caesars.com/content/dam/caesars/linq/images/linq-promenade/linq-promenade-hero-image.jpg",\n          "geoCoordinates": "36.1204, -115.1705",\n          "ticketPricing": "Free",\n          "rating": 4.0,\n          "timeTravel": "2-3 hours"\n        }\n      ],\n      "endTime": "6:00 PM"\n    },\n    "day3": {\n      "startTime": "10:00 AM",\n      "places": [\n        {\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "A scenic area with red sandstone cliffs, hiking trails, and stunning views.",\n          "placeImageUrl": "https://www.nps.gov/redr/planyourvisit/images/RedRockCanyon_Wide.jpg",\n          "geoCoordinates": "36.2373, -115.3167",\n          "ticketPricing": "$15 per vehicle",\n          "rating": 4.5,\n          "timeTravel": "3-4 hours"\n        },\n        {\n          "placeName": "The Venetian and The Palazzo",\n          "placeDetails": "Luxurious resorts with a Venetian theme, featuring canals, gondolas, and shopping.",\n          "placeImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/899000/898949/898949_144_b.jpg",\n          "geoCoordinates": "36.1239, -115.1737",\n          "ticketPricing": "Free",\n          "rating": 4.0,\n          "timeTravel": "2-3 hours"\n        }\n      ],\n      "endTime": "6:00 PM"\n    }\n  }\n}\n```\n\n**Note:**\n\n* This itinerary is just a suggestion, and you can customize it based on your interests and preferences.\n* Prices for hotels and attractions may vary depending on the season and availability.\n* Consider taking advantage of free activities like walking around the Strip, watching street performers, and enjoying the casinos\' free shows.\n* Remember to book your hotel and attraction tickets in advance to secure the best deals.\n* Make sure to pack comfortable shoes, as you will be doing a lot of walking.\n* Stay hydrated, especially in the summer months.\n* Have fun!',
				},
			],
		},
	],
});
