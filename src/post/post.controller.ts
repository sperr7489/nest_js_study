import { BadRequestException, Body, Controller, Delete, Get,Logger,NotFoundException,Param,ParseIntPipe,Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Post as prismaPost } from '@prisma/client';
import { PostService } from './post.service';
import { PostFieldValidationPipe } from 'prisma/util/validation.pipe';
import { orderDirection } from 'prisma/util/enum';
import { CreatePostDto, GetPostsDto, PutPostDTO } from './post.dto';
import { validate } from 'class-validator';

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
        @Query()getPostsDto : GetPostsDto): Promise<prismaPost[]> {
            console.log(getPostsDto);
            
                return this.postService.getPosts(getPostsDto)
    }

    @Get('post/:id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<prismaPost>{
        return this.postService.getPostById({id});
    }


    
    @Post('post')
    @UseInterceptors(FileInterceptor('thumbnail'))
    async createPost(@Body() createPostDto: CreatePostDto): Promise<prismaPost> {
        return this.postService.createPost(createPostDto);
    }

    @Put('post/:id')
    async putPost(@Param("id",ParseIntPipe) id : number,@Body(ValidationPipe) putPostDTO : PutPostDTO) : Promise<prismaPost>{
        return this.postService.putPost({where : {id},data : putPostDTO});
    }

    @Delete("post/:id")
    async delete(@Param("id",ParseIntPipe) id: number): Promise<prismaPost>{
        const existPost  = await this.postService.getPostById({id});
        if(existPost) 
            return this.postService.deletePost({id});
        else
            throw new NotFoundException("해당 Id에 해당하는 데이터가 존재하지 않습니다. ");
    }
}
