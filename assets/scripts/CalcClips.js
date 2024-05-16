const ladoAInputClips = document.getElementById("lado-a");
const ladoBInputClips = document.getElementById("lado-b");
const quantidadeClipsLadoA = document.getElementById("quantidade-clips-lado-a");
const quantidadeClipsLadoB = document.getElementById("quantidade-clips-lado-b");
const areaTotalInputClips = document.getElementById("area-total");
const assentamentoDiarioInputClips = document.getElementById("assentamento-diario");

let clipsRecommendedLadoA, clipsRecommendedLadoB;

ladoAInputClips.addEventListener('input', atualizarRecomendacoes);
ladoBInputClips.addEventListener('input', atualizarRecomendacoes);

function atualizarRecomendacoes() {
  const ladoAValue = parseFloat(ladoAInputClips.value) || 0;
  const ladoBValue = parseFloat(ladoBInputClips.value) || 0;

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

function validarCampos(...campos) {
  for (const campo of campos) {
    if (!campo.value || campo.value <= 0) {
      alert('Por favor, preencha todos os campos com valores maiores que zero');
      return true;
    }
  }
  return false;
}

function calcClipsAndCunhas() {

  if (validarCampos(ladoAInputClips, ladoBInputClips, areaTotalInputClips, assentamentoDiarioInputClips, quantidadeClipsLadoA, quantidadeClipsLadoB)) {
  } else {

    const clipsLadoA = quantidadeClipsLadoA.value;
    const clipsLadoB = quantidadeClipsLadoB.value;
    const clipsPorRevestimento = clipsLadoA * 2 + clipsLadoB * 2;
    const areaDeUmRevestimento = ladoAInputClips.value * ladoBInputClips.value / 10000;
    const quantidadeDeRevestimentos = areaTotalInputClips.value / areaDeUmRevestimento;

    const quantidadeClips = Math.round(clipsPorRevestimento * quantidadeDeRevestimentos / 2);
    const quantidadeCunhas = Math.min(quantidadeClips, Math.ceil((assentamentoDiarioInputClips.value / areaDeUmRevestimento * clipsPorRevestimento) / 2));

    document.querySelector("#quantidade-clips").textContent = quantidadeClips;
    document.querySelector("#quantidade-cunhas").textContent = quantidadeCunhas;
  }
};
