import conf from "../conf/conf";

import { Client, ID, Databases, Storage,Query } from "appwrite";

export class Service{

    client =new Client();
    databases;
    bucket;


    //doing configuration with database to fetch and edit data
    constructor() {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwritePrId)

        //new user data space genration 
        //here database provides features and storage provides space for specific user.
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    //add post feature for every user
    async createPost({title ,slug, content, featuredimage, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDbId,
                conf.appwriteClID,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userID
                }
            )
        } catch (error) {
             console.log('Appwrite.service :: createPost :: error', error);
             
        }
    }

    //edit feature of post to the user who is posting that post
    async updataPost (slug, {title , content, featuredimage}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDbId,
                conf.appwriteClID,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                }
            )
        } catch (error) {
            console.log('Appwrite.service :: createPost :: error', error);
  
        }
    }

    //to delete any post which will be the feature for the user who posted any post 
    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDbId,
                conf.appwriteClID,
                slug,
            )
            return true;
        } catch (error) {
            console.log('Appwrite.service :: createPost :: error', error);
            return false;
        }
    }

    //to get only one post ==>> method when we click on specific post and opn up that ine post  
    async getPost(slug){
        try {
            return await this.databases.getDocument (
                conf.appwriteDbId,
                conf.appwriteClID,
                slug

            )
        } catch (error) {
            console.log('Appwrite.service :: createPost :: error', error);
            return false;
        }
    }


    //to get list of post but only activated post for any new user
    //it is like when you enter in instagram and get to see posts
    //for that we are going to use some queries to get oly activated post not all
    //and this process done by indexing
    async getPosts (queries = [Query.equal("status", "active")]) {

        try {
            return await this.databases.listDocuments(
                conf.appwriteDbId,
                conf.appwriteClID,
                queries,
            )
        } catch (error) {
            console.log('Appwrite.service :: createPost :: error', error);
            return false;
        }
    }

    //file uploading services

    //uploading file
    //here as variable we need to give file block not the name of file
    async uploadFile (file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBukID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite.service :: createPost :: error', error);
            return false;
        }
    }

    //deleting file

    async deleteFile (fileId ){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBukID,
                fileId
            )
            return true;

        } catch (error) {
            console.log('Appwrite.service :: createPost :: error', error);
            return false; 
        }
    }
   
   //filepreview
   getFilePreview (fileId){
    this.bucket.getFilePreview(
        conf.appwriteBukID,
        fileId
    )
   } 
}


const service =new Service()
export default service