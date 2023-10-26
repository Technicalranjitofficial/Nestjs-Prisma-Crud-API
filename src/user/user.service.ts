import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


type User={
    name:string;
    email:string;
    password:string;
   
}

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){

    }
    createUser(data:User){
        return this.prisma.user.create({
            data
        })
    }

    async getAllUser(){
        return this.prisma.user.findMany({})
    }

    async getUserById(id:string){
        return this.prisma.user.findUnique({
            where:{
                id:id
            }
        })
    }

    async deleteUser(id:string){
        return this.prisma.user.delete({
            where:{
                id:id
            }
        })
    }

    //updating a useremail
    async updateUser(id:string,userEmail:string){
        return this.prisma.user.update({
            where:{
                id:id
            },

            data:{
                email:userEmail
            }
            
        })
    }
    
}
