import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from '../common/directives/upper-case.directive';

export const getGraphQLConfig = (): ApolloDriverConfig => ({
  driver: ApolloDriver,
  autoSchemaFile: 'schema.gql',
  transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
  installSubscriptionHandlers: true,
  buildSchemaOptions: {
    directives: [
      new GraphQLDirective({
        name: 'upper',
        locations: [DirectiveLocation.FIELD_DEFINITION]
      })
    ]
  }
});
