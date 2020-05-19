import React, { Component } from 'react'
import { withKeycloak } from '@react-keycloak/web'
import { moviesApi } from '../misc/MoviesApi'
import { handleLogError } from '../misc/Helpers'
import { Container, Form, Segment, Button, Divider, Grid } from 'semantic-ui-react'
import { getAvatarUrl } from '../misc/Helpers'
import { withRouter } from 'react-router-dom'

class UserSettings extends Component {
  state = {
    username: '',
    avatar: '',
    originalAvatar: '',
    imageLoading: false
  }

  async componentDidMount() {
    const { keycloak } = this.props

    try {
      const response = await moviesApi.getUserExtrasMe(keycloak.token)
      const { username, avatar } = response.data
      this.setState({ username, avatar, originalAvatar: avatar })
    } catch (error) {
      handleLogError(error)
    }
  }

  handleSuffle = () => {
    this.setState({ imageLoading: true })
    const { username } = this.state
    const avatar = username + Math.floor(Math.random() * 1000) + 1
    this.setState({ avatar })
  }

  handleCancel = () => {
    this.props.history.push("/home")
  }

  handleSave = async () => {
    const { avatar } = this.state
    const { keycloak } = this.props

    try {
      const userExtra = { avatar }
      await moviesApi.saveUserExtrasMe(keycloak.token, userExtra)
      keycloak['avatar'] = avatar
      this.props.history.push("/home")
    } catch (error) {
      handleLogError(error)
    }
  }

  handleImageLoad = () => {
    this.setState({ imageLoading: false })
  }

  render() {
    const { avatar, originalAvatar, imageLoading } = this.state
    const avatarImage = !avatar ? <></> : <img src={getAvatarUrl(avatar)} onLoad={this.handleImageLoad} alt='user-avatar' />

    return (
      <Container>
        <Grid centered>
          <Grid.Row>
            <Segment style={{ width: '330px' }}>
              <Form>
                <strong>Avatar</strong>
                <div style={{ height: 300 }}>
                  {avatarImage}
                </div>
                <Divider />
                <Button fluid onClick={this.handleSuffle} color='blue' disabled={imageLoading}>Shuffle</Button>
                <Divider />
                <Button.Group fluid>
                  <Button onClick={this.handleCancel}>Cancel</Button>
                  <Button.Or />
                  <Button disabled={originalAvatar === avatar} onClick={this.handleSave} positive>Save</Button>
                </Button.Group>
              </Form>
            </Segment>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(withKeycloak(UserSettings))
