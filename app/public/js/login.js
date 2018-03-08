(function(){

	const doc = document;
    let isRequesting = false;
    let redirect_uri = encodeURIComponent(location.href);

    var __URLMAPS = {
        'localhost': {
            'prefix': '',
            'payment_domain': 'https://pay-cloud.dev.wanda-itg.local/',
            'market_domain': 'http://localhost:7001/',
            'account_domain': 'https://account-cloud.dev.wanda-itg.local/',
            'invoice_domain': 'https://invoice-cloud.dev.wanda-itg.local/',
            'icp_domain': 'https://icp-cloud.dev.wanda-itg.local/'
        },
        'market-cloud.sit.wanda-itg.local': {
            'prefix': '',
            'payment_domain': 'https://pay-cloud.sit.wanda-itg.local/',
            'market_domain': 'https://market-cloud.sit.wanda-itg.local/',
            'account_domain': 'https://account-cloud.sit.wanda-itg.local/',
            'invoice_domain': 'https://invoice-cloud.sit.wanda-itg.local/',
            'icp_domain': 'https://icp-cloud.sit.wanda-itg.local/'
        },
        'market-cloud.dev.wanda-itg.local': {
            'prefix': '',
            'payment_domain': 'http://pay-cloud.dev.wanda-itg.local/',
            'market_domain': 'https://market-cloud.dev.wanda-itg.local/',
            'account_domain': 'https://account-cloud.dev.wanda-itg.local/',
            'invoice_domain': 'https://invoice-cloud.dev.wanda-itg.local/',
            'icp_domain': 'https://icp-cloud.dev.wanda-itg.local/'
        }
    };

    var hostname = document.location.hostname;
    var prefix = '';
    var temp = __URLMAPS[hostname];

    if(temp){
        prefix = temp.prefix ? temp.prefix : '';
    }

    window.URLMAPS = {
        genURL: function(url){
            if(prefix) return (prefix + url);
            return url ? url : '/';
        },
        'bss_account': temp.account_domain,
        'bss_invoice': temp.invoice_domain,
        'bss_icp': temp.icp_domain,
        'bss_payment': temp.payment_domain,
        'market_domain': temp.market_domain
    };

    let loadingBall = document.querySelector('header .loading-ball');
    let wrapper = document.querySelector('header .wrapper');

    let defaultData = {
            login: {
                href: URLMAPS.bss_account + 'register?redirect_uri=' + redirect_uri,
                name: '注册'
            },
            logout: {
                href: URLMAPS.bss_account + 'login?redirect_uri=' + redirect_uri,
                name: '登录'
            }
        };

    let m = ['ul', {}, ' ', 
                ['li', {}, ' ', 
                    ['a', 
                        {
                            href: function(){
                                return this.data.login.href;
                            }
                        }, 
                        function(){
                            return this.data.login.name;
                        }
                    ]
                ],
                ' ',
                ['li', {}, ' ', 
                    ['a', 
                        {
                            href: function(){
                                return this.data.logout.href;
                            }
                        }, 
                        function(){
                            return this.data.logout.name;
                        }
                    ]
                ]
            ];

    let afterLogin = (d) => {
        if (wrapper) {
            // clear the demo area
            while (wrapper.lastChild) {
                wrapper.removeChild(wrapper.lastChild);
            }

            let jsonml = JsonML.BST(m).dataBind(d);

            // convert JsonML graph to DOM
            jsonml = JsonML.toHTML(jsonml);

            wrapper.appendChild(jsonml);

            loadingBall.style.display = 'none';
        }
    };
	
    AJAXRequest({
        url: '/login/checkin',
        callback: (d) => {
            let tempData = defaultData;
            if(d && d.data && d.data.isLogin){
                tempData = {
                    login: {
                        href: URLMAPS.market_domain + 'user',
                        name: d.data.username
                    },
                    logout: {
                        href: URLMAPS.bss_account + 'api/logout?redirect_uri=' + redirect_uri,
                        name: '退出'
                    }
                };
            }
            afterLogin(tempData);
        }
    });

})();