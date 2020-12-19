import React from "react"
import { Header } from "antd/lib/layout/layout"
import logo from "./assets/tinyhouse-logo.png"

export const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-selection">
        <div className="app-header__logo">
          <img src={ logo } alt="TinyHouse logo" />
        </div>
      </div>
    </Header>
  )
}
