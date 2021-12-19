import { resize } from '../utils/sharp';
import fs from 'fs';

export default class ImageService{
    full_image_path: string = '/home/workspace/images/full/';
    resized_image_path: string = '/home/workspace/images/resized/';
    
    async display(image_name: string, width: number, height: number) : Promise<string> {
       
        try{
            // Check if requested image exists
            if(fs.existsSync(this.full_image_path + image_name + '.jpg')){
                // if there are no dimensions specified return the original
                if(!width && !height) return this.full_image_path + image_name + '.jpg';
                // check if there is already a resized image of that size and return it
                const cached = await this.isCached(image_name, width, height);
                if(cached){
                    return this.resized_image_path + image_name +'_'+ width + '_' + height + '.jpg';
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
        return fs.existsSync(this.resized_image_path + name +'_'+ width + '_' + height + '.jpg');
    }
}