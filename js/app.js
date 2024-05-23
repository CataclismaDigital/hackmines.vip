



// constantes
var IMAGENS = ['bomba.png', 'diamante.png'];
const QUANT_BOMBAS = 20;
var QUANT_DIAMANTES = 22;

// variÃ¡veis globais
var estrelasSelecionadas = 3;
var diamantesGerados = 0;

// funÃ§Ã£o que seleciona a quantidade de estrelas
function selecionarEstrela(estrelas) {
	estrelasSelecionadas = estrelas;
	document.querySelectorAll('.estrela').forEach(function(estrela) {
		estrela.classList.remove('selecionada');
	});
	document.getElementById('estrela-' + estrelas).classList.add('selecionada');
}


function sortear(quantidades) {
	// sorteia um nÃºmero aleatÃ³rio baseado nas quantidades
	var total = quantidades.reduce(function(a, b) { return a + b; }, 0);
	var aleatorio = Math.floor(Math.random() * total);
	for (var i = 0; i < quantidades.length; i++) {
		if (aleatorio < quantidades[i]) {
			return i;
		}
		aleatorio -= quantidades[i];
	}
}

// constante
const TAMANHO_MATRIZ = 5;

// funÃ§Ã£o que gera o sinal
function gerarSinal() {

  var avisoDep = document.getElementById("avisodep");

  if (avisoDep && getComputedStyle(avisoDep).display === "block") {
    avisoDep.parentNode.removeChild(avisoDep);
  }

  var botao = document.getElementById("botao-sinal");
  botao.innerHTML = "Aguarde 30 segundos...";
  botao.style.backgroundColor = "#c3c3c3";
  botao.disabled = true;

  // remove as imagens antigas
  var imagensAntigas = document.querySelectorAll('.quadrado');
  for (var i = 0; i < imagensAntigas.length; i++) {
    imagensAntigas[i].remove();
  }

  // gera a matriz de quadrados
  var matriz = new Array(TAMANHO_MATRIZ);
  for (var i = 0; i < TAMANHO_MATRIZ; i++) {
    matriz[i] = new Array(TAMANHO_MATRIZ);
    for (var j = 0; j < TAMANHO_MATRIZ; j++) {
      matriz[i][j] = 'bomba.png';
    }
  }
  
  // adiciona os diamantes aleatoriamente na matriz
  var diamantesAdicionados = 0;
  while (diamantesAdicionados < QUANT_DIAMANTES) {
    var i = Math.floor(Math.random() * TAMANHO_MATRIZ);
    var j = Math.floor(Math.random() * TAMANHO_MATRIZ);
    if (matriz[i][j] == 'bomba.png') {
      matriz[i][j] = 'diamante.png';
      diamantesAdicionados++;
    }
  }
  
  // adiciona os quadrados na pÃ¡gina
  for (var i = 0; i < TAMANHO_MATRIZ; i++) {
    var fileira = document.getElementById('fileira-' + (i % TAMANHO_MATRIZ + 1)); // seleciona a fileira correspondente
    for (var j = 0; j < TAMANHO_MATRIZ; j++) {
      var imagem = matriz[i][j];
      var quadrado = document.createElement('div'); // cria o quadrado
      quadrado.className = 'quadrado'; // adiciona a classe
      quadrado.innerHTML = '<img src="images/' + imagem + '">'; // adiciona a imagem
      fileira.appendChild(quadrado); // adiciona o quadrado Ã  fileira

    }
  }

var segundos = 30;
var cronometro = setInterval(function() {
  segundos--;
  botao.innerHTML = "Aguarde " + segundos + " segundos...";
  if (segundos == 0) {
    clearInterval(cronometro);
    botao.innerHTML = "HACKEAR SINAL";
    botao.style.backgroundColor = "#ffb43a";
    botao.disabled = false;
  }
}, 1000);
}

function toggleDropdown() {
  var dropdownContent = document.getElementById('drop-cont');
  if (dropdownContent.style.display === 'none' || dropdownContent.style.display === '') {
    dropdownContent.style.display = 'block';
  } else {
    dropdownContent.style.display = 'none';
  }
}

function changeOption(optionText) {
  document.getElementById('dropbtn').innerText = optionText;
  document.getElementById('drop-cont').style.display = 'none';
  segundos = 0;
}

function changeVar(optionValue) {
  QUANT_DIAMANTES = optionValue; // Modifica a variável conforme necessário
  console.log("Variável modificada: " + QUANT_DIAMANTES); // Exemplo: exibe a variável no console
}


let slideIndex = 0;
let intervalId;

function showSlides() {
  const slides = document.querySelectorAll('.carousel-slide img');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';
}

function prevSlide() {
  clearInterval(intervalId); // Limpa o intervalo antes de mudar de slide
  slideIndex--;
  if (slideIndex < 1) {
    slideIndex = document.querySelectorAll('.carousel-slide img').length;
  }
  showSlides();
}

function nextSlide() {
  clearInterval(intervalId); // Limpa o intervalo antes de mudar de slide
  slideIndex++;
  if (slideIndex > document.querySelectorAll('.carousel-slide img').length) {
    slideIndex = 1;
  }
  showSlides();
}

// Iniciar o carrossel automaticamente
function startCarousel() {
  intervalId = setInterval(showSlides, 2500);
}

// Iniciar o carrossel automaticamente na inicialização
startCarousel();