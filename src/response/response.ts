export class Response{

    constructor(success: boolean, message: string, data: any){
        this.success = success
        this.message = message;
        this.data = data;     
    }
    success: boolean;
    message: string;
    data: any
}