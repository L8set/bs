import React, {FormEvent, FunctionComponent} from 'react';
import {AutoKana, bind as bindAutoKana} from 'vanilla-autokana';

/** 単語検索ステート */
interface WordSearchState {
  name: string;
  kana: string;
}

/** 単語検索コンポーネント */
export const WordSearch: React.FunctionComponent = () => {
  let state : WordSearchState;
  let autokana: AutoKana;

  function componentDidMount() {
    autokana = bindAutoKana('#name', '#kana');
  }
  function onNameInput(e: React.FormEvent<HTMLInputElement>) {
    state = {
      name: e.target.value,
      kana: AutoKana.getFurigana()
    };
  }

  return (
    <form>
      <h3>検索したい言葉を入力してください。</h3>
      <div>
        <label htmlFor="name">言葉</label>
        <input name="name" id="name" value={this.state.name} onInput={onNameInput} />
      </div>
    </form>
  );
};