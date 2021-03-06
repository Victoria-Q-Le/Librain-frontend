import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import {Form, Button, Row, Col} from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'


const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const userRegister = useSelector(state => state.userRegister)

  const {error, loading, userInfo} = userRegister

  useEffect(() => {
    if(userInfo) {
      navigate('/')
    }
  },[navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== password2){
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }

  }
  return(
    <FormContainer>
      <h1>Register </h1>
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
            required
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
            required
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button className='my-3' type='submit' variant='primary'> Register </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Return Customer?
          <Link to='/login'>
             Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register
