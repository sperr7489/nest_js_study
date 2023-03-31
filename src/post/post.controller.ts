import { BadRequestException, Body, Controller, Delete, Get,Param,ParseIntPipe,Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as prismaPost } from '@prisma/client';
import { PostService } from './post.service';
import { PostFieldValidationPipe } from 'prisma/util/validation.pipe';
import { orderDirection } from 'prisma/util/enum';

@Controller()
export class PostController {
    constructor(private readonly postService: PostService) {}
    @Get('post')
    async getAllPosts(): Promise<prismaPost[]> {
        return this.postService.getAllPosts();
    }

    //localhost:3000/posts?page=1&pageSize=20&orderField=title&orderDirection=desc
    @Get('posts')
    async getPosts(
        @Query("page", ParseIntPipe) page: number, 
        @Query("pageSize" , ParseIntPipe) pageSize : number, 
        @Query("orderField",PostFieldValidationPipe ) orderField : string, 
        @Query("orderDirection") orderDirection : "asc" | "desc",
        ): Promise<prismaPost[]> {
        return this.postService.getPosts({page,pageSize,orderField,orderDirection})
    }

    @Get('post/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<prismaPost>{
        //
        return this.postService.getPostById({id});
    }


    
    @Post('post')
    @UseInterceptors(FileInterceptor('thumbnail'))
    async createPost(@Body(ValidationPipe) data: prismaPost): Promise<prismaPost> {
        if(!data.author || !data.content || !data.thumbnail || !data.title) 
            throw new BadRequestException("필수 값이 들어있지 않다. ")
        return this.postService.createPost(data);
    }

    @Put('post/:id')
    async putPost(@Param("id",ParseIntPipe) id : number,@Body() data : prismaPost) : Promise<prismaPost>{
        const { title, author, content, thumbnail } =  data;     
        if( !title && !author && !content && !thumbnail)
            throw new BadRequestException("적어도 하나의 데이터는 보내야 한다. ");
        return this.postService.putPost({where : {id},data});
    }

    @Delete("post/:id")
    async delete(@Param("id",ParseIntPipe) id: number): Promise<prismaPost>{

        return this.postService.deletePost({id});
    }
}
