import request from 'supertest';
import app from '../index';

describe('Should return correct responses for images handler', async ()=>{
    it('GET:/api/images/:image Should return 200 OK', async()=>{
          const req = await request(app).get('/api/images/fjord').send();
          expect(req.status).toBe(200);  
    })
    
    it('GET:/api/images/:image Should return 404 BAD REQUEST as there is no file with that name', async()=>{
          const req = await request(app).get('/api/images/xx').send();
          expect(req.status).toBe(404);  
    })
    
    it('GET:/api/images/:image Should return 400 BAD REQUEST if width or height < 1', async()=>{
          const req = await request(app).get('/api/images/fjord?width=0&height=100').send();
          expect(req.status).toBe(400);
    })
    
    it('GET:/api/images/:image Should return 400 BAD REQUEST if only width or height is given', async()=>{
          const req = await request(app).get('/api/images/fjord?height=100').send();
          expect(req.status).toBe(400);
    })

})