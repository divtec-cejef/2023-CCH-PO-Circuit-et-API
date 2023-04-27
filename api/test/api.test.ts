// ajouts des variables d'environnement
process.env.NODE_ENV = "test";

// importation des modules
import "../index";
import chai from 'chai';
import chaiHttp from "chai-http";
import "mocha";

// configuration de chai
chai.use(chaiHttp);
const expect = chai.expect;



// Test de la racine de l'API
describe("Root", () => {

    // test du fonctionnement de l'API
    it("should return 'It works'", (done) => {
        chai.request("localhost:3000").get("/")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("It works");
                done();
            })
    })
})

// Test des voitures de l'API
describe("Car", () => {

    // Obtenir toutes les voitures
    it("should return an array of cars", (done) => {
        chai.request("localhost:3000").get("/car")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            })
    })


    // Obtenir une voiture à partir de son id
    it("should return a car", (done) => {
        chai.request("localhost:3000").get("/car/1")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                done();
            })
    })

    // Obtenir une voiture à partir de son id avec un id invalide
    it("should return an error if invalid id is given", (done) => {
        chai.request("localhost:3000").get("/car/adsf")
            .then((res) => {
                expect(res).to.have.status(400);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Invalid id" }))
                done();
            })
    })

    // Obtenir une voiture qui n'existe pas
    it("should return an error if car is not found", (done) => {
        chai.request("localhost:3000").get("/car/999")
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }))
                done();
            })
    })

    // Supprimer une voiture à l'aide de son id
    it("should delete a car and return it", (done) => {
        chai.request("localhost:3000").delete("/car/1")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                done();
            })
    })

    // Supprimer une voiture à partir de son id avec un id invalide
    it("should return an error if invalid id is given on delete", (done) => {
        chai.request("localhost:3000").delete("/car/adsf")
            .then((res) => {
                expect(res).to.have.status(400);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Invalid id" }))
                done();
            })
    })

    // Supprimer une voiture qui n'existe pas
    it("should return an error if car is not found", (done) => {
        chai.request("localhost:3000").delete("/car/999")
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }))
                done();
            })
    })

    // Obtenir une voiture avec un query id
    it("should return a car on search with query id", (done) => {
        chai.request("localhost:3000").get("/car/query-id/4357")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                done();
            })
    })

    // Obtenir une voiture avec un query id qui n'existe pas
    it("should return an error if car is not found on search with query id", (done) => {
        chai.request("localhost:3000").get("/car/query-id/adsfasf")
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }))
                done();
            })
    })

    // Supprimer une voiture avec un query id
    it("should delete a car and return it on search with query id", (done) => {
        chai.request("localhost:3000").delete("/car/query-id/4357")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                done();
            })
    })

    // Supprimer une voiture avec un query id qui n'existe pas
    it("should return an error if car is not found on search with query id on delete", (done) => {
        chai.request("localhost:3000").delete("/car/query-id/adsfasf")
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }))
                done();
            })
    })
})
