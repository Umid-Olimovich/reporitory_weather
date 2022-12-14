import React, { useState, useEffect } from "react";

export default function Search_weather() {
  const [search, setSearch] = useState("Tashkent");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componetMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4390c35244cf72d4cc76bea5d557c634`
      );
      if (componetMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componetMounted = false;
      };
    };
    fetchWeather();
    console.log(data);
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }

  let temp1 = (data.main.temp - 273.15).toFixed(2);
  let min_temp = (data.main.temp_min - 273.15).toFixed(2);
  let max_temp = (data.main.temp_max - 273.15).toFixed(2);
  let cloud = data.weather[0].main;

  //  date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  // time
  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handelSumbit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                className="card-img "
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handelSumbit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="sumbit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h2 className="card-title">{data.name}</h2>
                  <p className="card-text lead">
                    {day}, {month} {date},{year}
                    <br />
                    {time}
                  </p>
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{temp1} &deg;C</h1>
                  <p className="lead fw-bolder mb-0 ">{cloud}</p>
                  <p className="lead  ">
                    {min_temp}&deg;C | {max_temp}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
