let displayTable = (data, idTable) => {
    let table = document.getElementById(idTable).getElementsByTagName('tbody')[0];
    table.innerHTML = ""; // Clear existing table data

    let tr = document.createElement('tr');
    for (let key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);

    data.forEach((item) => {
        tr = document.createElement("tr");
        for (let value in item) {
            let td = document.createElement("td");
            td.innerHTML = item[value];
            tr.append(td);
        }
        table.append(tr);
    });
};

document.addEventListener("DOMContentLoaded", function() {
    displayTable(agencies, 'list');
});

function What_is(data) {
    for (let i = 0; i < data.oy.length; i++) {
        if (data.oy[i].checked) {
            if (i <= 1) return 0; // Deals
            if (i <= 3) return 1; // Listings
            if (i <= 5) return 2; // Rating
        }
    }
}

function createArrGraph(data, key, number) {
    let what = number === 0 ? 'Количество сделок' : number === 1 ? 'Количество объявлений' : 'Оценка клиентов';
    let groupObj = d3.group(data, d => d[key]);

    return Array.from(groupObj, ([labelX, values]) => ({
        labelX,
        values: d3.extent(values, d => d[what])
    }));
}

const marginX = 100;
const marginY = 150;
const height = 600;
const width = 1000;
let svg = d3.select("svg").attr("height", height).attr("width", width);

function drawGraph(data) {
    const keyX = data.ox.value;
    const number = What_is(data);
    const isMin = data.oy[0].checked || data.oy[2].checked || data.oy[4].checked;
    const isMax = data.oy[1].checked || data.oy[3].checked || data.oy[5].checked;

    if (!isMin && !isMax) return;

    const arrGraph = createArrGraph(agencies, keyX, number);

    svg.selectAll("*").remove();
    const [scX, scY] = createAxis(arrGraph, isMin, isMax);

    if (isMax) {
        createChart(arrGraph, scX, scY, 1, "lightgreen");
    }
    if (isMin) {
        createChart(arrGraph, scX, scY, 0, "lightblue");
    }
}

function createAxis(data, isFirst, isSecond) {
    let firstRange = d3.extent(data.map(d => d.values[0]));
    let secondRange = d3.extent(data.map(d => d.values[1]));

    let min = Math.min(firstRange[0], secondRange[0]);
    let max = Math.max(firstRange[1], secondRange[1]);

    if (!isFirst && isSecond) {
        min = secondRange[0];
        max = secondRange[1];
    } else if (isFirst && !isSecond) {
        min = firstRange[0];
        max = firstRange[1];
    }

    let scaleX = d3.scaleBand().domain(data.map(d => d.labelX)).range([0, width - 2 * marginX]).padding(0.1);
    let scaleY = d3.scaleLinear().domain([min * 0.85, max * 1.1]).range([height - 2 * marginY, 0]);

    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX).selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(data, scaleX, scaleY, index, color) {
    svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar")
        .attr("x", d => scaleX(d.labelX))
        .attr("y", d => scaleY(d.values[index]) + marginY)
        .attr("width", scaleX.bandwidth())
        .attr("height", d => height - scaleY(d.values[index]) - 2 * marginY)
        .attr("transform", `translate(${marginX}, 0)`)
        .style("fill", color);
}

function changeState(form, value) {
    for (let i = 0; i < form.oy.length; i++) {
        if (form.oy[i].value !== value) form.oy[i].checked = false;
    }
}