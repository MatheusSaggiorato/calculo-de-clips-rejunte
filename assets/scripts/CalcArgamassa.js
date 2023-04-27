let coeficienteRejuntamento = 1.58;

function atualizarCoeficenteRejuntamento() {

    const rejunteSelecionado = document.getElementById("dropdown-tipo-rejunte").value;

    switch (rejunteSelecionado) {
        case "opcao1":
            coeficienteRejuntamento = 1.58;
            break;
        case "opcao2":
            coeficienteRejuntamento = 1.75;
            break;
        case "opcao3":
            coeficienteRejuntamento = 1.32;
            break;
        default:
            coeficienteRejuntamento = 1.58;
    }
};

function validarCampos(...campos) {
    for (const campo of campos) {
        if (!campo.value || campo.value <= 0) {
            alert('Por favor, preencha todos os campos com valores maiores que zero');
            return true;
        }
    }
    return false;
};

function calcularArgamassaRejunte() {

    const ladoAInputArgamassa = document.getElementById("lado-a-argamassa");
    const ladoBInputArgamassa = document.getElementById("lado-b-argamassa");
    const areaTotalInputArgamassa = document.getElementById("area-total-argamassa");
    const espessuraJunta = document.getElementById("espessura-junta");
    const profundidadeJunta = document.getElementById("espessura-revestimento");

    if (validarCampos(ladoAInputArgamassa, ladoBInputArgamassa, areaTotalInputArgamassa, espessuraJunta, profundidadeJunta)) {
    } else {

        const quantMinArgamassa = areaTotalInputArgamassa.value * 8;
        const quantMaxArgamassa = areaTotalInputArgamassa.value * 9;

        //cálculo do consumo dos rejuntes
        const consumoRejuntePorM2 = (ladoAInputArgamassa.value * 10 + ladoBInputArgamassa.value * 10) * profundidadeJunta.value * espessuraJunta.value * coeficienteRejuntamento / ((ladoAInputArgamassa.value * 10) * (ladoBInputArgamassa.value * 10));
        const quantMinRejunte = (areaTotalInputArgamassa.value * consumoRejuntePorM2).toFixed(3);
        const quantMaxRejunte = (quantMinRejunte * 1.10).toFixed(3);

        // Atualize o conteúdo dos elementos <p>
        document.querySelector("#consumo-min-rejunte").textContent = `${quantMinRejunte.replace('.', ',')}kg = ${Math.ceil(quantMinRejunte / 1)} saco(s) de 1kg`;
        document.querySelector("#consumo-max-rejunte").textContent = `${quantMaxRejunte.replace('.', ',')}kg = ${Math.ceil(quantMaxRejunte / 1)} saco(s) de 1kg`;
        document.querySelector("#consumo-min-argamassa").textContent = `${quantMinArgamassa}kg = ${Math.ceil(quantMinArgamassa / 20)} saco(s) de 20kg`;
        document.querySelector("#consumo-max-argamassa").textContent = `${quantMaxArgamassa}kg = ${Math.ceil(quantMaxArgamassa / 20)} sacos(s) de 20kg`;
    }
};
