import { useEffect, useState } from "react";
import sun from "../src/assets/sun.png";
import snowFall from "../src/assets/snowFall.png";
import rainandthunder from "../src/assets/rainandthunder.png";
import rain from "../src/assets/rain.png";
import moon from "../src/assets/moon.png";
import litesun from "../src/assets/litesun.png";
import hevayrain from "../src/assets/hevayrain.png";
import cloud from "../src/assets/cloud.png";
import chillcolud from "../src/assets/chillcolud.png";
import humidityi from "../src/assets/humidity.png";
import wind_speedimg from "../src/assets/windspeed.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/body.css"


function App() {
  const [icon, seticon] = useState(sun);
  const [temp, settemp] = useState(0);
  const [city, setcity] = useState("Coimbatore");
  const [tcity, tsetcity] = useState("Coimbatore");
  const [contry, setcontry] = useState("india");
  const [lati, setlati] = useState(0);
  const [long, setlong] = useState(0);
  const [humiditys, sethumidity] = useState(0);
  const [wind, setwind] = useState(0);
  const [cityNotfount, setcityNotfount] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const weathercode = {
    1000: sun,
    1003: litesun,
    1006: cloud,
    1030: chillcolud,
    1063: rain,
    1066: snowFall,
    1087: rainandthunder,
    1192: hevayrain,
    1135: moon,
  };

  const search = async () => {
    setloading(true);
    let url = `https://api.weatherapi.com/v1/current.json?key=876fd3d7689b415ea5310841231803&q=${tcity}`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === "404") {
        console.error("City not found");
        setcityNotfount(true);
        setloading(false);
        return;
      }
      sethumidity(data.current.humidity);
      setwind(data.current.wind_kph);
      settemp(data.current.temp_c);
      setcity(data.location.name);
      setcontry(data.location.country);
      setlati(data.location.lat);
      setlong(data.location.lon);

      let dta = data.current.condition.code;

      seticon(weathercode[dta] || icon);
      setcityNotfount(false);
    } catch (error) {
      console.log("Error", error);
      seterror("Can't find the Weather data");
    } finally {
      setloading(false);
    }
  };

  const handilcity = (e) => {
    tsetcity(e.target.value);
  };

  const Entersearch = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(function () {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className=" h-100 w-100 mt-5">
          <div className="card">
            <div className="row">
<div className="col-10 col-md-4 mx-auto">
<input
              type="text"
              placeholder="Enter City"
              className=" form-control   mt-5 "
              onChange={handilcity}
              onKeyDown={Entersearch}
              value={tcity}
            />
</div>
            
            </div>
            <button type="button" onClick={search} className="btn btn-success col col-lg-1 mx-auto mt-3">Search</button>
            <div className="card-body mt-1">
              <div className="row">

           

              <div className="col-12 col-md-6 text-center">
                <img src={icon} alt="WeatherImg" className=" img " style={{height:"75%",width:"75%"}} />
              </div>
<div className="col-12 col-md-6">


              <div className=" text-center h3">{temp}°C</div>
              <div className="location text-center fw-bold h3">{city}</div>
              <div className="contry text-center h4">{contry}</div>
              <div className="cordinate row col-6 mx-auto">
                <div className="col-6 text-center">
                  <span>latitude:</span>
                  <span>{lati}</span>
                </div>
                <div className="col-6 text-center">
                  <span>longitude:</span>
                  <span>{long}</span>
                </div>
              </div>

              <div>
                <div className="float-start">
                  <img
                    src={humidityi}
                    alt="Humidity"
                    className=""
                    style={{ height: "20px", width: "20px" }}
                  />
                  <br />
                  <span>Humidity</span> <br />
                  <span>{humiditys}%</span>
                </div>
                <div className="float-end mb-2">
                  <img src={wind_speedimg} alt="windspeed" style={{ height: "20px", width: "20px" }}/>
                  <br />
                  <span>Wind-Speed</span>
                  <br />
                  <span>{wind}Km/h</span>
                </div>
                {loading && (
                  <div className="loading text-success text-center h4 mt-3 ">
                    Loading...
                  </div>
                )}
                {error && (
                  <div className="error text-danger text-center h4 mt-3 ">
                    Weather Featch Error !
                  </div>
                )}
                {cityNotfount && (
                  <div className="citynotfound text-danger text-center h4 mt-3">
                    City Not Found ?
                  </div>
                )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
