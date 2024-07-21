export const SelectTravelesList = [
	{
		id: 1,
		title: "just me",
		desc: "A sole traveles in  exploration",
		icon: "✈️",
		people: "1",
	},
	{
		id: 2,
		title: "Couple",
		desc: "Two traveles in tandem",
		icon: "🥂",
		people: "2",
	},
	{
		id: 3,
		title: "Family",
		desc: "A group of fun loving adv",
		icon: "🏠",
		people: "3 to 5 people",
	},
	{
		id: 4,
		title: "friends",
		desc: "A bunch of thrill seeks",
		icon: "🚤",
		people: "5 to 10 people",
	},
];

export const SelectBudgetOptions = [
	{
		id: 1,
		title: "cheap",
		desc: "Stay conscious of costs",
		icon: "💵",
	},
	{
		id: 2,
		title: "Moderate",
		desc: "keep cost on average side",
		icon: "💰",
	},
	{
		id: 3,
		title: "luxury",
		desc: "dont worry about costs",
		icon: "💸",
	},
];

export const AI_PROMPT =
	"Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest daywise itinerary list with Day number , placeName, which time of day to visit with specific hours, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
