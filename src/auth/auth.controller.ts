import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {SignInDto, SignUpDto} from "./dto"

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
    signUp(@Body() dto : SignUpDto) {

        return this.authService.signUp(dto);
        //dto stands for data transfer object

        /*
        let's say you make a post request wih a body. Body has object type of email and password, however if it doens't exist in body object, using it in controller or services in dangereous, because that can throw error/

        how we can handle this?

        one way, we can check for each field manually, however it would become very tedious

        so nestjs provides sometime dto.

        so when a body comes as request, nestjs checks body's type with that provided as interface, if it doesn't match, it throws an error automatically.

        for all this we use @Body decorater while providing object as parameter

        what if email is empty string

        nestjs provides with decoraters which we can use in our interface to check if that field is empty or not
        */

        // for fields that you don't need, do whitelist true in validators 
    }


    @Post('signin')
    signIn(@Body() dto : SignInDto) {
        return this.authService.login(dto)
    }
}