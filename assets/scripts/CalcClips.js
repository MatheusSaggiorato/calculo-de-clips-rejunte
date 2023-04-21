//inicio do script para calculo de clips e cunhas
let ladoAInput = document.getElementById("lado-a");
let ladoBInput = document.getElementById("lado-b");
let areaTotalInput = document.getElementById("area-total");
let assentamentoDiarioInput = document.getElementById("assentamento-diario");
let clipsRecommendedLadoA, clipsRecommendedLadoB;

// Adicionar um ouvinte de eventos oninput aos elementos de entrada
ladoAInput.addEventListener('input', atualizarRecomendacoes);
ladoBInput.addEventListener('input', atualizarRecomendacoes);

function atualizarRecomendacoes() {
  const ladoAValue = parseFloat(ladoAInput.value) || 0;
  const ladoBValue = parseFloat(ladoBInput.value) || 0;

  function calcularClipsRecomendados(valor) {
    if (valor <= 10) {
      return 1;
    } else if (valor <= 65) {
      return 2;
    } else if (valor <= 115) {
      return 3;
    } else if (valor <= 140) {
      return 4;
    } else {
      const clipsRecomendados = Math.round(valor / 40);
      return Number.isInteger(clipsRecomendados) ? clipsRecomendados : "?";
    }
  }

  clipsRecommendedLadoA = ladoAValue === 0 || !Number.isInteger(ladoAValue)
    ? "?"
    : calcularClipsRecomendados(ladoAValue);

  clipsRecommendedLadoB = ladoBValue === 0 || !Number.isInteger(ladoBValue)
    ? "?"
    : calcularClipsRecomendados(ladoBValue);

  document.querySelector("#clip-recomended-lado-a").textContent = clipsRecommendedLadoA;
  document.querySelector("#clip-recomended-lado-b").textContent = clipsRecommendedLadoB;
}

function calcClipsAndCunhas() {

  let ladoAValue = parseFloat(ladoAInput.value) || 0;
  let ladoBValue = parseFloat(ladoBInput.value) || 0;
  let areaTotalValue = parseFloat(areaTotalInput.value) || 0;
  let assentamentoDiarioValue = parseFloat(assentamentoDiarioInput.value) || 0;

  if (ladoAValue === 0 || ladoBValue === 0 || areaTotalValue === 0 || assentamentoDiarioValue === 0) {
    alert('Por favor, preencha todos os campos com valores diferentes de zero');
  } else {

    // Implemente seu cálculo aqui
    let clipsPorRevestimento = clipsRecommendedLadoA * 2 + clipsRecommendedLadoB * 2;
    let areaDeUmRevestimento = ladoAInput.value * ladoBInput.value / 10000;
    let quantidadeDeRevestimentos = areaTotalValue / areaDeUmRevestimento;

    let quantidadeClips = Math.round(clipsPorRevestimento * quantidadeDeRevestimentos / 2);
    let quantidadeCunhas = Math.min(quantidadeClips, Math.ceil((assentamentoDiarioInput.value / areaDeUmRevestimento * clipsPorRevestimento) / 2));

    // Atualize o conteúdo dos elementos <p>
    document.querySelector("#quantidade-clips").textContent = quantidadeClips;
    document.querySelector("#quantidade-cunhas").textContent = quantidadeCunhas;
  }
};
