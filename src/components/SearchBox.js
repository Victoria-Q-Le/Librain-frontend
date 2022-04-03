import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    if(keyword){
      navigate(`/?keyword=${keyword}`)
    } else {
      navigate(navigate().location.pathname)
    }

  }
  return(
    <Form onSubmit={submitHandler}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
        inline>
      </Form.Control>

      <Button
        type='submit'
        variant='outline-primary'
        className='p-2'> Submit
      </Button>
    </Form>
  )

}

export default SearchBox
