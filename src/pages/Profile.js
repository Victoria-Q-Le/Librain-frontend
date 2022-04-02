import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import {Form, Button, Row, Col} from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

const ProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const {error, loading, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin


  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile



  useEffect(() => {
    if(!userInfo) {
      navigate('/login')
    } else {
      if(!user || !user.name || success){
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== password2){
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({'id': user.id,'name':name, 'email':email, 'password': password}))
    }
  }
  return(
    <Row>
      <Col md={3}>
        <h3>User Profile</h3>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              required
              type='name'
              placeholder='Enter Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='password2'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Button className='my-3' type='submit' variant='primary'> Update </Button>
        </Form>

      </Col>

      <Col md={9}>
        <h3>My Orders</h3>
      </Col>

    </Row>
  )
}

export default ProfilePage
