import express, {Request, Response } from 'express';
import ImageService from '../service/ImageService';

const imageService = new ImageService();

const serveImage = async (req: Request, res: Response) => {
    // Extract dimensions from query if exist
    const w = req.query.width as string;
    const h = req.query.height as string;
    // Neglect if just one size property is defined..
    if((w && !h) || (!w && h)){
        return res.status(400).json({error: 'Please provide a comination of width and height'});
    }
    if(w && h && (parseInt(w) < 1 || parseInt(h) < 1 )){
        return res.status(400).json({error: 'Width and height must be bigger than 0'});
    }
    try{
        const img_url = await imageService.display(req.params.image, parseInt(w), parseInt(h));
        return res.status(200).sendFile(img_url);
    }catch(err){
        let msg = (err as Error).message as string;
        let errCode: number = msg === 'No Such File Exists'? 404 : 400;
        return res.status(errCode).json({error: msg });
    }
}

const image_resizing_route = async (app: express.Application) => {
    app.get('/api/images/:image', serveImage)
}

export default image_resizing_route;