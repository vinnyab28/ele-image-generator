import randomize from "../../App";

function Footer() {
	return (
		<footer>
			<div class="footer-btn">
				<button type="button" id="getImageBtn" onClick={randomize}>
					Randomize
				</button>
			</div>
		</footer>
	);
}

export default Footer;
