# Maria & Jakub — zaproszenie ślubne (wersja polska, demo do portfolio)

Jednostronicowa strona z zaproszeniem dla **fikcyjnej** pary (Maria Kowalczyk i Jakub Wiśniewski, sobota 15 maja 2027, Kraków), stworzona jako próbka projektu w estetyce ślubów 2026/2027 („dyskretny luksus”). Wersja zlokalizowana dla polskich gości: ślub w Krakowie, polskie imiona, ceny w złotych, numery +48.

- `index.html` — znaczniki i style (Tailwind przez CDN z własnymi tokenami).
- `script.js` — odliczanie, menu, animacje GSAP, lightbox, akordeon FAQ i formularz RSVP.
- `img/` — zoptymalizowane zdjęcia WebP z Unsplash (licencja Unsplash). Źródło każdego zdjęcia znajduje się w pliku `.json` obok.

Dane przykładowe: IBAN `PL00 0000 0000 0000 0000 0000 0000`, telefony `+48 600 000 006/007` i e-mail `demo@maria-i-jakub-wesele.example` to atrapy. Przy tym adresie (zarezerwowana domena `.example`) formularz symuluje wysyłkę; przy prawdziwym adresie `script.js` wysyła dane do FormSubmit (pierwsze wysłanie wymaga aktywacji z maila potwierdzającego).

Nie wymaga budowania: wdraża się bez zmian na GitHub Pages.

## Zdjęcia — autorzy i licencje

- `img/historia-1.webp` — „Kamienica, ul. Meiselsa 4, Kazimierz, Kraków”, autor: Mach240390, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0), Wikimedia Commons (kadr i kompresja zmienione).
- `img/historia-2.webp` — „Bieszczadzka Kolejka Leśna”, autor: Jano0, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), Wikimedia Commons (kadr i kompresja zmienione).
- Pozostałe zdjęcia: Unsplash (licencja Unsplash), źródła w plikach `.json`.
