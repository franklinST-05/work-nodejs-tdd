import { MongoClient } from 'mongodb';

export const MongoHelper = {
    client: null as unknown as MongoClient,
    
    async connect(uri: string) {
        this.client = await MongoClient.connect(uri);
    },

    async disconnect() {
        this.client.close();
    }
};