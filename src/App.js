import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})
  const [validationStates, setValidationStates] = useState({ emailState: false, passwordState: false });
  const [inicio, setInicio] = useState({ emailState: false, passwordState: false });

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {
    setFormValues({...formValues, password: e.target.value})

    //Validate password
    setValidationStates({...validationStates, passwordState: e.target.value.length >= 9 && e.target.value.match(/[a-zA-Z]/) && e.target.value.match(/[0-9]/)})
  });
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const exitPasword = () => {
    setInicio({...inicio, passwordState: true})
  }

  const clickSubmit = (() => {
    const e = formValues.email
    const EMAIL_REGEX = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/
    const emailValid = EMAIL_REGEX.test(e)

    setInicio({...inicio, emailState: true})

    //Validate email
    setValidationStates({...validationStates, emailState: emailValid})



    //Call fetch
    if (emailValid && validationStates.passwordState) {
      alert(JSON.stringify(formValues))
    } else {
      alert("Please fill the form correctly")
    }

  })

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} isValid={inicio.emailState ? validationStates.emailState : null} isInvalid={inicio.emailState ? !validationStates.emailState: null}/>
        { !validationStates.emailState && <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} isValid={inicio.passwordState ? validationStates.passwordState: null} isInvalid={inicio.passwordState ? !validationStates.passwordState: null} onBlur={exitPasword} />
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;
