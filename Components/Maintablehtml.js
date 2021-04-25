import React from "react";

const Maintablehtml = (data) => {
  const main = data.main;
  var tablebody = "";
  for (var i = 0; i < main.length; i += 1) {
    const row = `
    <tr>
      <td>
        ${main[i].departure.date}
      </td>
      <td>
        ${main[i].departure.time}
      </td>
      <td>
        ${main[i].departure.place}
      </td>
      <td>
        ${main[i].arrival.date}
      </td>
      <td>
        ${main[i].arrival.time}
      </td>
      <td>
        ${main[i].arrival.place}
      </td>
      <td>
        ${main[i].mode}
      </td>
      <td>
        ${main[i].distance}
      </td>
      <td>
        ${main[i].fare}
      </td>
      <td>
        ${main[i].pnr}
      </td>
      <td>
        ${main[i].remarks}
      </td>
  
    </tr>`;
    tablebody += row;
  }
  return tablebody;
};

export default Maintablehtml;
