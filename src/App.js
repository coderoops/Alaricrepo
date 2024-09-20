import React, { useState } from 'react';
import { Form, Button, Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updatedUsers = users.map((user, index) =>
        index === editIndex ? { name, age } : user
      );
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, { name, age }]);
    }

    setName('');
    setAge('');
  };

  const handleEdit = (index) => {
    setName(users[index].name);
    setAge(users[index].age);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((user, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div style={styles.bgImage}>
      <Container className="mt-5 p-5 bg-light rounded" style={styles.content}>
        <h2 className="text-center mb-4">User Form</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" block>
            {editIndex !== null ? 'Update' : 'Submit'}
          </Button>
        </Form>

        <h3 className="text-center mt-4">Submitted Users</h3>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(index)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

const styles = {
  bgImage: {
    backgroundImage: 'url("https://tse3.mm.bing.net/th?id=OIP.UflevW8uFuG6zw-4ZCDVnwHaE8&pid=Api&P=0&h=180")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background over image
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
};

export default App;
