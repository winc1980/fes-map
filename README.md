# fes-map

## アーキテクチャ図

```mermaid
architecture-beta
    group client[Client Apps]
    service PrivateApi(cloud)[GraphQL]

    service CAS(internet)[Maru Students] in client
    service CAA(internet)[Maru Admins] in client
    service FMA(internet)[FesMap Admins] in client
    service FMV(internet)[FesMap Visitors] in client

    group api(cloud)[Serverless Api]
      group apiGw [API Gateway] in api
        service cloudFunctions(server)[Cloud Functions] in apiGw
      service Auth(cloud)[Auth Service] in api
      service Authorize(cloud)[Authorize Service] in api
      service Supabase(database)[Supabase Postgres] in api
      service Wasabi(disk)[Wasabi AWSS3] in api
      service Ext1(internet)[LIFF API] in api
      service Ext2(internet)[MapBox API] in api

    %%group mainApi(logos:aws-lambda)[Main Api] in api
      %%service UserInfo(database)[User Info] in mainApi
      %%service CircleInfo(database)[Circle Info] in mainApi
      %%service EventInfo(database)[Event Info] in mainApi
      %%service PavillionManage(database)[Pavillion Manage] in mainApi
      %%service VisitorActivity(database)[Visitors Activity] in mainApi
      %%service CircleSearch(database)[Circle Search] in mainApi
      %%service CircleSNS(database)[Circle SNS] in mainApi
      %%service VisitorDataAnalyse(database)[Visitor Data Analyse] in mainApi


  junction jAppsApi1
  junction jAppsApi2
  junction jAppsApic
  junction jAppsApi3
  junction jAppsApi4

  CAS:R -- L:jAppsApi1
  CAA:R -- L:jAppsApi2
  FMA:R -- L:jAppsApi3
  FMV:R -- L:jAppsApi4
  jAppsApi1:B -- T:jAppsApi2
  jAppsApi2:B -- T:jAppsApic
  jAppsApic:B -- T:jAppsApi3
  jAppsApi3:B -- T:jAppsApi4
  jAppsApic:R -- L:PrivateApi

  PrivateApi:R -- L:cloudFunctions


  junction jGwExt1
  junction jGwExt2
  junction jGwExt3
  junction jGwExt4
  junction jGwExt5
  junction jGwExt6

  Auth:L -- R:jGwExt1
  Authorize:L -- R:jGwExt2
  Supabase:L -- R:jGwExt3
  Wasabi:L -- R:jGwExt4
  Ext1:L -- R:jGwExt5
  Ext2:L -- R:jGwExt6

  jGwExt1:B -- T:jGwExt2
  jGwExt2:B -- T:jGwExt3
  jGwExt3:B -- T:jGwExt4
  jGwExt4:B -- T:jGwExt5
  jGwExt5:B -- T:jGwExt6
  jGwExt3:L -- R:cloudFunctions

```


## ディレクトリ構造

```
/fesmap
├── .git/ # Gitリポジトリ関連のファイル
├── .firebase/ # Firebase関連の設定ファイル
├── .github/ # GitHub関連の設定ファイル
├── circle-form/ # サークルフォーム関連のディレクトリ
├── functions/ # クラウドファンクション関連のコード
├── manage/ # 管理用のスクリプトやツール
├── user/ # ユーザー関連のデータやスクリプト
├── README.md # プロジェクトの概要と説明
├── firebase.json # Firebaseの設定ファイル
├── .firebaserc # Firebaseプロジェクトの設定
├── architecture.md # アーキテクチャに関する詳細な説明
├── Architecture.drawio # アーキテクチャ図のソースファイル
└── .gitignore # Gitで無視するファイルのリスト
```