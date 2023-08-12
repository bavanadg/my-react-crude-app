import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const App: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await axios.get<Person[]>('/api/person');
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  const createPerson = async () => {
    try {
      const response = await axios.post<Person>('/api/person', {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      });
      setPersons([...persons, response.data]);
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <div>
        <h2>Create Person</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={createPerson}>Create</button>
      </div>
      <div>
        <h2>Persons</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              {person.first_name} {person.last_name} ({person.phone_number})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
