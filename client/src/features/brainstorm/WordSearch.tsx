import React, { useState, useEffect } from 'react';
import { AutoKana, bind as bindAutoKana } from 'vanilla-autokana';
import { convertAnyToKatakana } from '../common/Utils';

let autokana: AutoKana;

/** 単語検索コンポーネント */
export const WordSearch: React.FC = () => {

  // ステートフックによりstate変数と更新関数を宣言
  const [name, setName] = useState('name');
  const [kana, setKana] = useState('kana');

  // 副作用フックにより初回レンダー時処理を設定
  useEffect(() => {
    setName('');
    setKana('');
    autokana = bindAutoKana('#name', '#kana');
  }, []);

  const updateInputWord = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    setKana(autokana.getFurigana());
  };

  const convertToKatakana = (e: React.FormEvent<HTMLInputElement>) => {
    const currentKana = e.currentTarget.value;
    const convertedKana = convertAnyToKatakana(currentKana);
    setKana(convertedKana);
  };

  return (
    <form>
      <h3>検索したい言葉を入力してください。</h3>
      <div>
        <label htmlFor="name">言葉</label>
        <input name="name" id="name" value={name} onInput={updateInputWord} />
      </div>
      <div>
        <label htmlFor="kana">読み仮名</label>
        <input name="kana" id="kana" value={kana} onInput={convertToKatakana} />
      </div>
    </form>
  );
};
