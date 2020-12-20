import merge from "lodash.merge"
import { viewerResolver } from "./Viewer"
import { userResolvers } from "./User"

export const resolvers = merge(userResolvers, viewerResolver)