
var pictures = ["https://di.com.pl/pic/photo/Screen_Shot_2014_08_21_at_101244_AM_640x834_1408689031.png",
    "https://s9.tvp.pl/images2/9/b/7/uid_9b7826f856b7d8a214e96177c74b2e2b1604928163838_width_1280_play_0_pos_0_gs_0_height_720_warunki-pracy-na-planie-dostosowano-do-wymagan-bezpieczenstwa-zw-z-epidemia-fot-shutterstockelisa-manzati-zdjecie-ilustracyjne.jpg",
    "https://ocdn.eu/pulscms-transforms/1/NV9k9kpTURBXy9hZjA2NDY0YWVkN2JiMjJiMTUyMmZjNDg3MGI0ZDU2My5qcGeTkwXNBLDNAqSVB9kyL3B1bHNjbXMvTURBXy8yMzM3YzlmZDZiOTMxZWU2Y2IwZDIzZGNiYTI1OGE5ZC5wbmcAwgCTCaZkNjFjMTgGgaEwAQ/zwycieskie-zdjecie-wildlife-photographer-of-the-year-2019-autor-yongqing-bao.jpg"];


for (let i = 0; i < pictures.length; i++) {
    var contentLoaction = document.querySelector("#slideshow-content")
    var slide = document.createElement("div");
    slide.className = "mySlides fade";

    var slideNumber = document.createElement("div");
    slideNumber.className = "numbertext";
    slideNumber.innerHTML = i + 1 + " / " + pictures.length;
    slide.appendChild(slideNumber);

    var slideImage = document.createElement("img");
    slideImage.src = pictures[i];
    slide.appendChild(slideImage)

    contentLoaction.appendChild(slide)

    var dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => { currentSlide(i + 1) });
    document.querySelector("#dots").appendChild(dot);
}


let slideIndex = 1;
let isPaused = false;
showSlides(slideIndex);


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var autoSlides = setInterval(() => {
    if (!isPaused)
        plusSlides(1)
}, 5000)

document.querySelector(".prev").addEventListener("click", () => plusSlides(-1))
document.querySelector(".next").addEventListener("click", () => plusSlides(1))
document.querySelector("#slideshow").addEventListener("mouseover", () => {
    isPaused = true
    document.querySelector("#pause").style.display = "block"
})
document.querySelector("#slideshow").addEventListener("mouseout", () => {
    isPaused = false
    document.querySelector("#pause").style.display = "none"
})
document.querySelector("#animation-checkbox").addEventListener("change", () => {
    if (!document.querySelector("#animation-checkbox").checked) {
        document.querySelectorAll(".mySlides").forEach(slide=>slide.classList.remove("fade"))
    } 
    else {
        document.querySelectorAll(".mySlides").forEach(slide=>slide.classList.add("fade"))
    }
})
