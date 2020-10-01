語句テーブル(`words`)

# カラム  
|物理名|論理名|型|NULL|KEY|DEFAULT|EXTRA|
|-|-|-|-|-|-|-|
|id|ID|INT|NO|PRIMARY KEY|-|AUTO_INCREMENT|
|name|単語名|VARCHAR(150)|NO|MULTIPLE KEY|-|-|
|kana|読み仮名|VARCHAR(300)|NO|-|-|-|
|type|品詞|INT(1)|NO|MULTIPLE KEY|-|-|
|cre_date|作成日|TIMESTAMP|NO|-|CURRENT_TIMESTAMP|-|
