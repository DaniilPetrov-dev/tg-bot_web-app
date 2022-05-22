var cart ={};

function init() {
	$.getJSON("goods.json", goodsOut);
}

function goodsOut(data) {
	console.log(data);
	var out='';
	for (var key in data) {
		out += `<div class="cart">`;
		out += `<p class="name">${data[key].name}</p>`;
		out += `<img src="./image/${data[key].img}" alt="">`;
		out += `<div class="cost">${data[key].cost}</div>`;
		out += `<button class="add-to-cart" data-id="${key}">Заказать</button>`;
		out += `</div>`
	}
	$('.goods-out').html(out);
	$('.add-to-cart').on('click', addToCart);
}


// Код интерактивной корзины

function loadCart() {
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
			showCart();
	} 
	else {
		$('.mini-cart').html('Корзина пуста');
	}
}

function showCart() {
	if (!isEmply(cart)) {
		$('.mini-cart').html('Корзина пуста');
	}
	else {
	$.getJSON('goods.json', function (data) {
		var goods = data;
		var out = '';
		for (var id in cart) {
			out += `<button data-id="${id}" class="del-goods">Х</button>`;
			out += `<img src="./image/${goods[id].img}" alt="">`;
			out += ` ${goods[id].name}`;
			out += `<button data-id="${id}" class="reduce-goods">-</button>`;
			out += ` ${cart[id]}`
			out += `<button data-id="${id}" class="add-goods">+</button>`;
			out += cart[id]*goods[id].cost;
			out += `<br>`;
		}
		$('.mini-cart').html(out);
		$('.del-goods').on('click', delGoods);
		$('.add-goods').on('click', addGoods);
		$('.reduce-goods').on('click', reduceGoods);
	});
	}
}

function isEmply(object) {
	for (var key in object) 
	if (object.hasOwnProperty(key)) return true;
	return false;
}

function addGoods() {
	var id = $(this).attr('data-id');
	cart[id]++
	saveCart();
	showCart();
}

function reduceGoods() {
	var id = $(this).attr('data-id');
	if(cart[id] == 1) {
		delete cart[id];
	}
	 else {
		cart[id]--;
	}
	saveCart();
	showCart();
}

function delGoods() {
	var id = $(this).attr('data-id');
	delete cart[id];
	saveCart();
	showCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}


//


function addToCart() {
	var id = $(this).attr('data-id');
	// Если в корзине еще нет такого товара, то кладем один. Есил есть, увеличиваем на один.
	// Можно написать и вызвать функцию, которая будет менять надпись на кнопке на количество в корзине.
	if (cart[id] == undefined) {
		cart[id] = 1;
	} 
	else {
		cart[id]++;
	}
	//console.log(cart);
	showCart();
	saveCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}



function loadCart() {
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
		showMiniCart();
	}
}

$(document).ready(function (){
	init();
	loadCart();
});