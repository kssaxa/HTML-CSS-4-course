function getlabel(text){
    if(text.textContent==="Гипотенуза и угол") {
        document.querySelector('label[for="input1"]').textContent = 'Гипотенуза (c):';
        document.querySelector('label[for="input2"]').textContent = 'Угол (α):';
        document.getElementById('image').src = 'pict_1.png';
    }
    if(text.textContent!=="Гипотенуза и угол") {
        document.querySelector('label[for="input1"]').textContent = 'Катет а:';
        document.querySelector('label[for="input2"]').textContent = 'Катет b:';
        document.getElementById('image').src = 'pict_2.png';

    }
}
let div = document.getElementById("radioInput");
let radios = div.querySelectorAll("input[type=radio]");
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("click", function(event) {
        getlabel(this.nextElementSibling);
    });
}
function calculate (data) {
    let radius;
    let height;
    let median;
    let  S;
    let output = document.getElementById('output');
    output.innerHTML = "<p>Результат:</p>";
    //alert(document.getElementById('legs').checked);



    if((parseFloat(document.getElementById('input1').value)) >0 && parseFloat(document.getElementById('input2').value) > 0) {
        if (document.getElementById('legs').checked) {
            let legA = parseFloat(document.getElementById('input1').value);
            let legB = parseFloat(document.getElementById('input2').value);
            let legC = Math.sqrt(legA * legA + legB * legB);
            radius = legC / 2;
            height = (legA * legB) / legC;
            median = Math.sqrt(2 * legA * legA + 2 * legB * legB - legC * legC) / 2;
            S = (legA * legB) / 2;
        }
        if (document.getElementById('hypotenuseAngle').checked) {
            let hypotenuse = parseFloat(document.getElementById('input1').value);
            let alpha = parseFloat(document.getElementById('input2').value);
            radius = hypotenuse / (2 * Math.sin(alpha));
            height = hypotenuse * Math.sin(alpha);
            median = (hypotenuse * Math.sin(alpha)) / 2;
            S = (hypotenuse * height) / 2;
        }
    } else{
        handleError('input1', 'input2');
    }
    let n = document.getElementById('out').selectedIndex;
    if (n === 0){
        let newElement1 = document.createElement('p');
        newElement1.innerHTML = "Медиана = " + median;
        output.appendChild(newElement1);
    }
    if (n===1){
        let newElement1 = document.createElement('p');
        newElement1.innerHTML = "Высота = " + height;
        output.appendChild(newElement1);
    }
    if (n===2){

        let newElement1 = document.createElement('p');
        newElement1.innerHTML = "Радиус = " + radius;
        output.appendChild(newElement1);
    }
    if (n===3){
        let newElement1 = document.createElement('p');
        newElement1.innerHTML = "Площадь = " + S;
        output.appendChild(newElement1);
    }
    return true;
}
function handleError(input1Id, input2Id) {
    document.getElementById(input1Id).classList.add('error');
    document.getElementById(input2Id).classList.add('error');
}

function clearError() {
    document.getElementById('input1').classList.remove('error');
    document.getElementById('input2').classList.remove('error');
}
