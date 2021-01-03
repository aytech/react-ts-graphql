import React from "react"
import { Link } from "react-router-dom"
import { Card, Col, Row } from "antd"

import Title from "antd/lib/typography/Title"
import Search from "antd/lib/input/Search"

import torontoImage from "../../assets/toronto.jpg"
import dubaiImage from "../../assets/dubai.jpg"
import laImage from "../../assets/los-angeles.jpg"
import londonImage from "../../assets/london.jpg"

interface Props {
  onSearch: (value: string) => void
}

export const HomeHero = ({ onSearch }: Props) => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title>Find a play you'll love to stay at</Title>
        <Search
          placeholder="Search 'San Francisco'"
          size="large"
          enterButton
          className="home-hero__search-input"
          onSearch={ onSearch } />
      </div>
      <Row gutter={ 12 } className="home-hero__cards">
        <Col md={ 6 } xs={ 12 }>
          <Link to="/listings/Toronto">
            <Card cover={ <img src={ torontoImage } alt="Toronto" /> }>
              Toronto
          </Card>
          </Link>
        </Col>
        <Col md={ 6 } xs={ 12 }>
          <Link to="/listings/Dubai">
            <Card cover={ <img src={ dubaiImage } alt="Dubai" /> }>
              Dubai
          </Card>
          </Link>
        </Col>
        <Col md={ 6 } xs={ 0 }>
          <Link to="/listings/Los%20Angeles">
            <Card cover={ <img src={ laImage } alt="Los Angeles" /> }>
              Los Angeles
          </Card>
          </Link>
        </Col>
        <Col md={ 6 } xs={ 0 }>
          <Link to="/listings/London">
            <Card cover={ <img src={ londonImage } alt="London" /> }>
              London
          </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}