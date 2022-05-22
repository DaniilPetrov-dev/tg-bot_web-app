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
	console.log(cart);
	showMiniCart();
}

function showMiniCart () {
	var out ='';
	for (var key in cart) {
		out += key + ' - ' + cart[key]+'<br>';
	}
	$('.mini-cart').html(out);
}

$(document).ready(function (){
	init();
});