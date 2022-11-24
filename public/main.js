const canvasDots = function () {
	const canvas = document.querySelector('canvas'),
		ctx = canvas.getContext('2d'),
		colorDot = ['rgb(0, 119, 73)', 'rgb(0, 119, 73)', 'rgb(0, 119, 73)', 'rgb(0, 119, 73)', 'rgb(255, 184, 28)'], // 80% of dots are green. 20% yellow
		color = 'rgb(81, 162, 233)'; // What is this?

	// ctx.globalAlpha = 0.8;
	canvas.width = document.body.scrollWidth;
	canvas.height = window.innerHeight;
	canvas.style.display = 'block';
	// ctx.fillStyle = colorDot;
	// ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
	ctx.lineWidth = 0.3;
	ctx.strokeStyle = color;

	let mousePosition = {
		x: (30 * canvas.width) / 100,
		y: (30 * canvas.height) / 100,
	};

	const windowSize = window.innerWidth;
	let dots;

	if (windowSize > 1600) {
		dots = {
			nb: 600, // number of particles
			distance: 70, // max distance between particles for them to link
			d_radius: 300, // radius from mouse location that particles will link
			array: [],
		};
	} else if (windowSize > 1300) {
		dots = {
			nb: 575,
			distance: 60,
			d_radius: 280,
			array: [],
		};
	} else if (windowSize > 1100) {
		dots = {
			nb: 500,
			distance: 55,
			d_radius: 250,
			array: [],
		};
	} else if (windowSize > 800) {
		dots = {
			nb: 300,
			distance: 0,
			d_radius: 0,
			array: [],
		};
	} else if (windowSize > 600) {
		dots = {
			nb: 200,
			distance: 0,
			d_radius: 0,
			array: [],
		};
	} else {
		dots = {
			nb: 100,
			distance: 0,
			d_radius: 0,
			array: [],
		};
	}

	// decided to turn off connecting dots under 1100px

	// } else if (windowSize > 650) {
	//   dots = {
	//     nb: 400,
	//     distance: 50,
	//     d_radius: 185,
	//     array: [],
	//   };
	// } else if (windowSize > 500) {
	//   dots = {
	//     nb: 325,
	//     distance: 45,
	//     d_radius: 170,
	//     array: [],
	//   };
	// } else {
	//   dots = {
	//     nb: 270,
	//     distance: 45,
	//     d_radius: 140,
	//     array: [],
	//   };
	// }

	function Dot() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;

		this.vx = -0.5 + Math.random();
		this.vy = -0.5 + Math.random();

		this.radius = Math.random() * 1.5;

		// this.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
		this.colour = colorDot[Math.floor(Math.random() * colorDot.length)];
	}

	Dot.prototype = {
		create: function () {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			// ctx.fillStyle = this.colour;

			// make the dot colour fade out the further they are from the mouse
			const dotDistance = ((this.x - mousePosition.x) ** 2 + (this.y - mousePosition.y) ** 2) ** 0.5;
			const distanceRatio = dotDistance / (windowSize / 1.7);

			// this chops the bracket off the rgb colour and ads an opacity
			ctx.fillStyle = this.colour.slice(0, -1) + `,${1 - distanceRatio})`;

			ctx.fill();
		},

		animate: function () {
			// dont animate the first dot, it will follow mouse
			for (let i = 1; i < dots.nb; i++) {
				const dot = dots.array[i];

				if (dot.y < 0 || dot.y > canvas.height) {
					dot.vx = dot.vx;
					dot.vy = -dot.vy;
				} else if (dot.x < 0 || dot.x > canvas.width) {
					dot.vx = -dot.vx;
					dot.vy = dot.vy;
				}
				dot.x += dot.vx;
				dot.y += dot.vy;
			}
		},

		line: function () {
			for (let i = 0; i < dots.nb; i++) {
				for (let j = 0; j < dots.nb; j++) {
					const i_dot = dots.array[i];
					const j_dot = dots.array[j];

					if (i_dot.x - j_dot.x < dots.distance && i_dot.y - j_dot.y < dots.distance && i_dot.x - j_dot.x > -dots.distance && i_dot.y - j_dot.y > -dots.distance) {
						if (
							i_dot.x - mousePosition.x < dots.d_radius &&
							i_dot.y - mousePosition.y < dots.d_radius &&
							i_dot.x - mousePosition.x > -dots.d_radius &&
							i_dot.y - mousePosition.y > -dots.d_radius
						) {
							ctx.beginPath();
							ctx.moveTo(i_dot.x, i_dot.y);
							ctx.lineTo(j_dot.x, j_dot.y);

							// make the fill colour fade out the further you are from the mouse
							const dotDistance = ((i_dot.x - mousePosition.x) ** 2 + (i_dot.y - mousePosition.y) ** 2) ** 0.5;
							let distanceRatio = dotDistance / dots.d_radius;

							// make it so it doesnt fade out completely
							distanceRatio -= 0.3;
							if (distanceRatio < 0) {
								distanceRatio = 0;
							}

							// color of the connecting lines
							ctx.strokeStyle = `rgb(43, 59, 41, ${1 - distanceRatio})`;

							ctx.stroke();
							ctx.closePath();
						}
					}
				}
			}
		},
	};

	function createDots() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < dots.nb; i++) {
			dots.array.push(new Dot());
			var dot = dots.array[i];

			dot.create();
		}

		// first dot to be relativley large
		dots.array[0].radius = 1.5;

		// first dot to be blue
		dots.array[0].colour = '#51a2e9';

		dot.line();
		dot.animate();
	}

	window.onmousemove = function (parameter) {
		mousePosition.x = parameter.pageX;
		mousePosition.y = parameter.pageY;

		// sometimes if the mouse is off screen on refresh, it bugs out
		try {
			// want the first dot to follow the mouse
			dots.array[0].x = parameter.pageX;
			dots.array[0].y = parameter.pageY;
		} catch {
			//
		}
	};

	mousePosition.x = window.innerWidth / 2;
	mousePosition.y = window.innerHeight / 2;

	const draw = setInterval(createDots, 1000 / 30);

	window.onresize = function () {
		clearInterval(draw);
		canvasDots();
		// console.log(yippe);
	};
};

