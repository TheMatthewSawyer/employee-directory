import React, { useState } from 'react';
import Table from './components/Table';
import Add from './components/Add';
import Seed from './components/Seed.json';
var searchLength = 0;

function App() {
  var timer = null;
  const [AddEmployeeToggle, setAddEmployeeToggle] = useState(true);

  var curEmployeeList = JSON.parse(localStorage.getItem('employeeList'));
  var realEmployeeList = JSON.parse(localStorage.getItem('realEmployeeList'));


  React.useEffect(() => {
    if (curEmployeeList !== null && realEmployeeList !== null) {
      if (realEmployeeList.length > curEmployeeList.length) {
        localStorage.setItem('employeeList', JSON.stringify(realEmployeeList));
        let toggle = !AddEmployeeToggle;
        setAddEmployeeToggle(toggle);
        return;
      }
    }
  }, [])

  const sortAlphabetically = () => {
    var curEmployeeList = JSON.parse(localStorage.getItem('employeeList'));
    if (curEmployeeList === null) { return; }
    const chosen = document.getElementById('filterOptions').value;
    if (chosen === "default") {
      addSeed();
      return;
    }
    const sortedusers = curEmployeeList.sort(function (a, b) {
      var nameA = a[`${chosen}`].toUpperCase(); // ignore upper and lowercase
      var nameB = b[`${chosen}`].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1; //nameA comes first
      }
      if (nameA > nameB) {
        return 1; // nameB comes first
      }
      return 0;  // names must be equal
    });
    localStorage.setItem('employeeList', JSON.stringify(sortedusers));
    let toggle = !AddEmployeeToggle;
    setAddEmployeeToggle(toggle);
  }

  const tableFilter = () => {
    var realEmployeeList = JSON.parse(localStorage.getItem('realEmployeeList'));
    var curEmployeeList = JSON.parse(localStorage.getItem('employeeList'));

    if (curEmployeeList === null) { return; }
    var search = document.getElementById('searchBox').value;
    const chosen = document.getElementById('searchOptions').value;
    if (search === "") {
      searchLength = 0;
      localStorage.setItem('employeeList', JSON.stringify(realEmployeeList));
      let toggle = !AddEmployeeToggle;
      setAddEmployeeToggle(toggle);
      return;
    }
    let tmpOps = curEmployeeList;

    for (var i = 0; i < search.length; i++) {
      if (searchLength > search.length) {
        searchLength = 0;
        document.getElementById('searchBox').value = "";
        document.getElementById('searchBox').focus();
        localStorage.setItem('employeeList', JSON.stringify(realEmployeeList));
        let toggle = !AddEmployeeToggle;
        setAddEmployeeToggle(toggle);
        return;
      }
      searchLength = search.length;
      for (var x = 0; x < tmpOps.length; x++) {

        if ((search.slice(0, i + 1).toLowerCase() === tmpOps[x][`${chosen}`].slice(0, i + 1).toLowerCase()) === false) {
          tmpOps.splice(x, 1);
          localStorage.setItem('employeeList', JSON.stringify(tmpOps));
          let toggle = !AddEmployeeToggle;
          setAddEmployeeToggle(toggle);
        }

      }
    }
    // }
  }


  const empty = () => {
    localStorage.clear();
    window.location.reload(false);
  }

  const addSeed = () => {
    localStorage.setItem('realEmployeeList', JSON.stringify(Seed));
    localStorage.setItem('employeeList', JSON.stringify(Seed));
    let toggle = !AddEmployeeToggle;
    setAddEmployeeToggle(toggle);
  }

  const clear = () => {
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('address').value = "";
  }

  const addEmployee = (event) => {
    event.preventDefault();
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    firstName.style.border = '1px solid #ced4da';
    lastName.style.border = '1px solid #ced4da';
    email.style.border = '1px solid #ced4da';
    address.style.border = '1px solid #ced4da';
    if (isEmpty(firstName)) { return; }
    if (isEmpty(lastName)) { return; }
    if (isEmpty(email)) { return; }
    if (isEmpty(address)) { return; }
    var curEmployeeList = JSON.parse(localStorage.getItem('employeeList'));
    var length = 0;
    if (curEmployeeList !== null) {
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
    localStorage.setItem('employeeList', JSON.stringify(curEmployeeList));
    localStorage.setItem('realEmployeeList', JSON.stringify(curEmployeeList));
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
      <h1 style={{ textAlign: 'center', marginTop: '25px' }}>Employee Directory</h1>
      <div id='newUserInputContainer'>
        <div id='newUserInput'>
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
        </div>

        <div className="row newUserBtns">
          <div className="col-md-5"></div>
          <div className="col-md-1">
            <button onClick={clear}>clear</button>
          </div>
          <div className="col-md-1">
            <button onClick={addEmployee}>add</button>
          </div>
        </div>

      </div>
      <div className='options'>
        <div className="row">
          <div className="col-md-12">
            <div className='opTop'>Search by</div>
            <select name="Search Options" id="searchOptions">
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="address">Address</option>
            </select>
            <input id='searchBox' onChange={tableFilter}></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            Filter alphabetically by
            <select name="Filter Options" id="filterOptions" onChange={sortAlphabetically}>
              <option value="default">default</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="address">Address</option>
            </select>
          </div>
        </div>
      </div>
      <div className='formOptions'>
        <div className="row">
          <div className="col">
            <button onClick={empty}>Empty Form</button>
          </div>
          <div className="col">

          </div>
          <div className="col">
            <button onClick={addSeed}>Set to Seed (1000 Entries)</button>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
}

export default App;
