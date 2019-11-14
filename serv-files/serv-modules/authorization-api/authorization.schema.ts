import { USER_ID } from './authorization.config';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema(
    {
        _id: {
            type: String,
            default: USER_ID
        },
        login: String,
        password: String
    }
);
