import { KANAMAP, RegularExpressions } from './constants';

/**
 * 任意文字列⇒片仮名変換.
 * @param word 対象文字列
 * @return 平仮名を片仮名にした上で、片仮名のみを抽出した文字列
 */
export const convertAnyToKatakana = (word: string) => {
  return extractKatakana(convertHiraganaToKatakana(word));
};

/**
 * ひらがな⇒カタカナ変換.
 * @param word 対象文字列
 * @returns ひらがなをすべてカタカナに変換した文字列
 */
export const convertHiraganaToKatakana = (word: string) => {
  return word.replace(RegularExpressions.SEARCH_ALL_HIRAGANA, hiragana => {
    const katakana = KANAMAP.get(hiragana);
    if (typeof katakana === 'string') {
      return katakana;
    } else {
      return hiragana;
    }
  })
};

/**
 * カタカナ部分抽出
 * @param word 対象文字列
 * @returns カタカナ以外の文字を削除した文字列
 */
export const extractKatakana = (word: string) => {
  return word.replace(RegularExpressions.SEARCH_ALL_NONKATAKANA, match => '');
};

/**
 * カタカナ単語判定
 * @param word 対象文字列
 * @returns 判定結果（true: すべてカタカナの単語、false: カタカナ以外を含む文字列）
 */
export const isKatakanaWord = (word: string) => {
  return RegularExpressions.IS_KATAKANA_WORD.test(word);
};

export const validateKatakanaWord = (word: string) => {
  if (!isKatakanaWord(word)) {
    
  }
};