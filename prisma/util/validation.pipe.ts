import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Post } from '@prisma/client';

export class PostFieldValidationPipe implements PipeTransform {
  transform(value: string): string {
    const postFields: (keyof Post)[] = ['id', 'title', 'author', 'content', 'thumbnail', 'createdAt'];
    if (!postFields.includes(value as keyof Post)) {
      throw new BadRequestException(`Invalid order field ${value}`);
    }
    return value;
  }
}
