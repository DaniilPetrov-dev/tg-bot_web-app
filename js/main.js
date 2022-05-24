let tg = window.Telegram.WebApp;
var cart ={};


tg.MainButton.setParams(
	{"text": "Заказать"},
	{"textColor": "#F55353"},
	{"color": "#143F6B"}
);


function init() {
	$.getJSON("goods.json", goodsOut);
	usercard();
}

function goodsOut(data) {

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
		chekCart();
	}
	else {
	$.getJSON('goods.json', function (data) {
		var goods = data;
		var out = '';
		var total = 0;
		for (var id in cart) {
			out += `<button data-id="${id}" class="del-goods">Х</button>`;
			out += `<img src="./image/${goods[id].img}" alt="">`;
			out += ` ${goods[id].name}`;
			out += `<button data-id="${id}" class="reduce-goods">-</button>`;
			out += ` ${cart[id]}`
			out += `<button data-id="${id}" class="add-goods">+</button>`;
			out += cart[id]*goods[id].cost;
			total += cart[id]*goods[id].cost;
			out += `<br>`;
		}
		$('.mini-cart').html(out);
		tg.MainButton.text = total;
		$('.del-goods').on('click', delGoods);
		$('.add-goods').on('click', addGoods);
		$('.reduce-goods').on('click', reduceGoods);
		chekCart();
	});
	}
}


function replaceButton(id) {
	if (!isEmply(cart)) {
		$('.mini-cart').html('Корзина пуста');
		chekCart();
	}
	else{
		var goods = data;
		var out = '';
		out += `<div class="quantity-con"><button data-id="${id}" class="reduce-goods">-</button>`;
		out += ` ${cart[id]}`
		out += `<button data-id="${id}" class="add-goods">+</button></div>`;
		$('[data-id='+id+']').replaceWith(out);
		$('.add-goods').on('click', addGoods);
		$('.reduce-goods').on('click', reduceGoods);
		chekCart();
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
//function replace() {
//var replaceButton = '<button data-id="' + id + '" class="reduce-goods">-</button>' + cart[id] + '<button data-id="' + id + '" class="add-goods">+</button>'
//	$(this).replaceWith(replaceButton);
//}
//$('[data-id='+id+']').replaceWith('<div class="quantity-con"><button data-id="' + id + '" class="reduce-goods">-</button>' + cart[id] + '<button data-id="' + id + '" class="add-goods">+</button></div>');


function addToCart() {
	var id = $(this).attr('data-id');
	if (cart[id] == undefined) {
		cart[id] = 1;
	} 
	else {
		cart[id]++;
	}
	showCart();
	saveCart();
}

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
	if (localStorage.getItem('cart')) {
		cart = JSON.parse(localStorage.getItem('cart'));
		showCart();
	}
}

function chekCart() {
	if(isEmply(cart)) {
		tg.MainButton.show();
	}
	else {
		tg.MainButton.hide()
	}
}

function usercard() {
    var usercard = document.getElementById("usercard"); //получаем блок usercard 

	var profName = document.createElement('p'); //создаем параграф
	profName.innerText = `${tg.initDataUnsafe.user.first_name}
	${tg.initDataUnsafe.user.last_name}
	${tg.initDataUnsafe.user.username} (${tg.initDataUnsafe.user.language_code})`;
	//выдем имя, "фамилию", через тире username и код языка
	usercard.appendChild(profName); //добавляем 

	var userid = document.createElement('p'); //создаем еще параграф 
	userid.innerText = `${tg.initDataUnsafe.user.id}`; //показываем user_id
	usercard.appendChild(userid); //добавляем
    
}
    
   
    
$('.test-btn').on('click', botSendMsg);

function botSendMsg(){
/*	msgarray = [
	'https://api.telegram.org/bot',
	'5257474572:AAHwy_xbU1045CfU7GxU6fH4in1r6woDhvQ',
	'/sendMessage?chat_id=',
	userId,
	'&text=',
	messagetext];*/
/*	let url = '';
	for (var i in msgarray) {
		url += msgarray[i];
	}*/
	let xhttp = new XMLHttpRequest();
    let	url = 'https://api.telegram.org/bot5257474572:AAHwy_xbU1045CfU7GxU6fH4in1r6woDhvQ/sendMessage?chat_id=1345864504&text=true';
	xhttp.open('GET', url, true);
	xhttp.send();
 }

$(document).ready(function (){
	init();
	loadCart();
});

function getMessage() {
    var	messagetext = `Новый  заказ`;
	for (var id in cart) {
		messagetext += `${goods[id].name}`;
		messagetext += `${cart[id]}`;
		messagetext += `${cart[id]*goods[id].cost}`;
	}
	 
} 

Telegram.WebApp.onEvent('mainButtonClicked', function(){
	botSendMsg();
	tg.close();
});