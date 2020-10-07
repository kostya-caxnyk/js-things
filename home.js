"use strict";


//clock
setInterval(() => {
    let date = new Date();
    document.getElementById("hours").innerHTML = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    document.getElementById("minutes").innerHTML = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    document.getElementById("seconds").innerHTML = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
}, 1000)


///////////////////////////////////////////////////////////////////
// moving ball

field.addEventListener("click", function (event) {
    let mouseX = event.clientX - field.clientLeft - field.offsetLeft;
    let mouseY = event.clientY - field.clientTop - field.offsetTop;

    const fieldHeigh = field.clientHeight;
    const fieldWidth = field.clientWidth;
    const halfBallHeight = ball.offsetHeight / 2;
    const halfBallWidth = ball.offsetWidth / 2;


    ball.style.top = mouseY + halfBallHeight > fieldHeigh ? fieldHeigh - halfBallHeight * 2 + "px" : mouseY - halfBallHeight < 0 ? 0 : mouseY - halfBallHeight + "px";
    ball.style.left = mouseX - halfBallWidth < 0 ? 0 : mouseX + halfBallWidth > fieldWidth ? fieldWidth - halfBallWidth * 2 + "px" : mouseX - halfBallWidth + "px";
})

/////////////////////////////////////////////////////////////////////////
// slider
let width = 130;
let count = 3;

let position = 0;

let list = document.querySelector("ul");
let elemArr = Array.from(document.querySelectorAll("li"));

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

prev.addEventListener("click", function () {
    position += width * count;
    position = Math.min(position, 0)
    list.style.marginLeft = position + "px";
})

next.addEventListener("click", function () {
    position -= width * count;
    position = Math.max(position, -width * (elemArr.length - count))
    list.style.marginLeft = position + "px";
})


// slider bar
thumb.ondragstart = () => false;

thumb.addEventListener("mousedown", function (e) {

    e.preventDefault();

    let shiftX = e.clientX - thumb.getBoundingClientRect().left;
    slider.style.position = "relative";
    thumb.style.position = "absolute";
    thumb.style.zIndex = 1000;

    function moveAt(pageX) {
        let newLeft = pageX - shiftX - slider.getBoundingClientRect().left;
        if (newLeft < 0) {
            newLeft = 0;
        }

        let rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumb.style.left = newLeft + "px";
    }

    function onMouseMove(e) {
        moveAt(e.pageX)
    };

    document.addEventListener("mousemove", onMouseMove)

    document.addEventListener("mouseup", function (e) {
        document.removeEventListener('mousemove', onMouseMove)
    })
})


// field with heroes

document.addEventListener("mousedown", function (e) {
    let item = e.target;
    if (!item.classList.contains("draggable")) return;

    e.preventDefault();
    item.ondragstart = () => false;

    let shiftX = e.clientX - item.getBoundingClientRect().left;
    let shiftY = e.clientY - item.getBoundingClientRect().top;
    item.style.position = "fixed";
    onMouseMove(e);


    function onMouseMove(e) {
        let [newTop, newLeft] = calculateItemPosition(e);
        item.style.top = newTop + "px";
        item.style.left = newLeft + "px";
    }

    function absolutePos(e) {
        item.style.position = "absolute";
        let [newTop, newLeft] = calculateItemPosition(e);
        item.style.top = newTop + pageYOffset + "px";
        item.style.left = pageXOffset + newLeft + "px";
    }

    function onMouseUp(e) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp)
        absolutePos(e);
    }

    function calculateItemPosition(e) {
        let newLeft = e.clientX - shiftX;
        let newTop = e.clientY - shiftY;

        if (newLeft < 0) {
            newLeft = 0;
        }

        let rightEdge = document.documentElement.clientWidth - item.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        if (newTop <= 0) {
            newTop = 0;
            window.scrollBy(0, -10);
        }

        let bottomEdge = document.documentElement.clientHeight - item.offsetHeight;
        if (newTop > bottomEdge) {
            newTop = bottomEdge;
            window.scrollBy(0, 10);
        }

        return [newTop, newLeft];
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp)
})