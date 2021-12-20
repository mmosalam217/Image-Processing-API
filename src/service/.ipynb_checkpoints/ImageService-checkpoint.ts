import { resize } from '../utils/sharp';
import path from 'path';
import fs from 'fs';

export default class ImageService{
    full_image_path: string = path.join(__dirname, '../../images/full');
    resized_image_path: string = path.join(__dirname, '../../images/resized');
    
    async display(image_name: string, width: number, height: number) : Promise<string> {
        try{
            // Check if requested image exists
            if(fs.existsSync(path.join(this.full_image_path, image_name + '.jpg'))){
                // if there are no dimensions specified return the original
                if(!width && !height) return path.join(this.full_image_path, image_name + '.jpg');
                // check if there is already a resized image of that size and return it
                const cached = await this.isCached(image_name, width, height);
                if(cached){
                    return path.join(this.resized_image_path, image_name +'_'+ width + '_' + height + '.jpg');
                }else{
                    return resize(image_name, width, height);
                }
            }else{
                throw new Error('No Such File Exists');
            }
        }catch(err){
            throw new Error(`${(err as Error).message as string}`);
        }
    }
    
   async isCached(name: string, width: number, height: number): Promise<boolean>{
        return fs.existsSync(path.join(this.resized_image_path, name +'_'+ width + '_' + height + '.jpg'));
    }
}