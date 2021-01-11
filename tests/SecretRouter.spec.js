const app = require('../app') // Link to your server file
const supertest = require('supertest');
const { deleteOne } = require('../models/secret');
const request = supertest(app);
const mongoose = require('mongoose')


describe('GET Endpoints',()=>{
    it('should return all documents',async done =>{
        try{
            let response =  await request.get('/api/secret')
            expect(response.status).toBe(200);
            done();
        }catch(err){
            done.fail(err);
        }
    });
    it('should return all documents with hash',async done =>{
        try{
            let response =  await request.get('/api/secret/CanusLupus-FantasticMrFox')
            expect(response.status).toBe(200);
            done();
        }catch(err){
            done.fail(err);
        }
    });
    it('should not return all documents with wrong hash',async done =>{
        try{
            let response =  await request.get('/api/secret/duummyy');
            expect(response.body).toEqual([]);
            done();
        }catch(err){
            done.fail(err);
        }
    });
});

describe('POST Endpoints', () => {

    // it('should not create document', async done => {
    //     let response = await request.post('/api/secret').send({
    //             "secret": null,
    //             "expireAfterViews": 1,
    //             "expireAfter": 60            
    //     });
    //     expect(response.status).toBe(400);
    //     done();
    // });

    it('should create a document', async done => {
        let response = await request.post('/api/secret').send({
                "secret": "My third Secret",
                "expireAfterViews": 1,
                "expireAfter": 60            
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('hash');
        done();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        app.close();
    });
});
