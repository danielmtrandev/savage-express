var thumbUp = document.getElementsByClassName('fa-thumbs-up');
var thumbDown = document.getElementsByClassName('fa-thumbs-down');
var trash = document.getElementsByClassName('fa-trash');

Array.from(thumbUp).forEach(function (element) {
	element.addEventListener('click', function () {
		// from trash go up to the span then to li then grab the first child node
		// this = target of event listener
		// we are targetting thiese elements in order to update them in the DB
		const name = this.parentNode.parentNode.childNodes[1].innerText;
		const msg = this.parentNode.parentNode.childNodes[3].innerText;
		const thumbUp = Number(this.parentNode.parentNode.childNodes[5].innerText);

		console.log(name, msg, thumbUp)
		// sends request with the below data  to server
		fetch('upVote', {
			// server checks request body for json object properties
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: name,
				msg: msg,
				count: thumbUp,
			}),
		})
			.then(response => {
				if (response.ok) return response.json();
			})
			.then(data => {
				console.log(data);
				window.location.reload(true);
			});
	});
});

Array.from(thumbDown).forEach(function (element) {
	element.addEventListener('click', function () {
		// from trash go up to the span then to li then grab the first child node
		const name = this.parentNode.parentNode.childNodes[1].innerText;
		const msg = this.parentNode.parentNode.childNodes[3].innerText;
		const thumbDown = Number(
			this.parentNode.parentNode.childNodes[5].innerText
		);

		fetch('downVote', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: name,
				msg: msg,
				count: thumbDown,
			}),
		})
			.then(response => {
				if (response.ok) return response.json();
			})
			.then(data => {
				console.log(data);
				window.location.reload(true);
			});
	});
});

// Array.from(thumbUp).forEach(function (element) {
// 	element.addEventListener('click', function () {
// 		// from trash go up to the span then to li then grab the first child node
// 		const name = this.parentNode.parentNode.childNodes[1].innerText;
// 		const msg = this.parentNode.parentNode.childNodes[3].innerText;
// 		const thumbUp = parseFloat(
// 			this.parentNode.parentNode.childNodes[5].innerText
// 		);
// 		fetch('messages', {
// 			method: 'put',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				name: name,
// 				msg: msg,
// 				thumbUp: thumbUp,
// 			}),
// 		})
// 			.then(response => {
// 				if (response.ok) return response.json();
// 			})
// 			.then(data => {
// 				console.log(data);
// 				window.location.reload(true);
// 			});
// 	});
// });

// Array.from(thumbDown).forEach(function (element) {
// 	element.addEventListener('click', function () {
// 		// from trash go up to the span then to li then grab the first child node
// 		const name = this.parentNode.parentNode.childNodes[1].innerText;
// 		const msg = this.parentNode.parentNode.childNodes[3].innerText;
// 		const thumbDown = parseFloat(
// 			this.parentNode.parentNode.childNodes[5].innerText
// 		);
// 		fetch('messages', {
// 			method: 'put',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify({
// 				name: name,
// 				msg: msg,
// 				thumbUp: thumbDown - 1 - 1,
// 			}),
// 		})
// 			.then(response => {
// 				if (response.ok) return response.json();
// 			})
// 			.then(data => {
// 				console.log(data);
// 				window.location.reload(true);
// 			});
// 	});
// });

Array.from(trash).forEach(function (element) {
	element.addEventListener('click', function () {
		const name = this.parentNode.parentNode.childNodes[1].innerText;
		const msg = this.parentNode.parentNode.childNodes[3].innerText;
		fetch('messages', {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				msg: msg,
			}),
		}).then(function (response) {
			window.location.reload();
		});
	});
});
