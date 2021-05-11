const Othertablehtml = (data) => {
  const other = data.other;
  var tablebody = "";
  for (var i = 0; i < other.length; i += 1) {
    const row = `
    <tr>
      <td>
        ${other[i].detail}
      </td>
      <td>
        ${other[i].amountpaid}
      </td>
      <td>
        ${other[i].receipt}
      </td>
    </tr>`;
    tablebody+=row;
  }
  return tablebody
};

export default Othertablehtml;