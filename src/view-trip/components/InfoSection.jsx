import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
	const [photoUrl, setPhotoUrl] = useState();

	useEffect(() => {
		trip && GetPlacePhoto();
	}, [trip]);

	const GetPlacePhoto = async () => {
		const data = {
			textQuery: trip?.userSelection?.location?.label,
		};

		const result = await GetPlaceDetails(data).then((resp) => {
			const PhotoUrl = PHOTO_REF_URL.replace(
				"{NAME}",
				resp.data.places[0].photos[4].name
			);

			setPhotoUrl(PhotoUrl);
		});
	};

	return (
		<div>
			<img
				src={photoUrl}
				alt=""
				className="h-[340px] w-full object-cover rounded-xl"
			/>

			<div className="flex justify-between items-center">
				<div className="my-5 flex flex-col gap-2">
					<h2 className="font-bold text-2xl">
						{trip?.userSelection?.location?.label}
					</h2>
					<div className="flex gap-5 ">
						<h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
							📅 {trip?.userSelection?.noOfDays} Day
						</h2>
						<h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
							💵 {trip?.userSelection?.budget} Budget
						</h2>
						<h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
							🥂 No. of Traveler's {trip?.userSelection?.traveler}
						</h2>
					</div>
				</div>

				<Button>
					<IoIosSend />
				</Button>
			</div>
		</div>
	);
}

export default InfoSection;
