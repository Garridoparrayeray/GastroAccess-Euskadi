# ♿ GastroAccess Euskadi
### Turismo Gastronomikoa Mugarik Gabe

![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Data](https://img.shields.io/badge/Open%20Data-Euskadi-green)

> **"Ziurgabetasuna ez da menuan egon behar."**
> Dibertsitate funtzionala duten pertsonei Euskadiko gastronomiaz gozatzeko aukera bermatzen dien irtenbide digitala.

---

## 📖 Proiektuaren Deskribapena

Mugikortasun urriko edo dibertsitate funtzionaleko pertsonek arazo larri bat dute kanpora jatera doazenean: informazio falta. Aplikazio orokorrek askotan ez dute zehazten lokala benetan irisgarria den ala ez.

**GastroAccess Euskadi** ez da jatetxeen mapa soil bat; **irisgarritasuna balidatzeko tresna** bat da. Open Data Euskadiko datu ofizialak erabiltzen ditugu lokalen azpiegitura teknikoa aztertzeko, eta ez erabiltzaileen iritzi subjektiboak.

### 🎯 Balio Proposamena
1.  **Datu Ofizialak:** Eusko Jaurlaritzako turismo saileko auditorietan oinarrituta.
2.  **Scoring Algoritmoa:** Lokalak automatikoki sailkatzen ditu (Urrea/Zilarra/Estandarra) haien egokitzapen mailaren arabera.
3.  **Geolokalizazioa:** Erabiltzailearen kokapena eta jatetxeen arteko distantzia erreala kalkulatzen du.

---

## ⚙️ Funtzionalitate Teknikoak (Prototipoa)

Proiektu hau **SPA (Single Page Application)** moderno bat da, mugikorretan azkar eta arin ibiltzeko diseinatua.

### 🛠️ Teknologia Stack-a
* **Core:** React 19 + TypeScript (Logika segurua eta sendoa).
* **Eraikitzailea:** Vite (Karga ultra-azkarra).
* **Mapak:** React-Leaflet + OpenStreetMap (Clusterizazioarekin).
* **Estiloak:** Tailwind CSS (Diseinu responsive eta garbia).

### 🧠 Datuen Logika eta Analisia
Aplikazioaren "burmuina" `useRestaurants.ts` fitxategian dago. Datu gordinak (`raw data`) honela prozesatzen dira:

1.  **Garbiketa (ETL):** Koordenatuen formatua zuzendu (WGS84) eta balio nuluak kudeatu.
2.  **Irisgarritasun Algoritmoa:**
    Hiru aldagai aztertzen ditugu: `physical` (fisikoa), `visual` (ikusmena) eta `auditive` (entzumena). Emaitzaren arabera, etiketa bat esleitzen dugu:
    * 🥇 **URREA (Irisgarritasun Osoa):** Hiru egokitzapenak bermatuta dituena.
    * 🥈 **ZILARRA (Irisgarritasun Partziala):** Gutxienez egokitzapen bat duena.
    * 🏳️ **ESTANDARRA:** Irisgarritasun berme espliziturik gabea.

---

## 📂 Biltegiaren Egitura

Kodea modu profesionalean antolatuta dago, eskalagarritasuna bermatzeko:

```text
.
├── public/
|---data/                   # Dataset ofiziala (restaurantes.json)
├── src/
│   ├── components/         # UI Osagaiak (MapComponent, RestaurantCard...)
│   ├── hooks/              # Datuak lortzeko logika (useRestaurants.ts)
│   ├── types.ts            # TypeScript definizioak (Interface Restaurant...)
│   ├── App.tsx             # Aplikazioaren sarrera nagusia
│   └── index.css           # Estilo globalak eta Tailwind
├── doc/                    # Dokumentazio gehigarria
|___ hooks/                 # Mapan jartzeko jatetxeak json-tik
├── PROPUESTA.md            # Hasierako proposamena
└── README.md               # Fitxategi hau
