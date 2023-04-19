(function limitarInputs() {
    const inputs = document.querySelectorAll("input[type='number']");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].oninput = function () {
            if (this.value.length > 3) {
                this.value = this.value.slice(0, 3);
            }
        };
    }
})();

// Adicionar um ouvinte de eventos oninput aos elementos de entrada
// Adicionar um ouvinte de eventos oninput aos elementos de entrada
const ladoA = document.getElementById("lado-a");
ladoA.addEventListener("input", atualizarRecomendacoes);

const ladoB = document.getElementById("lado-b");
ladoB.addEventListener("input", atualizarRecomendacoes);

function atualizarRecomendacoes() {
    let ladoAInput = document.getElementById("lado-a");
    let ladoBInput = document.getElementById("lado-b");
  
    let ladoAValue = parseFloat(ladoAInput.value) || 0; // Se o valor não for um número, assume 0
    let ladoBValue = parseFloat(ladoBInput.value) || 0; // Se o valor não for um número, assume 0
  
    if (ladoAValue === 0) {
      document.getElementById("clip-recomended-lado-a").textContent = "(Recomendado: ? clips para o lado A)"; // Limpa o resultado se o valor do lado A for zero
    } else {
      let clipsRecommended = '?';
  
      if (ladoAValue <= 65) {
        clipsRecommended = 2;
      } else if (ladoAValue <= 100) {
        clipsRecommended = 3;
      } else if (ladoAValue <= 140) {
        clipsRecommended = 4;
      } else {
        clipsRecommended = Math.round(ladoAValue / 40);
        if (!Number.isInteger(clipsRecommended)) {
          clipsRecommended = '?';
        }
      }
  
      let clipRecommendedText = `(Recomendado: ${clipsRecommended} clips para o lado A)`;
      let clipRecommendedElement = document.getElementById("clip-recomended-lado-a");
      clipRecommendedElement.textContent = clipRecommendedText;
    }
  
    if (ladoBValue === 0) {
      document.getElementById("clip-recomended-lado-b").textContent = "(Recomendado: ? clips para o lado B)"; // Limpa o resultado se o valor do lado B for zero
    } else {
      let clipsRecommended = '?';
  
      if (ladoBValue <= 65) {
        clipsRecommended = 2;
      } else if (ladoBValue <= 100) {
        clipsRecommended = 3;
      } else if (ladoBValue <= 140) {
        clipsRecommended = 4;
      } else {
        clipsRecommended = Math.round(ladoBValue / 40);
        if (!Number.isInteger(clipsRecommended)) {
          clipsRecommended = '?';
        }
      }
  
      let clipRecommendedText = `(Recomendado: ${clipsRecommended} clips para o lado B)`;
      let clipRecommendedElement = document.getElementById("clip-recomended-lado-b");
      clipRecommendedElement.textContent = clipRecommendedText;
    }
  }
  
  let ladoAInput = document.getElementById("lado-a");
  let ladoBInput = document.getElementById("lado-b");
  
  ladoAInput.addEventListener("input", calcClips);
  ladoBInput.addEventListener("input", calcClips);




function calcClips() {
    // Implemente seu cálculo aqui
    let quantidadeClips = 10;
    let quantidadeCunhas = 5;

    // Atualize o conteúdo dos elementos <p>
    document.querySelector("#quantidade-clips").textContent = "Quantidade de clips: " + quantidadeClips;
    document.querySelector("#quantidade-cunhas").textContent = "Quantidade de cunhas: " + quantidadeCunhas;
};
