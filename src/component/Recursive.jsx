import React, { useState } from "react";
import { Card, Accordion, Form, Button } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";

import Styles from "./style.module.css";
const Recursive = ({ data, name, handleData }) => {
 
  const [show, setShow] = useState(false);

  // data change in input field
  const handleChange = (value) => {
    handleData({ name, data: value });
  };

  // add child
  const handleAddChild = (value) => {
    let newAddChildData = { ...data };

    if (newAddChildData.children) {
      newAddChildData.children.push(value);
    } else {
      delete newAddChildData.data;
      newAddChildData.children = [value];
    }

    handleData(newAddChildData);
  };

  // recursive data
  const handleRecursiveData = (value) => {
    let newName = value.name;
    let index = newName.slice(newName.length - 1, newName.length) - 1;
    let newData = [...data.children];
    newData[index] = value;
    handleData({ name, children: newData });
  };

  // accordion function
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, (key) =>
      console.log("totally custom!")
    );

    return (
      <div className={Styles.accordionBtnContainer}>
        <span>
          <Button type="button" onClick={decoratedOnClick} variant="warning">
            {show ? <BiSolidDownArrow /> : <BiSolidRightArrow />}
          </Button>
          {children}
        </span>
        <Button
          variant="warning"
          onClick={() =>
            handleAddChild({
              name:
                name === "root"
                  ? `child${data.children.length + 1}`
                  : `${name}-child${
                      data?.children ? data?.children?.length + 1 : 1
                    }`,
              data: "new Data",
            })
          }
        >
          Add Child
        </Button>
      </div>
    );
  }

  return (
    <div className={Styles.mainContainer}>
      <Accordion
        defaultActiveKey="0"
        onSelect={(e) => (e ? setShow(true) : setShow(false))}
        className="bg-red"
      >
        <Card>
          <Card.Header>
            <CustomToggle eventKey={name}>{name}</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={name}>
            <Card.Body>
              {data?.children ? (
                (data?.children ?? []).map((item) => (
                  <div key={item.name}>
                    <Recursive
                      name={item?.name}
                      data={item}
                      handleData={(value) => handleRecursiveData(value)}
                    />
                  </div>
                ))
              ) : (
                <>
                  <Form.Label className={Styles.label}>Data:</Form.Label>
                  <Form.Control
                    value={data?.data ?? ''}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Recursive;
