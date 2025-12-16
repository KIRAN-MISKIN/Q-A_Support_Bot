import app from './index.js'
import dbConnection from './src/db/db_connection.js'
import config from './src/config/index.js'
const PORT = config.port || 3000;
dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    // console.error("Failed to start server:", err);
    process.exit(1);
});