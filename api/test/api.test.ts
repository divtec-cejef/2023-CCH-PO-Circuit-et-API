// ajouts des variables d'environnement
import { it } from "mocha";

process.env.NODE_ENV = "test";

// importation des modules
import "../index";
import chai from 'chai';
import chaiHttp from "chai-http";
import "mocha";
import chaiStructure from "chai-check-struct";

// configuration de chai
chai.use(chaiHttp);
chai.use(chaiStructure);
const expect = chai.expect;


// Test de la racine de l'API
describe("Root", () => {

	// test du fonctionnement de l'API
	it("should return 'It works'", async () => {
		const res = await chai.request("localhost:3000").get("/");

		expect(res).to.have.status(200);
		expect(res.text).to.equal("It works");
	});
});

// Test des manches de courses de l'API
describe("race", () => {
	it("should return the quickest races for each car", async () => {
		const res = await chai.request("localhost:3000").get("/race");
		expect(res).to.have.status(200);
		expect(res.body).to.be.an("array");
		expect(res.body).to.have.lengthOf(2);
		expect(res.body[0]).to.have.that.structure({
			id_race: Number,
			sector_one: Date,
			car: {
				id_car: Number,
				pseudo: String,
				avatar: {
					image: String
				}
			}
		});
	});

	// Obtenir toutes les manches de courses d'une voiture
	it("should return all races from a car", async () => {
		const res = await chai.request("localhost:3000").get("/race/1");

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("array");

	});

	// Obtenir toutes les manches de courses d'une voiture avec un id invalide
	it("should return an error if invalid id is given on search for races", async () => {
		const res = await chai.request("localhost:3000").get("/race/adsf");

		expect(res).to.have.status(400);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Invalid id" }));

	});

	// Obtenir toutes les manches de courses d'une voiture qui n'existe pas
	it('should return an error if no car is found when searching all races from it', async () => {
		const res = await chai.request("localhost:3000").get("/race/999");

		expect(res).to.have.status(404);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }));

	});
});

// Test des voitures de l'API
describe("Car", () => {

	// Obtenir toutes les voitures
	it("should return an array of cars", async () => {
		const res = await chai.request("localhost:3000").get("/car");

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("array");

	});


	// Obtenir une voiture à partir de son id
	it("should return a car", async () => {
		const res = await chai.request("localhost:3000").get("/car/1");

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");

	});

	// Obtenir une voiture à partir de son id avec un id invalide
	it("should return an error if invalid id is given", async () => {
		const res = await chai.request("localhost:3000").get("/car/adsf");

		expect(res).to.have.status(400);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Invalid id" }));

	});

	// Obtenir une voiture qui n'existe pas
	it("should return an error if car is not found", async () => {
		const res = await chai.request("localhost:3000").get("/car/999");

		expect(res).to.have.status(404);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }));

	});

	// Supprimer une voiture à l'aide de son id
	it("should delete a car and return it", async () => {
		const res = await chai.request("localhost:3000").delete("/car/1");

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");

	});

	// Supprimer une voiture à partir de son id avec un id invalide
	it("should return an error if invalid id is given on delete", async () => {
		const res = await chai.request("localhost:3000").delete("/car/adsf");

		expect(res).to.have.status(400);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Invalid id" }));

	});

	// Supprimer une voiture qui n'existe pas
	it("should return an error if car is not found", async () => {
		const res = await chai.request("localhost:3000").delete("/car/999");

		expect(res).to.have.status(404);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }));

	});

	// Obtenir une voiture avec un query id
	it("should return a car on search with query id", async () => {
		const res = await chai.request("localhost:3000").get("/car/query-id/4357");

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");

	});

	// Obtenir une voiture avec un query id qui n'existe pas
	it("should return an error if car is not found on search with query id", async () => {
		const res = await chai.request("localhost:3000").get("/car/query-id/adsfasf");

		expect(res).to.have.status(404);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }));

	});

	// Supprimer une voiture avec un query id
	it("should delete a car and return it on search with query id", async () => {
		const res = await chai.request("localhost:3000").delete("/car/query-id/4357");

		expect(res).to.have.status(200);
		expect(res.body).to.be.an("object");

	});

	// Supprimer une voiture avec un query id qui n'existe pas
	it("should return an error if car is not found on search with query id on delete", async () => {
		const res = await chai.request("localhost:3000").delete("/car/query-id/adsfasf");

		expect(res).to.have.status(404);
		expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }));

	});
});
