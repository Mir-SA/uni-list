import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [country, setCountry] = useState("India");
  const [uni, setUni] = useState([]);
  const [val, setVal] = useState("");

  const handleChange = (e) => {
    setTimeout(() => {
      setCountry(e.target.value);
    }, 1000);
  };

  const handleSelect = (e) => {
    setVal(e.target.value);
  };

  useEffect(() => {
    fetch(`http://universities.hipolabs.com/search?country=${country}`)
      .then((res) => res.json())
      .then((data) => setUni(data));
  }, [country]);

  return (
    <div className="App">
      <form>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          placeholder="Type in a country name"
          onChange={handleChange}
        />

        <label htmlFor="uni">Select University</label>
        <select name="" id="uni" onChange={handleSelect}>
          <option value="0">-- Select University --</option>
          {uni.map((university) => (
            <option key={university.id} value={university.id}>
              {university.name}
            </option>
          ))}
        </select>
      </form>

      {uni.map(function (u) {
        if (u.name === val) {
          return (
            <section key={u.id} className="details">
              <div>{val}</div>
              <span>
                {u["state-province"]} {u.country}
              </span>{" "}
              <br />
              <a href={u["web_pages"][0]} rel="noreferrer" target="_blank">
                Go to Website
              </a>
            </section>
          );
        }
      })}
    </div>
  );
}

export default App;
