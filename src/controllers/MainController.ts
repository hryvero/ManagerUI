import { BaseController } from "./BaseController";

export class MainController extends BaseController{

    /**
     * createView
     */
    public createView():HTMLDivElement {


        const title= this.createElement("h2","Welcom to the MAIN PAGE");

        const article=this.createElement("p","Please do a LOGIN to continue");
         
        const button=this.createElement("button","Go to LOGIN", ()=>{
            this.router.switchToLoginView()
            
        });
      
   

        return this.container
    }
}