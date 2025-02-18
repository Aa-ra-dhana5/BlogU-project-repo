import conf from "../conf/conf";

import { Client, Account } from "appwrite";

export class AuthServices {

    client = new Client();
    account;

  // here we creating client and account as new client comes how the product will beahve is decided here 
    constructor() {
        this.client
             .setEndpoint(conf.appwriteURL)
             .setProject(conf.appwritePrId)

             //new user accunt genration process
    this.account =new Account(this.client)
    }
    
    // basic authentication for evry entring user
    async createAccount({email, password, name}){
        try {
          const userAccount = await this.account.create(IDBCursor.unique(),email, password, name)

          if(userAccount){
            /*call another method for login if sign in successful */
            return this.login({email, password});

          } else {
            return userAccount;
          }
        } 
        catch (error){
            throw error;
        }
    }

    //login after user hsa completed succesfull sign up 
    async login({email, password}) {

        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // to genrate profile for specific user and to access activity 
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service ::  getCurrentUser :: error', error);
            
        }

        return null;
    }

    //logout to get back with very first entering page
    async logOut() {

        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite service :: logout :: erro', error);
            
        }
    }

}

const authService =new AuthServices();

export default authService