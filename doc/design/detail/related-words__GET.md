# コントローラー層（HTTP接続の出入口）  
1. HTTPリクエストを受け取る。  
    1. アクセス元から下記JSONが渡される。    
        ```
        {
            "wordName": "", // 関連語を検索する言葉
            "wordType": 1, // 品詞ID
            "maxCount": 20, // 関連語最大表示数（未設定の場合は20とする）
            "sameWordSearchFlg": true // 表記ゆれ考慮フラグ
        }
        ```
    1. 上記JSONを受け取るためのデータクラスを用意する。  
        - JSONと同じプロパティを持つデータクラス`RelatedWordsGetRequest`を`data`パッケージ配下に作る。  
        - `RelatedWordsGetRequest`のプロパティ`maxCount`には初期値として`20`を設定しておく。  
    1. `Application`のメソッドを使用して、リクエストのJSONから`RelatedWordsGetRequest`のオブジェクトを作成する。  
1. HTTPレスポンスを送信する。  
    1. `RelatedWordsGetRequest`をサービス層の関数に渡してデータベースから対象のデータを収集する。  
    1. リクエストは下記のJSONで送信するため、これと同じプロパティ構造を持ったデータクラス`RelatedWordsGetResponse`を作成する。  
        ```
        {
            "ok": true, // APIの実行結果
            "message": "", // 実行時メッセージ（エラーメッセージなど）
            "words": [
                {
                    "id": 1 // 関連語ID
                    "name": "", // 関連語
                    "type": "", // 関連語の品詞
                },
                {
                    "id": 2
                    "name": "",
                    "type": "",
                }
            ],
            "count": 2 // 収集した関連語の数（"words"に入っている単語の数）
        }
        ```
    1. 収集したデータを`RelatedWordsGetResponse`型のオブジェクトとして受け取る。  
    2. 受け取ったオブジェクトを`Application`のメソッドを使用して送信する。  

# サービス層(DB接続の出入口)  
1. `RelatedWordsGetRequest`オブジェクトを引数として受け取る。  
1. 対象語句が単語一覧テーブルに登録済みかを確認する。  
    1. `words`テーブルに下記条件を満たすレコードが存在するかを調べる。  
        - `words`の`name`が`RelatedWordsGetRequest`の`wordName`と一致する。  
        - `words`の`type`が`RelatedWordsGetRequest`の`wordType`と一致する。  
    1. 条件を満たすレコードの存在有無によって処理を分岐する。  
        - レコードが存在する場合  
            1. 対象レコードの`words.id`(`mainWordId`)を取得する。  
        - レコードが存在しない場合  
            1. `words`テーブルに新規レコードを追加しID(`mainWordId`)を取得する。  
            1. `RelatedWordsGetResponse`型のオブジェクトに下記の値を設定して返却する。  
                - `mainWordId`: `mainWordId`
                - `words`: 空のリスト  
                - `count`: 0  
1. 関連語リストを生成する。   
    1. データベースから対象レコードを取得する。  
        - `RelatedWordsGetResponse`の`sameWordSearchFlg`が`false`の場合
            1. `ralated_words`に下記テーブルを内部結合する(innerJoin)。  
                - `words`: `ralated_words.word_id_2 eq words.id`を結合条件とする。  
            1. 結合したテーブルから下記のカラムを取得対象として設定する(slice)。  
                - `words.id`  
                - `words.name`  
                - `words.type`   
            1. 下記条件のレコードを取得する(select)。  
                - `related_words.word_id_1 eq mainWordId`  
            1. 重複レコードを削除する(withDistinct)。 
        - `RelatedWordsGetResponse`の`sameWordSearchFlg`が`true`の場合  
            1. `same_words`に下記テーブルを内部結合する(innerJoin)。  
                - `related_words`: `same_words.word_id_1 eq related_words.word_id_1 or same_words.word_id_2 eq related_words.word_id_1`を結合条件とする。  
                - `words`: `ralated_words.word_id_2 eq words.id`を結合条件とする。  
            1. 結合したテーブルから下記のカラムを取得対象として設定する(slice)。  
                - `words.id`  
                - `words.name`   
                - `words.type`  
            1. 下記条件のレコードを取得する(select)。  
                - `same_words.word_id_1 eq mainWordId`に一致する。  
            1. 重複レコードを削除する(withDistinct)。  
    1. 取得したレコードからランダムに`RelatedWordsGetResponse.maxCount`の件数だけ絞り込む(shuffled)。  
    1. 絞り込んだ各レコードを`WordWithId`型オブジェクトのリストに変換する(map)。  
        - `WordWithId`データクラスは下記プロパティを持つ。  
            - `id`: Int型  
            - `name`: String型  
            - `type`: Int型    
    1. 生成したリストを変数`wordList`に代入する。  
1. HTTPレスポンス用オブジェクトを返却する。  
    1. `RelatedWordsGetResponse`型のオブジェクトに下記の値を設定して返却する。  
        - `mainWordId`: `mainWordId`
        - `words`: `wordList`    
        - `count`: `wordList.size`  
