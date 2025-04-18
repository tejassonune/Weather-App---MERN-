const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;
require('dotenv').config();
const apiKey = process.env.OPENWEATHER_API_KEY;

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/', (req,res)=>{
    res.send('Hello From Server')
})