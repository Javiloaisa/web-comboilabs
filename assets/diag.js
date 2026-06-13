/* =========================================================
   COMBOI LABS — Diagnóstico rápido (hero de servicios.html)
   Botones que recomiendan un servicio con efecto typewriter.
   ========================================================= */
(function(){
  var card = document.querySelector('.diag-card');
  var output = document.getElementById('diagOutput');
  if(!card || !output) return;

  var RESULTS = {
    desarrollo_web: {
      text: '> recomendado: desarrollo_web\nUn panel a medida conectado a lo que ya usas. Adiós a las hojas sueltas.',
      href: 'servicio-desarrollo-web.html',
      label: 'ver desarrollo web →'
    },
    apps_moviles: {
      text: '> recomendado: apps_moviles\nUna app para iOS y Android, una sola base de código y notificaciones.',
      href: 'servicio-apps-moviles.html',
      label: 'ver apps móviles →'
    },
    agentes_ia: {
      text: '> recomendado: agentes_ia\nUn agente que responde, agenda y automatiza por ti, 24/7.',
      href: 'servicio-agentes-ia.html',
      label: 'ver agentes de IA →'
    }
  };

  var timer;

  function typewrite(el, text){
    clearTimeout(timer);
    var i = 0;
    el.textContent = '';
    function step(){
      i++;
      el.textContent = text.slice(0, i);
      if(i < text.length) timer = setTimeout(step, 14);
    }
    step();
  }

  card.querySelectorAll('.diag-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      card.querySelectorAll('.diag-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');

      var result = RESULTS[btn.getAttribute('data-target')];
      if(!result) return;

      output.innerHTML = '';
      var pre = document.createElement('span');
      pre.style.whiteSpace = 'pre-line';
      output.appendChild(pre);

      typewrite(pre, result.text);

      var link = document.createElement('a');
      link.href = result.href;
      link.textContent = result.label;
      link.style.display = 'inline-block';
      link.style.marginTop = '10px';
      output.appendChild(document.createElement('br'));
      output.appendChild(link);
    });
  });
})();
