import { MeiliSearch } from "meilisearch";
import config from "../config";
import { Document } from "mongoose";

const meiliClient = new MeiliSearch({
    host: config.meilisearch_host as string,
    apiKey: config.meilisearch_master_key,
  });

  export async function addDocumentToIndex(
    result: any,
    indexKey: string
  ) {
    //console.log(result,indexKey);  
    const index = meiliClient.index(indexKey);
    const { _id, title, content, tags } = result;
    try {
      await index.addDocuments([{ _id: _id.toString(), title, content, tags }]);
      console.log('Document added successfully');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding document to MeiliSearch:', error);
    }
  }
  export const deleteDocumentFromIndex = async (indexKey: string, id: string) => {
    const index = meiliClient.index(indexKey);
    try {
      await index.deleteDocument(id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting resource from MeiliSearch:', error);
    }
  };
  export default meiliClient;