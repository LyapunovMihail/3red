import { IPhone, IMail, CONTACTS_COLLECTION_NAME } from './contacts.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ContactsModel {

    collectionName = CONTACTS_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.getInstance(db);
    }

    public async getInstance(db) {
        this.collection = await db.collection(this.collectionName);
        await this.initPhone();
    }

    async initPhone( ) {
        const phone = await this.getPhone();
        // если объекта с номером телефона нет, то он создается пустым
        if (!phone) {
            const data: IPhone = {_id: 'phone', phone: ''};
            await this.collection.insertOne(data);
            return 'just create phone object';
        } else {
            return 'already exist phone object';
        }
    }

    async getPhone( ) {
        return await this.collection.findOne({_id : 'phone'});
    }

    async updatePhone( newPhone: string ) {
        await this.collection.updateOne({_id : 'phone'}, {$set : { phone : newPhone }});
        return await this.getPhone();
    }

    async getMail( ) {
        return await this.collection.find({ type: 'mail' }).toArray();
    }

    async setMail() {
        const newMail: IMail = { type: 'mail', status: false, name: '' };
        await this.collection.insertOne(newMail);
        return await this.getMail();
    }

    async deleteMail( id ) {
        await this.collection.deleteOne({ _id: ObjectId(id) });
        return await this.getMail();
    }

    async updateMail( id, value, status ) {
        await this.collection.updateOne({_id : ObjectId(id) }, { $set : { name: value, status } });
        return await this.getMail();
    }

}
