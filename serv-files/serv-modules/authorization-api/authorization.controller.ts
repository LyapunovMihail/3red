import { userSchema } from './authorization.schema';
import {
    AUTHORIZATION_COLLECTION_NAME,
    IUser,
    USER_ID,
} from './authorization.config';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {
    Request,
    Response,
} from 'express';
import {
    Controller,
    Next,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { MongoConnectionService } from '../mongo-connection.service';

@Controller('/api')
export class AuthorizationController {

    public salt = bcrypt.genSaltSync(10);
    public model;
    private db;

    constructor(
        private mongoConnectionService: MongoConnectionService,
    ) {
        this.db = this.mongoConnectionService.getDb();
        this.model = this.db.model(AUTHORIZATION_COLLECTION_NAME, userSchema);
    }

    // При попытке авторизации проверяем наличие user с _id : USER_ID.
    // При первой попытке в базе объекта не будет,
    // поэтому создаем нового пользователя с принятыми
    // login и password
    private async login(login, password) {

        // если логин и пароль не строки, сразу возвращаем ответ о не удачной попытке
        if (!( typeof login === 'string' && typeof password === 'string' )) {
            return {result: false};
        }

        // Если user уже существует, то проверяем корретность заполненной формы
        const user = await this.model.findOne({_id: USER_ID});
        if (user) {
            const bcr = bcrypt.compareSync(password, user.password);
            if (bcr) {
                // если пароль подошел, то собираем его в token, и возвращаем результат
                const token = jwt.sign({user, password}, 'secret', {expiresIn: 7200});
                return {result: true, token, message: 'success login'};
            } else {
                // если нет, отдаем ошибку
                return {result: false};
            }

            // Если user не существует, то пришедший по запросу пароль хэшируется
        } else {

            const hash = bcrypt.hashSync(password, this.salt);
            // записывается в базу
            const newUser: IUser = {_id: USER_ID, login, password: hash};
            await this.model.create(newUser);
            // собирается в токен и отдается
            const token = jwt.sign({user: newUser, password}, 'secret', {expiresIn: 7200});
            return {result: true, token, message: 'user just create'};
        }
    }

    private async verify(token) {
        // верифицируем
        const data = await jwt.verify(token, 'secret');
        // по результату ищем юзера
        const user = await this.model.findOne({_id: USER_ID, login: data.user.login, password: data.user.password});
        if (user) {
            return true;
        }
        throw new Error('Пользователь не найден');
    }

    private async reviuseToken(token) {
        // верифицируем
        const data = await jwt.verify(token, 'secret');
        // по результату ищем юзера
        const user = await this.model.findOne({_id: USER_ID, login: data.user.login, password: data.user.password});
        if (user) {
            return {result: true, token, message: 'success login'};
        }
        throw new Error('Пользователь не найден');
    }

    @Post('/authorization')
    authorization(@Req() req: Request, @Res() res: Response) {
        // если в реквесте есть поля: body, login, password
        // то передаем управление контроллеру
        if ('body' in req && 'login' in req.body && 'password' in req.body) {

            this.login(req.body.login, req.body.password).then((result) => {
                if (result.result) {
                    res.json(result);
                } else {
                    res.status(401).json({message: 'failed login'});
                }
            }).catch((err) => {
                res.status(500).json({message: err});
            });

            // в остальных случаях отдаем ответ об ошибке авторизации
        } else {
            res.status(401).json({message: 'failed login'});
        }

    }

    @Post('/reviusetoken')
    async reviusetoken(@Req() req: Request) {
        return await this.reviuseToken(req.body.token);
    }

    @Post('/admin/*')
    adminVerify(@Req() req: Request, @Res() res: Response, @Next() next) {
        console.log('admin path');
        this.verify(req.headers.token).then(() => {
            next();
        }).catch((err) => {
            res.status(403).json({
                message: 'Forbidden',
                error: err,
            });
        });
    }
}
