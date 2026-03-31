window.onload = () => {
    window.scrollTo(0, 0);
};

let intervaloScroll = null;
let usuarioIntervino = false;

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("bloqueado");

    const moño = document.querySelector(".moño");

    /* VIBRACIÓN */
    if (moño) {
        setInterval(() => {
            moño.classList.add("vibrar");

            setTimeout(() => {
                moño.classList.remove("vibrar");
            }, 400);

        }, 2000);
    }

    /* FIX RENDER */
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);

    requestAnimationFrame(() => {
        document.body.style.opacity = "1";
    });

    /* CONTADOR */
    iniciarContador();

    /* REVEAL */
    const reveals = document.querySelectorAll(".reveal, .fade-lujo");

    function mostrarScroll() {
        const trigger = window.innerHeight * 0.85;

        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();

            if (rect.top < trigger && rect.bottom > 0) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", mostrarScroll);
    mostrarScroll();

    /* DETENER AUTO SCROLL */
    function detenerScrollAuto() {
        usuarioIntervino = true;

        if (intervaloScroll) {
            clearInterval(intervaloScroll);
        }
    }

    window.addEventListener("touchstart", detenerScrollAuto);
    window.addEventListener("wheel", detenerScrollAuto);

});


/* ABRIR INVITACIÓN */
window.abrir = function () {

    document.body.classList.remove("bloqueado");

    const portada = document.querySelector(".portada");
    const hero = document.querySelector(".hero");

    portada.classList.add("abierto");

    crearExplosion();
    document.getElementById("musica").play().catch(() => {});

    setTimeout(() => {
        window.scrollTo({
            top: hero.offsetTop,
            behavior: 'smooth'
        });
    }, 500);

    setTimeout(() => {
        portada.style.display = "none";
    }, 1200);

    iniciarScrollAuto();
};


/* PARTÍCULAS */
function crearExplosion() {
    const contenedor = document.querySelector(".explosion");

    for (let i = 0; i < 30; i++) {
        let p = document.createElement("div");
        p.classList.add("particula");

        let x = (Math.random() - 0.5) * 500 + "px";
        let y = (Math.random() - 0.5) * 500 + "px";

        p.style.setProperty("--x", x);
        p.style.setProperty("--y", y);

        p.style.left = "50%";
        p.style.top = "50%";

        contenedor.appendChild(p);
    }
}


/* CONTADOR */
function iniciarContador() {

    const fechaEvento = new Date("2026-04-25T00:00:00").getTime();

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


/* SCROLL AUTOMÁTICO */
function iniciarScrollAuto() {

    const secciones = document.querySelectorAll("section");
    let i = 0;

    intervaloScroll = setInterval(() => {

        if (usuarioIntervino) {
            clearInterval(intervaloScroll);
            return;
        }

        if (i < secciones.length) {

            window.scrollTo({
                top: secciones[i].offsetTop,
                behavior: "smooth"
            });

            i++;

        } else {
            clearInterval(intervaloScroll);
        }

    }, 3500);
}


/* SCROLL GLOBAL */
window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    /* PARALLAX */
    document.querySelectorAll(".hero, .contador, .cierre").forEach(sec => {
        sec.style.backgroundPositionY = (scroll * 0.3) + "px";
    });

    /* OVERLAY */
    document.querySelectorAll(".overlay").forEach(el => {
        let opacity = 0.4 + scroll * 0.0005;
        if (opacity > 0.7) opacity = 0.7;

        el.style.background = `rgba(0,0,0,${opacity})`;
    });

    /* BLUR */
    document.querySelectorAll("section").forEach(sec => {

        if (sec.classList.contains("evento") || sec.classList.contains("cierre")) {
            sec.style.filter = "none";
            return;
        }

        const rect = sec.getBoundingClientRect();

        let distancia = Math.abs(rect.top);

        let blur = distancia * 0.01;
        if (blur > 4) blur = 4;

        if (rect.top < 0) {
            sec.style.filter = `blur(${blur}px)`;
        } else {
            sec.style.filter = "blur(0px)";
        }

    });

});