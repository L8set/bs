import React from 'react';
import { BRAIN_STORM_BASE_AREA } from '../common/classNames';
import { WordSearch } from './WordSearch';

/** ブレインストーミングアプリケーション 描画コンポーネント */
export const BrainStormCanvas: React.FC = () => {
  return (
    <div className={BRAIN_STORM_BASE_AREA}>
      <WordSearch />
    </div>
  );
};
