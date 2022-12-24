import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


//rough overview

/*controller handle incoming requests and what data would be sent
it uses providers (services) to understand business logic
for using providers' methods*************ts.
nest provides with depedency injection where it passes instance in the constructor itself, saving us from overhead of implementing instantiation.
they manage all this object creation from centralized place itself*/


@Controller('auth')
export class AuthController{
    //private -> this.authService = authService
    constructor(private authService: AuthService){

    }
    //   /auth/signup
    @Post('signup')
    signUp() {
        return "working!"
    }


    @Post('signin')
    signIn() {}
}