const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const dotenv = require('dotenv');
const { sequelize } = require('./app/models');

// Passport
require('./passport')

/*Importing routes*/
const authRoute = require('./routes/user.router');
const songRoute = require('./routes/song.router');
const bookmarkRoute = require('./routes/bookmark.router');

dotenv.config();


const app = express()
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());



/*Route middlewares*/

app.use('/api/user', authRoute);
app.use('/api/songs', songRoute);
app.use('/api/bookmarks', bookmarkRoute);

const PORT = config.port || 3000;
/*Server port AND sncing with database*/
sequelize.sync({force: false})
	.then( () => {
		app.listen(PORT, () => console.log("Server running perfectly")); 
	})
