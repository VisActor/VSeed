export class CreatePostDto {
  title: string;
  content?: string;
  authorEmail: string;
  published?: boolean;
}
