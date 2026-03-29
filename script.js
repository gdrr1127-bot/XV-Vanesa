const moño = document.querySelector(".moño");

/* vibración */
setInterval(() => {
    moño.classList.add("vibrar");

    setTimeout(()=>{
        moño.classList.remove("vibrar");
    },400);

},2000);

/* abrir */
function abrir(){

    document.querySelector(".portada").classList.add("abierto");

    crearExplosion();

    document.getElementById("musica").play();

    setTimeout(()=>{
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    },800);
}

/* partículas */
function crearExplosion(){

    const contenedor = document.querySelector(".explosion");

    for(let i=0; i<30; i++){

        let p = document.createElement("div");
        p.classList.add("particula");

        let x = (Math.random()-0.5)*500 + "px";
        let y = (Math.random()-0.5)*500 + "px";

        p.style.setProperty("--x", x);
        p.style.setProperty("--y", y);

        p.style.left = "50%";
        p.style.top = "50%";

        contenedor.appendChild(p);

        setTimeout(()=>{
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
},800);
    }
}
function iniciarContador() {

    const fechaEvento = new Date("April 25, 2026 00:00:00").getTime();

    setInterval(() => {

        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;

    }, 1000);
}

iniciarContador();
const slides = document.querySelectorAll(".slide");

function updateSlides() {
    let center = window.innerWidth / 2;

    slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;

        const distance = Math.abs(center - slideCenter);

        if (distance < 150) {
            slide.style.transform = "scale(1)";
            slide.style.opacity = "1";
        } else {
            slide.style.transform = "scale(0.85)";
            slide.style.opacity = "0.5";
        }
    });
}

document.querySelector(".slider").addEventListener("scroll", updateSlides);

updateSlides();
const reveals = document.querySelectorAll(".reveal");

function mostrarScroll() {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", mostrarScroll);
