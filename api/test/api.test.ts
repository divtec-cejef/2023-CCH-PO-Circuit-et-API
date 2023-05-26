// ajouts des variables d'environnement
import { it } from 'mocha';

// importation des modules
import '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
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
            bgColor: String,
            hatColor: String,
            faceColor: String,
            hairColor: String,
            shirtColor: String,
            hairColorRandom: Boolean,
            sex: String,
            earSize: String,
            hatType: String,
            eyeType: String,
            hairType: String,
            noseType: String,
            mouthType: String,
            shirtType: String,
            eyeBrowType: String,
            glassesType: String,
            shape: String
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
      sector1: '2021-10-10T10:10:10.000Z',
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
      sector1: '2016-01-17T08:44:30',
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
      sector1: '2016-01-17T08:44:40',
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
      sector1: '2021-10-10T10:10:10.000Z',
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
      sector1: '2016-01-17T08:44:29',
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
      sector1: '2016-01-17T08:44:29',
      race_finish: '2021-10-10T10:10:10.000Z',
      id_car: 'adsf'
    });
    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'id_car is not of type number' }));
  });
});

describe('Activity', () => {
  it('should return all activities from one section', async () => {
    const res = await chai.request('localhost:3000').get('/activity/by-section/1');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.that.structure([{
      id_activity: Number,
      label: String,
      id_section: Number
    }]);
  });

  it('should return an error if invalid section id is given', async () => {
    const res = await chai.request('localhost:3000').get('/activity/by-section/adsf');

    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid id' }));
  });

  it('should return an error if section is not found', async () => {
    const res = await chai.request('localhost:3000').get('/activity/by-section/999');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify(({ error: 'Section not found' })));
  });

  it('should return all activities from one car', async () => {
    const res = await chai.request('localhost:3000').get('/activity/by-car/1');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.that.structure([{
      id_activity: Number,
      label_activity: String,
      date_time: Date,
      id_section: Number,
      label_section: String
    }]);
  });

  it('should return an error if invalid car id is given', async () => {
    const res = await chai.request('localhost:3000').get('/activity/by-car/adsf');

    expect(res).to.have.status(400);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Invalid id' }));
  });

  it('should return an error if car is not found', async () => {
    const res = await chai.request('localhost:3000').get('/activity/by-car/999');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify(({ error: 'Car not found' })));
  });
});
describe('Realise', () => {
  it('should return an added activity to a car on activity adding', async () => {
    const res = await chai.request('localhost:3000').post('/realise').send({
      id_activity: 6,
      id_car: 3,
      date_time: '2023-05-26T09:16:00'
    });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.that.structure({
      id_activity: Number,
      id_car: Number,
      date_time: Date
    });
  });
  it('should return an error if id_activity is invalid on activity adding', async () => {
    const res = await chai.request('localhost:3000').post('/realise').send({
      id_activity: 'adsf',
      id_car: 3,
      date_time: '2023-05-26T09:16:00'
    });

    expect(res).to.have.status(400);
  });
  it('should return an error if id_car is invalid on activity adding', async () => {
    const res = await chai.request('localhost:3000').post('/realise').send({
      id_activity: 1,
      id_car: '3',
      date_time: '2023-05-26T09:16:00'
    });

    expect(res).to.have.status(400);
  });
  it('should return an error if date_time is invalid on activity adding', async () => {
    const res = await chai.request('localhost:3000').post('/realise').send({
      id_activity: 1,
      id_car: 3,
      date_time: '2023-05-26T09:asdfasdfasdf'
    });

    expect(res).to.have.status(400);
  });
  it('should return an error if id_activity does not exist on activity adding', async () => {
    const res = await chai.request('localhost:3000').post('/realise').send({
      id_activity: 999,
      id_car: 3,
      date_time: '2023-05-26T09:16:00'
    });

    expect(res).to.have.status(404);
  });
  it('should return an error if id_car does not exist on activity adding', async () => {
    const res = await chai.request('localhost:3000').post('/realise').send({
      id_activity: 1,
      id_car: 999,
      date_time: '2023-05-26T09:16:00'
    });

    expect(res).to.have.status(404);
  });
});