window.onload = function () {
	//canvasDotsBg();
	canvasDots();
};

// loads in about section on scroll
function aboutFadeIn(entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting && document.body.scrollWidth > 1300) {
			// console.log('yo');
			// fade in bio
			document.querySelector('.profile').classList.add('profile__fade-in');

			// fade in skills 1 at a time after bio has loaded
			const sleep = (milliseconds) => {
				return new Promise((resolve) => setTimeout(resolve, milliseconds));
			};

			//html
			sleep(1000).then(() => {
				document.querySelector('.skills__item--html').classList.add('skills__item-fade-in');
			});

			//webpack
			sleep(1100).then(() => {
				document.querySelector('.skills__item--webpack').classList.add('skills__item-fade-in');
			});

			//js
			sleep(1200).then(() => {
				document.querySelector('.skills__item--js').classList.add('skills__item-fade-in');
			});

			//git
			sleep(1300).then(() => {
				document.querySelector('.skills__item--git').classList.add('skills__item-fade-in');
			});

			//sass
			sleep(1400).then(() => {
				document.querySelector('.skills__item--sass').classList.add('skills__item-fade-in');
			});

			//node
			sleep(1500).then(() => {
				document.querySelector('.skills__item--npm').classList.add('skills__item-fade-in');
			});

			//py
			sleep(1600).then(() => {
				document.querySelector('.skills__item--python').classList.add('skills__item-fade-in');
			});

			//react
			sleep(1700).then(() => {
				document.querySelector('.skills__item--react').classList.add('skills__item-fade-in');
			});

			//r
			sleep(1800).then(() => {
				document.querySelector('.skills__item--r').classList.add('skills__item-fade-in');
			});

			//css
			sleep(1900).then(() => {
				document.querySelector('.skills__item--css').classList.add('skills__item-fade-in');
			});
		}
	});
}

