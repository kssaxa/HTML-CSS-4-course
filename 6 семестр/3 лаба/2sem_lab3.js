let displayTable = (data, idTable) => {
    let table = document.getElementById(idTable).getElementsByTagName('tbody')[0];
    table.innerHTML = ""; // Clear existing table data


    let tr = document.createElement('tr');
    for (key in data[0]) {
        // формируем заголовочную строку из ключей нулевого элемента массива
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);

    // Populate table with data
    data.forEach((item) => {
        tr = document.createElement("tr");
        for (value in item) {
            let td = document.createElement("td");
            td.innerHTML = item[value];
            tr.append(td);
        }
        table.append(tr);
    });
    // создать новую строку таблицы tr
    // перебрать ключи очередного элемента массива
    // создать элемент td
    // занести в него соответствующее значение из массива
    // добавить элемент td к строке
    // строку добавить в таблицу
}


function filterTable() {
    let name = document.getElementById('Name').value.toLowerCase();
    let region = document.getElementById('Region').value.toLowerCase();
    let deals = document.getElementById('Deals').value;
    let ads = document.getElementById('Ads').value;
    let ratingFrom = parseFloat(document.getElementById('RatingFrom').value);
    let ratingTo = parseFloat(document.getElementById('RatingTo').value);

    let filteredData = agencies.filter(agency => {
        return (
            (name === '' || agency['Агенство'].toLowerCase().includes(name)) &&
            (region === '' || agency['Субъект федерации'].toLowerCase().includes(region)) &&
            (deals === '' || agency['Количество сделок'] == deals) &&
            (ads === '' || agency['Количество объявлений'] == ads) &&
            (isNaN(ratingFrom) || agency['Оценка клиентов'] >= ratingFrom) &&
            (isNaN(ratingTo) || agency['Оценка клиентов'] <= ratingTo)
        );
    });

    displayTable(filteredData, 'list');
}


function clearFilter() {
    document.getElementById('filter').reset();
    displayTable(agencies, 'list');
}


function sortTable() {
    let level1 = document.getElementById('sortLevel1').value;
    let order1 = document.getElementById('orderLevel1').value;
    let level2 = document.getElementById('sortLevel2').value;
    let order2 = document.getElementById('orderLevel2').value;
    let level3 = document.getElementById('sortLevel3').value;
    let order3 = document.getElementById('orderLevel3').value;

    let sortedData = [...agencies].sort((a, b) => {
        return multiLevelSort(a, b, [[level1, order1], [level2, order2], [level3, order3]]);
    });

    displayTable(sortedData, 'list');
}


function multiLevelSort(a, b, levels) {
    let keys = ["Агенство", "Субъект федерации", "Количество сделок", "Количество объявлений", "Оценка клиентов"];
    for (let [level, order] of levels) {
        let key = keys[level];
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
}


function resetSort() {
    document.getElementById('sortForm').reset();
    displayTable(agencies, 'list');
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    displayTable(agencies, 'list');

    document.getElementById("search").addEventListener("click", function () {
        filterTable();
    });

    document.getElementById("clear").addEventListener("click", function() {
        clearFilter();
    });

    document.getElementById("buttonSort").addEventListener("click", function () {
        sortTable();
    });

    document.getElementById("buttonClear").addEventListener("click", function() {
        resetSort();
    });
});
