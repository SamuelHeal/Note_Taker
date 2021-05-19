const express = require('express');

// Making a connection to local port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

// Acquiring the code from routes.js file
require("./routes/routes")(app)





