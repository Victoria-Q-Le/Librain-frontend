import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {Form, Button} from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import {saveShippingAddress} from '../actions/cartActions'

const ShippingPage = () => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [address, setAddress] = useState(`${shippingAddress.address}`)
  const [city, setCity] = useState(`${shippingAddress.city}`)
  const [zip, setZip] = useState(`${shippingAddress.zip}`)
  const [state, setState] = useState(`${shippingAddress.state}`)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, zip, state}))
    navigate('/payment')
  }

  return(
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4/>
      <h1>Shipping</h1>
      <Form  onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address:</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter Address'
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City:</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter City'
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='zip'>
          <Form.Label>Zip code:</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter zip code'
            value={zip ? zip : ''}
            onChange={(e) => setZip(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='state'>
          <Form.Label>State: </Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter State'
            value={state ? state : ''}
            onChange={(e) => setState(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default ShippingPage
