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

function clearInputs() {
    location.reload();
}