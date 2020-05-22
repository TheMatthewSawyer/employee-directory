import React, { useState } from 'react';
import Table from './components/Table';
import './App.css';
import Add from './components/Add';

function App() {

  const [AddEmployeeToggle, setAddEmployeeToggle] = useState(true);

  // React.useEffect(() => {
  //   // getStorage();
  // });

  function addEmployee(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    firstName.style.border = '1px solid #ced4da';
    lastName.style.border = '1px solid #ced4da';
    email.style.border = '1px solid #ced4da';
    address.style.border = '1px solid #ced4da';
    if(isEmpty(firstName)){return;}
    if(isEmpty(lastName)){return;}
    if(isEmpty(email)){return;}
    if(isEmpty(address)){return;}
    var curEmployeeList = JSON.parse(localStorage.getItem('employeeList'));
    var length = 0;
    if(curEmployeeList !== null) {
      length = curEmployeeList.length;
    } else {
      curEmployeeList = [];
    }
    let newEmployee = {
      id: length,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      address: address.value,
    };
    curEmployeeList.push(newEmployee);
    console.log(curEmployeeList);
    localStorage.setItem('employeeList', JSON.stringify(curEmployeeList));
    let toggle = !AddEmployeeToggle;
    setAddEmployeeToggle(toggle);
  }

  function isEmpty(obj, red = true) {
    if (obj.value === null || obj.value === "" || /\s/g.test(obj.value) === "") {
      if (red) {
        obj.style.border = "2px solid red";
      }
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="App container">
      <div className="row">
        <div className="col-md-6">
          <Add type="text" name="firstName" disp="First Name" />
        </div>
        <div className="col-md-6">
          <Add type="text" name="lastName" disp="Last Name" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Add type="text" name="email" disp="Email" />
        </div>
        <div className="col-md-6">
          <Add type="text" name="address" disp="Address" />
        </div>
      </div>
      <button onClick={addEmployee}>Add!</button>

      <div className='options'>
        <div className="row">
          <div className="col-md-10">

          </div>
          <div className="col-md-2">
            
          </div>
        </div>
        
      </div>
      
      <Table />
    </div>
  );
}

export default App;
