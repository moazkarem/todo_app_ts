import { LoginInputs, RegisterInputs } from "../interfaces/interfaces"

const emailPatern = /^.+@.+\..+$/ig
export const registerData :RegisterInputs[] = [
    {
        placeholder:"username",
        name:"username", 
        type:'text',
        validation:{
            required:true, 
            minLength:6
        }
    },
    {
        placeholder:"email",
        name:"email" ,
        type:'email',
        validation:{
            required: true , 
            pattern:emailPatern
        }
    } ,
    {
        placeholder:"password",
        name:"password" ,
        type:'password',
        validation:{
            required: true , 
            minLength:8
        }
    }
]

export const dataLogin:LoginInputs[] = [
    {
        placeholder:"email",
        name:"identifier" ,
        type:'email',
        validation:{
            required: true , 
            pattern:emailPatern
        }
    } ,
    {
        placeholder:"password",
        name:"password" ,
        type:'password',
        validation:{
            required: true , 
            minLength:8
        }
    }
]