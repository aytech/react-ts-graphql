import React from "react"
import { Header } from "antd/lib/layout/layout"
import logo from "./assets/tinyhouse-logo.png"
import { Link } from "react-router-dom"
import { MenuItems } from "./components"
import { Viewer } from "../../lib/types"

interface Props {
  viewer: Viewer
  setViewer: (viewer: Viewer) => void
}

export const AppHeader = ({ viewer, setViewer }: Props) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-selection">
        <div className="app-header__logo">
          <Link to="/">
            <img src={ logo } alt="TinyHouse logo" />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={ viewer } setViewer={ setViewer } />
      </div>
    </Header>
  )
}
