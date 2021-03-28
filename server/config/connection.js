const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/devconnector', {
	useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection
	.once('open', () => console.log('DB Connected'))
	.on('error', (err) => console.log(err.message));
