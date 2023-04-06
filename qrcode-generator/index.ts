import fs from 'fs';
import { PrismaClient } from "@prisma/client";
import QRCode from "qrcode";

const prisma = new PrismaClient();


prisma.car.findMany().then((cars) => {
	cars.forEach(async (car) => {
		try {
			fs.writeFileSync(`out/${car.pseudo}.png`, await QRCode.toBuffer(`http://localhost:3000/${car.query_id}`));
		} catch (err) {
			console.error(err);
		}
	});
});
