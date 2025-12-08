# Patient Dashboard — Healthcare Management System (CPE391)

> **A comprehensive, browser-based patient management dashboard** featuring voice notes, real-time anomaly detection, health trend analytics, and AI-powered personalized forecasting — built entirely with HTML/CSS/JS.

---

## 🚀 Overview

The Patient Dashboard is a modern, client-side healthcare management demo application designed to showcase essential features found in real clinical information systems. It includes fast patient search, vital-sign visualization, real-time anomaly alerts, voice note recording, and predictive health forecasting.

This project runs fully in the browser with zero backend requirements — ideal for demonstrations, prototypes, student projects, or as a foundation for future clinical system integrations.
<img width="2848" height="1532" alt="image" src="https://github.com/user-attachments/assets/348efa7e-cfd4-4908-976b-31aa5bb9de20" />


---

## 🔖 Key Features

### 🔎 Patient Search

* Search by **Patient ID** or **Name**
* Quick selection interface with visual results

### 📊 Patient Dashboard

* Full patient demographic and vital-sign overview
* Interactive trend charts (Blood Pressure, Heart Rate, Weight)
* Real-time vital-sign display with anomaly highlighting

### 🎤 Voice Notes

* Click-to-record voice notes using WebRTC MediaRecorder
* Playback and deletion of saved recordings
* Automatic timestamping for each note

### ⚠️ Anomaly Detection

* Real-time rule-based detection engine
* Severity levels: **High / Medium / Low**
* Alerts for:

  * Hypertension / Hypotension
  * Tachycardia / Bradycardia
  * Rapid weight fluctuations
  * Temperature anomalies

### 🔮 Personalized Forecasts

* Short-term health trend predictions using linear regression
* Cardiovascular and general risk estimation
* Suggested medication adjustments (demo-level)
* Confidence scoring for each forecast
* Forecast visualization in interactive charts

---

## 👤 Demo Patient Profiles
<img width="2851" height="1532" alt="image" src="https://github.com/user-attachments/assets/8fe5eb23-5a5f-4586-abb7-2daf97253022" />


### **P001 — John Doe**, 35, Male

* Generally healthy with mild BP fluctuation
* **Anomalies:** Mild BP spike
* **Forecasts:** Weight loss trend, stable BP

### **P002 — Jane Smith**, 42, Female

* Excellent overall health
* **Anomalies:** None detected
* **Forecasts:** Continued stable health trajectory

### **P003 — Robert Johnson**, 58, Male

* Multiple concerning health patterns
* **Anomalies:** Hypertension, elevated HR, weight gain
* **Forecasts:** High CV risk, medication adjustment suggested

---

## 🧩 Project Structure

```
CPE391/
├── index.html          # Main UI structure
├── styles.css          # UI styling & responsive design
├── script.js           # Core logic & user interaction handlers
├── data.js             # Patient dataset, anomaly rules, forecasting algorithms
└── README.md           # Project documentation
```

---

## 📦 Running the Project (Local Demo)

1. **Clone the repository**:

```bash
git clone <repository-url>
cd CPE391
```

2. **Open the app**:

* Open `index.html` directly in any modern browser
* No server or build step required

3. **Enable microphone access** when prompted (for voice notes)

---

## 🧭 How to Use

1. **Search for a patient** using ID (e.g., P001) or name
2. **View the dashboard** to see vitals, trends, and anomaly alerts
3. **Record voice notes** with the Record/Stop controls
4. **Review anomalies** in the detection panel
5. **Explore forecasts** with confidence scores and prediction charts

---

## 🔬 Technologies Used

* **HTML5, CSS3, JavaScript (ES6+)**
* **Chart.js** — real-time and historical trend charts
* **WebRTC MediaRecorder API** — client-side audio capture
* **LocalStorage / Blob handling** — temporary audio storage

---

## 🧠 Algorithm Overview

### ➤ Anomaly Detection

* Rule-based thresholds (e.g., BP > 140/90)
* Variation checks vs. baseline values

### ➤ Forecasting

* Linear regression for trend prediction
* Confidence calculated from data volume & variance

### ➤ Risk Assessment

* Multi-factor scoring: age, BP, HR, weight trends

> **Note:** This model is intended for demo purposes only and is *not* suitable for real clinical decision-making.

---

## 🔒 Security & Privacy

* 100% **client-side processing** — no data leaves the device
* Voice recordings remain **local** and temporary
* No external servers or third-party data connections

---

## ⚠️ Limitations

* Demo-level logic — not medically validated
* No backend, authentication, or real database
* Forecasting model is basic and non-diagnostic

---

## 🔮 Future Enhancements

* Backend integration with real databases / FHIR APIs
* Advanced ML-based anomaly detection and forecasting
* Multi-language UI
* Export reports (PDF/CSV)
* Native mobile app version

---

## 🧾 License

This demo can be used freely for educational and non-commercial purposes.
If you intend to use it commercially, please add a license such as **MIT**, **Apache-2.0**, or your preferred open-source license.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/xyz`)
3. Submit a Pull Request with a clear explanation

---


