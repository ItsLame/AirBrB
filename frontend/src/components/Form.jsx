import React from 'react';

// Bootstrap Import
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

// Props (as per eslint)
import PropTypes from 'prop-types';

export const CustomForm = ({ title, fields, buttons, fieldValue }) => {
  CustomForm.propTypes = {
    title: PropTypes.string,
    fields: PropTypes.array,
    buttons: PropTypes.array,
    fieldValue: PropTypes.string,
  };

  const [fieldList, setFieldList] = React.useState([]);
  const [buttonList, setButtonList] = React.useState([]);

  // TODO: maybe simplify the whole thing
  // check length (to check if there's anything added/removed)
  if (fieldList.length < fields.length) {
    // temporary list
    const tempFieldList = fieldList;

    // add fields
    for (let i = fieldList.length; i < fields.length; i++) {
      const newField = (
        <FloatingLabel
          className="mb-3"
          key={fields[i][0]}
          // controlId="floatingInput"
          controlId={fields[i][0]}
          label={fields[i][1]}
        >
          <Form.Control
            type={fields[i][2]}
            value={fieldValue}
            onChange={(e) => (fieldValue = e.target.value)}
            // onChange={(e) => this.setState({ value: e.target.value })}
            placeholder={fields[i][3]}
          />
        </FloatingLabel>
      );

      // FIXME: not important but useState (not refreshing) when add new element
      tempFieldList.push(newField);
      setFieldList(tempFieldList);
    }
  } else if (fieldList.length > fields.length) {
    // temporary list
    let tempFieldList = fieldList;

    // gather keys
    const fieldsKeys = fields.map((x) => x[0]);

    // filter
    tempFieldList = tempFieldList.filter((x) => fieldsKeys.includes(x[0]));
    setFieldList(tempFieldList);
  }

  // add buttons
  if (buttonList.length < buttons.length) {
    // temporary list
    const tempButtonList = buttonList;

    // add buttons
    for (let i = buttonList.length; i < buttons.length; i++) {
      const newButton = (
        <Button
          key={buttons[i][0]}
          onClick={() => {
            buttons[i][2](fieldValue);
          }}
        >
          {/* // <Button key={buttons[i][0]} onClick={buttons[i][2]}> */}
          {buttons[i][1]}
        </Button>
      );

      // FIXME: not important but useState (not refreshing) when add new element
      tempButtonList.push(newButton);
      setButtonList(tempButtonList);
    }
  } else if (buttonList.length > buttons.length) {
    // temporary list
    let tempButtonList = buttonList;

    // gather keys
    const buttonsKeys = buttons.map((x) => x[0]);

    // filter
    tempButtonList = tempButtonList.filter((x) => buttonsKeys.includes(x[0]));
    setButtonList(tempButtonList);
  }

  return (
    <Card>
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body>
        {fieldList}
        {buttonList}
      </Card.Body>
    </Card>
  );
};
