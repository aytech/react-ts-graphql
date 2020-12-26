import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { LISTING } from '../../lib/graphql/queries'
import { Listing as ListingData, ListingVariables } from '../../lib/graphql/queries/Listing/__generated__/Listing'
import { Content } from 'antd/lib/layout/layout'
import { ErrorBanner, PageSkeleton } from '../../lib/components'
import { ListingBookings, ListingCreateBooking, ListingDetails } from './components'
import { Col, Row } from 'antd'
import { Moment } from 'moment'

interface MatchParams {
  id: string
}

const PAGE_LIMIT = 3

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [ bookingsPage, setBookingsPage ] = useState(1)
  const [ checkInDate, setCheckInDate ] = useState<Moment | null>(null)
  const [ checkOutDate, setCheckOutDate ] = useState<Moment | null>(null)

  const { loading, data, error } = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id: match.params.id,
      bookingsPage,
      limit: PAGE_LIMIT
    }
  })

  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="This listing does not exist or we've encountered an error, please try again soon!" />
        <PageSkeleton />
      </Content>
    )
  }

  const listing = data ? data.listing : null
  const listingBookings = listing ? listing.bookings : null

  const listingDetailsElement = listing ? <ListingDetails listing={ listing } /> : null

  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      listingBookings={ listingBookings }
      bookingsPage={ bookingsPage }
      limit={ PAGE_LIMIT }
      setBookingsPage={ setBookingsPage } />
  ) : null

  const listingCreateBookingElement = listing ? (
    <ListingCreateBooking
      price={ listing.price }
      checkInDate={ checkInDate }
      checkOutDate={ checkOutDate }
      setCheckInDate={ setCheckInDate }
      setCheckOutDate={ setCheckOutDate }
    />
  ) : null

  return (
    <Content className="listings">
      <Row gutter={ 24 } justify="space-between">
        <Col xs={ 24 } lg={ 14 }>
          { listingDetailsElement }
          { listingBookingsElement }
        </Col>
        <Col xs={ 24 } lg={ 10 }>
          { listingCreateBookingElement }
        </Col>
      </Row>
    </Content>
  )
}