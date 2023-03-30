import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/car', async (req, res) => {
	console.log(req);
	let { id } = req.query;

	if (!id) {
		let found = await prisma.voiture.findMany();
		res.send(found.map((car) => car.pseudo));
		return;
	}

	if (typeof id !== 'string') {
		res.send('Error');
		return;
	}

	let found = await prisma.voiture.findFirst({
		where: {
			url: id
		}
	});
	res.send(found?.pseudo);
});

app.listen(3001, () => {
	console.log('Example app listening on port 3001!');
});
