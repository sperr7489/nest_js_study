import { BadRequestException } from '@nestjs/common';
import { IsNumber, IsNotEmpty,IsIn,IsEnum, isString, IsString, IsOptional } from 'class-validator';

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

export class PutPostDTO{
        @IsOptional()
        @IsNotEmpty()
        title: string;
      
        @IsOptional()
        @IsNotEmpty()
        content: string;
      
        @IsOptional()
        author: string;
      
        @IsOptional()
        thumbnail: string;
      
        // 하나 이상의 필드가 존재하는지 검사하는 메서드 추가
        validateOneExist() {
          const { title, content, author, thumbnail } = this;
          if (!title && !content && !author && !thumbnail) {
            throw new BadRequestException('적어도 하나의 데이터는 보내야 한다.');
        }
      }


}