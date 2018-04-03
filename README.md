# React+GraphQL
Example app to show how to create an app using React and GraphQL. 

This App acts as a catalog management system and uses some advanced VTEX IO GraphQL features, like `@autopersisted` and `@cacheControl` directives.

## Autopersisted Types
Once a GraphQL type is decorated with the `@autopersisted` directive, VTEX IO Builders automatically generates all CRUD operations for that type. If you want to know more about autopersisted types, read our [wiki](https://github.com/vtex/graphql-server/wiki/Features#autopersisted-types)

## Cached Types
VTEX IO GraphQL increases the performance of your queries by caching types decorated with `@cacheControl` hints directly in the CDN. To know more about GraphQL cache hints, visit [apollo](https://www.apollographql.com/docs/engine/caching.html)
