import React, { Component } from "react";
import ReactDOM from "react-dom";
import Progress from "./progress";
const axios = require("axios");
var body = [];

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      value: 0,
    };
  }

  componentDidMount = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(async ({ data }) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          await this.updateProgressValue(i, data);
        }
      });
  };

  updateProgressValue = (index, data) => {
    return new Promise((resolve, reject) => {
      try {
        if (this.state.value < 99) {
          setTimeout(() => {
            body.push(<div key={index}>{data[index].title}</div>);
            this.setState(
              (prevState) => {
                //Progress Bar Pertage - Data Processing Time Taken
                return { value: prevState.value + (1 / data.length) * 100 };
              },
              () => {
                resolve(true);
              }
            );
          }, 500);
        } else {
          this.setState(
            {
              loading: false,
            },
            () => {
              resolve(false);
            }
          );
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="center">
            <Progress value={this.state.value} />
          </div>
        ) : (
          body
        )}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
