/* =========================================================
   COMBOI LABS — Modo oscuro / claro
   Toggle en el header, persistencia en localStorage y
   sincronización entre pestañas.
   ========================================================= */
(function(){
  var STORAGE_KEY = 'comboi_theme';
  var html = document.documentElement;
  var toggle = null;

  var ICON_SUN =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4"/>' +
      '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>' +
    '</svg>';
  var ICON_MOON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">' +
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" transform="translate(-1,3) scale(0.78)"/>' +
      '<path d="M15.5 3.8h4l-4 4h4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M19.6 1h2.2l-2.2 2.2h2.2" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function applyTheme(theme){
    if(theme === 'dark'){
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    updateToggle(theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e){}
  }

  function updateToggle(theme){
    if(!toggle) return;
    var icon = toggle.querySelector('.theme-icon');
    if(theme === 'dark'){
      if(icon) icon.innerHTML = ICON_SUN;
      toggle.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      if(icon) icon.innerHTML = ICON_MOON;
      toggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  function wireToggle(){
    toggle = document.getElementById('themeToggle');
    if(!toggle) return;

    updateToggle(html.classList.contains('dark') ? 'dark' : 'light');

    toggle.addEventListener('click', function(){
      var current = html.classList.contains('dark') ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  var saved = 'light';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e){}
  applyTheme(saved);

  document.addEventListener('DOMContentLoaded', wireToggle);

  window.addEventListener('storage', function(e){
    if(e.key === STORAGE_KEY){
      applyTheme(e.newValue || 'light');
    }
  });

  window.comboiTheme = {
    apply: applyTheme,
    current: function(){ return html.classList.contains('dark') ? 'dark' : 'light'; },
    wireToggle: wireToggle
  };
})();
