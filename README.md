# Zenith Monitor RN

> A React Native and Expo project for tracking real-time data from atmospheric probes and assisting Zenith members with their duties.

<br/>
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/456d70c1-2170-442b-93c3-72c68cd7c0e8" />
<br/>


---

## 📋 Table of Contents

* [Technologies](#-technologies)
* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Building the APK](#-building-the-apk)
* [Additional Configuration](#-additional-configuration)
* [Testing Bluetooth Retrieval](#-testing-bluetooth-retrieval)
* [Screenshots](#screenshots)
* [Contributing](#-contributing)
* [License](#-license)

---

### 💻 Technologies
- [React Native](https://github.com/facebook/react-native)
- [Expo](https://github.com/expo/expo)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [React Native Paper](https://github.com/callstack/react-native-paper)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Bluetooth](https://www.bluetooth.com/learn-about-bluetooth/tech-overview/)

---

### Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following tools installed:

* [Git](https://git-scm.com/)
* [Node.js (LTS recommended)](https://nodejs.org/)
* npm (comes with Node.js)
* Optional: [Android Studio](https://developer.android.com/studio) for emulator and SDK management

---


### Installation

Clone the repository:

```bash
git clone git@github.com:zenitheesc/zenith-monitor-rn.git
cd zenith-monitor-rn
```

Install dependencies:

```bash
npm install
```

Start the project:

```bash
npx expo start
```

Once the command runs, a **QR code** will appear in your terminal.

#### Run on a physical device:

1. Install the **Expo Go** app from Google Play or the App Store.
2. Scan the QR code with Expo Go to open the app.

⚠️ **Note on restricted networks:**
Expo Go uses your **local Wi-Fi network** to connect to your computer.
Some corporate or university networks (like USP’s) may block this connection.

**Solution:**
If you face issues, build the app locally and install it via USB (see below).

---

## 📲 Building the APK

To generate an installable `.apk` and test it directly on your Android device (no network required):

### Enable USB Debugging

1. Go to **Settings > About phone**
2. Tap **Build number** seven times to unlock **Developer options**
3. Enable **USB Debugging**

### Build the app

```bash
npx expo run:android
```

💡 **Tip:** For a production build:

```bash
npx expo run:android --variant release
```

#### (Optional) Manual APK build

After running `npx expo prebuild`, an `android` folder will be created.
You can generate the APK manually with Gradle:

```bash
cd android
./gradlew assembleRelease
```

The APK will be located at:

```
android/app/build/outputs/apk/release/
```

---

## 🔧 Additional Configuration

Some features may require API keys (e.g., Google Maps).

1. Create a `.env` file in the project root based on `.env.example` (if available).
2. Ask the project maintainers for the necessary keys and fill them in.

---

## 🧪 Testing Bluetooth Retrieval

You can test data retrieval using an **ESP32 microcontroller** configured to send data via Bluetooth.

Expected message format:

```
SignalStrengthRSSI;ID;Latitude;Longitude;Altitude;Time
```

**Example:**

```
-60;42;-23.550516;-46.633308;760.50;"16:05:08"
```

---
## Screenshots
Here are some screens of the app in action, showcasing the main features and interface flow.


<p align="center">
  <img width="313" height="640" alt="Login Screen" src="https://github.com/user-attachments/assets/cc6307ee-dde2-40a5-9ef5-1323bc5b7915" />
  <img width="313" height="640" alt="Home Screen" src="https://github.com/user-attachments/assets/83db9d3e-7eb2-4831-9cdb-3a589092d0dd" />
  <br/>
  <sub>📡 Home and Tracker screen</sub>
</p>
<br/>

<p align="center">
  <img width="313" height="640" alt="Device List" src="https://github.com/user-attachments/assets/8473603a-09ba-4e80-8960-14f13fff85b3" />
  <img width="313" height="640" alt="Device Details" src="https://github.com/user-attachments/assets/f0ae9dbe-c9f4-4458-a2e9-1615a81910ae" />
  <br/>
  <sub> 🌍 Mission history and trajectory</sub>
</p>

---

## 🔔 Notes

* Keep your project up to date — always check version compatibility between Expo, React Native, and Android SDK.
* Watch for dependency updates to ensure security and stability.

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

