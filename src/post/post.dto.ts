import { IsNumber, IsNotEmpty,IsIn,IsEnum, isString, IsString } from 'class-validator';

export class GetPostsDto {
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @IsNumber()
    @IsNotEmpty()
    pageSize: number;

    @IsIn(['id', 'title', 'content','author','thumbnail', 'createdAt'])
    @IsNotEmpty()
    orderField: string;

    @IsEnum(['asc', 'desc'])
    @IsNotEmpty()
    orderDirection: 'asc' | 'desc';
}

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    content: string;
    
    @IsNotEmpty()
    @IsString()
    thumbnail: string;
    
    @IsNotEmpty()
    @IsString()
    title: string;
}