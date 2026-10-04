# Ders Tahtam

Akıllı tahta için tek dosyalık sınıf yönetim panosu — https://derstahtam.site

- `index.html` — panonun şifreli sürümü (açılışta bir kez şifre sorar, sonra o cihazda sormaz)
- `music/` — arka plan müziği parçaları. Buraya `.mp3` dosyalarını at, adlarını `music/liste.json` dosyasına yaz.
- `sw.js` — çevrimdışı önbellek. Pano güncellenince dosyadaki `SURUM` satırını değiştir.
- `manifest.webmanifest` — "Uygulama olarak yükle" için ad ve ikon bilgileri.

Müzik listesi biçimi:

```json
[
  { "ad": "Sakin Orman", "dosya": "sakin-orman.mp3" },
  "yagmur-sesi.mp3"
]
```

Sinan İnce · 2026
