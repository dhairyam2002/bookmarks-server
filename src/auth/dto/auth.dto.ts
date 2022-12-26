import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";
 
export class SignUpDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    hash: string;

    

    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    lastName: string;
    
    
}


export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    hash: string
}
/*
pipes are functions which transform our data before it is executed in service

we also validation pipes which validate email 

they are class validator and class transfomer
*/