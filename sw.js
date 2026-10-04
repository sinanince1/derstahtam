/* Ders Tahtam — çevrimdışı önbellek
   SURUM değişince eski önbellek silinir ve yeni dosyalar indirilir. */
const SURUM = "dt-2026-10-04-1";
const TEMEL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(SURUM).then(c => c.addAll(TEMEL)).catch(() => {}));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ad => Promise.all(ad.filter(a => a !== SURUM).map(a => caches.delete(a)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const istek = e.request;
  if (istek.method !== "GET") return;
  const url = new URL(istek.url);
  if (url.origin !== location.origin) return;

  /* müzik ve ikonlar: önce önbellek, yoksa ağdan al ve sakla */
  if (/\.(mp3|m4a|ogg|wav|png|jpg|jpeg|svg|webp|woff2?)$/i.test(url.pathname)) {
    e.respondWith(caches.match(istek).then(c => c || fetch(istek).then(y => {
      const kopya = y.clone();
      caches.open(SURUM).then(k => k.put(istek, kopya)).catch(() => {});
      return y;
    })));
    return;
  }
  /* sayfa ve liste.json: önce ağ (güncelleme hemen gelsin), internet yoksa önbellek */
  e.respondWith(fetch(istek).then(y => {
    const kopya = y.clone();
    caches.open(SURUM).then(k => k.put(istek, kopya)).catch(() => {});
    return y;
  }).catch(() => caches.match(istek).then(c => c || caches.match("./index.html"))));
});
