import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	AI_PROMPT,
	SelectBudgetOptions,
	SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { VisuallyHidden } from "@reach/visually-hidden";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
	const [place, setPlace] = useState();
	const [formData, setFormData] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (name, value) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	const login = useGoogleLogin({
		onSuccess: (codeResp) => GetUserProfile(codeResp),
		onError: (error) => console.log(error),
	});

	const SaveAiTrip = async (TripData) => {
		setLoading(true);

		const user = JSON.parse(localStorage.getItem("user"));
		const docId = Date.now().toString();

		await setDoc(doc(db, "AItrips", docId), {
			userSelection: formData,
			tripData: JSON.parse(TripData),
			userEmail: user?.email,
			id: docId,
		});
		setLoading(false);
		navigate("/view-trip/" + docId);
	};

	const OnGenerateTrip = async () => {
		const user = localStorage.getItem("user");

		if (!user) {
			setOpenDialog(true);
			return;
		}
		if (
			formData?.noOfDays > 5 ||
			!formData?.location ||
			!formData?.budget ||
			!formData?.traveler
		) {
			toast("Please fill all details!");
			return;
		}

		setLoading(true);

		const FINAL_PROMPT = AI_PROMPT.replace(
			"{location}",
			formData?.location?.label
		)
			.replace("{totalDays}", formData?.noOfDays)
			.replace("{traveler}", formData?.traveler)
			.replace("{budget}", formData?.budget)
			.replace("{totalDays}", formData?.noOfDays);

		const result = await chatSession.sendMessage(FINAL_PROMPT);

		console.log(result?.response?.text());
		setLoading(false);
		SaveAiTrip(result?.response?.text());
	};

	const GetUserProfile = (tokeninfo) => {
		axios
			.get(
				`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
				{
					headers: {
						Authorization: `Bearer ${tokeninfo?.access_token}`,
						Accept: "Application/json",
					},
				}
			)
			.then((resp) => {
				console.log(resp);
				localStorage.setItem("user", JSON.stringify(resp.data));
				setOpenDialog(false);
				OnGenerateTrip();
			});
	};

	return (
		<div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
			<h2 className="font-bold text-3xl text-center">
				Tell us your travel preferences 🏕️
			</h2>
			<p className="mt-3 text-gray-500 text-xl text-center">
				Just provide some baisc information, and our trip planner will generate
				a customized itinerary based on your preferences
			</p>

			<div className="mt-20 flex flex-col gap-10 items-center">
				<div className="w-full max-w-md">
					<h2 className="text-xl my-3 font-medium text-center">
						What is destination of choice?
					</h2>
					<GooglePlacesAutocomplete
						apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
						selectProps={{
							place,
							onChange: (v) => {
								setPlace(v);
								handleInputChange("location", v);
							},
						}}></GooglePlacesAutocomplete>
				</div>

				<div>
					<h2 className="text-xl my-3 font-medium text-center">
						For how many days are you planning your trip?
					</h2>
					<Input
						placeholder={"Ex.3"}
						type="number"
						className="mx-auto block"
						onChange={(e) => handleInputChange("noOfDays", e.target.value)}
					/>
				</div>
			</div>

			<div className="my-10">
				<h2 className="text-xl my-3 font-medium text-center">
					What is your budget?
				</h2>
				<div className="grid grid-cols-3 gap-5 mt-5">
					{SelectBudgetOptions.map((item, index) => (
						<div
							key={index}
							onClick={() => handleInputChange("budget", item.title)}
							className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg flex flex-col items-center text-center h-36 ${
								formData?.budget == item.title && "shadow-lg border-black"
							}`}>
							<h2 className="text-4xl">{item.icon}</h2>
							<h2 className="font-bold text-lg">{item.title}</h2>
							<h2 className="text-sm text-gray-500">{item.desc}</h2>
						</div>
					))}
				</div>
			</div>

			<div className="my-10">
				<h2 className="text-xl my-3 font-medium text-center">
					Who do you plan on traveling with?
				</h2>
				<div className="grid grid-cols-3 gap-5 mt-5">
					{SelectTravelesList.map((item, index) => (
						<div
							key={index}
							onClick={() => handleInputChange("traveler", item.people)}
							className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg flex flex-col items-center text-center h-36 ${
								formData?.traveler == item.people && "shadow-lg border-black"
							}`}>
							<h2 className="text-4xl">{item.icon}</h2>
							<h2 className="font-bold text-lg">{item.title}</h2>
							<h2 className="text-sm text-gray-500">{item.desc}</h2>
						</div>
					))}
				</div>
			</div>

			<div className="my-10 text-center">
				<Button onClick={OnGenerateTrip} disabled={loading}>
					{loading ? (
						<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
					) : (
						"Generate trip"
					)}
				</Button>
			</div>

			<Dialog open={openDialog}>
				<DialogContent>
					<DialogHeader>
						<VisuallyHidden>
							<DialogTitle>Sign In</DialogTitle>
						</VisuallyHidden>
						<DialogDescription>
							<img src="/logo.svg" alt="" />
							<p className="mt-4">
								Sign in to the app with google authentication securely
							</p>
							<Button
								onClick={login}
								className="w-full mt-5 flex gap-4 items-center">
								<FcGoogle className="h-6 w-6" />
								Sign in with Google
							</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default CreateTrip;
