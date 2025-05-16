import { useEffect, useState } from "react";
import "./Graph.css";

const Dummy_Graph = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setOriginalData(data);
        setFilteredData(data);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handleFilter = (e) => {
    const inputValue = e.target.value;
    setFilterValue(inputValue);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = filterValue.trim().toLowerCase();
    if (!query) {
      setFilteredData(originalData);
      return;
    }

    const result = originalData.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredData(result);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={filterValue}
          onChange={handleFilter}
          placeholder="Search by name or email"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table>
        <thead id="heading">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: user.id % 2 === 0 ? "yellow" : "white",
              }}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Total Number of Records: {filteredData.length}</h3>
      </div>
    </div>
  );
};

export default Dummy_Graph;
