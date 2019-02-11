const parent = document.getElementById("result");
const btn = document.querySelector("#add");
const counter = document.querySelector("#count");
const selecBox = document.getElementById("type-selector");
let container = [];

function updateData(param) {
    return param.map(elm => {
        return {
            url: newUrl(elm.url),
            id: elm.id,
            name: newName(elm.name),
            description: newDescription(elm.description),
            date: newDate(elm.date),
            dateMls: elm.date
        }
    })
}

function newUrl(param) {
    return (param.startsWith('http://')) ?
        `${param}` : `${'http://'}${param}`;
}

function newDescription(param) {
    return (param.length > 15) ?
        `${param.substring(0,15)}...` :
        param;
}
let newDate = param => moment(param).format('YYYY/MM/DD, HH:mm ');
let newName = param => {
    return `${param[0].toUpperCase()}${param.substring(1).toLowerCase()}`
};

function buildGallery(arr) {
    let secondItemTemplate = "";
    arr.forEach(function (item) {
        secondItemTemplate += `<div>
        <div class="col-sm-3 col-xs-6 text-center">
        <div class="thumbnail">
<img src="${item.url}" alt="${item.name}">
<div class="caption">
<h3>${item.name}</h3>
<p>${item.description}</p>
<p>${item.date}</p>
</div><button class="btn btn-del" btn-id=${item.id}>Удалить</button>
</div>
</div>`;
    })
    counter.innerHTML = arr.length;
    parent.innerHTML = secondItemTemplate;

}

function sortedGallary(arr) {
    let selectItem = localStorage.getItem("build");
    let key;

    function metodSort(a, b) {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
    }

    switch (selectItem) {
        case "0":
            key = "name";
            arr.sort(metodSort);
            break;
        case "1":
            key = "name";
            arr.sort(metodSort).reverse();
            break;
        case "2":
            key = "dateMls";
            arr.sort(metodSort).reverse();
            break;
        case "3":
            key = "dateMls";
            arr.sort(metodSort);
    }
    buildGallery(arr);

}

function stoppedAddElemem() {
    if (container.length >= data.length) {
        alert("Добавление Невозможно ! Галлерея заполнена полностью");
        btn.setAttribute("disabled", "disabled");

    } else {
        btn.removeAttribute("disabled");

    }

}

function modalWindow() {
    $(".bs-example-modal-sm").modal("show"); // Не реализовано подключение модального окна. Причину не выявил.
    // Чет не работает. Напишите плиз в комментах что не так.
}

function formGallary() {
    if (container.length === data.length) {
        // modalWindow();
        stoppedAddElemem();
    } else {
        container.push(updData.pop());
        sortedGallary(container);
    }
}

function delElement(event) {
    let elmId = event.target.getAttribute("btn-id");
    let indexCut;
    if (!elmId) return;
    container.forEach((item, index) => {
        if (item.id == elmId) {
            indexCut = index;
        };
    })
    updData = updData.concat(container.splice(indexCut, 1));
    buildGallery(container);
    stoppedAddElemem();
    /*getElmDel = container.filter(item=> item.id == elmId);  // Как правильно реализовать через indexOf ??
                                                                        // если массив из безимянных объектов.
         indexCut = container.indexOf(getElmDel.join());*/



}

function setValueLocalStorage() {
    let valueLocalStorage = localStorage.getItem("build");
    (valueLocalStorage) ? selecBox.value = valueLocalStorage: selecBox;
}

function initParams() {
    localStorage.setItem("build", selecBox.value);
    sortedGallary(container);
    if (container.length == 0) {
        alert("Добавьте изображение!");
    }
}

setValueLocalStorage();
let updData = updateData(data.slice());
btn.addEventListener("click", formGallary);
selecBox.addEventListener("change", initParams);
parent.addEventListener("click", delElement);





// let newData = updateData(data.slice());
// buildGallery(cutElem())

/*function cutElem(arr) {
    let arrCut = [];
    arrCut.push(arr.pop());
    return arrCut;
}*/

//let addPictures = function (event) {
//pictures = cutElem(newData);
//buildGallery(newData);




// let newData = updateData(data.slice());
// let test = sortGallery(newData);
// console.log(test)

//let element = buildGallery(newData)
// addButton(element);

//console.log(element);
//parentElement.innerHTML += template(newData);


/*unction addButton(param) {
    let setButton = [];
    param.forEach(elm => {
        setButton.push({
            elm: elm + ">"
        })
        return setButton;
    })
    console.log(setButton);*/
/*function sortName(array) {
    array.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.tname > b.name) return 1;
        return 0;
    })
}*/