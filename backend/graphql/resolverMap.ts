import {IResolvers} from 'graphql-tools'
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import SelfUser from "./resolvers/SelfUser";

export default {
    Query,
    Mutation,
    SelfUser
} as IResolvers