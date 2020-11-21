import { IResolvers } from 'apollo-server-express'
import { Database, Listing } from '../../../lib/types'
import { ObjectId } from 'mongodb'

export const listingsResolvers: IResolvers = {
  Query: {
    listings: async (_root: undefined, _args: unknown, { db }: { db: Database }): Promise<Listing[]> => {
      return await db.listings.find({}).toArray()
    }
  },
  Mutation: {
    deleteListing: async (_root: undefined, { id }: { id: string }, { db }: { db: Database }): Promise<Listing> => {
      const result = await db.listings.findOneAndDelete({
        _id: new ObjectId(id)
      })
      if (!result.value) {
        throw new Error(`failed to delete record with ID ${id}`)
      }
      return result.value
    }
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString()
  }
}