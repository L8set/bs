# コントローラー層   
1. HTTPリクエストを受け取る。  
    1. アクセス元から下記JSONが渡される。    
        ```
        {
            "mainWordId": 1, // 関連語を追加する言葉のID
            "words": [ // 追加する言葉リスト
                {
                    "name": "", // 追加する言葉
                    "type": 2 // 追加する言葉の品詞ID
                },
                {
                    "name": "",
                    "type": 1
                }
            ]
        }
        ```
    1. 上記JSONを受け取るためのデータクラスを用意する。  
        - JSONと同じプロパティを持つデータクラス`RelatedWordsPostRequest`を`data`パッケージ配下に用意する。 
        - 単語リストの各要素を入れるためのデータクラス`WordWithoutId`も同様に用意する。  
    1. `Application`のメソッドを使用して、リクエストのJSONから`RelatedWordsPostRequest`のオブジェクトを作成する。  
1. HTTPレスポンスを送信する。  
    1. `RelatedWordsPostRequest`をサービス層の関数に渡してデータベースから対象のデータを収集する。  
    1. リクエストは下記のJSONで送信するため、これと同じプロパティ構造を持ったデータクラス`RelatedWordsPostResponse`を用意する。  
        ```
        {
            "ok": true, // APIの実行結果
            "message": "", // 実行時メッセージ（エラーメッセージなど）
        }
        ```
    1. 収集したデータを`RelatedWordsPostResponse`型のオブジェクトとして受け取る。  
    2. 受け取ったオブジェクトを`Application`のメソッドを使用して送信する。  

# サービス層  
1. `RelatedWordsPostRequest`オブジェクトを引数として受け取る。  
1. `RelatedWordsPostRequest`の`words`に設定されている各要素(`WordWithoutId`オブジェクト)について、下記の処理を実行する。  
    1. 単語のIDを取得する。  
        1. `WordWithouId`の`name`と`type`に一致するレコードを`words`テーブルから取得する。  
            - 対象レコードが取得できた場合。  
                1. レコードのIDを変数`targetId`に代入する。  
            - 対象レコードが取得できなかった場合。  
                1. 新規レコードを登録する。  
                1. 登録したレコードのIDを取得し、変数`targetId`に代入する。  
    1. 関連語登録を行う。 
        1.  関連語登録状態を確認する。  
            1. `related_words`テーブルから下記条件に一致するレコードを検索する。  
                - `word_id_1`カラムの値が`RelatedWordsPostRequest`の`mainWordId`に一致する。  
                - `word_id_2`カラムの値が`targetId`に一致する。  
            1. 対象レコードが存在する場合、次要素の処理に進む。  
        1. 下記内容で`related_words`テーブルに新規レコードを登録する。  
            - `word_id_1`: `mainWordId`  
            - `word_id_2`: `targetId`  
    1. 次要素の処理へ進む。  
1. HTTPレスポンスとして`ok`と`message`のみを含む`BaseRequest`のオブジェクトを返却する。  
