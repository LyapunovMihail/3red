import * as mongodb from 'mongodb';
import * as nodemailer from 'nodemailer';

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
        let mails = await this.mailsFind();
        console.log('sending mail to: ' + mails);

        const time = data.wait_for_call === 'now' ? 'ожидает сейчас' : data.time;
        let config = {
            mails,
            subject: 'Заявка на ипотеку.',
            text:  `
                <b>Имя :</b> ${data.name},<br>
                <b>Телефон :</b> ${data.phone},<br>
                <b>Эл. почта :</b> ${data.mail},<br>
                <b>Время для звонка :</b> ${time},<br>
                <b>Номер квартиры :</b> ${data.number},<br>
                <b>Стоимость квартиры :</b> ${data.price},<br>
                <b>Первый взнос :</b> ${data.first_pay},<br>
                <b>Срок выплат :</b> ${data.period_pay}`
        };
        this.sendMail(config);
        return ({message: 'ok'});
    }

    async reserveRequest(data) {
        let mails = await this.mailsFind();
        console.log('sending mail to: ' + mails);

        const time = data.wait_for_call === 'now' ? 'ожидает сейчас' : data.time;
        let config = {
            mails,
            subject: 'Заявка на бронирование.',
            text:  `
                <b>Имя :</b> ${data.name},<br>
                <b>Телефон :</b> ${data.phone},<br>
                <b>Время для звонка :</b> ${time},<br>
                <b>Номер квартиры :</b> ${data.number},<br>
                <b>Стоимость квартиры :</b> ${data.price},<br>`
        };
        this.sendMail(config);
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