let options = {
	root: null,
	rootMargin: '0px',
	threshold: 0.5,
};

let options2 = {
	root: null,
	rootMargin: '0px',
	threshold: 0.2,
};

//let observer = new IntersectionObserver(aboutFadeIn, options);

//observer.observe(document.querySelector('.about__content'));

// navigation items in nav bar
const navLinks = document.querySelectorAll('.navigation__item');

// change highlighted nav link depending on page position
function navFadeIn(entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// console.log(entry.target.id);

			navLinks.forEach((link) => {
				link.classList.remove('navigation__item--active');
			});

			document.querySelector(`#nav-${entry.target.id}`).classList.add('navigation__item--active');
		}
	});
}

// projects section is a lot longer and needs custom settings
function navFadeInProjects(entries, observer) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			// console.log(entry.target.id);

			navLinks.forEach((link) => {
				link.classList.remove('navigation__item--active');
			});

			document.querySelector(`#nav-${entry.target.id}`).classList.add('navigation__item--active');
		}
	});
}

// let observerNav = new IntersectionObserver(navFadeIn, options);

// observerNav.observe(document.querySelector('#hero'));
// observerNav.observe(document.querySelector('#about'));
// observerNav.observe(document.querySelector('#contact'));

// let observerNavProjects = new IntersectionObserver(navFadeInProjects, options2);

// observerNavProjects.observe(document.querySelector('#projects'));

// parralax scrolling effect on hero canvas

// window.onscroll = function (e) {
//   console.log(document.scrollTop);
// };

// document.addEventListener('scroll', () => {
//   // console.log(window.scrollY);

//   document.querySelector('.connecting-dots').style.top = `${window.scrollY}px`;
// });

// form validation

// const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// document.querySelector('#form-submit').addEventListener('click', () => {
// 	const unameInput = document.querySelector('.contact__form-name');
// 	const emailInput = document.querySelector('.contact__form-email');
// 	const msgInput = document.querySelector('.contact__form-message');

// 	const uname = unameInput.value;
// 	const email = emailInput.value;
// 	const msg = msgInput.value;

// 	const unameError = document.querySelector('.form-error__name');
// 	const emailError = document.querySelector('.form-error__email');
// 	const msgError = document.querySelector('.form-error__msg');

// 	let validUname = false;
// 	let validEmail = false;
// 	let validMsg = false;

// 	// console.log(uname, email, msg);
// 	if (!uname) {
// 		validUname = false;
// 		unameInput.classList.add('input-error');
// 		unameError.style.display = 'block';
// 	} else {
// 		validUname = true;
// 		unameInput.classList.remove('input-error');
// 		unameError.style.display = 'none';
// 	}

// 	if (!email.match(re)) {
// 		validEmail = false;
// 		emailInput.classList.add('input-error');
// 		emailError.style.display = 'block';
// 	} else {
// 		validEmail = true;
// 		emailInput.classList.remove('input-error');
// 		emailError.style.display = 'none';
// 	}

// 	if (!msg) {
// 		validMsg = false;
// 		msgInput.classList.add('input-error');
// 		msgError.style.display = 'block';
// 	} else {
// 		validMsg = true;
// 		msgInput.classList.remove('input-error');
// 		msgError.style.display = 'none';
// 	}

// 	if (validUname && validEmail && validMsg) {
// 		document.querySelector('.contact__form').submit();

// 		// clear form after a delay
// 		const sleep = (milliseconds) => {
// 			return new Promise((resolve) => setTimeout(resolve, milliseconds));
// 		};

// 		sleep(1500).then(() => {
// 			document.querySelector('.contact__form').reset();
// 		});
// 	}
// });
