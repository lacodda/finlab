import { Injectable } from '@nestjs/common';
import { type Owner } from '../graphql.schema';

@Injectable()
export class OwnersService {
  private readonly owners: Owner[] = [{ id: 1, name: 'Jon', age: 5 }];

  findOneById(id: number): Owner | undefined {
    return this.owners.find(owner => owner.id === id);
  }
}
