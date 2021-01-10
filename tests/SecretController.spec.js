
const secret = require('../controllers/SecretController');

describe("createFunction()", () => {
    it("should throw error", () =>{
        expect(() => {
            secret.create(null);
        }).toThrowError('Request body is invalid!');
    });
    it("should return error", () => {
        expect(() => {
            secret.create(
                {
                    "secret": null,
                    "expireAfterViews": 1,
                    "expireAfter": 60
                }                
            )
        }).toThrowError('Unable to save Secret to database');
    });
});

describe("listFunction()",() => {
    it("should throw error if hash key null", ()=>{
        expect(()=>{
            secret.list(null);
        }).toThrowError('Hash key cannot be null');
    });
    // it("should return an array of values", () => {
    //     let secrets = secret.list('CanusLupus-FantasticMrFox');

    //     expect(secrets.length).toNotEqual(0);
    // });
    // it("should return empty if hash is incorrect", () => {
    //     let secrets = secret.findSecret('johndoe').length;
    //     expect(secrets).toEqual(0);
    // });
});