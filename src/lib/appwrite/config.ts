import { Account, Avatars, Client, Databases, Storage } from "appwrite";

const importVar = import.meta.env;
export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: importVar.VITE_APPWRITE_URL,
    databaseId: importVar.VITE_APPWRITE_DATABASE_ID,
    storageId: importVar.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: importVar.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: importVar.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId:importVar.VITE_APPWRITE_SAVES_COLLECTION_ID
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avtars = new Avatars(client);