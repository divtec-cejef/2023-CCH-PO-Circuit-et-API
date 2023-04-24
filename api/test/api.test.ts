process.env.NODE_ENV = "test";
import "../index";
import * as models from "../models";

//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from "chai-http";
import "mocha";
const should = chai.should();

chai.use(chaiHttp);

const expect = chai.expect;

describe("Root", () => {
    it("should return 'It works'", (done) => {
        chai.request("localhost:3000").get("/")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal("It works");
                done();
            })
    })
})

describe("Car", () => {
    it("should return an array of cars", (done) => {
        chai.request("localhost:3000").get("/car")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                done();
            })
    })
    it("should return a car", (done) => {
        chai.request("localhost:3000").get("/car/1")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                done();
            })
    })
    it("should return an error if invalid id is given", (done) => {
        chai.request("localhost:3000").get("/car/adsf")
            .then((res) => {
                expect(res).to.have.status(400);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Invalid id" }))
                done();
            })
    })
    it("should return an error if car is not found", (done) => {
        chai.request("localhost:3000").get("/car/999")
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }))
                done();
            })
    })
    it("should return a car on search with query id", (done) => {
        chai.request("localhost:3000").get("/car/query-id/4356")
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                done();
            })
    })
    it("should return an error if invalid/no query id is given", (done) => {
        chai.request("localhost:3000").get("/car/query-id/")
            .then((res) => {
                expect(res).to.have.status(400);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Invalid id" }))
                done();
            })
    })
    it("should return an error if car is not found on search with query id", (done) => {
        chai.request("localhost:3000").get("/car/query-id/adsfasf")
            .then((res) => {
                expect(res).to.have.status(404);
                expect(res.error.text).to.equal(JSON.stringify({ error: "Car not found" }))
                done();
            })
    })
})
