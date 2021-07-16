import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerButton } from '../actions';

class TimerComponent extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.timer = this.timer.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
  }

  componentDidMount() {
    const second = 1000;
    setInterval(() => this.timer(), second);
  }

  componentDidUpdate() {
    const { buttonClick, rightBtnClicked } = this.props;
    if (buttonClick) {
      clearInterval(1);
      const stopTime = document.querySelector('.timer');
      // const difficulty = document.querySelector('.difficulty');
      const question = document.querySelector('#question');
      const difficulty = question.getAttribute('difficulty');
      // const rightBtn = document.querySelector('.green-border');
      // const score = this.setScore();
      const score = rightBtnClicked
        ? this.setScore(stopTime.innerHTML, difficulty)
        : 0;
      this.updateLocalStorage(score);
    }
  }

  setScore(timer, difficulty) {
    const ten = 10;
    const questionLevel = (dif) => {
      const one = 1;
      const two = 2;
      const three = 3;
      switch (dif) {
      case 'easy':
        return one;
      case 'medium':
        return two;
      case 'hard':
        return three;
      default:
        break;
      }
    };
    // const score = 10 + (timer * questionLevel(obj1));
    return ten + (timer * questionLevel(difficulty));
  }

  updateLocalStorage(score) {
    const player = JSON.parse(localStorage.getItem('state'));
    player.player.score = score;
    localStorage.setItem('state', JSON.stringify(player));
    console.log(player);
  }

  timer() {
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }
      ));
    }
    if (seconds === 0) {
      const { updateButton } = this.props;
      updateButton();
    }
  }

  render() {
    const { seconds } = this.state;
    const { buttonClick } = this.props;
    return (
      <div>
        <div>
          <p className="timer">{ seconds }</p>
        </div>
        <div>
          { buttonClick && <button type="button" data-testid="btn-next">Próxima</button> }
        </div>
      </div>
    );
  }
}

TimerComponent.propTypes = {
  updateButton: PropTypes.func.isRequired,
  buttonClick: PropTypes.bool.isRequired,
  rightBtnClicked: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  buttonClick: state.triviaReducer.buttonClick,
  rightBtnClicked: state.triviaReducer.rightBtnClicked,
});

const mapDispatchToProps = (dispatch) => ({
  updateButton: (state) => dispatch(timerButton(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimerComponent);
