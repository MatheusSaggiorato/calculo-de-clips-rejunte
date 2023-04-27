//inicio do script para calculo de clips e cunhas
const ladoAInputClips = document.getElementById("lado-a");
const ladoBInputClips = document.getElementById("lado-b");
const areaTotalInputClips = document.getElementById("area-total");
const assentamentoDiarioInputClips = document.getElementById("assentamento-diario");

let clipsRecommendedLadoA, clipsRecommendedLadoB;

// Adicionar um ouvinte de eventos oninput aos elementos de entrada
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

  if (validarCampos(ladoAInputClips, ladoBInputClips, areaTotalInputClips, assentamentoDiarioInputClips)) {
  } else {

    // Implemente seu cálculo aqui
    const clipsPorRevestimento = clipsRecommendedLadoA * 2 + clipsRecommendedLadoB * 2;
    const areaDeUmRevestimento = ladoAInputClips.value * ladoBInputClips.value / 10000;
    const quantidadeDeRevestimentos = areaTotalInputClips.value / areaDeUmRevestimento;

    const quantidadeClips = Math.round(clipsPorRevestimento * quantidadeDeRevestimentos / 2);
    const quantidadeCunhas = Math.min(quantidadeClips, Math.ceil((assentamentoDiarioInputClips.value / areaDeUmRevestimento * clipsPorRevestimento) / 2));

    // Atualize o conteúdo dos elementos <p>
    document.querySelector("#quantidade-clips").textContent = quantidadeClips;
    document.querySelector("#quantidade-cunhas").textContent = quantidadeCunhas;
  }
};
