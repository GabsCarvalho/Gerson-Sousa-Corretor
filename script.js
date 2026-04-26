const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

const form = document.getElementById('leadForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        interesse: form.interesse.value
    };

    try {
        await fetch("https://script.google.com/macros/s/AKfycbyZYVm9wYZZ1NoyxvsqCz2xd3MJqa4eX8gCYPEug-7SjOSpPP3oewQ_PWyvtoVGrYJG/exec", {
            method: "POST",
            body: new URLSearchParams(data)
        });

        alert("Lead enviado com sucesso!");
        form.reset();

    } catch (error) {
        console.error(error);
        alert("Erro ao enviar lead.");
    }
});

document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500;

        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    });
});

document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const text = button.previousElementSibling;

        text.classList.toggle('collapsed');

        if (text.classList.contains('collapsed')) {
            button.innerText = 'Ler mais';
        } else {
            button.innerText = 'Ler menos';
        }
    });
});

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('nav-menu');
const overlay = document.getElementById('menu-overlay');

function toggleMenu() {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

toggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

/* Fecha ao clicar em link */
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
    });
});
