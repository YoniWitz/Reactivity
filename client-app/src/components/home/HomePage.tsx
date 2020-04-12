import React, { Fragment } from 'react'
import { Container, Segment, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IUser } from '../../app/models/IUser'

interface IProps {
    user: IUser | null;
}
export const HomePage: React.FC<IProps> = ({ user }) => {

    return (
        <Segment inverted textAlign='center' vertical>
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h2' inverted content={user ? 'Welcome Back ' + user.displayName : 'Welcome to Reactivity'} />
                {
                    user ?
                        (<Button as={Link} to='/activities' size='huge' inverted>
                            Go To Activities!
                        </Button>)
                        :
                        (<Fragment>
                            <Button as={Link} to='/login' size='huge' inverted>
                                Login
                            </Button>
                            <Button as={Link} to='/register' size='huge' inverted>
                                Register
                            </Button>
                        </Fragment>)
                }
            </Container>
        </Segment>
    )
}
