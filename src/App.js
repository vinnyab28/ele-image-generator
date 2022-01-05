import logo from "./logo.svg";
import "./App.css";
import { createApi } from "unsplash-js";

function App() {
	const unsplash = createApi({
		accessKey: "c12jPnLoXymuUgAHPyuZeN7Y7TChg2zy0sRdphraDTw",
	});

	function randomize() {
		unsplash.photos
		.getRandom({
			query: "elephant",
		})
		.then((result) => {
			if (result.type === "success") {
				const photo = result.response;
				document.getElementById("imagePlaceholder").src = photo.urls.regular;
				document.getElementById("imageDescription").innerHTML = photo.description ? photo.description : photo.alt_description;
			}
		});
	}

	randomize();
  
	return (
		<div className="App">
			<header>
				<h1>Ele-Image Generator</h1>
			</header>
			<div className="image-container">
				<img src="" id="imagePlaceholder" alt="Palti-Vinnu" />
				<p id="imageDescription"></p>
				<button type="button" id="getImageBtn" onClick={randomize}>
					Randomize
				</button>
			</div>
		</div>
	);
}

export default App;
