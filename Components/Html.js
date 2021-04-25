import React from "react";


const htmlContent = (main, other, user) => {
  return `
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pdf Content</title>
      <style>
          body {
              font-size: 16px;
              color: rgb(0, 0, 0);
          }
          div {
              font-size :14px;
              margin-left: 20px;
          }
  
          h1 {
              text-align: center;
          }
          #profilerow{
              height: 40px;
              display: flex;
              flex-direction: row;
              align-items: center;
          }
          #profilerowvalue{
              border-bottom: 1px solid black;
              min-width: 300px;
              font-size: 15px;
              margin-left: 10px;
          }
          #heading{
              display:flex;
              align-items: center;
              justify-content: center;
          }
          #profilerowlabel{
              font-size: 15px;
              font-weight: 600;
          }
          table {
              border: 1px solid black;
          }
          tr{
            border: 1px solid black;
          }
          th{
              margin:0px;
              border: 1px solid black;
          }
          td{
              border: 1px solid black;
              word-wrap: break-word;
              text-align:center;
              font-size: 15px;
          }
      </style>
  </head>
  <body>
        <h1>INDIAN INSTITUTE OF TECHNOLOGY</h1>
      <p id="heading">TRAVELLING ALLOWANCE REIMBURSEMENT/SETTLEMENT FORM</p>
      <div id="profile">
         <div id="profilerow">
             <p id="profilerowlabel">Name:</p>
             <p id="profilerowvalue" style="text-transform: capitalize">${user.name}</p>
         </div>
         <div id="profilerow">
             <p id="profilerowlabel">Department:</p>
             <p id="profilerowvalue">${user.dept}</p>
         </div>
         <div id="profilerow">
             <p id="profilerowlabel">Designation:</p>
             <p id="profilerowvalue">${user.desig}</p>
         </div>
         <div id="profilerow">
             <p id="profilerowlabel">Employee Code:</p>
             <p id="profilerowvalue">${user.ecode}</p>
         </div>
         <div id="profilerow">
             <p id="profilerowlabel">Basic pay(with rupees):</p>
             <p id="profilerowvalue">${user.pay}</p>
         </div>
         <div id="profilerow">
             <p id="profilerowlabel">Accout number:</p>
             <p id="profilerowvalue">${user.account}</p>
         </div>
      </div>
      <div>
          <p id="heading">TRAVEL EXPENSES</p>
          <table id="maintable" style="width:100%; table-layout:fixed" cellspacing="0";>
              <tr>
                  <th style="width: 62px">
                      Departure<br/>Date
                  </th>
                  <th style="width: 62px">
                      Departure<br/>Time
                  </th>
                  <th style="width: 75px">
                      Departure<br/>Place
                  </th>
                  <th style="width: 62px"> 
                      Arrival<br/>Date
                  </th>
                  <th style="width: 62px">
                      Arrival<br/>Time
                  </th>
                  <th style="width: 65px">
                      Arrival<br/>place
                  </th>
                  <th style="width: 70px">
                      Mode of travel
                  </th>
                  <th style="width: 65px">
                      Distance<br/>(in km.)
                  </th>
                  <th style="width: 65px">
                      Fare<br/>(in Rs.)
                  </th>
                  <th style="width: 80px">
                      PNR/<br/>Ticket number
                  </th>
                  <th style="width: 80px">
                      Remarks
                  </th>
              </tr>
              <tbody id="maintabledata">
                ${main}
              </tbody>
          </table>
      </div>
      <div style="margin-top:100px">
          <p id="heading">OTHER EXPENSES</p>
          <table id="othertable" style="width:100%; table-layout:fixed" cellspacing="0">
              <tr>
                  <th style="width:30%">
                      Details
                  </th>
                  <th style="width:20%">
                      Fare
                  </th>
                  <th style="width:50%">
                      Remarks
                  </th>
              </tr>
              <tbody id="othertabledata">
                    ${other}
              </tbody>
          </table>
      </div>
      <div style="margin-top:80px">
          <h4>Certified that</h4>
          <ul>
              <li>
                  All claims mentioned in this form correspond to actual expenditure incurred by me for which no reimbursement/claims have been
  made from any other source (Govt./Private/Others)
              </li>
              <li>
                  I was not provided with any free boarding/lodging/conveyance/registration fee waiver/travel coupons for which claim has been
  made.
              </li>
          </ul>
      </div>
      <div style="display: flex; justify-content: flex-end;width: 95%; margin-top:80px;">
          <p>Signature of the claimant with date</p>
      </div>
      <div>
          <p>No. of enclosures: __________________________________________</p>
          <p>Journey verified and forwarded </p>
          <br/><br/>
          <p>Signature of HOD/PI with date</p>
      </div>
      <script type="text/javascript">
        var other=[{detail: "hello", amountpaid: '1', receipt: "ok"}, {detail: "hello", amountpaid: '1', receipt: "ok"} ]
        buildmain(other)
        
        function buildmain(indata){
            var Table=document.getElementById('othertable')
            for(var i=0;i<indata.length; i++){
                var row = "<tr><td>" + indata[i].detail + "</td><td>" + indata[i].amountpaid+"</td><td>"+indata[i].receipt+"</td></tr>"
              Table.innerHTML +=row

            }
        }
        
        </script>
  </body>
  </html>
  

`;
};

export default htmlContent;
