# Valeria & Hugo — zaproszenie ślubne (wersja polska, demo do portfolio)

Jednostronicowa strona z zaproszeniem dla **fikcyjnej** pary (Valeria Durán i Hugo Castellanos, sobota 15 maja 2027, Barcelona), stworzona jako próbka projektu w estetyce ślubów 2026/2027 („dyskretny luksus”). To polskie tłumaczenie wersji hiszpańskiej.

- `index.html` — znaczniki i style (Tailwind przez CDN z własnymi tokenami).
- `script.js` — odliczanie, menu, animacje GSAP, lightbox, akordeon FAQ i formularz RSVP.
- `img/` — zoptymalizowane zdjęcia WebP z Unsplash (licencja Unsplash). Źródło każdego zdjęcia znajduje się w pliku `.json` obok.

Dane przykładowe: IBAN `ES00 0000 0000 0000 0000 0000`, telefony `+34 600 00 00 06/07` i e-mail `demo@valeria-i-hugo-wesele.example` to atrapy. Przy tym adresie (zarezerwowana domena `.example`) formularz symuluje wysyłkę; przy prawdziwym adresie `script.js` wysyła dane do FormSubmit (pierwsze wysłanie wymaga aktywacji z maila potwierdzającego).

Nie wymaga budowania: wdraża się bez zmian na GitHub Pages.
