import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export async function resize(filename: string, width: number, height: number){
    // Define input and output directories..
    const filepath = path.join(__dirname, '../../images/full', filename + '.jpg');
    let outputDir = path.join(__dirname, '../../images/resized/');
    try {
        // Return a buffer to access width and height customized by sharp in case one of the 2 props is not proivded..
        // This helps when storing the image with its name and size into the filesystem for later cashing...
        const {info, data} = await sharp(filepath).resize({width, height}).toBuffer({resolveWithObject: true});
        const resized_filename = outputDir + filename + '_' + info.width + '_' + info.height + '.jpg';
        // Write new file for resized image from the buffer provided by sharp..
        const resized_image = await fs.writeFile(resized_filename, Buffer.from(data.buffer));
        return resized_filename;
    }catch (err){
        throw new Error(`Resizing image failed with error ${err}`);
    }

                         
}