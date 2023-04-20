//inicio do script para calculo de clips e cunhas
let ladoAInput = document.getElementById("lado-a");
let ladoBInput = document.getElementById("lado-b");
let areaTotalInput = document.getElementById("area-total");
let assentamentoDiarioInput = document.getElementById("assentamento-diario");
let clipsRecommendedLadoA = 0;
let clipsRecommendedLadoB = 0;

// Adicionar um ouvinte de eventos oninput aos elementos de entrada
ladoAInput.addEventListener('input', atualizarRecomendacoes);
ladoBInput.addEventListener('input', atualizarRecomendacoes);

function atualizarRecomendacoes() {

  let ladoAValue = parseFloat(ladoAInput.value) || 0; // Se o valor não for um número, assume 0
  let ladoBValue = parseFloat(ladoBInput.value) || 0; // Se o valor não for um número, assume 0

  if (ladoAValue === 0 || !Number.isInteger(ladoAValue)) {
    document.getElementById("clip-recomended-lado-a").textContent = "(Recomendado: ? clips para o lado A)"; // Limpa o resultado se o valor do lado A for zero
  } else {
    clipsRecommendedLadoA = '?';

    if (ladoAValue <= 65) {
      clipsRecommendedLadoA = 2;
    } else if (ladoAValue <= 110) {
      clipsRecommendedLadoA = 3;
    } else if (ladoAValue <= 140) {
      clipsRecommendedLadoA = 4;
    } else {
      clipsRecommendedLadoA = Math.round(ladoAValue / 40);
      if (!Number.isInteger(clipsRecommendedLadoA)) {
        clipsRecommendedLadoA = '?';
      }
    }

    let clipRecommendedText = `(Recomendado: ${clipsRecommendedLadoA} clips para o lado A)`;
    let clipRecommendedElement = document.getElementById("clip-recomended-lado-a");
    clipRecommendedElement.textContent = clipRecommendedText;
  }

  if (ladoBValue === 0 || !Number.isInteger(ladoBValue)) {
    document.getElementById("clip-recomended-lado-b").textContent = "(Recomendado: ? clips para o lado B)"; // Limpa o resultado se o valor do lado B for zero
  } else {
    clipsRecommendedLadoB = '?';

    if (ladoBValue <= 65) {
      clipsRecommendedLadoB = 2;
    } else if (ladoBValue <= 110) {
      clipsRecommendedLadoB = 3;
    } else if (ladoBValue <= 140) {
      clipsRecommendedLadoB = 4;
    } else {
      clipsRecommendedLadoB = Math.round(ladoBValue / 40);
      if (!Number.isInteger(clipsRecommendedLadoB)) {
        clipsRecommendedLadoB = '?';
      }
    }

    let clipRecommendedText = `(Recomendado: ${clipsRecommendedLadoB} clips para o lado B)`;
    let clipRecommendedElement = document.getElementById("clip-recomended-lado-b");
    clipRecommendedElement.textContent = clipRecommendedText;
  }
}

function calcClipsAndCunhas() {
  if (ladoAInput.value === "" || ladoBInput.value === '' || areaTotalInput.value === '' || assentamentoDiarioInput.value === '') {
    alert('Por favor, preencha todos os campos com valores diferentes de zero');
  };

  // Implemente seu cálculo aqui
  let clipsPorRevestimento = clipsRecommendedLadoA * 2 + clipsRecommendedLadoB * 2;
  let areaDeUmRevestimento = ladoAInput.value * ladoBInput.value / 10000;
  let quantidadeDeRevestimentos = areaTotalInput.value / areaDeUmRevestimento;

  let quantidadeClips = Math.round(clipsPorRevestimento * quantidadeDeRevestimentos / 2);
  let quantidadeCunhas = Math.min(quantidadeClips, Math.ceil((assentamentoDiarioInput.value / areaDeUmRevestimento * clipsPorRevestimento) / 2));

  // Atualize o conteúdo dos elementos <p>
  document.querySelector("#quantidade-clips").textContent = "Quantidade de clips: " + quantidadeClips;
  document.querySelector("#quantidade-cunhas").textContent = "Quantidade de cunhas: " + quantidadeCunhas;
};
//fim do script para cálculo de clips e cunhas