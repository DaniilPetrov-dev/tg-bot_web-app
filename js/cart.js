var cart ={};
function loadCart() {
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
			showCart();
	} 
	else {
		$('.main-cart').html('Корзина пуста');
	}
}

function showCart() {
	if (!isEmply(cart)) {
		$('.main-cart').html('Корзина пуста');
	}
	else {
	$.getJSON('goods.json', function (data) {
		var goods = data;
		var out = '';
		for (var id in cart) {
			out += `<button data-id="${id}" class="del-goods">X</button>`;
			out += `<img src="./image/${goods[id].img}" alt="">`;
			out += ` ${goods[id].name}`;
			out += ` ${cart[id]}`
		}
		$('.main-cart').html(out);
		$('.del-goods').on('click', delGoods);
	});
	}
}

function isEmply(object) {
	for (var key in object) 
	if (object.hasOwnProperty(key)) return true;
	return false;
}

function delGoods() {
	//Удаляем товар, нужно будет переделать, уменьшая количество товара и удалять, когда количество равно нулю
	//И с противоположной логикой сделать кнопку прибавление
	var id = $(this).attr('data-id');
	delete cart[id];
	saveCart();
	showCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

$(document).ready(function () {
	loadCart();
});