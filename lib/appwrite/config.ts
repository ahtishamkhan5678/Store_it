// import all env and export as well

export const appwriteConfig = {
    endpointurl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
    fileCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILE_COLLECTION!,
    fileBucketId: process.env.NEXT_PUBLIC_APPWRITE_FILE_BUCKET!,
    secretKey: process.env.NEXT_APPWRITE_KEY!,
    

}