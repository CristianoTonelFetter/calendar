import React from 'react';

import classNames from 'classnames';

import style from './App.module.scss';

const App: React.FC = () => {
  return (
    <div id="calendar" className={style.calendar}>
      <div className={style.header}>Sunday</div>
      <div className={style.header}>Monday</div>
      <div className={style.header}>Tuesday</div>
      <div className={style.header}>Wednesday</div>
      <div className={style.header}>Thurday</div>
      <div className={style.header}>Friday</div>
      <div className={style.header}>Saturday</div>

      <div className={classNames(style.cell, style.disabled)}>1</div>
      <div className={style.cell}>2</div>
      <div className={style.cell}>3</div>
      <div className={style.cell}>4</div>
      <div className={style.cell}>5</div>
      <div className={style.cell}>6</div>
      <div className={style.cell}>7</div>

      <div className={style.cell}>8</div>
      <div className={style.cell}>9</div>
      <div className={style.cell}>10</div>
      <div className={style.cell}>11</div>
      <div className={style.cell}>12</div>
      <div className={style.cell}>13</div>
      <div className={style.cell}>14</div>

      <div className={style.cell}>15</div>
      <div className={style.cell}>16</div>
      <div className={style.cell}>17</div>
      <div className={style.cell}>18</div>
      <div className={style.cell}>19</div>
      <div className={style.cell}>20</div>
      <div className={style.cell}>21</div>

      <div className={style.cell}>22</div>
      <div className={style.cell}>23</div>
      <div className={style.cell}>24</div>
      <div className={style.cell}>25</div>
      <div className={style.cell}>26</div>
      <div className={style.cell}>27</div>
      <div className={style.cell}>28</div>

      <div className={style.cell}>29</div>
      <div className={style.cell}>30</div>
      <div className={style.cell}>31</div>
      <div className={style.cell}>1</div>
      <div className={style.cell}>2</div>
      <div className={style.cell}>3</div>
      <div className={style.cell}>4</div>
    </div>
  );
}

export default App;
