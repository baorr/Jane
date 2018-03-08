/*(function(){

	const doc = document;
    let isRequesting = false;
	let submitOrder = () => {
		let agreement = doc.querySelector('[name="agreement"]');
		let id = doc.querySelector('[name="__id"]').value;
        let pecId = doc.querySelector('[name="__specId"]').value;

        isRequesting = false;
		if(agreement.checked){
			location.href = `/order/confirm/${id}/${pecId}`;
		}
	};

    let buyNow = document.querySelector('a.buy-now');

    buyNow.addEventListener("click", function(e){
        if(isRequesting) return;
        isRequesting = true;
        
        submitOrder();

    }, false);

})();*/

setImmediate(() => {
    console.log('setImmediate')
});
process.nextTick(() => {
    console.log('nextTick')
})
Promise.resolve().then(() => {
    console.log('then')
})
console.log('end')