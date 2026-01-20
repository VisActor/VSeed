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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the post.',
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  async getPost(@Param('id') id: string): Promise<PostEntity> {
    const post = await this.postService.post({ id: Number(id) });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Return all posts.',
    type: [PostEntity],
  })
  async getPosts(): Promise<PostEntity[]> {
    return this.postService.posts();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: PostEntity,
  })
  async createPost(@Body() postData: CreatePostDto): Promise<PostEntity> {
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
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: PostEntity,
  })
  async updatePost(
    @Param('id') id: string,
    @Body() postData: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: postData,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
    type: PostEntity,
  })
  async deletePost(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
