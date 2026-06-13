/* =========================================================
   COMBOI LABS — Terminal interactiva (nosotros.html)
   Botones que cambian la salida del bloque de código.
   ========================================================= */
(function(){
  var output = document.getElementById('teamTermOutput');
  var title = document.getElementById('teamTermTitle');
  var buttons = document.querySelectorAll('.term-cmd-btn');
  if(!output || !buttons.length) return;

  var CONTENT = {
    config: {
      title: 'comboi.config.ts',
      html: '<span class="k">const</span> comboi = {\n' +
        '  base:    <span class="s">"Benissa, Alicante"</span>,\n' +
        '  socios:  <span class="n">3</span>,\n' +
        '  desde:   <span class="s">"toda España, en remoto"</span>,\n' +
        '  promesa: <span class="s">"código que funciona, trato directo"</span>,\n' +
        '  humo:    <span class="n">0</span>,\n' +
        '}; <span class="c">// sin letra pequeña</span>'
    },
    principios: {
      title: 'principios.sh',
      html: '<span class="c">#!/bin/sh</span>\n' +
        '<span class="k">echo</span> <span class="s">"01 · sin humo"</span>\n' +
        '<span class="k">echo</span> <span class="s">"02 · hablas con quien construye"</span>\n' +
        '<span class="k">echo</span> <span class="s">"03 · que funcione de verdad"</span>\n' +
        '<span class="c">// ./principios.sh --aplicar siempre</span>'
    },
    log: {
      title: 'git log --oneline -3',
      html: '<span class="n">a1b2c3d</span> fix: trato directo, sin intermediarios\n' +
        '<span class="n">9e8d7c6</span> feat: entregas semanales en URL real\n' +
        '<span class="n">5f4e3d2</span> chore: cero plantillas, cero humo'
    }
  };

  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      var data = CONTENT[btn.getAttribute('data-cmd')];
      if(!data) return;

      buttons.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');

      output.classList.add('fade');
      setTimeout(function(){
        output.innerHTML = data.html;
        if(title) title.textContent = data.title;
        output.classList.remove('fade');
      }, 150);
    });
  });
})();
