import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './GamePage.style.css';
import Timer from '../compoments/Timer';
import { enablebtns, subTimer, dispatchScore, resetTimer } from '../actions';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      click: false,
      nextBtnDisable: true,
    };
    this.btnHandle = this.btnHandle.bind(this);
    this.clickAnswer = this.clickAnswer.bind(this);
  }

  componentDidMount() {
    this.timerFunc();
  }

  componentDidUpdate() {
    const { timer } = this.props;
    if (timer <= 0) {
      clearInterval(this.setTimer);
    }
  }

  btnHandle() {
    const { enableBtns, resetDispatch } = this.props;
    enableBtns();
    this.setState((ps) => ({
      questionIndex: ps.questionIndex + 1,
      click: false,
      nextBtnDisable: true,
    }));
    resetDispatch();
    this.timerFunc();
  }

  // Essa função tbm deve setar o local storage
  // localStorage.setItem('ranking', JSON.stringify(infosGamePlayer));
  // infosGamePlayer = [
  //  { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
  // ]
  // const { nome, score,  } = this.props;
  // this.URL
  clickAnswer() {
    clearInterval(this.setTimer);
    this.setState({
      click: true,
      nextBtnDisable: false,
    });
    this.saveLocalScorage();
  }

  saveLocalScorage() {
    const { nome, score } = this.props;
    const infosGamePlayer = [{ name: nome, score, picture: this.URL }];
    localStorage.setItem('ranking', JSON.stringify(infosGamePlayer));
    localStorage.setItem('ranking', JSON.stringify(infosGamePlayer));
  }

  questionSection(results, questionIndex) {
    return (
      <section>
        <p data-testid="question-category">{results[questionIndex].category}</p>
        Question:
        <p data-testid="question-text">{results[questionIndex].question}</p>
      </section>
    );
  }
  //  hard: 3, medium: 2, easy: 1

  scoreUpdate(difficulty) {
    const { timer } = this.props;
    console.log(timer);
    let result = 0;
    const points = 10;
    const levelHard = 3;
    const levelMedium = 2;
    const levelEasy = 1;
    switch (difficulty) {
    case 'hard':
      console.log('hard');
      result = points + (timer * levelHard);
      return result;
    case 'medium':
      console.log('medium');
      result = points + (timer * levelMedium);
      return result;
    case 'easy':
      console.log('easy');
      result = points + (timer * levelEasy);
      return result;
    default:
      return result;
    }
  }

  answBtnCreator(results, questionIndex, click, disableBtn) {
    const result = results[questionIndex];
    const { difficulty } = result;
    const { upDateScore } = this.props;
    const btnCorrectAnsw = (
      <button
        key="correct-answer"
        className={ click ? 'rightAnswer' : null }
        onClick={ () => {
          this.clickAnswer();
          upDateScore(this.scoreUpdate(difficulty));
        } }
        type="button"
        data-testid="correct-answer"
        disabled={ disableBtn }
      >
        {result.correct_answer}
      </button>);

    const btnWrngAnsw = [...result.incorrect_answers.map((wrngAnsw, index) => (
      <button
        key={ index }
        onClick={ this.clickAnswer }
        className={ click ? 'wrongAnswer' : null }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        disabled={ disableBtn }
      >
        {wrngAnsw}
      </button>))];
    // const randomNb = 0.5;
    const allBtns = [...btnWrngAnsw, btnCorrectAnsw];
    // .sort(() => Math.random() - randomNb);
    return allBtns;
  }

  timerFunc() {
    const { timerDispatch } = this.props;
    const limit = 1000;
    this.setTimer = setInterval(() => timerDispatch(), limit);
  }

  urlCreator(email) {
    const hash = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return hash;
  }

  renderHeader(urlSrc) {
    const { nome, score } = this.props;
    return (
      <header>
        <img
          src={ urlSrc }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{nome}</h2>
        <h2
          data-testid="header-score"
        >
          Placar:
          { score }
        </h2>
      </header>
    );
  }

  render() {
    const { email, results, disableBtn } = this.props;
    const { questionIndex, click, nextBtnDisable } = this.state;
    const indexLimit = 4;
    this.URL = this.urlCreator(email);
    return (
      <div>
        {this.renderHeader(this.URL)}
        <Timer />
        {results && this.questionSection(results, questionIndex)}
        {results && this.answBtnCreator(results, questionIndex, click, disableBtn)}
        <br />
        <button
          type="button"
          onClick={ () => this.btnHandle() }
          disabled={ nextBtnDisable || indexLimit === questionIndex }
        >
          Próximo
        </button>
      </div>
    );
  }
}

// colocar um valor default para results proptypes
GamePage.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  timer: PropTypes.number.isRequired,
  disableBtn: PropTypes.bool.isRequired,
  enableBtns: PropTypes.func.isRequired,
  timerDispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  upDateScore: PropTypes.func.isRequired,
  resetDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  enableBtns: () => dispatch(enablebtns()),
  timerDispatch: () => dispatch(subTimer()),
  upDateScore: (result) => dispatch(dispatchScore(result)),
  resetDispatch: () => dispatch(resetTimer()),
});

const mapStateToProps = (state) => ({
  nome: state.loginReducer.login.nome,
  email: state.loginReducer.login.email,
  results: state.triviaReducer.questions.results,
  timer: state.triviaReducer.timer,
  disableBtn: state.triviaReducer.isDisable,
  score: state.triviaReducer.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
