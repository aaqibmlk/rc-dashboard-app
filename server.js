const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path'); // Added path module

const app = express();
app.use(cors());

// This line hosts all files (like index.html) in your current folder on the local server
app.use(express.static(path.join(__dirname)));

// REPLACE THESE WITH YOUR ACTUAL API DETAILS
const API_KEY = 'YOUR_RAPIDAPI_KEY_HERE'; 
const API_HOST = 'the-actual-host-from-rapidapi.p.rapidapi.com'; 

app.get('/api/rc/:vehicleNo', async (req, res) => {
    const vehicleNo = req.params.vehicleNo;

    try {
        const response = await axios.get(`https://${API_HOST}/your-endpoint-path-here`, {
            params: { vehicleno: vehicleNo }, // Update parameter name based on API docs
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': API_HOST
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch real data' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Website hosted at: http://localhost:${PORT}`);
    console.log(`Backend API running at: http://localhost:${PORT}/api/rc/`);
});