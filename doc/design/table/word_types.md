品詞テーブル（`word_types`）  

# カラム  
|物理名|論理名|型|NULL|KEY|DEFAULT|EXTRA|
|-|-|-|-|-|-|-|
|id|ID|INT|NO|PRIMARY KEY|-|AUTO_INCREMENT|
|name|品詞名|VARCHAR(3)|NO|UNIQUE KEY|-|-|
|cre_date|作成日|TIMESTAMP|NO|-|CURRENT_TIMESTAMP|-|
|upd_date|更新日|TIMESTAMP|NO|-|CURRENT_TIMESTAMP|ON UPDATE CURRENT_TIMESTAMP|
