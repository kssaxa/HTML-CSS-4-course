document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("animation_btn").addEventListener("click", function () {
        Picture_Draw(document.getElementById("setting"));
    });
    document.getElementById("clear_btn").addEventListener("click", function () {
        clear_ALL();
    });
});

let svg = d3.select("svg").attr("width", 1000).attr("height", 800); // Увеличим ширину SVG до 1000
const r = 200;

function Primitive_Draw(X_pos, Y_pos) {
    let primitive = svg.append("g").attr("transform", `translate(${X_pos},${Y_pos})`);

    // Квадрат
    primitive.append("rect")
        .attr("x", -50)
        .attr("y", -50)
        .attr("width", 100)
        .attr("height", 100)
        .style("stroke", "#ffd80c")
        .style("stroke-width", 2)
        .style("fill", "none");

    // Круг
    primitive.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 40)
        .style("stroke", "red")
        .style("stroke-width", 2)
        .style("fill", "none");

    primitive.append("line")
        .attr("x1", -20)
        .attr("y1", 0)
        .attr("x2", 20)
        .attr("y2", 0)
        .style("stroke", "blue")
        .style("stroke-width", 2);
    primitive.append("line")
        .attr("x1", 0)
        .attr("y1", -20)
        .attr("x2", 0)
        .attr("y2", 20)
        .style("stroke", "green")
        .style("stroke-width", 2);

    primitive.append("line")
        .attr("x1", -14)
        .attr("y1", -14)
        .attr("x2", 14)
        .attr("y2", 14)
        .style("stroke", "pink")
        .style("stroke-width", 2);
    primitive.append("line")
        .attr("x1", -14)
        .attr("y1", 14)
        .attr("x2", 14)
        .attr("y2", -14)
        .style("stroke", "orange")
        .style("stroke-width", 2);


    return primitive;
}

let Picture_Draw = (dataForm) => {
    let pict = Primitive_Draw(100, 300);
    let path = drawZigzagPath(100, 400, 200, 100, 50);
    let speed_animation = dataForm.animation_time.value == "" ? 6000 : parseFloat(dataForm.animation_time.value);
    let degree = dataForm.scale_checkbox.checked ? 1 : 0

    pict.transition().duration(speed_animation).ease(d3.easeLinear)
        .attr("transform", `translate(${100},${300}) rotate(90)`)
        .attrTween("transform", translateAlong(path.node(), degree));
};

let clear_ALL = () => {
    svg.selectAll("*").remove();
};

function create_ZigzagPath(x_pos, y_pos, length, amplitude, step) {
    let data = [];
    let direction = 1; // 1 for up, -1 for down
    let angle = Math.tan(30 * Math.PI / 180); // Тангенс угла 30 градусов

    for (let t = 0; t <= length; t += step) {
        data.push({
            y: x_pos + t,
            x: y_pos + amplitude * direction * angle,
        });
        direction *= -1; // Flip direction for next point
    }
    return data;
}

let drawZigzagPath = (x_pos, y_pos, length, amplitude, step) => {
    const dataPoints = create_ZigzagPath(x_pos, y_pos, length, amplitude, step);
    const line = d3.line().x((d) => d.x).y((d) => d.y);
    const path = svg.append("path").attr("d", line(dataPoints)).attr("stroke", "black").attr("fill", "none");
    return path;
};

function translateAlong(path, degree) {
    const length = path.getTotalLength();
    return function () {
        return function (t) {
            let { x, y } = path.getPointAtLength(t * length);
            let angle_radians = degree *180 / Math.PI;
            return `translate(${x},${y}) rotate(${angle_radians*t})`;
        };
    };
}
