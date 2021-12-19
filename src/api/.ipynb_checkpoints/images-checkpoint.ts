import express, {Request, Response } from 'express';
import ImageService from '../service/ImageService';

const imageService = new ImageService();

const serveImage = async (req: Request, res: Response) => {
    try{
        // Extract dimensions from query if exist
        const w = req.query.width as string;
        const h = req.query.height as string;
        // Neglect if just one size property is defined..
        if((w && !h) || (!w && h)){
          return res.status(403).json({error: 'Please provide a comination of width and height'});
        } 
        const img_url = await imageService.display(req.params.image, parseInt(w), parseInt(h));
        return res.sendFile(img_url);
    }catch(err){
        console.log(err);
        return res.json({error: err});
    }
}

const image_resizing_route = async (app: express.Application) => {
    app.get('/api/images/:image', serveImage)
}

export default image_resizing_route;