import React from "react";
import axios from "axios";

// The HTML is generated at build time and will be reused on each request.
export default class extends React.Component {
  // getInitialProps() method gets the initial city weather and returns the data that is set as props for the page.
  // These props can be accessed using 'this.props' and are not editable.
  static async getInitialProps() {
    const baseUrlAPI = "http://api.weatherstack.com/";
    const typeRequest = "current";
    const keyWeatherStack = "456505a9d3924ff286e99ef678d0071b";
    const accessKey = "?access_key=" + keyWeatherStack;
    const querySearch = "&query=" + "Manchester";
    const request = baseUrlAPI + typeRequest + accessKey + querySearch;

    // we used to performed the AJAX call in the component’s componentDidMount()
    // on NextJS we will do it on: getInitialProps() which helps us set the props for a component
    try {
      const res = await axios.get(request);
      return { data: res.data };
    } catch (e) {
      return { error: e };
    }
  }

  // constructor() method initializes the state object with the values passed as props.
  // This state object will be updated every time we fetch weather location details for a specific user requested.
  constructor(props) {
    super(props);
    this.state = { data: props.data, error: props.error };
  }

  // getWeather() method handles the click event of the button and makes an API call every time the user requests details for a
  // specific weather location. The user id for the location is fetched from the input textbox and is sent as a parameter to the API call.
  // The state object is updated with the data returned by the API call. As soon as the state object is updated, React re-renders the view.
  getWeather = async () => {
    const baseUrlAPI = "http://api.weatherstack.com/";
    const typeRequest = "current";
    const keyWeatherStack = "456505a9d3924ff286e99ef678d0071b";
    const accessKey = "?access_key=" + keyWeatherStack;
    const querySearch =
      "&query=" + document.getElementById("inputTextbox").value;
    const request = baseUrlAPI + typeRequest + accessKey + querySearch;

    try {
      const res = await axios.get(request);
      this.setState({
        data: res.data,
        error: null,
      });
    } catch (e) {
      this.setState({
        data: null,
        error: e,
      });
    }
  };

  // render() method checks the state object and renders the UI with user details if the request
  // is successful or an error message if there is an error in the request.
  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Weather Location</h1>
          <br />
          <div className="center">
            <input id="inputTextbox" type="text"></input>
            <button type="button" onClick={this.getWeather}>
              Get Weather City
            </button>
          </div>
          <br />
          <p className="error">Error: {this.state.error.message}</p>
        </div>
      );
    } else {
      return (
        <div>
          <style jsx global>
            {`
              * {
                box-sizing: border-box;
              }
              body {
                font-family: "Source Sans Pro", sans-serif;
                font-weight: 300;
                background: url(http://bit.ly/2gPLxZ4);
                background-size: cover;
                color: white;
              }
              img {
                height: 50px;
                width: 50px;
                border: 1px solid black;
              }
              .weatherBlock {
                display: inline-block;
                text-align: center;
                border: 1px solid black;
                border-radius: 5px;
                padding: 10px;
                margin: 15px;
                width: 95%;
                background: steelblue;
              }
              .error {
                color: red;
                font-weight: bold;
                font-size: 28px;
                text-align: center;
              }
              @import url(
                https://fonts.googleapis.com/css?family=Source + Sans + Pro:200,
                300
              );
              h1 {
                font-size: 3em;
                text-align: center;
              }
              article {
                max-width: 600px;
                overflow: hidden;
                margin: 0 auto 50px;
              }
              .subtitle {
                margin: 0 0 2em 0;
              }
              .fancy {
                line-height: 0.555;
                text-align: center;
              }
              .fancy span {
                display: inline-block;
                position: relative;
              }
              .fancy span:before,
              .fancy span:after {
                content: "";
                position: absolute;
                height: 5px;
                border-bottom: 1px solid #000;
                border-top: 1px solid #fff;
                top: 0;
                width: 600px;
              }
              .fancy span:before {
                right: 100%;
                margin-right: 15px;
              }
              .fancy span:after {
                left: 100%;
                margin-left: 15px;
              }
            `}
          </style>

          <article>
            <h1>Weather forecast</h1>
            <p className="subtitle fancy">
              <span>Using SSR: Next and React</span>
            </p>

            <div className="center weatherBlock">
              <input id="inputTextbox" type="text"></input>
              <button type="button" onClick={this.getWeather}>
                Get Weather City
              </button>
            </div>
            <br />
            {console.log([this.state])}

            {[this.state.data].map((item, index) => (
              <div key={index} className="weatherBlock">
                <img src={item.current.weather_icons[0]} />
                <div className="UserDetails">
                  <p>City: {item.location.name}</p>
                  <p>Country: {item.location.country}</p>
                  <p>Humidity: {item.current.humidity}</p>
                  <p>Temperature: {item.current.temperature}</p>
                </div>
              </div>
            ))}
          </article>
        </div>
      );
    }
  }
}
