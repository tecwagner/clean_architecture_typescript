import dotenv from 'dotenv';
import {app} from './express';

dotenv.config();

const host: string = process.env.HOST || 'localhost';
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
	console.log(`Server is listening on port: ${host}:${port}`);
});
