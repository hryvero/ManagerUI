import { SessionToken } from "../models/AuthModel";
import { BaseController } from "./BaseController";


export class DashboardController extends BaseController{

    private sessionToken: SessionToken | undefined;

    public setSessionToken(sessionToken: SessionToken ){
        this.sessionToken=sessionToken

    }

    public createView():HTMLDivElement{
        this.createElement("h2", "Twogram")
        if(this.sessionToken){
            this.createElement('label',
            `Welcome to the club ${this.sessionToken.username}`)
        }else{
            this.createElement('label',"Your Token is undefined")
        }
        return this.container
    }
}