function getlabel(text){
    if(text.textContent==="Гипотенуза и угол") {
        document.querySelector('label[for="input1"]').textContent = 'Гипотенуза (c):';
        document.querySelector('label[for="input2"]').textContent = 'Угол (α):';
        document.getElementById('image').src = 'pict_1.png';
    }
    if(text.textContent==="Два катета") {
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
    /*    let addP =  output.createElement('p').

    addP.textContent = "<p>Результат:</p>";
    output.appendChild(addP);*/
    clearError();
    let inputForm = document.querySelector('label[for="input1"]').textContent = 'Гипотенуза (c):';
    let a = parseFloat(document.getElementById('input1').value);
    let b = parseFloat(document.getElementById('input2').value);

        if (document.getElementById('legs').checked) {
            let legA = parseFloat(document.getElementById('input1').value);
            let legB = parseFloat(document.getElementById('input2').value);
            let legC = Math.sqrt(legA * legA + legB * legB);
            radius = Math.round((legC / 2)*1000)/1000;
            height = Math.round(((legA * legB) / legC)*1000)/1000;
            median = Math.round((Math.sqrt(2 * legA * legA + 2 * legB * legB - legC * legC) / 2)*1000)/1000;
            S = Math.round(((legA * legB) / 2)*1000)/1000;
        }
        if (document.getElementById('hypotenuseAngle').checked) {
            let hypotenuse = parseFloat(document.getElementById('input1').value);
            let alpha = parseFloat(document.getElementById('input2').value);
            let A = Math.abs(Math.round((hypotenuse*Math.sin(alpha))*1000)/1000) ;
            let B =  Math.round((hypotenuse*Math.cos(alpha))*1000)/1000 ;
            radius = Math.round((hypotenuse / 2)*1000)/1000;
            height = Math.round(((A * B) / hypotenuse)*1000)/1000;
           // median = Math.round((Math.sqrt(2 * A * A + 2 * B * B - hypotenuse * hypotenuse) / 2)*1000)/1000;
            median =Math.round(((hypotenuse) / 2)*1000)/1000;
            S = Math.round(((A * B) / 2)*1000)/1000;

            /*radius = Math.round((hypotenuse / (2 * Math.sin(alpha)))*1000)/1000;
            height = Math.round((hypotenuse * Math.sin(alpha))*1000)/1000;
            median =Math.round(((hypotenuse) / 2)*1000)/1000;
            S = Math.round(((hypotenuse * height) / 2)*1000)/1000;*/
        }

    if(a > 0 || b > 0 || (inputForm !== 'Гипотенуза (c):' && (a+b)<Math.sqrt(a * a + b * b))) {
        let n = document.getElementById('out').selectedIndex;
        let selecform = document.getElementById('out');
        if (selecform.options[0].selected) {
            if (median > 0) {
                let newElement1 = document.createElement('p');
                newElement1.innerHTML = "Медиана = " + median;
                output.appendChild(newElement1);
            } else {
                handleError('input1', 'input2');
            }
        }
        if (selecform.options[1].selected) {
            if (height > 0) {
                let newElement1 = document.createElement('p');
                newElement1.innerHTML = "Высота = " + height;
                output.appendChild(newElement1);
            } else {
                handleError('input1', 'input2');
            }
        }
        if (selecform.options[2].selected) {
            if (radius > 0) {
                let newElement1 = document.createElement('p');
                newElement1.innerHTML = "Радиус = " + radius;
                output.appendChild(newElement1);
            } else {
                handleError('input1', 'input2');
            }
        }
        if (selecform.options[3].selected) {
            if (S > 0) {
                let newElement1 = document.createElement('p');
                newElement1.innerHTML = "Площадь = " + S;
                output.appendChild(newElement1);
            } else {
                handleError('input1', 'input2');
            }
        }
    }
    else {
        handleError('input1', 'input2');

    }

}
function handleError(input1Id, input2Id) {
    document.getElementById(input1Id).classList.add('error');
    document.getElementById(input2Id).classList.add('error');
}

function clearError() {
    document.getElementById('input1').classList.remove('error');
    document.getElementById('input2').classList.remove('error');
}
function clearAll(){
    clearError();
    /*let elem = document.getElementById('output');
    for (let element of elem) {
        while (element.children.length > 0) {
            //element.removeChild(element.lastElementChild);
            element.children.remove();
        }
    }*/
    document.getElementById('output').innerHTML = '';

}
