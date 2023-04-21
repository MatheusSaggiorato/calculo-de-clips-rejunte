//inicio do script para calculo de argamassa a rejunte
const ladoAInputArg = document.getElementById("lado-a-argamassa");
const ladoBInputArg = document.getElementById("lado-b-argamassa");
const areaTotalInputArg = document.getElementById("area-total-argamassa");
const espessuraJunta = document.getElementById("espessura-junta");
const espessuraRevestimento = document.getElementById("espessura-revestimento");

let coeficienteRejunte = 1.58;

function atualizarCoeficente() {

    const rejunteSelecionado = document.getElementById("dropdown-tipo-rejunte").value;

    switch (rejunteSelecionado) {
        case "opcao1":
            coeficienteRejunte = 1.58;
            break;
        case "opcao2":
            coeficienteRejunte = 1.75;
            break;
        case "opcao3":
            coeficienteRejunte = 1.32;
            break;
        default:
            coeficienteRejunte = 1.58;
    }
}

function calcArgamassaRejunte() {
    if (ladoAInputArg.value === "" ||
        ladoBInputArg.value === '' ||
        areaTotalInputArg.value === '' ||
        espessuraJunta.value === '' ||
        espessuraRevestimento.value === '') {
        alert('Por favor, preencha todos os campos com valores diferentes de zero');
    } else {

        let quantMinArgamassa = areaTotalInputArg.value * 8;
        let quantMaxArgamassa = areaTotalInputArg.value * 9;

        const rejunteSelecionado = document.getElementById("dropdown-tipo-rejunte").value;

        //cálculo do consumo dos rejuntes
        let ConsumoRejuntePorM2 = (ladoAInputArg.value * 10 + ladoBInputArg.value * 10) * espessuraRevestimento.value * espessuraJunta.value * coeficienteRejunte / ((ladoAInputArg.value * 10) * (ladoBInputArg.value * 10));
        let quantMinRejunte = (areaTotalInputArg.value * ConsumoRejuntePorM2).toFixed(3);
        let quantMaxRejunte = (quantMinRejunte * 1.10).toFixed(3);

        // Atualize o conteúdo dos elementos <p>
        document.querySelector("#consumo-min-rejunte").textContent = `${quantMinRejunte}kg = ${Math.ceil(quantMinRejunte / 1)} saco(s) de 1kg`;
        document.querySelector("#consumo-max-rejunte").textContent = `${quantMaxRejunte}kg = ${Math.ceil(quantMaxRejunte / 1)} saco(s) de 1kg`;
        document.querySelector("#consumo-min-argamassa").textContent = `${quantMinArgamassa}kg = ${Math.ceil(quantMinArgamassa / 20)} saco(s) de 20kg`;
        document.querySelector("#consumo-max-argamassa").textContent = `${quantMaxArgamassa}kg = ${Math.ceil(quantMaxArgamassa / 20)} sacos(s) de 20kg`;
    }
};