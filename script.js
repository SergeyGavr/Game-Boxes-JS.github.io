let $start = document.querySelector('#start'),
	$game = document.querySelector('#game'),
	score = 0,
	gameSize = $game.getBoundingClientRect(), // для получения размеров
	$time = document.querySelector('#time'),
	$result = document.querySelector('#result'),
	isGameStarted = false,
	timeHeader = document.querySelector('#time-header'),
	timeResult = document.querySelector('#result-header'),
	$gameTime = document.querySelector('#game-time');
	

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show (el) {
	el.classList.remove('hide');
}

function hide (el) {
	el.classList.add('hide');
}

function startGame() {
	score = 0;
	setGameTime();
	$gameTime.setAttribute('disabled', "disabled"); // во время игры блокируем поле ввода
	isGameStarted = true;
	$game.style.backgroundColor = '#fff';
	hide($start);
	  
	let interval = setInterval(function() {
		let time = parseFloat($time.textContent);

		if (time<=0) {
			endGame(); 
			clearInterval(interval);
		} else {
			$time.textContent = (time - 0.1).toFixed(1);
		}
	}, 100);

  	renderBox();
}

function endGame () {
	isGameStarted = false; 
	setGameScore(); 
	$gameTime.removeAttribute('disabled');
	show($start); // показываем кнопку
	$game.innerHTML = ''; // очищаем поле от квадратов
	$game.style.backgroundColor = '#ccc';
	hide(timeHeader); // прячем время игры
	show(timeResult); // показываем результат
}

function setGameScore () {
	$result.textContent = score.toString();
}

function setGameTime () {
	let time = +$gameTime.value;
	$time.textContent = time.toFixed(1);
	show(timeHeader);
	hide(timeResult);
}

function handleBoxClick (event) {
	if (!isGameStarted) {
		return; // если игра не запущена(остановлена), на квадрат не нажимаем
	}
	if (event.target.dataset.box) {
		score++;
		renderBox();
	}
}


function renderBox() {
	let boxSize = getRandom(35, 100),
		maxTop = gameSize.height - boxSize,
		maxLeft = gameSize.width - boxSize,
		red = getRandom(0,256),
		green = getRandom(0,256),
		blue = getRandom(0,256);
	$game.innerHTML = '';
	let box = document.createElement('div');

	box.style.height = box.style.width = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.top = getRandom(0, maxTop) + 'px';
	box.style.left = getRandom(0, maxLeft) + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true');
	box.style.backgroundColor = `rgb(${red},${green},${blue})`;

	$game.insertAdjacentElement('afterbegin', box); // вставка квадрата после открывающего тега(перед первым потомком)
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
