const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/run-sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a || !b) {
    return res.status(400).json({ error: 'Parameters a and b are required' });
  }

  const pythonScript = path.join(__dirname, 'sum.py');
  const pythonProcess = spawn('python3', [pythonScript, a, b]);
  
  let result = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Failed to calculate sum' });
    }
    res.json({ result: parseInt(result.trim()) });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});