import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Weather App</h1>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Get Weather
        </button>
      </div>

      {weather?.main && (
        <div className="bg-white shadow-lg p-6 rounded-lg text-center w-80">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p className="text-gray-600 capitalize">{weather.weather[0].description}</p>
          <p className="text-2xl font-bold mt-2">{weather.main.temp}°C</p>
          <p className="text-sm text-gray-500">Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  )
}

export default App
