# Maria & Jakub — zaproszenie ślubne (wersja polska, demo do portfolio)

Jednostronicowa strona z zaproszeniem dla **fikcyjnej** pary (Maria Kowalczyk i Jakub Wiśniewski, sobota 15 maja 2027, Kraków), stworzona jako próbka projektu w estetyce ślubów 2026/2027 („dyskretny luksus”). Wersja zlokalizowana dla polskich gości: ślub w Krakowie, polskie imiona, ceny w złotych, numery +48.

- `index.html` — znaczniki i style. Narzędzia Tailwind są skompilowane do `tailwind.css` (po zmianie klas: `npx tailwindcss@3.4 -c tailwind.config.js -i tailwind.input.css -o tailwind.css --minify`).
- `script.js` — odliczanie, menu, animacje GSAP, lightbox, akordeon FAQ i formularz RSVP.
- `img/` — zoptymalizowane zdjęcia WebP w trzech rozmiarach (`-480`, `-800`, pełny) — przeglądarka wybiera przez `srcset` z Unsplash (licencja Unsplash). Źródło każdego zdjęcia znajduje się w pliku `.json` obok.

Dane przykładowe: IBAN `PL00 0000 0000 0000 0000 0000 0000`, telefony `+48 600 000 006/007` i e-mail `demo@maria-i-jakub-wesele.example` to atrapy. Przy tym adresie (zarezerwowana domena `.example`) formularz symuluje wysyłkę; przy prawdziwym adresie `script.js` wysyła dane do FormSubmit (pierwsze wysłanie wymaga aktywacji z maila potwierdzającego).

Nie wymaga budowania: wdraża się bez zmian na GitHub Pages.

## Zdjęcia — autorzy i licencje

- `img/planty-jesien.webp` — „Kraków, jesień na Plantach”, autor: Ferdziu, [CC BY-SA 3.0 pl](https://creativecommons.org/licenses/by-sa/3.0/pl/), Wikimedia Commons (kadr, rozmiar i kompresja zmienione).
- `img/bieszczady-kolejka.webp` — „Bieszczadzka Kolejka Leśna”, autor: Jano0, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), Wikimedia Commons (kadr i kompresja zmienione).
- Pozostałe zdjęcia: Unsplash (licencja Unsplash), źródła w plikach `.json`.
