(function(){
	var URLMAPS = {
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
	var temp = URLMAPS[hostname];

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
})();