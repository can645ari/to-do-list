const inputBox = document.getElementById("input-box");
const list = document.getElementById("list");
const button = document.getElementById("button");

function addTask() {
    let li = document.createElement("li");
    li.setAttribute("id", "task");
    li.innerHTML = inputBox.value;
    list.appendChild(li);

    let span_delete = document.createElement("span");
    span_delete.innerHTML = "\u00d7";
    span_delete.classList.add("delete");
    li.appendChild(span_delete);

    button.classList.remove("active");
    button.disabled = true;
    inputBox.value = "";

    saveData();
}

inputBox.addEventListener("keypress", (event) => {
    if (inputBox.value !== "" && event.keyCode == 13) {
        addTask();
    }
});

inputBox.addEventListener("input", () => {
    if (inputBox.value !== "") {
        button.classList.add("active");
        button.disabled = false;
    }
    else {
        button.classList.remove("active");
        button.disabled = true;
    }
});

list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7") {
        e.target.parentElement.remove();
        saveData();
    }
    else {
        saveData();
    }
}, false);

//liste öğesinin innerHTML'ini yerel depolamaya kaydeder.
function saveData() {
    localStorage.setItem("data", list.innerHTML);
}

//yerel depolamada saklanan liste verisini sayfa yüklendiğinde geri yükler.
function showTask() {
    list.innerHTML = localStorage.getItem("data");
}

showTask();