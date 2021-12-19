import ImageService from '../service/ImageService';
import fs from 'fs';
import path from 'path';

describe('Test serving resized and full images', ()=>{
    let service: ImageService;
    
    beforeAll(()=>{
        service = new ImageService();
    });
    
    it('Should return correct filepath for full image size', async ()=> {
        const expected = path.resolve('images/full', 'fjord.jpg');
        const queryParams : {width?: string, height?: string} = {};
        const w = queryParams.width as string;
        const h = queryParams.height as string;

        const imgPath = await service.display('fjord',parseInt(w), parseInt(h));
        expect(imgPath).toEqual(expected);
    })
    
    it('Should return filepath for a new resized image', async ()=>{
        const expected = path.resolve('images/resized', 'fjord_700_350.jpg');
        expect(fs.existsSync(expected)).toBeFalsy();
        const queryParams : {width?: string, height?: string} = {width: '700', height: '350'};
        const w = queryParams.width as string;
        const h = queryParams.height as string;
        
        const imgPath = await service.display('fjord',parseInt(w), parseInt(h));
        expect(imgPath).toEqual(expected);
        fs.unlinkSync(expected);
    })
    
    it('Should return filepath for a cached resized image', async ()=>{
        const expected = path.resolve('images/resized', 'fjord_500_300.jpg');;
        expect(fs.existsSync(expected)).toBe(true);
        
        const queryParams : {width?: string, height?: string} = {width: '500', height: '300'};
        const w = queryParams.width as string;
        const h = queryParams.height as string;
        
        const imgPath = await service.display('fjord',parseInt(w), parseInt(h));
        expect(imgPath).toEqual(expected);
    })
    it('Should throw No Such File Exists exception', async()=>{
        const queryParams : {width?: string, height?: string} = {};
        const w = queryParams.width as string;
        const h = queryParams.height as string;
        await expectAsync(service.display('wrong', parseInt(w), parseInt(h)))
                    .toBeRejectedWith(new Error('No Such File Exists'));
    })
})