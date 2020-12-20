import React from "react"
import { useQuery } from "react-apollo"
import { RouteComponentProps } from "react-router-dom"
import { Content } from "antd/lib/layout/layout"
import { USER } from "../../lib/graphql/queries"
import { User as UserData, UserVariables } from "../../lib/graphql/queries/User/__generated__/User"
import { Col, Row } from "antd"
import { UserProfile } from "./components"
import { Viewer } from "../../lib/types"
import { ErrorBanner, PageSkeleton } from "../../lib/components"

interface Props {
  viewer: Viewer
}

interface MatchParams {
  id: string
}

export const User = ({ viewer, match }: Props & RouteComponentProps<MatchParams>) => {
  console.log('Match: ', match);

  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id
    }
  })

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist or we've encountered an error. Pleaase try again later." />
        <PageSkeleton />
      </Content>
    )
  }
  const user = data ? data.user : null
  const viewerIsUser = viewer.id === match.params.id
  const userProfileElement = user ? <UserProfile user={ user } viewerIsUser={ viewerIsUser } /> : null

  return (
    <Content className="user">
      <Row gutter={ 12 } justify="space-between">
        <Col xs={ 24 }>{ userProfileElement }</Col>
      </Row>
    </Content>
  )
}