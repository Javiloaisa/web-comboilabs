/* =========================================================
   COMBOI LABS — Demo de agente de WhatsApp con IA real
   Hero de servicio-agentes-ia.html: conversación simulada
   con respuestas reales de la API de Claude.
   ========================================================= */
(function(){
  var sim = document.querySelector('.wa-sim');
  var messages = document.getElementById('waMessages');
  var input = document.getElementById('waInput');
  var sendBtn = document.getElementById('waSendBtn');
  var statusEl = document.getElementById('waStatus');
  var hint = document.getElementById('waHint');
  if(!sim || !messages || !input || !sendBtn) return;

  // TODO: mover a proxy FastAPI antes de producción en Hetzner
  // endpoint destino: POST /api/chat en el servidor
  var ANTHROPIC_API_KEY = "sk-ant-XXXXXXXXXX"; // sustituir por la key real

  var SYSTEM_PROMPT = "Eres el asistente de WhatsApp de Comboi Labs, una empresa de desarrollo de software de Benissa (Alicante) especializada en desarrollo web a medida, apps móviles y agentes de IA como tú.\n\n"
    + "Estás integrado en su web como demo para que los visitantes experimenten en primera persona cómo funciona un agente de IA real.\n\n"
    + "TONO Y ESTILO:\n"
    + "- Responde siempre en español\n"
    + "- Tono cercano, directo y profesional — como un buen comercial técnico\n"
    + "- Mensajes cortos, de 2-4 frases máximo, como en WhatsApp real\n"
    + "- Usa algún emoji ocasional pero sin abusar\n"
    + "- Nunca uses listas largas ni markdown — esto es WhatsApp, no un email\n"
    + "- Al final de cada respuesta, si tiene sentido, haz una pregunta corta para continuar la conversación\n\n"
    + "SOBRE QUÉ PUEDES RESPONDER:\n"
    + "- Qué hace Comboi Labs (web, apps, agentes IA)\n"
    + "- Cómo funciona un agente de IA y qué puede automatizar\n"
    + "- Casos de uso reales: citas, atención al cliente, procesos internos\n"
    + "- Precios: siempre \"depende del proyecto, en una llamada de 30 min lo vemos\"\n"
    + "- Cómo contactar: hola@comboilabs.com o el formulario de la web\n"
    + "- Plazos: un agente básico puede estar en marcha en pocas semanas\n"
    + "- Esta propia demo: explica que tú mismo eres un ejemplo de lo que construyen\n\n"
    + "LÍMITES:\n"
    + "- Si te preguntan algo totalmente ajeno a Comboi Labs, redirige con gracia\n"
    + "- Nunca inventes precios concretos ni plazos exactos\n"
    + "- Si no sabes algo, di que lo pueden preguntar en la llamada\n"
    + "- Nunca rompas el personaje — eres el asistente de Comboi Labs, no Claude";

  var conversationHistory = [];
  var hasSent = false;

  function currentTime(){
    var now = new Date();
    return String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  }

  function updateWaTime(){
    var el = document.getElementById('waTime');
    if(el) el.textContent = currentTime();
  }
  updateWaTime();
  setInterval(updateWaTime, 60000);

  function enforceMaxBubbles(){
    var bubbles = Array.prototype.slice.call(messages.querySelectorAll('.wa-bubble'));
    var excess = bubbles.length - 20;
    for(var i = 0; i < excess; i++){
      (function(old){
        old.style.transition = 'opacity .3s';
        old.style.opacity = '0';
        setTimeout(function(){ old.remove(); }, 300);
      })(bubbles[i]);
    }
  }

  function scrollToBottom(){
    messages.scrollTop = messages.scrollHeight;
  }

  function addUserBubble(text){
    var b = document.createElement('div');
    b.className = 'wa-bubble wa-bubble-out';

    var textEl = document.createElement('span');
    textEl.className = 'wa-bubble-text';
    textEl.textContent = text;

    var meta = document.createElement('span');
    meta.className = 'wa-bubble-meta';

    var time = document.createElement('span');
    time.className = 'wa-time';
    time.textContent = currentTime();

    var tick = document.createElement('span');
    tick.className = 'wa-tick';
    tick.textContent = '✓✓';

    meta.appendChild(time);
    meta.appendChild(tick);
    b.appendChild(textEl);
    b.appendChild(meta);
    messages.appendChild(b);
    enforceMaxBubbles();
    scrollToBottom();

    setTimeout(function(){ tick.classList.add('wa-tick-read'); }, 1000);
  }

  function addAgentBubble(text){
    var b = document.createElement('div');
    b.className = 'wa-bubble wa-bubble-in';

    var textEl = document.createElement('span');
    textEl.className = 'wa-bubble-text';

    var meta = document.createElement('span');
    meta.className = 'wa-bubble-meta';

    var time = document.createElement('span');
    time.className = 'wa-time';
    time.textContent = currentTime();

    meta.appendChild(time);
    b.appendChild(textEl);
    b.appendChild(meta);
    messages.appendChild(b);
    enforceMaxBubbles();
    scrollToBottom();

    typewrite(textEl, text);
    return b;
  }

  function addTypingBubble(){
    var b = document.createElement('div');
    b.className = 'wa-bubble wa-bubble-in wa-typing-bubble';
    b.id = 'typingBubble';
    b.innerHTML = '<span class="wa-dots"><span></span><span></span><span></span></span>';
    messages.appendChild(b);
    scrollToBottom();
    return b;
  }

  function typewrite(el, text){
    var i = 0;
    var timer = setInterval(function(){
      i++;
      el.textContent = text.slice(0, i);
      scrollToBottom();
      if(i >= text.length) clearInterval(timer);
    }, 18);
  }

  function addDateSeparator(){
    var sep = document.createElement('div');
    sep.className = 'wa-date-sep';
    sep.textContent = 'Hoy';
    messages.appendChild(sep);
  }

  function sendMessage(){
    var text = input.value.trim();
    if(!text) return;

    if(!hasSent){
      hasSent = true;
      if(hint) hint.classList.add('hidden');
    }

    addUserBubble(text);
    conversationHistory.push({ role: 'user', content: text });
    if(conversationHistory.length > 10) conversationHistory = conversationHistory.slice(-10);

    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
    if(statusEl) statusEl.textContent = 'escribiendo...';

    setTimeout(function(){
      var typingBubble = addTypingBubble();

      fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: conversationHistory
        })
      }).then(function(res){
        if(!res.ok) throw new Error('http ' + res.status);
        return res.json();
      }).then(function(data){
        var reply = (data.content && data.content[0] && data.content[0].text) || '';
        conversationHistory.push({ role: 'assistant', content: reply });
        if(conversationHistory.length > 10) conversationHistory = conversationHistory.slice(-10);
        typingBubble.remove();
        addAgentBubble(reply);
      }).catch(function(){
        typingBubble.remove();
        addAgentBubble('Lo siento, ha habido un problema de conexión. Prueba de nuevo 🙏');
      }).then(function(){
        if(statusEl) statusEl.textContent = 'en línea';
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
      });
    }, 400);
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function(e){
    if(e.key === 'Enter') sendMessage();
  });

  addDateSeparator();

  setTimeout(function(){
    var welcome = "Hola 👋 Soy el asistente de Comboi Labs.\n\nPuedo contarte qué hacemos, cómo funciona un agente de IA o resolver tus dudas sobre nuestros servicios.\n\n¿En qué puedo ayudarte?";
    addAgentBubble(welcome);
  }, 800);
})();
