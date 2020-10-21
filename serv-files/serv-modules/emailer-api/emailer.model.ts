import * as mongodb from 'mongodb';
import * as nodemailer from 'nodemailer';
import * as request from 'request';

export class EmailerModel {

    objectId = mongodb.ObjectId;

    collectionName = 'contacts';

    collection: any;

    constructor ( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async callRequest(data) {
        let mails = await this.mailsFind();
        console.log('sending mail to: ' + mails);
        let config = {
            mails,
            subject: 'Заказ звонка.',
            text:  `
                <b>Имя :</b> ${data.name},<br>
                <b>Телефон :</b> ${data.phone},<br>
                <b>Время для звонка :</b> ${((data.wait_for_call === 'now') ? 'ожидает сейчас' : data.time)}`
        };
        this.sendMail(config);
        return ({message: 'ok'});
    }

    async creditRequest(data) {
        var options = {
            uri: 'http://incrm.ru/Export-TRED/ImportFromSite.svc/Integration',
            method: 'POST',
            json: data
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Print the shortened url.
            } else {
                console.log(error);
            }
        });

        return ({message: 'ok'});
    }

    async reserveRequest(data) {
        var options = {
            uri: 'http://incrm.ru/Export-TRED/ImportFromSite.svc/Integration',
            method: 'POST',
            json: data
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Print the shortened url.
            } else {
                console.log(error);
            }
        });

        return ({message: 'ok'});
    }

    async mailsFind() {
        let mails = await this.collection.find({ type : 'mail', status: true }).toArray();
        return mails.map((i) => i.name).join(', ');
    }

    private sendMail(config) {

        // oblaka@3-capital.ru
        // lubertsi86

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'novotomilino@3-capital.ru',
                pass: 'qwe91x'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'novotomilino@3-capital.ru', // sender address
            to: config.mails, // list of receivers
            subject: config.subject, // Subject line
            // text: config.text, // plain text body
            html: config.text // html body
        };

        // send mail with defined transport object

        if (config.mails.length > 0) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
        } else {
            console.log('No recipients defined');
        }
    }
}
