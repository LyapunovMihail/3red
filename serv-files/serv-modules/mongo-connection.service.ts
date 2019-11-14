import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { SERVER_CONFIGURATIONS } from './configuration';
import { Mongoose } from 'mongoose';

@Injectable()
export class MongoConnectionService {

    static db: Mongoose;

    static async connect() {
        MongoConnectionService.db = await mongoose.connect(SERVER_CONFIGURATIONS.MONGODB_CONNECTION);
        return MongoConnectionService.db;
    }

    public getDb(): Mongoose {
        return MongoConnectionService.db;
    }
}
