import "./App.css";
import React, { useState, useEffect } from "react";
import logo from "./assets/images/ele-logo.jpg";
import { createApi } from "unsplash-js";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Image } from "primereact/image";

const APP_NAME = "Ele-Image Generator";

function App() {
	const [imageDetails, setImage] = useState({
		title: "",
		subTitle: "",
		imgSrc: "",
		description: "",
		altDescription: "",
		user: {
			username: "",
			name: "",
		},
		header: <Skeleton height="10rem" className="p-mb-2"></Skeleton>,
	});
	const [loading, setLoading] = useState(false);

	const unsplash = createApi({
		accessKey: "c12jPnLoXymuUgAHPyuZeN7Y7TChg2zy0sRdphraDTw",
	});

	const randomize = () => {
		setLoading(true);
		setImage((previousState) => {
			let header = <Skeleton height="10rem" className="p-mb-2"></Skeleton>;
			return { ...previousState, header: header };
		});
		unsplash.photos
			.getRandom({
				query: "elephant",
			})
			.then((result) => {
				if (result.type === "success") {
					const photo = result.response;
					setImage((previousState) => {
						let imgSrc = photo.urls.regular;
						let description = photo.description;
						let alt_description = photo.alt_description;
						let imgTag = (
							<div>
								<Image src={imgSrc} alt={alt_description} preview="true" />
								<p className="attribution">
									Photo by <a href={"https://unsplash.com/@" + photo.user.username + "?utm_source=" + APP_NAME + "&utm_medium=referral"}>{photo.user.name}</a> on <a href={"https://unsplash.com/?utm_source=" + APP_NAME + "&utm_medium=referral"}>Unsplash</a>
								</p>
							</div>
						);
						let user = photo.user;
						return { ...previousState, title: alt_description, subTitle: description, imgSrc: photo.urls.regular, user: user, header: imgTag };
					});
				}
				setLoading(false);
			});
	};

	useEffect(() => {
		randomize();
	}, [])

	let footer = (
		<span>
			<Button label="Get Image" loading={loading} className="p-button-info p-button-sm p-button-raised p-button-rounded" onClick={randomize} />
		</span>
	);

	return (
		<div className="App">
			<header>
				<div className="header">
					<h1>Ele-Image Generator</h1>
					<img src={logo} alt="Logo" height="40" />
				</div>
			</header>
			<Card title={imageDetails.title} subTitle={imageDetails.subTitle} footer={footer} header={imageDetails.header}></Card>
		</div>
	);
}

export default App;
