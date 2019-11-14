import { Request } from 'express-serve-static-core';
import * as fs from 'fs';
import * as graphicsmagic from 'gm';
import * as writeFile from 'write';
import * as dateFormat from 'dateformat';
const gm = graphicsmagic.subClass({graphicsMagick: true});

export interface IFileRequest {
    body: any;
    files: any;
}

export interface IThumbnailSize {
    width: string;
    height: string;
}

let randomInteger = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

let fileName = () => {
    let date = dateFormat(new Date(), 'yyyy-mm-dd-HH-MM-ss-ms');
    let random = randomInteger(1000, 2000);
    return (`date${date}_random${random}`);
};

export let fileExtension = (originalFilename) => {
    return originalFilename.substring(originalFilename.lastIndexOf('.')).toLowerCase();
};

export const imageSaver = (req: IFileRequest,  path: string, quality: number ) => {
    // генерация названия файла
    // будет иметь вид 2017-9-19-13-17-13-260.jpg
    let name = fileName();
    // расширение в нижнем регистре
    let fileFormat = fileExtension(req.files['file'].originalFilename);
    // полное имя файла
    let fullName = `${name}${fileFormat}`;
    // чтение файла из реквеста
    let data = fs.readFileSync(req.files['file'].path);

    return new Promise((resolve, reject) => {
        // запись файла
        writeFile(`${path}${fullName}`, data, (err: any) => {
            if (err) { reject(err); }

            // обработка файла утилитой graphicsmagic
            gm(`${path}${fullName}`).strip().interlace('Line').quality(quality).write(`${path}/${fullName}`, async (error: any) => {
                if (error) { reject(error); }

                resolve(fullName);
            });
        });
    });
};

export const thumbnailSaver = ( req: IFileRequest,  path: string, size: IThumbnailSize ) => {
    // генерация названия файла
    // будет иметь вид 2017-9-19-13-17-13-260.jpg
    let name = `thumbnail-${fileName()}`;
    // расширение в нижнем регистре
    let fileFormat = fileExtension(req.files['file'].originalFilename);
    // полное имя файла
    let fullName = `${name}${fileFormat}`;
    // чтение файла из реквеста
    let data = fs.readFileSync(req.files['file'].path);

    return new Promise((resolve, reject) => {
        // запись файла
        writeFile(`${path}${fullName}`, data, (err: any) => {
            if (err) { reject(err); }

            // обработка файла утилитой graphicsmagic
            gm(`${path}${fullName}`).thumb(size.width, size.height, `${path}/${fullName}`, 100, async (error: any) => {
                if (error) { reject(error); }

                resolve(fullName);
            });
        });
    });
};
