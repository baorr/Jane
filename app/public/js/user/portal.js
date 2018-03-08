(function(){

	const doc = document;
    const menuCon = doc.querySelector('#menu');
    const menuLists = doc.querySelectorAll('#menu ul li a');
    const title = doc.querySelector('#title');
    const loadingBall = document.querySelector('.order-list .loading-ball');
    const wrapper = document.querySelector('.order-list .wrapper');

    const orderStatus = {
        '1': '未支付', 
        '2': '已支付',
        '3': '已开通'
    };

    const orderType = {
        '1': '新购', 
        '2': '续费'
    };

    let switchPath = (pathName) => {
        menuLists.forEach((item) => {
            item.className = '';

            if(item.getAttribute('data-href') == pathName){
                item.className = 'selected';
            };
        });
    };

    let orderTr = ['tr', {}, ' ',
                ['td', {}, 
                    function() {
                        return  this.data.orderTimeMill ? dateFormat(this.data.orderTimeMill, 'YYYY-MM-dd') : '';
                    }
                ],
                ' ',
                ['td', {}, 
                    function() {
                        return  this.data.productName;
                    }
                ],
                ' ',
                ['td', {}, 
                    function() {
                        return  orderType[this.data.orderType ? this.data.orderType : '1'];
                    }
                ],
                ' ',
                ['td', {}, 
                    function() {
                        return  orderStatus[this.data.orderStatus ? this.data.orderStatus : '1'];
                    }
                ],
                ' ',
                ['td', {}, 
                    function() {
                        return  formatMoney(this.data.price);
                    }
                ]/*,
                ' ',
                ['td', {}, ' ',
                    ['a', {
                            href:'javascript: void(0);', 
                            'data-id': function() {
                                return  this.data.id ;
                            }
                           }, 
                    '操作']
                ],
                ' '*/
            ];
	let orderM = ['table', {}, ' ', 
                ['thead', {}, ' ', 
                    ['tr', {}, ' ', 
                        ['th', {}, '下单时间'],
                        ' ',
                        ['th', {}, '下单内容'],
                        ' ',
                        ['th', {}, '类型'],
                        ' ',
                        ['th', {}, '支付状态'],
                        ' ',
                        ['th', {}, '费用'],
                        ' '/*,
                        ['th', {}, '操作']*/
                    ]
                ],
                ' ',
                ['tbody', {}, ' ',
                    function() {
                        return  JsonML.BST(orderTr).dataBind(this.data.orderList) ;
                    }
                ]
            ];

   let productTr = ['tr', {}, ' ',
            ['td', {}, 
                function() {
                    return  this.data.name;
                }
            ],
            ' ',
            ['td', {}, 
                function() {
                    return  this.data.prodTypeText;
                }
            ],
            ' ',
            ['td', {}, 
                function() {
                    return  this.data.statusText;
                }
            ],
            ' ',
            ['td', {}, 
                function() {
                    return  this.data.startTime ? dateFormat(this.data.startTime, 'YYYY-MM-dd') : '';
                }
            ],
            ' ',
            ['td', {}, 
                function() {
                    return  this.data.expiredTime ? dateFormat(this.data.expiredTime, 'YYYY-MM-dd') : '';
                }
            ],
            ' ',
            ['td', {}, ' ',
                ['a', {
                        href:'javascript: void(0);', 
                        'data-id': function() {
                            return  this.data.id ;
                        },
                        'data-href': function() {
                            return  `product/${this.data.id}`;
                        },
                        'data-role': 'product'
                       }, 
                '详情']
            ],
            ' '
        ];

   let productM = ['table', {}, ' ', 
            ['thead', {}, ' ', 
                ['tr', {}, ' ', 
                    ['th', {}, '产品名称'],
                    ' ',
                    ['th', {}, '产品类型'],
                    ' ',
                    ['th', {}, '状态'],
                    ' ',
                    ['th', {}, '开通时间'],
                    ' ',
                    ['th', {}, '到期时间'],
                    ' ',
                    ['th', {}, '操作']
                ]
            ],
            ' ',
            ['tbody', {}, ' ',
                function() {
                    return  JsonML.BST(productTr).dataBind(this.data.purchaseProducts) ;
                }
            ]
        ];

let productLabels = {
    'name': '产品名称',
    'industry': '适用行业',
    'startTime': '开通时间',
    'expiredTime': '到期时间',
    'providerName': '服务商名称',
    'providerPhone': '联系电话',
    'providerMail': '联系邮箱',
    'deliveryStatusText': '发货状态',
    'deliveryInfo': '相关信息'
};

let productInfo = [
    'li', {}, ' ',
    ['label', {}, function(){
        return productLabels[this.data.label];
    }],
    ' ',
    ['span', {}, function(){
        let value = this.data.value;
        if(this.data.label == 'startTime' || this.data.label == 'expiredTime') value = value ? dateFormat(value, 'YYYY-MM-dd hh:mm:ss') : value;
        return value;
    }]
];

let productDetailM = [
    'div', {
            class: 'product-info'
        }, 
        ' ',
        [
         'div', {class: 'product-info-item'}, ' ',
            ['h3', {}, '产品信息'],
            ' ',
            ['ul', {}, ' ',
                function() {
                    return  JsonML.BST(productInfo).dataBind(this.data.product) ;
                }
            ]
        ], 
        ' ',
        [
         'div', {class: 'product-info-item'}, ' ',
            ['h3', {}, '服务商信息'],
            ' ',
            ['ul', {}, ' ',
                function() {
                    return  JsonML.BST(productInfo).dataBind(this.data.provider) ;
                }
            ]
        ], 
        ' ',
        [
         'div', {class: 'product-info-item'}, ' ',
            ['h3', {}, '发货信息'],
            ' ',
            ['ul', {}, ' ',
                function() {
                    return  JsonML.BST(productInfo).dataBind(this.data.delivery) ;
                }
            ]
        ]
];


let mixUI = (url, m) => {
    AJAXRequest({
        url: url,
        callback: (d) => {
            console.log(d);
            if (wrapper) {
                // clear the demo area
                while (wrapper.lastChild) {
                    wrapper.removeChild(wrapper.lastChild);
                }

                let jsonml = JsonML.BST(m).dataBind(d.data);

                jsonml = JsonML.toHTML(jsonml);

                wrapper.appendChild(jsonml);

                loadingBall.style.display = 'none';
                wrapper.style.visibility = 'visible';
            }
        }
    });
}

let initView = (path) => {
    loadingBall.style.display = 'block';
    wrapper.style.visibility = 'hidden';
    Router.check(path);
};


var Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function(options) {
        this.mode = options && options.mode && options.mode == 'history' 
                    && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function() {
        var fragment = '';
        if(this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(re, handler) {
        if(typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    },
    remove: function(param) {
        for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    },
    flush: function() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    },
    check: function(f) {
        var fragment = f || this.getFragment();
        for(var i=0; i<this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }           
        }
        return this;
    },
    listen: function() {
        var self = this;
        var current = self.getFragment();
        var fn = function() {
            if(current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function(path) {
        path = path ? path : '';
        if(this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}


Router.config({ mode: 'history'});

// adding routes
Router.add(/user\/product\/(.*)/,  function() {
     switchPath('order');
     if(arguments[0]){
        switchPath('product');
        title.innerHTML = '订单详情';
        mixUI(`/user/productdetail/${arguments[0]}`, productDetailM);
     }else{
        title.innerHTML = '订单管理';
        mixUI(`/user/orderlist`, orderM);
     }
}).add(/user\/order/, function() {
     switchPath('order');
     title.innerHTML = '订单管理';
     mixUI(`/user/orderlist`, orderM);
}).add(/user(\/product)?/, function() {
    switchPath('product');
    title.innerHTML = '已购产品';
    mixUI(`/user/productlist`, productM);
});

initView(location.href);

let matches = (target, selector) => {
    let matches = target.matches || target.matchesSelector || target.mozMatchesSelector || target.webkitMatchesSelector || target.oMatchesSelector || target.msMatchesSelector;
    return matches.call(target, selector);
};

if(menuCon){
    menuCon.addEventListener("click", function(e){
        e = e || window.event;

        if (e.target && matches(e.target, 'a[data-role="menu"]')){
            let url = '/user/' + e.target.getAttribute('data-href');
            history.replaceState({}, "云市场用户中心", url);
            initView(location.href);
        }
    }, false);
}

if(wrapper){
    wrapper.addEventListener("click", function(e){
        e = e || window.event;

        if (e.target && matches(e.target, 'a[data-role="product"]')){
            let url = '/user/' + e.target.getAttribute('data-href');
            history.replaceState({}, "云市场用户中心", url);
            initView(location.href);
        }
    }, false);
}
//window.addEventListener('hashchange', function(e) {
  //initView(location.href);
//});


/*
    ;(function(window) {
      // exit if the browser implements that event
      if ("onhashchange" in window) { return; }

      var location = window.location,
        oldURL = location.href,
        oldHash = location.hash;

      // check the location hash on a 100ms interval
      setInterval(function() {
        var newURL = location.href,
          newHash = location.hash;

        // if the hash has changed and a handler has been bound...
        if (newHash != oldHash && typeof window.onhashchange === "function") {
          // execute the handler
          window.onhashchange({
            type: "hashchange",
            oldURL: oldURL,
            newURL: newURL
          });

          oldURL = newURL;
          oldHash = newHash;
        }
      }, 100);

    })(window);

*/

})();