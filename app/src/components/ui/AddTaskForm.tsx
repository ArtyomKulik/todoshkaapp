import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AddTaskForm({
  taskSubmitHandler,
}: {
  taskSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}): React.JSX.Element {
  return (
    <Form onSubmit={taskSubmitHandler} className="mb-3">
      <Row className="align-items-center">
        <Col xs={12} sm={9} className="mb-2">
          <Form.Control
            size="lg"
            type="text"
            placeholder="What needs to be done?"
            name="text"
            minLength={3}
            maxLength={100}
            required
          />
        </Col>
        <Col xs={12} sm={3}>
          <Button type="submit" className="w-100">
            Ok
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