// Test des voitures de l'API
describe('Car', () => {
  // Obtenir toutes les voitures
  it('should return an array of cars', async () => {
    const res = await chai.request('localhost:3000').get('/car');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.that.structure([
      {
        id_car: Number,
        query_id: String,
        pseudo: String,
        avatar: {
          bgColor: String,
          hatColor: String,
          faceColor: String,
          hairColor: String,
          shirtColor: String,
          hairColorRandom: Boolean,
          sex: String,
          earSize: String,
          hatType: String,
          eyeType: String,
          hairType: String,
          noseType: String,
          mouthType: String,
          shirtType: String,
          eyeBrowType: String,
          glassesType: String,
          shape: String
        }
      }]);
  });

  // Obtenir une voiture à partir de son id
  it('should return a car', async () => {
    const res = await chai.request('localhost:3000').get('/car/1');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.that.structure({
      id_car: Number,
      query_id: String,
      pseudo: String,
      avatar: {
        bgColor: String,
        hatColor: String,
        faceColor: String,
        hairColor: String,
        shirtColor: String,
        hairColorRandom: Boolean,
        sex: String,
        earSize: String,
        hatType: String,
        eyeType: String,
        hairType: String,
        noseType: String,
        mouthType: String,
        shirtType: String,
        eyeBrowType: String,
        glassesType: String,
        shape: String
      }
    });
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
    expect(res.body).to.have.that.structure({
      id_car: Number,
      query_id: String,
      pseudo: String,
      avatar: {
        bgColor: String,
        hatColor: String,
        faceColor: String,
        hairColor: String,
        shirtColor: String,
        hairColorRandom: Boolean,
        sex: String,
        earSize: String,
        hatType: String,
        eyeType: String,
        hairType: String,
        noseType: String,
        mouthType: String,
        shirtType: String,
        eyeBrowType: String,
        glassesType: String,
        shape: String
      }
    });
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
    expect(res.body).to.have.that.structure({
      id_car: Number,
      query_id: String,
      pseudo: String,
      avatar: {
        bgColor: String,
        hatColor: String,
        faceColor: String,
        hairColor: String,
        shirtColor: String,
        hairColorRandom: Boolean,
        sex: String,
        earSize: String,
        hatType: String,
        eyeType: String,
        hairType: String,
        noseType: String,
        mouthType: String,
        shirtType: String,
        eyeBrowType: String,
        glassesType: String,
        shape: String
      }
    });
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
    expect(res.body).to.have.that.structure({
      id_car: Number,
      query_id: String,
      pseudo: String,
      avatar: {
        bgColor: String,
        hatColor: String,
        faceColor: String,
        hairColor: String,
        shirtColor: String,
        hairColorRandom: Boolean,
        sex: String,
        earSize: String,
        hatType: String,
        eyeType: String,
        hairType: String,
        noseType: String,
        mouthType: String,
        shirtType: String,
        eyeBrowType: String,
        glassesType: String,
        shape: String
      }
    });
  });

  // Supprimer une voiture avec un query id qui n'existe pas
  it('should return an error if car is not found on search with query id on delete', async () => {
    const res = await chai.request('localhost:3000').delete('/car/query-id/adsfasf');

    expect(res).to.have.status(404);
    expect(res.error.text).to.equal(JSON.stringify({ error: 'Car not found' }));
  });
});

describe('Authentication', () => {
  it('Should return a 401 error if the section is invalid', async () => {
    const res = await chai.request('localhost:3000').post('/authentication').send({
      section: 'test1234',
      password: 'salutodin'
    });

    expect(res).to.have.status(401);
    expect(res.body).to.have.that.structure({
      message: String
    });
    expect(res.body.message).to.equal('Invalid credentials.');
  });

  it('Should return a 401 error if the password is invalid', async () => {
    const res = await chai.request('localhost:3000').post('/authentication').send({
      section: 'informatique',
      password: 'salutodin'
    });

    expect(res).to.have.status(401);
    expect(res.body).to.have.that.structure({
      message: String
    });
    expect(res.body.message).to.equal('Invalid credentials.');
  });

  it('Should return a 400 error if the section is missing', async () => {
    const res = await chai.request('localhost:3000').post('/authentication').send({
      password: 'Admlocal1'
    });

    expect(res).to.have.status(400);
    expect(res.body).to.have.that.structure({
      message: String
    });
    expect(res.body.message).to.equal('Key section is not in the source object');
  });

  it('Should return a 400 error if the password is missing', async () => {
    const res = await chai.request('localhost:3000').post('/authentication').send({
      section: 'informatique'
    });

    expect(res).to.have.status(400);
    expect(res.body).to.have.that.structure({
      message: String
    });
    expect(res.body.message).to.equal('Key password is not in the source object');
  });
});
