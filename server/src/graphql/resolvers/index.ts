import merge from "lodash.merge"
import { bookingResolvers } from "./Booking"
import { listingResolvers } from "./Listing"
import { viewerResolver } from "./Viewer"
import { userResolvers } from "./User"

export const resolvers = merge(
  bookingResolvers,
  listingResolvers,
  userResolvers,
  viewerResolver
)