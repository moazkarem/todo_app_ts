export interface RegisterInputs{
    placeholder:string,
    name:"username" | "email" | "password", 
    type:string,
    validation:{
        required?:boolean, 
        minLength?:number ,
        pattern?:RegExp
    }
}

export interface LoginInputs{
    placeholder:string,
    name: "identifier" | "password", 
    type:string,
    validation:{
        required?:boolean, 
        minLength?:number ,
        pattern?:RegExp
    }
}


export interface axiosError{
    error :{
        message?: string;
    }
}

export interface Itodo {
    id:number , 
    title:string ,
    discribtion:string
}

