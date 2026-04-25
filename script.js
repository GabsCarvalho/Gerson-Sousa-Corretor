const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
});
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

const form = document.getElementById('leadForm');
form.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        nome: form[0].value,
        email: form[1].value,
        telefone: form[2].value,
        interesse: form[3].value,
        data: new Date().toLocaleString()
    };

    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    leads.push(data);
    localStorage.setItem('leads', JSON.stringify(leads));

    alert('Lead salvo com sucesso!');
    form.reset();
});

document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const targetPosition = target.offsetTop - 80; // ajuste por causa do menu fixo
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 🔥 AQUI você controla a velocidade (maior = mais lento)

    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
  });
});