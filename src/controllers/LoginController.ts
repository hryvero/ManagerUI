import { LoginService } from "../services/LoginService";
import { BaseController } from "./BaseController";

export class LoginController extends BaseController{

    private loginService= new LoginService()

    private title= this.createElement("h2","Please Login");
    private containerForInput=this.createElement("div");
    private userName=this.createElement("label","Username:");
    private userNameInput=this.createElement("input");
     private password=this.createElement("label","Password:");
    private passwordInput=this.createElement("input");
    

    private loginButton=this.createElement("button","Login", async()=>{
        if(this.userNameInput.value || this.passwordInput.value){
            this.resetErrorLabel()
            const result= await this.loginService.login(
                this.userNameInput.value,
                this.passwordInput.value
            )
            if(result){
                this.router.switchToDashboardView(result)
            }else{
                return this.showErrorLabel("wrong username or password")
            }
        }else{
            
            this.showErrorLabel('Please fill both fields')
        }
    });

    private errorLabel=this.createElement("label")
    

    private resetErrorLabel(){
        this.errorLabel.style.visibility='hidden'
    }

    private showErrorLabel(errorMessage:string){
        this.errorLabel.innerText=errorMessage;
        this.errorLabel.style.visibility='visible'
    }

    

    public createView():HTMLDivElement {
        this.containerForInput.className="container-input";
        this.errorLabel.className='error-label'


        this.passwordInput.type="Password";


        this.containerForInput.append(
        this.userName,
        this.userNameInput,
        this.password,
        this.passwordInput,
        this.loginButton,
        this.errorLabel
        )

        // this.container.append(
        //     this.title,
        //     this.containerForInput,
           
        // )

        return this.container
    }
}