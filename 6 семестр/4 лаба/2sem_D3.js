function addMenu() {
    // Получаем всех разработчиков языков программирования
    const developers = d3.selectAll(".content a").nodes().map(d => d.textContent);

    // Создаем новый div с классом menu
    const menuDiv = d3.create("div").attr("class", "menu");

    // Добавляем ссылки в новый div
    menuDiv.selectAll("a")
        .data(developers)
        .enter()
        .append("a")
        .attr("href", "#")
        .text(d => d);

    // Вставляем новый div после секции с историей создания по годам
    d3.select("h4 + ul").node().insertAdjacentElement('afterend', menuDiv.node());
}