import React from "react"
import { Link } from "react-router-dom"
import { Card } from "antd"
import Title from "antd/lib/typography/Title"
import Text from "antd/lib/typography/Text"
import { UserOutlined } from "@ant-design/icons"
import { formatListingPrice, iconColor } from "../../utils"

interface Props {
  listing: {
    id: string
    title: string
    image: string
    address: string
    price: number
    numOfGuests: number
  }
}

export const ListingCard = ({ listing }: Props) => {
  const { id, title, image, address, price, numOfGuests } = listing

  return (
    <Link to={ `/listing/${ id }` }>
      <Card
        hoverable
        cover={
          <div
            style={ { backgroundImage: `url(${ image })` } }
            className="listing-card__cover-img" /> }>
        <div className="listing-card__description">
          <Title level={ 4 } className="listing-card__price">
            { formatListingPrice(price) }
            <span> / day</span>
          </Title>
          <Text strong ellipsis className="listing-card__title">
            { title }
          </Text>
          <Text ellipsis className="listing-card__address">
            { address }
          </Text>
        </div>
        <div className="listing-card__dimensions listing-card__dimensions--guests">
          <UserOutlined style={ { color: iconColor } } />&nbsp;
        <Text>{ numOfGuests } guests</Text>
        </div>
      </Card>
    </Link>
  )
}