import { SEO_COLLECTION_NAME, TagInterface } from './seo.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class SeoModel {

    private collectionName = SEO_COLLECTION_NAME;

    private collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    public async getTagsCommon(options) {
        const tags = await this.getTags(options);

        let tag: TagInterface;
        if (tags.length && tags[0].hasOwnProperty('flatsSearchParams')) {
            tag = {url: options.url, h1: '', title: '', meta: [], flatsSearchParams: null, flatsPopularCategory: false};
        } else {
            tag = {url: options.url, h1: '', title: '', meta: []};
        }

        tags.forEach((item) => {
            tag._id = item._id;
            tag.h1 = item.h1;
            tag.title = item.title;
            tag.meta = tag.meta.concat(item.meta);
            if (tag.hasOwnProperty('flatsSearchParams')) {
                tag.flatsSearchParams = item.flatsSearchParams;
                tag.flatsPopularCategory = item.flatsPopularCategory;
            }
        });

        return tag;
    }

    public async setTag() {
        const tagObject: TagInterface = { url: '', title: '', h1: '', meta: [{name: '', content: ''}] };
        await this.collection.insert(tagObject);
        return await this.getTags({});
    }

    public async createTag(tagObject) {
        await this.collection.insert(tagObject);
        return await this.getTags({});
    }

    public async deleteTag(req) {
        await this.collection.remove({_id: ObjectId(req.body.tag_id)});
        return await this.getTags({});
    }

    public async updateTag(options) {

        let tag;
        if ( options.hasOwnProperty('flatsSearchParams')) {
            tag = { url : options.url, title : options.title, h1 : options.h1, meta: options.meta, flatsSearchParams: options.flatsSearchParams, flatsPopularCategory: options.flatsPopularCategory};
        } else {
            tag = { url : options.url, title : options.title, h1 : options.h1, meta: options.meta};
        }

        await this.collection.update( {_id : ObjectId(options._id)}, {$set : tag} );
        return await this.getTags({});
    }

    public async pushTag(options) {
        await this.collection.update(
            {_id : ObjectId(options._id)},
            {$push: { meta : { name: '', content: ''} },
            });
        return await this.getTags({});
    }

    public async popTag(options) {
        await this.collection.update(
            {_id : ObjectId(options._id)},
            {$pop: { meta : 1 },
            });
        return await this.getTags({});
    }

    public async getTags(options) {
        return await this.collection.find(options).toArray();
    }

    public async getFlatsSearchTag() {
        return await this.getTags({flatsPopularCategory: true});
    }
}
