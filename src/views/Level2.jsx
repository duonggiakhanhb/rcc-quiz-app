import React, { Component } from "react";
import { Input, Button, Progress, Divider } from "antd";
import { level2 } from "../data";
import { Link } from "react-router-dom";
import Text from "antd/es/typography/Text";

export default class Level2 extends Component {
  state = {
    value: "",
    timeOut: false,
    round: 0,
    timer: 10,
    randomTense: "",
    wrongAnswer: "",
    wrongAnswers: [],
    keyId: 0,
  };
  handleClick = () => {};
  handleRestart = () => {
    this.setState({ timer: 10, timeOut: false, wrongAnswer: "" });
    this.startTimeOut();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  componentDidMount() {
    this.randomTenseFunction();
    this.startTimeOut();
  }
  startTimeOut = () => {
    this.timeOut = setTimeout(() => {
      this.setState({ timeOut: true });
    }, 10000);
    this.interval = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);
  };
  randomTenseFunction = async () => {
    const TenseArray = ["simple", "past"];
    const randomTenseValue = await TenseArray[
        Math.floor(Math.random() * TenseArray.length)
        ];
    console.log(randomTenseValue);
    this.setState({ randomTense: randomTenseValue });
  };
  checkMatched = () => {
    const { randomTense, round, value, wrongAnswers } = this.state;
    if (
        (randomTense === "simple" ? level2[round].simple : level2[round].past) ===
        value
    ) {
      this.setState({ round: round + 1, timer: 10, wrongAnswer: "" }, () => {
        this.randomTenseFunction();
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          this.setState({ timeOut: true });
        }, 10000);
      });
    } else {
      this.setState(
          {
            wrongAnswer:
                randomTense === "simple"
                    ? level2[round].simple
                    : level2[round].past,
          },
          () => {
            let subArray= [];
            subArray = subArray.concat([level2[round].voca, value, this.state.wrongAnswer]);
            console.log(subArray);
            this.setState({
              round: round + 1,
              timer: 10,
              wrongAnswers: wrongAnswers.concat([subArray]),
            });
            this.randomTenseFunction();
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
              this.setState({ timeOut: true });
            }, 10000);
          }
      );
    }
  };
  handleRedirect = () => {
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };
  handleSubmit = (event) => {
    const { timeOut, value } = this.state;
    event.preventDefault();
    if (timeOut) return alert("Please click restart");

    if (!value.trim()) return alert("Please type something");

    this.setState({ value: "", wrongAnswer: "" });
    this.checkMatched();
  };
  switchLevel = () => {
    this.setState((preState) => {
      return { keyId: preState.keyId ++ }
    })
  }
  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  render() {
    const {
      value,
      timeOut,
      round,
      timer,
      randomTense,
      wrongAnswer,
      wrongAnswers,
    } = this.state;
    return (
        <div
            style={{
              padding: "1rem",
              border: "1px solid grey",
              borderRadius: "4px",
              maxWidth: 400,
              margin: "3rem auto",
            }}
        >
          {round < level2.length ? (
              <>
                <h1>Quiz Game</h1>
                <Progress percent={(round / level2.length) * 100} status="active" />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h2>LEVEL 2</h2>
                  <h2> {round}</h2>
                </div>

                <span style={{ marginBottom: 0, color: "grey" }}> Infinitive</span>
                <h2>{level2[round].voca}</h2>
                <div style={{ fontSize: "1rem" }}>
                  Answer the voca's{" "}
                  <span style={{ color: "red" }}>
                {randomTense === "simple" ? "simple past" : "past participle"}
              </span>
                </div>
                <form style={{ padding: "1rem 0" }}>
                  <div style={{ display: "flex" }}>
                    <Input
                        name="value"
                        id="voca"
                        type="text"
                        value={value}
                        onChange={this.handleChange}
                    />
                    <Button type="submit" onClick={this.handleSubmit} className>
                      {" "}
                      Submit{" "}
                    </Button>
                  </div>
                  <div style={{ display: "flex" }}>
                    {!timeOut
                        ? <Text style={{ fontSize: 20, width: "100%",textAlign: "center" }}>{timer}</Text>
                        : <React.Fragment >
                          <Text style={{ display: "flex", width: "100%", flex: 4, textAlign: 'center', fontSize: 20, flexDirection: "row" }}>Game Over</Text>
                          <Button
                              style={{ display: "flex", flexDirection: "row" }}
                              onClick={this.handleRestart}>Click to Restart!
                          </Button>
                        </React.Fragment>
                    }



                  </div>
                  {wrongAnswer && (
                      <>
                        <Divider />
                        <h3> Wrong ! Correct Answer: </h3>
                        <div>
                          <li style={{ display: "block" }}>
                            <p style={{color: "green"}}>{wrongAnswer}</p>
                          </li>
                        </div>
                      </>
                  )}
                </form>
              </>
          ) : (
              <>
                <h1>{`Score: ${(1 - wrongAnswers.length /level2.length) * 100}`}</h1>
                <h2> Reviews the wrong answers</h2>
                {wrongAnswers.map((answer, index) => {
                  return (
                      <div key={index}>
                        <ul >
                          <li style={{ display:"flex", flexWrap: "wrap", width: "100%",
                            listStyleType: "circle"}}>
                          <p style={{textAlign:"left", width:70}}>{answer[0]}</p>
                          <p style={{color: "red", textAlign:"left", width:70}}>{answer[1]}</p>
                          <p style={{color: "green", textAlign:"left", width:70}}>{answer[2]}</p>
                          </li>
                        </ul>
                      </div>
                  );
                })}
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Button onClick={this.handleRedirect}>Retry</Button>
                  <Button onClick={this.handleRedirect}>

                    <Link to="/">Level1</Link>
                  </Button>
                </div>
              </>
          )}
        </div>
    );
  }
}
