import { Injectable } from '@nestjs/common';
import { type Cat } from '../graphql.schema';

@Injectable()
export class CatsService {
  private readonly cats: Array<Cat & { ownerId?: number }> = [
    { id: 1, name: 'Cat', age: 5, ownerId: 1 },
    { id: 2, name: 'Cat 2', age: 4, ownerId: 1 },
    { id: 3, name: 'Cat 3', age: 5, ownerId: 1 },
    { id: 4, name: 'Cat 4', age: 1, ownerId: 1 },
    { id: 5, name: 'Cat 5', age: 2, ownerId: 1 },
    { id: 6, name: 'Cat 6', age: 3, ownerId: 1 }
  ];

  create(cat: Cat): Cat {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat | undefined {
    return this.cats.find(cat => cat.id === id);
  }
}
