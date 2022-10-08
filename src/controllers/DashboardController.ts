import { AccessRight, SessionToken } from "../models/AuthModel";
import { DataService } from "../services/DataService";
import { BaseController } from "./BaseController";
import { User } from "../models/DataModel";


export class DashboardController extends BaseController{

    private sessionToken: SessionToken | undefined;
    private searchArea: HTMLInputElement | undefined;
    private searchResultArea: HTMLDivElement | undefined;
    private dataService: DataService =new DataService();

    private selectedUser: User|undefined;
    private selectedLabel: HTMLLabelElement |undefined;

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
                this.createElement('button', AccessRight[access], async ()=>{
                    this.triggerAction(access)
                })

            }
        if(this.sessionToken.accessRights?.includes(AccessRight.READ)){
            this.createElement('label', 'Search:')
            this.searchArea=this.createElement('input')
            this.searchResultArea= this.createElement('div')
        }
        }
      
    }

    private async triggerAction(access: AccessRight){
        console.log(`button ${access} clicked`)
        switch (access) {
            case AccessRight.READ:
                const users = await this.dataService.getUsers(
                    this.sessionToken!.tokenId,
                    this.searchArea!.value
                )
                for (const user of users) {
                    const label =this.createElement('label', JSON.stringify(user))
                    label.onclick=()=>{
                        label.classList.toggle('selectedLabel')
                        this.selectedUser=user
                        this.selectedLabel=label
                    }
                    this.searchResultArea!.append(label)
                    this.searchResultArea!.append(
                        document.createElement('br')
                    )
                }
                break;
            case AccessRight.DELETE:
               
                    if(this.selectedUser){
                     this.dataService.deleteUser(
                        this.sessionToken!.tokenId,
                        this.selectedUser   
                     )
                     this.selectedLabel!.innerHTML=''
                    }
            
        
            default:
                break;
        }
    }
}