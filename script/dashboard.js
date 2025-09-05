// Modo Oscuro
const toggleDarkModeButton = document.getElementById("toggleDarkMode");
const body = document.body;
const sunIcon = '<i class="ri-sun-line"></i>';
const moonIcon = '<i class="ri-moon-line"></i>';

// Comprobar el estado guardado del modo oscuro en el localStorage
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  toggleDarkModeButton.innerHTML = moonIcon;
}

toggleDarkModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Guardar el estado del modo oscuro en el localStorage
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    toggleDarkModeButton.innerHTML = moonIcon;
  } else {
    localStorage.setItem("darkMode", "disabled");
    toggleDarkModeButton.innerHTML = sunIcon;
  }
});

// Cerrar Sesión con confirmación
document.getElementById("logoutButton").addEventListener("click", () => {
  const confirmation = confirm("¿Estás seguro de que quieres cerrar sesión?");
  if (confirmation) {
    window.location.href = "index.html";
  }
});

// Navegación entre secciones
const links = document.querySelectorAll(".sidebar nav ul li a");
const sections = document.querySelectorAll(".content-section");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);

    // Oculta todas las secciones
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Muestra la sección seleccionada
    document.getElementById(targetId).classList.add("active");

    // Marca el enlace como activo
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Mostrar/Ocultar Sidebar
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

window.addEventListener("load", () => {
 // Recuperar la fecha de aniversario desde el localStorage
const anniversaryDate = localStorage.getItem("anniversaryDate");

if (anniversaryDate) {
  const anniversary = new Date(anniversaryDate);
  const today = new Date();

  // Calcular la diferencia en años, meses y días
  let years = today.getFullYear() - anniversary.getFullYear();
  let months = today.getMonth() - anniversary.getMonth();
  let days = today.getDate() - anniversary.getDate();

  // Primero corregimos los días negativos
  if (days < 0) {
    months--; // pedimos prestado un mes
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Luego corregimos los meses negativos
  if (months < 0) {
    years--; // pedimos prestado un año
    months += 12;
  }

  // Texto singular/plural
  const yearText = years === 1 ? "año" : "años";
  const monthText = months === 1 ? "mes" : "meses";
  const dayText = days === 1 ? "día" : "días";

  // Revisar si HOY es aniversario exacto
  const isAnniversary =
    today.getDate() === anniversary.getDate() &&
    today.getMonth() === anniversary.getMonth();

  if (isAnniversary) {
    document.getElementById("daysCount").innerText =
      `🎉 Hoy cumplimos ${years} ${yearText} juntos ❤️. Gracias por tantos momentos hermosos, eres mi todo. ¡Te amo Muchisimo Cuchisita Pechocha! 😍`;
  } else {
    document.getElementById("daysCount").innerText =
      `Ya han pasado ${years} ${yearText}, ${months} ${monthText} y ${days} ${dayText}, desde que comenzó nuestra historia de amor. Me alegra mucho estar aún a tu lado y disfrutar cada momento, eres la persona que amaré de por vida. ¡Te Amoo❤️!`;
  }
}


});

particlesJS("particles-js", {
  particles: {
    number: {
      value: 10, // Número de partículas (corazones)
      density: {
        enable: true,
        value_area: 800,
      },
    },
    shape: {
      type: "image",
      image: {
        src: "https://img.icons8.com/?size=100&id=12306&format=png&color=000000", // Aquí puedes usar cualquier imagen de corazón
        width: 2,
        height: 2,
      },
    },
    move: {
      enable: true,
      speed: 1, // Velocidad de caída
      direction: "top", // Dirección hacia abajo
      random: true,
      straight: false,
      out_mode: "out",
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
    },
  },
  retina_detect: true,
});

const mensajes = [
  "Cuchisita Hermosha 💕, 7 años después y aún me derrito con tu risa 😂✨.",
  "Mi Feita Linda 😍, gracias por hacer que cada día a tu lado sea el mejor de mi vida 🌹.",
  "Bebé Preshiosha 🌸, contigo aprendí que el amor verdadero también se ríe a carcajadas 😂❤️.",
  "Cuchisita Hermosha 🥰, después de 7 años, todavía me pones nervioso como el primer día ✨.",
  "Mi Carachozita 💫, nadie me entiende como tú, y eso es mi tesoro más grande 💖.",
  "Mi Mugrosita 🌙, contigo hasta los días grises se pintan de colores 🌈.",
  "Cuchisita Hermosha 💓, lo nuestro empezó en el cole 🏫 y hoy es mi historia favorita 📖.",
  "Mi Feita Linda 🌟, 7 años juntos y aún siento mariposas cada vez que te veo 🦋.",
  "Bebé Preshiosha 💍, eres mi presente más bonito y mi futuro más soñado ✨.",
  "Cuchisita Hermosha 🥂, gracias por ser mi mejor amiga, mi amor y mi cómplice en todo ❤️.",
  "Mi horrorosita 😂💕, me haces reír hasta en los momentos más serios… y amo eso de ti ✨.",
  "Bebé Preshiosha 🌹, si volviera al cole, te volvería a escoger una y mil veces 💕.",
  "Cuchisita Hermosha 😘, tus abrazos siguen siendo mi lugar favorito del mundo 🌎.",
  "Mi Feita Linda 🌸, eres la única que logra que hasta mis enojos duren poquito 😂❤️.",
  "Bebé Hermosha 💖, gracias por 7 años de amor, locuras y recuerdos inolvidables ✨.",
  "Cuchisita Hermosha 💫, a tu lado descubrí que el tiempo pasa volando cuando uno es feliz 🕊️.",
  "Mi Horrosa Linda 🌙, contigo todo tiene sentido, incluso los días más simples 💕.",
  "Mi Bebita Preshiosha 😍, no sé cómo lo haces, pero cada día me enamoro más 🌹.",
  "Cuchisita Hermosha 🥰, después de 7 años aún me haces sentir que estoy soñando 💭❤️.",
  "Mi Feita Presiosa ✨, gracias por ser mi locura favorita y mi paz al mismo tiempo 🌸.",
];


const mensajeTexto = document.getElementById("mensaje-texto");
const nuevoMensajeBtn = document.getElementById("nuevo-mensaje-btn");

function mostrarMensajeAleatorio() {
    const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
    mensajeTexto.textContent = mensajeAleatorio;
}

// Mostrar un mensaje aleatorio al cargar la página
mostrarMensajeAleatorio();

// Cambiar mensaje al hacer clic en el botón
nuevoMensajeBtn.addEventListener("click", mostrarMensajeAleatorio);

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeControl = document.getElementById('volumeControl');

    playBtn.addEventListener('click', function() {
        audio.play();
    });

    pauseBtn.addEventListener('click', function() {
        audio.pause();
    });

    volumeControl.addEventListener('input', function() {
        audio.volume = volumeControl.value;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playlistItems = document.querySelectorAll('.playlist ul li');

    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            const src = this.getAttribute('data-src');
            audioPlayer.src = src;
            audioPlayer.play();
        });
    });
});

// JavaScript para mostrar la sorpresa
document.getElementById('sorpresa-btn').addEventListener('click', function() {
    const contenido = document.getElementById('sorpresa-content');
    contenido.classList.toggle('hidden'); // Muestra u oculta la sorpresa
});

