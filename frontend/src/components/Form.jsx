import React from 'react';

// Bootstrap Import
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CustomForm = ([[key, label, type, placeholder]]) => {
  const [fieldList] = React.useState([
    <FloatingLabel key="login-emailz" controlId="floatingInput" label="Email Address">
      <Form.Control type="email" placeholder="name@example.com" />
    </FloatingLabel>
  ]);

  // const addField = () => {
  //   const tempFieldList = fieldList;

  //   const newField = (
  //     <FloatingLabel key={key} controlId="floatingInput" label={label}>
  //       <Form.Control type={type} placeholder={placeholder} />
  //     </FloatingLabel>
  //   )

  //   tempFieldList.push(newField);
  //   setFieldList(tempFieldList);
  //   console.log(tempFieldList)
  // }

  return (
    <>
      <Card>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          {/* {addField()} */}
          {fieldList}
        </Card.Body>
      </Card>
    </>
  );
}

// export default App;
