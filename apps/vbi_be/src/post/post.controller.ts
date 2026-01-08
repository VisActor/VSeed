import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostModel> {
    const post = await this.postService.post({ id: Number(id) });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Get()
  async getPosts(): Promise<PostModel[]> {
    return this.postService.posts();
  }

  @Post()
  async createPost(
    @Body()
    postData: {
      title: string;
      content?: string;
      authorEmail: string;
      published?: boolean;
    },
  ): Promise<PostModel> {
    const { title, content, authorEmail, published } = postData;
    return this.postService.createPost({
      title,
      content,
      published,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() postData: { title?: string; content?: string; published?: boolean },
  ): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: postData,
    });
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
