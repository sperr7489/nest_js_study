import { Body, Injectable } from '@nestjs/common';
import { PrismaClient,Post, Prisma  } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class PostService {
    constructor(private readonly prisma : PrismaService) {}
    
    async getAllPosts(): Promise<Post[]> {
        return  this.prisma.post.findMany();

    }


    async getPosts({page,pageSize,orderField,orderDirection}): Promise<Post[]> {
        return this.prisma.post.findMany(
            {
                skip : page,
                take : pageSize,
                orderBy:{
                    [orderField] : orderDirection,
            }
        }
        )
    }

    async getPostById(id : Prisma.PostWhereUniqueInput): Promise<Post | null> {

        return this.prisma.post.findUnique({where: id});
    }
    
    async createPost(data: Prisma.PostCreateInput): Promise<Post> { 
        return this.prisma.post.create({data});
    }

    async putPost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
      }) : Promise<Post> {
        const {where, data} = params;
        return this.prisma.post.update({where, data });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        console.log("where : ",where);
        
        return this.prisma.post.delete({where : where})
    }


}
