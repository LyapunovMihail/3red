import { ErrorNotCorrectArguments, ABOUT_TEAM_TABS_COLLECTION_NAME, IAboutTeamTabsSnippet } from './team-tabs.interfaces';
import { ABOUT_TEAM_COLLECTION_NAME } from '../team-api/about-team.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class TeamTabsModel {

    collectionName = ABOUT_TEAM_TABS_COLLECTION_NAME;
    collection: any;
    teamCollectionName = ABOUT_TEAM_COLLECTION_NAME;
    teamCollection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
        this.teamCollection = db.collection(this.teamCollectionName);
    }

    async getTeamTabs() {
        return await this.collection.findOne({});
    }

    async updateTeamTabs(parameters) {
        const options: IAboutTeamTabsSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), async () => {
            // удаление _id из параметров если он там есть
            if ('_id' in options) {
                delete options._id;
            }
            this.deleteTeams(options);
            await this.collection.update({}, { $set : options }, {upsert: true});
        });
    }

    private async deleteTeams(options) {
        const tabs = options.team.map((item) => item.name);
        await this.teamCollection.remove({tab: {$nin: tabs}});
    }

    async deleteSnippet() {
        return await this.collection.deleteOne({});
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, fn) {
        if ( val ) {
            await fn();
            return await this.getTeamTabs();
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return 'team' in options || 'switchOn' in options;
    }

}
