let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);
    clearTable(idTable); // Очищаем таблицу перед заполнением

    if (data.length === 0) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.colSpan = Object.keys(data[0]).length;
        td.innerHTML = "No results found";
        tr.append(td);
        table.append(tr);
        return;
    }

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
}

document.addEventListener("DOMContentLoaded", function () {
    createTable(agencies, 'list');

    document.getElementById("search").addEventListener("click", function () {
        let dataForm = document.getElementById("filter");
        filterTable(agencies, "list", dataForm);
    });

    document.getElementById("clear").addEventListener("click", function () {
        clearFilter();
    });

    document.getElementById("buttonSort").addEventListener("click", function () {
        sortTable();
    });

    document.getElementById("buttonClear").addEventListener("click", function() {
        resetSort();
    });
});

let correspond = {
    'Агенство': 'Name',
    'Субъект федерации': 'Region',
    'Количество сделок': 'Deals',
    'Количество объявлений': 'Ads',
    'Оценка клиентов': ['RatingFrom', 'RatingTo']
};

let dataFilter = (dataForm) => {
    let dictFilter = {};
    for (let j = 0; j < dataForm.elements.length; j++) {
        let item = dataForm.elements[j];
        let valInput = item.value;
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type === "number") {
            if (valInput === "") {
                if (item.id.includes("RatingFrom")) {
                    valInput = Number.NEGATIVE_INFINITY;
                } else if (item.id.includes("RatingTo")) {
                    valInput = Number.POSITIVE_INFINITY;
                }
            } else {
                valInput = Number(valInput);
            }
        }
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
};

let filterTable = (data, idTable, dataForm) => {
    let datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;
        for (let key in item) {
            let val = item[key];
            if (typeof val === 'string') {
                val = val.toLowerCase();
                if (datafilter[correspond[key]]) {
                    result &&= val.includes(datafilter[correspond[key]]);
                }
            } else if (typeof val === "number") {
                if (typeof correspond[key] === "object") {
                    result &&= datafilter[correspond[key][0]] <= val && val <= datafilter[correspond[key][1]];
                } else {
                    result &&= datafilter[correspond[key]] === '' ? true : val === Number(datafilter[correspond[key]]);
                }
            }
        }
        return result;
    });

    clearTable(idTable);
    createTable(tableFilter, idTable);
};

function clearTable(idTable) {
    let table = document.getElementById(idTable);
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
};

let clearFilter = () => {
    document.getElementById("filter").reset();
    clearTable("list");
    createTable(agencies, "list");
};
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

    createTable(sortedData, 'list');
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
    createTable(agencies, 'list');
}
