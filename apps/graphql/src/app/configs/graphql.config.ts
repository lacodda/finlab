import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from '../common/directives/upper-case.directive';
import { type IAuthContext } from '../common/interfaces/auth.interface';

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
  },
  subscriptions: {
    'subscriptions-transport-ws': {
      onConnect: (connectionParams: { Authorization: string }): IAuthContext => {
        const authorization = connectionParams.Authorization;
        if (!authorization) {
          throw new Error('Token is not valid');
        }
        return { authorization };
      }
    }
  }
});
