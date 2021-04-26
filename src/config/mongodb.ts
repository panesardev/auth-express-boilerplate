import mongoose from 'mongoose';

export function initMongoDB() {
	try {
		mongoose.connect(process.env.DB_URI as string, { 
			useNewUrlParser: true, 
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		mongoose.connection
			.once('open', () => console.log('MongoDB: Connected'))

	} catch ({ message }) {
		console.log('MongoDB: ', message);
	}
}
