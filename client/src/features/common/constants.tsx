/** ひらがな（基本） */
export const HIRAGANA = 'あいうえおゔかきくけこがぎぐげごさしすせそザジズゼゾたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわゐゑをん'.split('');
/** カタカナ（基本） */
export const KATAKANA = 'アイウエオヴカキクケコガギグゲゴサシスセソザジズゼゾタチツテトダヂヅデドナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヰヱヲン'.split('');
/** ひらがな（特殊） */
export const HIRAGANA_EX = 'ぁぃぅぇぉゃゅょゎー'.split('');
/** カタカナ（特殊） */
export const KATAKANA_EX = 'ァィゥェォャュョヮー'.split('');
/** ひらがな（全部） */
export const HIRAGANA_ALL = HIRAGANA.concat(HIRAGANA_EX);
/** カタカナ（全部） */
export const KATAKANA_ALL = KATAKANA.concat(KATAKANA_EX);

/** 仮名マップ（key: ひらがな, value: カタカナ） */
export const KANAMAP = HIRAGANA_ALL.reduce((map, hiragana, index) => {
  const katakana = KATAKANA_ALL[index];
  return map.set(hiragana, katakana);
}, new Map<string, string>());

/** 文字列検索用正規表現 */
export const RegularExpressions = {
  /** すべての平仮名を検索 */
  SEARCH_ALL_HIRAGANA: /[ぁ-ゔ]/g,
  /** カタカナ（すべての1文字） */
  ANY_KATAKANA: /[ァ-ヴ]/g,
  /** 片仮名単語であるかを判定 */
  IS_KATAKANA_WORD: /[ァ-ヴ][ァ-ヴー]*/,
  /** カタカナ以外の文字を検索 */
  SEARCH_ALL_NONKATAKANA: /[^ァ-ヴー]/g
};