import React, { Fragment } from 'react'
import { Container, Segment, Header, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IUser } from '../../app/models/IUser'

interface IProps{
    user: IUser
}
export const HomePage: React.FC<IProps> = ({user}) => {

    return (
        <Segment inverted textAlign='center' vertical>
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1' inverted>
                    <Image
                        size='massive'
                        src="/assets/logo.png"
                        alt='logo'
                        style={{ marginBottom: 12 }}
                    />
                    Reactivities
                </Header>

                <Header as='h2' inverted content={user ? 'Welcome to Reactivities' : 'Welcome Back'} />
                {
                    user.token ? 
                    (<Button as={Link} to='/activities' size='huge' inverted>
                            Go To Activities!
                    </Button>)
                    :
                    (<Fragment>
                        <Button as={Link} to='/login' size='huge' inverted>
                            Login
                        </Button>
                        <Button as={Link} to='/login' size='huge' inverted>
                            Register
                        </Button>
                    </Fragment>)
                }
            </Container>
        </Segment>
    )
}
