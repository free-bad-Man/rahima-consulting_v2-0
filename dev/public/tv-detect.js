// tv-detect.js (copy from dev/tv-fix)
// Простая детекция Android TV / SmartTV и добавление класса `tv-browser` на <html>.
// Интегрируйте этот скрипт в <head> перед загрузкой основных бандлов (или импортируйте в клиентский entry).
(function() {
  try {
    var ua = (typeof navigator !== 'undefined' && (navigator.userAgent || navigator.appVersion)) || '';
    var isAndroid = /Android/i.test(ua);
    var tvKeywords = /TV|SmartTV|SMART-TV|BRAVIA|HbbTV|GoogleTV|NetCast|Android TV|Smart-TV/i;
    var isTv = tvKeywords.test(ua);

    // Дополнительная эвристика: если Android, без явного Mobile и с крупным экраном — возможно TV
    if (!isTv && isAndroid && typeof screen !== 'undefined') {
      var largeScreen = Math.max(screen.width || 0, screen.height || 0) >= 1280;
      var noMobile = !/Mobile/i.test(ua);
      if (largeScreen && noMobile) isTv = true;
    }

    function markTv() {
      try {
        if (document && document.documentElement && isTv) {
          document.documentElement.classList.add('tv-browser');
        }
      } catch (e) {
        // noop
      }
    }

    if (typeof document !== 'undefined' && document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', markTv);
    } else {
      markTv();
    }
  } catch (err) {
    // безопасно молчим — не ломаем остальной код
  }
})();


