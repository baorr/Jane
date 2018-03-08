(function(){

	const doc = document;
	let id = doc.querySelector('[name="id"]').value;
	let specId = doc.querySelector('[name="specId"]').value;
	let price = doc.querySelector('[name="price"]').value;
	let name = doc.querySelector('[name="name"]').value;

    price = 1 * price;

	let orderOther = doc.querySelector('.order-other');

	let m = ['table', {}, ' ', 
                ['thead', {}, ' ', 
                    ['tr', {}, ' ', 
                        ['th', {}, '名称'],
                        ' ',
                        ['th', {}, '周期'],
                        ' ',
                        ['th', {}, '单价'],
                        ' ',
                        ['th', {}, '价格']
                    ]
                ],
                ' ',
                ['tbody', {}, ' ', 
                    ['tr', {}, ' ',
                        ['td', {}, 
                            function() {
                                return  this.data.name;
                            }
                        ],
                        ' ',
                        ['td', {}, 
                            function() {
                                return  this.data.specText;
                            }
                        ],
                        ' ',
                        ['td', {}, 
                            function() {
                                return  this.data.price;
                            }
                        ],
                        ' ',
                        ['td', {}, 
                            function() {
                                return  this.data.unitPrice;
                            }
                        ]
                    ]
                ]
            ];


    let m2 = ['div', {}, ' ',
    			['ul', {}, ' ',
    				['li', {}, ' ',
    					['label', {}, ' ',
    						['span', {}, ' '],
    						function(){
    							return '云市场余额: ' + this.data.marketplaceCashBalance;
    						}
    					]
    				]/*,
    				['li', {}, ' ', 
    					['div', {class: 'accordion'}, ' ', 
    						['div', {class: 'item'}, ' ',
    							['input', {type: 'checkbox', id: 'disccount_code'}, ' '],
    							' ',
    							['label', {for: 'disccount_code'}, '我有优惠码'],
    							' ',
    							['div', {class: 'content'}, '想知道吗？']
    						]
    					]
    				]*/
    			],
    			' ',
    		 	['div', {class: 'payment-wrapper'},  ' ', 
    		 		['div', {class: 'payment'}, 
	    		 		function(){
	    		 			return '待支付: ' + price + '元';
	    		 		}, 
	    		 		['button', {}, '确定']
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

	AJAXRequest({
		url: '/api/getcreditbalance',
		callback: (d) => {
				let loadingBall = document.querySelector('.order-other .loading-ball');
				let wrapper = document.querySelector('.order-other .wrapper');

				if (wrapper) {
					// clear the demo area
					while (wrapper.lastChild) {
						wrapper.removeChild(wrapper.lastChild);
					}

					let jsonml = JsonML.BST(m2).dataBind(d.data ? d.data : {marketplaceCashBalance: 0});

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


})();