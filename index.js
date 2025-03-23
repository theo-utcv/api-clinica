const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rolRouter = require('./routes/rolRoute');
const usuarioRouter = require('./routes/usuarioRoute');
const authRoutes = require('./routes/auth')

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', rolRouter);
app.use('/api', usuarioRouter);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});