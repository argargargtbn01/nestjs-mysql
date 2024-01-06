import { Entity } from 'typeorm';

@Entity()
export class Article {
  id: number;
  isPublished: boolean;
  authorId: number;
}
