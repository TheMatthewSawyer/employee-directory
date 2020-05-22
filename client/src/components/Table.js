import React from 'react';

function Table() {

    React.useEffect(() => {
        populateTable();
    })

    function populateTable() {
        var curEmployeeList = JSON.parse(localStorage.getItem('employeeList'));
        if (curEmployeeList === null) {
            return;
        } else {
            let table = '';
            console.log(curEmployeeList.length);
            for (var i = 0; i < curEmployeeList.length; i++) {
                table +=
                `<tr className='${curEmployeeList[i].firstName}${curEmployeeList[i].lastName}' address='${curEmployeeList[i].address}' email='${curEmployeeList[i].email}'>
                    <td>${curEmployeeList[i].firstName}</td>
                    <td>${curEmployeeList[i].lastName}</td>
                    <td>${curEmployeeList[i].email}</td>
                    <td>${curEmployeeList[i].address}</td>
                </tr>`
            }
            document.getElementById('tableMain').innerHTML = table;
        }
    }



    return (
        <div>
            <div className='row'>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody id='tableMain'></tbody>
                        {/*  <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Table;