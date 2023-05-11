// ajouts des variables d'environnement
import { it } from 'mocha';

// importation des modules
import '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import chaiStructure from 'chai-check-struct';

process.env.NODE_ENV = 'test';

// configuration de chai
chai.use(chaiHttp);
chai.use(chaiStructure);
const expect = chai.expect;

// Test de la racine de l'API
describe('Root', () => {
  // test du fonctionnement de l'API
  it("should return 'It works'", async () => {
    const res = await chai.request('localhost:3000').get('/');

    expect(res).to.have.status(200);
    expect(res.text).to.equal('It works');
  });
});

// Test des manches de courses de l'API
describe('race', () => {
  it('should return the quickest races for each car', async () => {
    const res = await chai.request('localhost:3000').get('/race');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.that.structure([
      {
        id_race: Number,
        total_time: Date,
        car: {
          id_car: Number,
          pseudo: String,
          avatar: {
            image: String
          }
        }
      }
    ]);
  });

  // Obtenir toutes les manches de courses d'une voiture
  it('should return all races from a car', async () => {
    const res = await chai.request('localhost:3000').get('/race/1');
    expect(res).to.have.status(200);
    expect(res.body).to.have.that.structure({
      races: [{
        id_race: Number,
        race_start: Date,
        race_finish: Date,
        total_time: Date,
        id_car: Number
      }],
      rank: Number
    });
  });

  // Obtenir toutes les manches de courses d'une voiture avec un id invalide
  it('should return an error if invalid id is given on search for races', async () => {
    const res = await chai.request('localhost:3000').get('/race/adsf');

    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid id' }));
  });

  // Obtenir toutes les manches de courses d'une voiture qui n'existe pas
  it('should return an error if no car is found when searching all races from it', async () => {
    const res = await chai.request('localhost:3000').get('/race/999');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Car not found' }));
  });

  // Créer une manche de course avec des paramètres valides à l'aide du query_id de la voiture
  it('should return a created race if all parameters are valid on create with query_id', async () => {
    const res = await chai.request('localhost:3000').post('/race/query-id/').send({
      race_start: '2021-10-10T10:10:10.000Z',
      race_finish: '2021-10-10T10:10:10.000Z',
      query_id: '4356'
    });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.that.structure({
      id_race: Number,
      race_start: Date,
      race_finish: Date,
      id_car: Number
    });
  });

  // Créer une manche de course à l'aide du query_id de la voiture avec race_start invalide
  it('should return an error if race_start is invalid on create with query_id', async () => {
    const res = await chai.request('localhost:3000').post('/race/query-id/').send({
      race_start: '0000-00-00T10:10:10.000Z',
      race_finish: '2021-10-10T10:10:10.000Z',
      query_id: '4356'
    });
    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid date (not parsable)' }));
  });

  // Créer une manche de course à l'aide que query_id avec sector_one invalide
  it('should return an error if race_finish is invalid on create with query_id', async () => {
    const res = await chai.request('localhost:3000').post('/race/query-id/').send({
      race_start: '2016-01-17T08:44:29',
      race_finish: '0000-00-00T10:10:10.000Z',
      query_id: '4356'
    });
    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid date (not parsable)' }));
  });

  // Créer une manche de course avec un query_id invalide
  it('should return an error if query_id is invalid', async () => {
    const res = await chai.request('localhost:3000').post('/race/query-id/').send({
      race_start: '2016-01-17T08:44:29',
      race_finish: '2021-10-10T10:10:10.000Z',
      query_id: 4356
    });
    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'query_id is not of type string' }));
  });

  // Créer une manche de course avec des paramètres valides
  it('should return a created race if all parameters are valid', async () => {
    const res = await chai.request('localhost:3000').post('/race').send({
      race_start: '2021-10-10T10:10:10.000Z',
      race_finish: '2021-10-10T10:10:10.000Z',
      id_car: 1
    });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.that.structure({
      id_race: Number,
      race_start: Date,
      race_finish: Date,
      id_car: Number
    });
  });

  // Créer une manche de course avec race_start invalide
  it('should return an error if race_start is invalid', async () => {
    const res = await chai.request('localhost:3000').post('/race').send({
      race_start: '0000-00-00T10:10:10.000Z',
      race_finish: '2021-10-10T10:10:10.000Z',
      id_car: 1
    });
    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid date (not parsable)' }));
  });

  // Créer une manche de course avec sector_one invalide
  it('should return an error if race_finish is invalid', async () => {
    const res = await chai.request('localhost:3000').post('/race').send({
      race_start: '2016-01-17T08:44:29',
      race_finish: '0000-00-00T10:10:10.000Z',
      id_car: 1
    });
    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid date (not parsable)' }));
  });

  // Créer une manche de course avec id_car invalide
  it('should return an error if id_car is invalid', async () => {
    const res = await chai.request('localhost:3000').post('/race').send({
      race_start: '2016-01-17T08:44:29',
      race_finish: '2021-10-10T10:10:10.000Z',
      id_car: 'adsf'
    });
    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'id_car is not of type number' }));
  });
});

// Test des voitures de l'API
describe('Car', () => {
  // Obtenir toutes les voitures
  it('should return an array of cars', async () => {
    const res = await chai.request('localhost:3000').get('/car');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  // Obtenir une voiture à partir de son id
  it('should return a car', async () => {
    const res = await chai.request('localhost:3000').get('/car/1');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });

  // Obtenir une voiture à partir de son id avec un id invalide
  it('should return an error if invalid id is given', async () => {
    const res = await chai.request('localhost:3000').get('/car/adsf');

    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid id' }));
  });

  // Obtenir une voiture qui n'existe pas
  it('should return an error if car is not found', async () => {
    const res = await chai.request('localhost:3000').get('/car/999');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Car not found' }));
  });

  // Supprimer une voiture à l'aide de son id
  it('should delete a car and return it', async () => {
    const res = await chai.request('localhost:3000').delete('/car/1');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });

  // Supprimer une voiture à partir de son id avec un id invalide
  it('should return an error if invalid id is given on delete', async () => {
    const res = await chai.request('localhost:3000').delete('/car/adsf');

    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid id' }));
  });

  // Supprimer une voiture qui n'existe pas
  it('should return an error if car is not found', async () => {
    const res = await chai.request('localhost:3000').delete('/car/999');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Car not found' }));
  });

  // Obtenir une voiture avec un query id
  it('should return a car on search with query id', async () => {
    const res = await chai.request('localhost:3000').get('/car/query-id/4357');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });

  // Obtenir une voiture avec un query id qui n'existe pas
  it('should return an error if car is not found on search with query id', async () => {
    const res = await chai.request('localhost:3000').get('/car/query-id/adsfasf');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Car not found' }));
  });

  // Supprimer une voiture avec un query id
  it('should delete a car and return it on search with query id', async () => {
    const res = await chai.request('localhost:3000').delete('/car/query-id/4357');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });

  // Supprimer une voiture avec un query id qui n'existe pas
  it('should return an error if car is not found on search with query id on delete', async () => {
    const res = await chai.request('localhost:3000').delete('/car/query-id/adsfasf');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Car not found' }));
  });
});
