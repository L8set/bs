関連語テーブル（`related_words`）

# カラム  
|物理名|論理名|型|NULL|KEY|DEFAULT|EXTRA|
|-|-|-|-|-|-|-|
|id|ID|INT|NO|PRIMARY KEY|-|AUTO_INCREMENT|
|name1_id|単語1|INT|NO|MULTIPLE KEY|-|-|
|name2_id|単語2|INT|NO|MULTIPLE KEY|-|-|
|cre_date|作成日|TIMESTAMP|NO|-|CURRENT_TIMESTAMP|-|
|upd_date|更新日|TIMESTAMP|NO|-|CURRENT_TIMESTAMP|ON UPDATE CURRENT_TIMESTAMP|
