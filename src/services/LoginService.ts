import { SessionToken } from "../models/AuthModel";


export class LoginService{

    public async login(username: string, password: string):Promise<SessionToken | undefined>{
        if (username=='user'&& password=='123') {
            return {username:'someUser'}as any
        }else{
            return undefined
        }
    }
}