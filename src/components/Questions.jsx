import React, { Component } from 'react';
import PropTypes from 'prop-types';

import QuestionTitle from './QuestionTitle';

import './Questions.css';

class Questions extends Component {
  render() {
    const {
      isRedBordered,
      isGreenBordered,
      incorrectAnswer,
      correctAnswer,
      isHidden,
      gameResults,
      counter,
      nextBtn,
      handleAnswer, isDisabled,
    } = this.props;
    // console.log(gameResults);
    return (
      <div>
        <QuestionTitle gameResults={ gameResults } counter={ counter } />
        <button
          data-testid="correct-answer"
          name="correct"
          type="button"
          className={ isGreenBordered }
          onClick={ () => handleAnswer(gameResults.difficulty, counter) }
          disabled={ isDisabled }
        >
          { correctAnswer }
        </button>
        { incorrectAnswer && incorrectAnswer.map((value, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            name="incorrect"
            type="button"
            className={ isRedBordered }
            key={ index }
            onClick={ handleAnswer }
            disabled={ isDisabled }
          >
            {value}
          </button>
        ))}
        <button
          data-testid="btn-next"
          type="button"
          hidden={ isHidden }
          onClick={ nextBtn }
        >
          Próxima
        </button>
      </div>
    );
  }
}

Questions.propTypes = ({
  incorrectAnswer: PropTypes.arrayOf().isRequired,
  correctAnswer: PropTypes.string.isRequired,
  nextBtn: PropTypes.func.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  gameResults: PropTypes.objectOf().isRequired,
  isRedBordered: PropTypes.string.isRequired,
  isGreenBordered: PropTypes.string.isRequired,
  isHidden: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
});

export default Questions;
