(function(){

	const doc = document;
	let id = doc.querySelector('[name="id"]').value;
	let specId = doc.querySelector('[name="specId"]').value;
	let price = doc.querySelector('[name="price"]').value;
	let name = doc.querySelector('[name="name"]').value;

    price = 1 * price;

	let orderOther = doc.querySelector('.order-other');
    let m = [
        'div', {}, ' ',
            ['h1', {}, ''],
            ' ',
            [
                'div', {}, ' ',
                    [
                        'h3', {}, 'dddd'
                    ],
                    ' ',
                    [
                        'ul', {}, ' ',
                            ['li', {}, '1'],
                            ' ',
                            ['li', {}, '2'],
                            ' ',
                            ['li', {}, '3'],
                            ' ',
                            ['li', {}, '4']
                    ]
            ],
            ' ',
            [
                'div', {}, ' ',
                    [
                        'h3', {}, 'dddd'
                    ],
                    ' ',
                    [
                        'ul', {}, ' ',
                            ['li', {}, '1'],
                            ' ',
                            ['li', {}, '2'],
                            ' ',
                            ['li', {}, '3'],
                            ' ',
                            ['li', {}, '4']
                    ]
            ],
            ' ',
            [
                'div', {}, ' ',
                    [
                        'h3', {}, 'dddd'
                    ],
                    ' ',
                    [
                        'ul', {}, ' ',
                            ['li', {}, '1'],
                            ' ',
                            ['li', {}, '2'],
                            ' ',
                            ['li', {}, '3'],
                            ' ',
                            ['li', {}, '4']
                    ]
            ]
    ];

	AJAXRequest({
		url: `/api/orderlist/${id}/${specId}`,
		callback: (d) => {
			console.log(d);
			let loadingBall = document.querySelector('.order-list .loading-ball');
			let wrapper = document.querySelector('.order-list .wrapper');
			if (wrapper) {
				// clear the demo area
				while (wrapper.lastChild) {
					wrapper.removeChild(wrapper.lastChild);
				}

				let jsonml = JsonML.BST(m).dataBind(d.data);

				// convert JsonML graph to DOM
				jsonml = JsonML.toHTML(jsonml);

				wrapper.appendChild(jsonml);

				loadingBall.style.display = 'none';
			}
		}
	});

    let matches = (target, selector) => {
        let matches = target.matches || target.matchesSelector || target.mozMatchesSelector || target.webkitMatchesSelector || target.oMatchesSelector || target.msMatchesSelector;
        return matches.call(target, selector);
    };

    if(orderOther){
        orderOther.addEventListener("click", function(e){
            e = e || window.event;

            if (e.target && matches(e.target, 'button')){
                AJAXRequest({
                    url: '/api/bookorder',
                    param: {
                        id: id,
                        specId: specId,
                        price: price,
                        name: name
                    },
                    callback: (d) => {
                        let orderId = d.data.orderId;

                        location.href = `/order/pay/?orderId=${orderId}&price=${price}`;

                    }
                });
            }
        }, false);
    }


})();