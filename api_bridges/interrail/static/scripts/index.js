"use strict";

const HOST = "http://127.0.0.1:3000";
let cities = null;
let fuse = null;

fetch(HOST + "/static/assets/cities.json")
    .then(res => res.json())
    .then(doc => {
        cities = doc;
        fuse = new Fuse(cities, {
            keys: ["name"],
            shouldSort: true,
        });
    });

$("#fromSearchBtn").on("click", function (ev) {
    const fromInput = document.querySelector("#fromInput");
    const fromUl = document.querySelector("#fromUl");
    fromUl.innerHTML = "";
    fuse.search(fromInput.value).slice(0, 5).forEach(x => {
        fromUl.innerHTML += `<li class="from-station list-group-item">${x.name}, ${x.country}</li>`;
    });
    $("li.from-station").on("click", fromStationOnClickHandler);
});

function fromStationOnClickHandler(ev) {
    $("li.from-station").each(function(_) {$(this).removeClass("active")});
    ev.target.classList.add("active");
}

$("#toSearchBtn").on("click", function (ev) {
    const toInput = document.querySelector("#toInput");
    const toUl = document.querySelector("#toUl");
    toUl.innerHTML = "";
    fuse.search(toInput.value).slice(0, 5).forEach(x => {
        toUl.innerHTML += `<li class="to-station list-group-item">${x.name}, ${x.country}</li>`;
    });
    $("li.to-station").on("click", toStationOnClickHandler);
});

function toStationOnClickHandler(ev) {
    $("li.to-station").each(function(_) {$(this).removeClass("active")});
    ev.target.classList.add("active");
}
