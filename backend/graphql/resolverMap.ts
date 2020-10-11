import {IResolvers} from 'graphql-tools'
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import SelfUser from "./resolvers/SelfUser";
import DashGuild from "./resolvers/DashGuild";

export default {
    Query,
    Mutation,
    SelfUser,
    DashGuild
} as IResolvers