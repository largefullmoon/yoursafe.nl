// Video modal toggle
class VidToggleService {
	constructor() {
		this.init()

	}
	init() {

		document.querySelector('.video-button').addEventListener('click', () => this.toggle());
		document.querySelector('.video-modal-overlay').addEventListener('click', () => this.toggle());
		document.querySelector('.video-modal__close').addEventListener('click', () => this.toggle());
	}
	toggle() {
		document.querySelector('.video-modal-wrapper').classList.toggle('video-modal-wrapper--show');
		document.querySelector('.video-modal-overlay').classList.toggle('video-modal-overlay--show');
		document.querySelector('.video-modal').classList.toggle('video-modal--show');
		if (
				document.getElementById('video-bitsafe')
						.getAttribute('src') == ''
		) {
			document.getElementById('video-bitsafe')
					.setAttribute(
							'src',
							document.getElementById('video-bitsafe')
									.getAttribute('vim_url')
					);
		} else {
			document.getElementById('video-bitsafe').setAttribute('src', '');
		}

	}
}

// instantiate vidToggleService , so that it's active and can be called from the HTML
const vidToggleService = new VidToggleService()
