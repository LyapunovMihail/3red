import {
    Controller,
    Get,
    Param,
    Res,
} from '@nestjs/common';
import * as fs from 'fs';
import { uploadsRootPath } from '../utilits/uploads-root-path';

@Controller('uploads')
export class UploadsController {

    @Get('/:path/:image')
    uploadedFiles(@Param('path') path, @Param('image') image, @Res() res) {
        const file = `uploads/${path}/${image}`;

        if (fs.existsSync(uploadsRootPath(file))) {
                res.status(200).sendFile(uploadsRootPath(file));
        }  else {
            console.log(uploadsRootPath(file));
            res.status(404).json({message: `file: ${uploadsRootPath(file)}  does not exist`});
        }
    }

}
