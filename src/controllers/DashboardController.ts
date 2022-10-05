import { AccessRight, SessionToken } from "../models/AuthModel";
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
            this.generateButtons()
        }else{
            this.createElement('label',"Your Token is undefined")
        }
        return this.container
    }
    private generateButtons() {
        if(this.sessionToken){
            for(const access of this.sessionToken.accessRights){
                this.createElement('button', AccessRight[access])
            }
        }
        throw new Error("Method not implemented.");
    }
}