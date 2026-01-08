export class PostEntity {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
}
