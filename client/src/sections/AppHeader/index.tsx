import React, { useEffect, useState } from "react"
import { Header } from "antd/lib/layout/layout"
import logo from "./assets/tinyhouse-logo.png"
import { Link, withRouter, RouteComponentProps } from "react-router-dom"
import { Input } from 'antd'
import { MenuItems } from "./components"
import { Viewer } from "../../lib/types"
import { displayErrorMessage } from "../../lib/utils"

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

const { Search } = Input

export const AppHeader = withRouter(({ viewer, setViewer, location, history }: Props & RouteComponentProps) => {

  const [ search, setSearch ] = useState("")
  const onSearch = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      history.push(`/listings/${ trimmedValue }`)
    } else {
      displayErrorMessage("Please enter a valid search")
    }
  }

  useEffect(() => {
    const { pathname } = location
    const pathParts = pathname.split("/")
    if (!pathname.includes("/listings")) {
      setSearch("")
      return
    }
    if (pathname.includes("/listings") && pathParts.length === 3) {
      setSearch(pathParts[ 2 ])
    }
  }, [ location ])

  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src={ logo } alt="TinyHouse logo" />
          </Link>
        </div>
        <div className="app-header__search-input">
          <Search
            placeholder="Search 'San Francisco'"
            enterButton
            onChange={ event => setSearch(event.target.value) }
            onSearch={ onSearch }
            value={ search }
          />
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={ viewer } setViewer={ setViewer } />
      </div>
    </Header>
  )
})
