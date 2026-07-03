async function getWeather() {
    const city = document.getElementById("city").value;
    const resultDiv = document.getElementById("result");

    if (!city) {
        resultDiv.innerHTML = "⚠ Please enter a city";
        return;
    }

    // 🔄 Loading state
    resultDiv.innerHTML = "⏳ Loading...";

    try {
        const res = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
        const data = await res.json();

        if (data.error) {
            resultDiv.innerHTML = `❌ ${data.error}`;
            return;
        }

        resultDiv.innerHTML = `
            <h2>${data.city}</h2>
            <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png">
            <p>${data.description}</p>
            <p>🌡 Temp: ${data.temp} °C</p>
            <p>💧 Humidity: ${data.humidity}</p>
            <p>🌬 Wind: ${data.wind}</p>
        `;

        loadHistory();

    } catch (error) {
        resultDiv.innerHTML = "⚠ Server error. Try again.";
    }
}

// 📜 Load history
async function loadHistory() {
    const res = await fetch("http://127.0.0.1:5000/history");
    const data = await res.json();

    const historyList = document.getElementById("history");
    historyList.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item[0];

        // 🔥 Click to search again
        li.style.cursor = "pointer";
        li.onclick = () => {
            document.getElementById("city").value = item[0];
            getWeather();
        };

        historyList.appendChild(li);
    });
}

// 🚀 Load history on page start
window.onload = loadHistory;