let server;
const {Genere}=require('../../../models/genere');
const request=require('supertest');
const {Users}=require('../../../models/user');
//const { describe } = require('joi');
describe('/api/generes',()=>
{
    beforeEach(()=>{server=require('../../../example')
})
 afterEach(async ()=>{;
    await Genere.remove();
    await server.close()});
    describe('GEt /',async ()=>{
        it('Should return all the generes',async ()=>
        {
            Genere.collection.insertMany(
                [
                    {
                        gener:"genere1"
                    },
                    {
                        gener:"abcdef"
                    },
                    {
                        gener:"hello "
                    }
                ]);
                //
                const res=await request(server).get('/api/generes');
                expect(res.status).toBe(200);
                expect(res.body.some(g=>g.gener==='genere1')).toBeTruthy();
                expect(res.body.some(g=>g.gener==='abcdef')).toBeTruthy();
                
        });

    });
    describe('GET /:id', ()=>
    {
        it('should send the status 200 and the get valid is passesd',async ()=>{
           const  genere=new Genere({
               gener:"Thriller"
           }) ;
           await genere.save();
           //console.log(genere)
           console.log(genere._id);
           const gener=await request(server).get('/api/generes/'+genere._id);
           console.log(gener.body._id);
           expect(gener.status).toBe(200);
           expect(gener.body).toHaveProperty('gener',"Thriller"); 

        }) 
        it('should send the status 404 and the get invalid is passesd',async ()=>{
        
            const gener=await request(server).get('/api/generes/g5f0e941f52d89d1e9c0ef68');
            console.log(gener.body._id);
            expect(gener.status).toBe(404);
            //expect(gener.body).toHaveProperty('gener',"Thriller"); 
 
         }) 
    });
    describe('post/',()=>
    {
        it('return 401 if the client is not logged in ',async ()=>
        {
                const res=await request(server)
                            .post('/api/generes')
                            .send({gener:"genere1"});
                console.log(res.body);
                expect(res.status).toBe(401);
        });
        it('return 200 if the client is  logged in and valid genere ',async ()=>
        {
            const token=new Users().generateAuthToken();
                const res=await request(server)
                            .post('/api/generes')
                            .set('X-auth-token',token)
                            .send({gener:"genere1"});
                expect(res.status).toBe(200);
        });
        it('return 400 if the client is not logged in ',async ()=>
        {
            const token=new Users().generateAuthToken();
                const res=await request(server)
                            .post('/api/generes')
                            .set('X-auth-token',token)
                            .send({gener:"gg"});
                expect(res.status).toBe(400);
        });
        
    });

})