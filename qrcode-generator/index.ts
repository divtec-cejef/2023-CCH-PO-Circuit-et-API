import fs from 'fs';
import { PrismaClient } from "@prisma/client";
import QRCode from "qrcode";
import dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();
const frontRoute = process.env.FRONT_ROUTE;

prisma.car.findMany().then((cars) => {
	cars.forEach(async (car) => {
		try {
			if (!car.query_id) return;
			const carRoute = frontRoute?.replace('${1}', car.query_id);
			if (!carRoute) return;
			fs.writeFileSync(`out/${car.pseudo}.png`, await QRCode.toBuffer(carRoute));
		} catch (err) {
			console.error(err);
		}
	});
});
