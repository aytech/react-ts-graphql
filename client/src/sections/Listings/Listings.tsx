import React from 'react'
import { gql } from 'apollo-boost'
import {
  useMutation,
  useQuery
} from 'react-apollo'
import { Listings as ListingsData } from './__generated__/Listings'
import {
  DeleteListing_deleteListing as DeleteListingData,
  DeleteListingVariables
} from './__generated__/DeleteListing'
import { ListingsSkeleton } from './ListingsSkeleton'
import {
  Alert,
  Avatar,
  Button,
  List,
  Spin
} from 'antd'
import './Listings.css'

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`
const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

interface Props { title: string }

export const Listings = ({ title }: Props) => {

  const { data, error, loading, refetch } = useQuery<ListingsData>(LISTINGS)
  const [ deleteListing, {
    error: deleteListingError,
    loading: deleteListingLoading
  } ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } })
    refetch()
  }

  const listings = data ? data.listings : null
  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={ listings }
      renderItem={ (listing) => (
        <List.Item actions={ [
          <Button
            type="primary"
            onClick={ () => handleDeleteListing(listing.id) }>
            Delete
          </Button>
        ] }>
          <List.Item.Meta
            title={ listing.title }
            description={ listing.address }
            avatar={
              <Avatar
                src={ listing.image }
                shape="square"
                size={ 48 } />
            } />
        </List.Item>
      ) } />
  ) : null

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={ title } />
      </div>
    )
  }

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={ title } error />
      </div>
    )
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Semething went wrong with deleting..."
      className="listings__alert" />
  ) : null

  return (
    <div className="listings">
      <Spin spinning={ deleteListingLoading }>
        <h2>{ title }</h2>
        { listingsList }
        { deleteListingErrorAlert }
      </Spin>
    </div>
  )
}