import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
	return (
		<div>
			<h2 className="font-bold text-lg">Places to Visit</h2>

			<div>
				{trip?.tripData?.itinerary?.map((item, index) => (
					<div className="mt-5">
						<h2 className="font-medium text-lg">Day {index + 1}</h2>
						<div className="grid md:grid-cols-2 gap-5">
							{item?.places.map((place, index) => (
								<div>
									<h2 className="font-medium text-sm text-orange-600">
										{place.whichTimeOfDay}
									</h2>
									<PlaceCardItem place={place} />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default PlacesToVisit;
