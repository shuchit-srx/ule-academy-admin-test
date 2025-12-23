import app from './server.js';

app.listen(process.env.PORT, () => {
    console.log(`Admin API running on port ${process.env.PORT}`);
});