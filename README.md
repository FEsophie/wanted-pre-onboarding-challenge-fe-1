# 리액트 쿼리 Todo구현 프로젝트

# 기술스택

- React
- React-Query
- styled-component

# 프로젝트 세팅 - CRA로 프로젝트 세팅

CRA로 설치 시 장점

- webpack 또는 Babel과 같은 도구를 설치하거나 구성할 필요 가 **없음**
- 구성이나 복잡한 폴더 구조가 없으며 앱을 빌드하는 데 필요한 파일만 있음
- 새로 생성된 프로젝트 내에서 몇 가지 기본 제공 명령을 실행할 수 있음

```jsx
npx create-react-app my-app --template typescript
```

CRA 설치후 폴더 구조

```json
wanted-pre-onboarding-challenge-fe-1
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html //페이지 템플릿
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src // JS 및 CSS 파일을 안에src 넣어야 합니다. 그렇지 않으면 webpack에서 볼 수 없음
		├── components //공통 컴포넌트
		├── containers // 페이지
		├── hooks // 자주 사용하는 훅
		├── module //스토어 관리
		├── styles //스타일 관리
		├── utils //유틸 함수 관리
		├── service // api 관리
		├── public
    ├── App.css
    ├── App.tsx
    ├── App.test.tsx
    ├── index.css
    ├── index.ts // 자바스크립트 진입점
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
```

package.json

```json
{
  "name": "react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.6",
    "@types/react": "^18.0.26",
    "@types/react-dom": "^18.0.9",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.4",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

## script

- **`npm start` :** 개발 모드에서 앱을 실행합니다. 기본적으로 [http://localhost:3000](http://localhost:3000/) 로 브라우저에서 실행
- **`npm test`:** 마지막 변경된 파일과 관련된 **테스트 감시자를 실행**
- **`npm eject`: 자세한 리액트 앱의 구성 확인할 때 사용,** *Webpack, Babel, ESLint, etc. 숨겨져있는* 앱을 build하기 위한 모든 구성요소들을 한번에 볼 수 있음
- **`npm run build`: 앱 배포 준비 /**프로덕션용 앱을 `build`폴더에 빌드함 / 프로덕션 모드에서 React를 올바르게 번들로 묶고 최상의 성능을 위해 빌드를 최적화시킴

설치 라이브러리

- `eslint` + `prettier` + Typescript
    - npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
    - npm i -D prettier eslint-config-prettier eslint-plugin-prettier
- `eslint-plugin-react`  리액트와 타입스크립트를 함께 사용하기 위해 설치
    - npm i -D eslint-plugin-react
        - .eslintrc.json 설정
            
<img width="749" alt="스크린샷 2022-12-09 오전 11 57 36" src="https://user-images.githubusercontent.com/99181656/206882066-ebc03155-9877-45e4-a24e-2d78b6764d1f.png">

            

- `styled-components`
- `lodash`
- `react-query`
- `query-string`
- `dayjs`
- `axios`
- `react-bootstrap`
- `react-router-dom`

# 이슈

### react-router-dom 버전 업그레이드

[https://reactrouter.com/en/main](https://reactrouter.com/en/main) 문서 참고

**React Router Dom이 v6로 업그레이드 되면서 평소처럼 작성했던 문법들에 에러가 발생하는것을 알게되었다.**

React Router Dom의 버전이 V6로 변경되면서 이전에 사용되던 Hooks나 기능들이 변경되었기 때문!

변경된 부분에서 내가 참고했던 몇가지들을 정리해보았음

<aside>
💡

- <Route /> 컴포넌트 여러개를 감싸는 부모 컴포넌트의 네이밍이 ****Switch 에서 Routes로**** 변경됨
- ****exact 옵션 삭제되고 매칭되는 컴포넌트를 알아서 보여줌
(****다만 하위 페이지가 있다면 부모 Route에 '/*' 을 추가해줘야 함)
- ****<Route />에서 컴포넌트 렌더링시 element props 사용****
- ****history, useHistory의 기능이 useNavigate로 통합됨****
- **path에 부모 경로까지 적을 필요 없이 파라미터만 적으면 됨**
- ****withRouter, useRouteMatch, match 기능 사라짐****

</aside>

### 백엔드 서버와 프론트를 연동하다가 생긴 이슈

백엔드 서버를 클라이언트에 연결하는 과정에서 에러가 발생

- 에러 메세지 화면

<img width="899" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-11_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_2 43 26" src="https://user-images.githubusercontent.com/99181656/206882114-94e7886d-9e32-4348-9433-dea26e69380b.png">

- 에러를 확인할 때 ||=라는 잘못된 문자열이 들어가 있다는 것으로 이해하고 
처음에 코드에서 해당 문자를 = 로 수정하였다.
    
<img width="435" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-11_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_2 46 48" src="https://user-images.githubusercontent.com/99181656/206882089-ba4ef15d-f094-464c-a6b0-6ed50b2e69b5.png">


<img width="900" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-11_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_2 48 23" src="https://user-images.githubusercontent.com/99181656/206882160-453286ee-050f-448a-9741-d4a7f9b992d4.png">

Now listening on port 8080메세지가 출력되었고 에러를 해결한 줄 알고 좋아했다…..

서버 호출에서 계속해서 실패를 하는 것을 확인했고 코드에 문제가 있는것이 아니라 다른 원인이 있을거라 생각하고 프록시 설정도 다 해주었는데 계속해서 서버에서 에러가 나는 것을 해결할 수 없었고 다시 한번 맨 처음 발견한 에러 메세지를 살펴보다가 `at Loader.moduleStrategy` 부분이 눈에 들어왔다.
바로 검색을 해보니 노드 버전을 16이상으로 올려야 한다는 글을 발견하게되었다. 드디어!!

<img width="900" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-11_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_2 57 31" src="https://user-images.githubusercontent.com/99181656/206882169-93a81351-cd44-43eb-9d52-eb18c8d421f9.png">

[https://github.com/wechaty/getting-started/issues/204](https://github.com/wechaty/getting-started/issues/204)

- Failed to load config "airbnb" to extend 에러=> npx install-peerdeps --dev eslint-config-airbnb 해결 ([스택오버플로우](https://stackoverflow.com/questions/69733256/failed-to-load-config-airbnb-to-extend-from-gitlab-ci))

### 타입스크립트 에러, 모듈을 설치했는데, 모듈을 찾을 수 없다고 나오는 이슈

이러한 이슈들은 패키지에 대한 타입을 설치해야하는데 설치 하지 않아서 발생하는 이슈였다.
`npm i --save-dev @types/react-router-dom` 로 추가하여 타입스크립트 에러를 수정해주어 해결하였다. 이때 설치 후 **개발 서버를 다시 시작해야 에러가 사라진다는 것을 알 수 있었다.**

- 에러메세지
    
    ```json
    TS2307: Cannot find module 'react-router-dom' or its corresponding type declarations.
        1 | import React from "react";
        2 | import "./App.css";
      > 3 | import { BrowserRouter, Route, Routes } from "react-router-dom";
          |                                              ^^^^^^^^^^^^^^^^^^
        4 | import MainPage from "./containers/MainPage";
        5 | import Users from "./containers/AuthPage";
        6 | import NotFound from "./containers/NotFound";
    ```
    
- 에러가 나서 설치한 @types 목록
    
    ```
    "@types/lodash": "^4.14.191",
    "@types/react-router-dom": "^5.3.3",
    "@types/styled-components": "^5.1.26",
    "@typescript-eslint/eslint-plugin": "^5.46.0",
    "@typescript-eslint/parser": "^5.46.0",
    ```
    

## Assignment 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능 개발
    - 로그인, 회원가입을 별도의 경로로 분리
    - [x]  최소한 이메일, 비밀번호 input, 제출 button 구성
- 이메일과 비밀번호의 유효성을 확인합니다
    - [x]  이메일 조건 : 최소 `@`, `.` 포함
    - [x]  비밀번호 조건 : 8자 이상 입력
    - [x]  이메일과 비밀번호가 모두 입력된 상태 만족시 제출 버튼 활성화
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
    - [x]  응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
    - [x]  다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
    - [ ]  어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Assignment 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능 구현
    - [x]  목록 / 상세 영역으로 나누어 구현
    - [x]  Todo 목록
    - [x]  Todo 추가 버튼을 클릭하면 할 일이 추가
    - [x]  Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출 또는 취소 가능 구현
    - [x]  Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
    - [x]  새로고침을 했을 때 현재 상태가 유지되어야 합니다.
    - [x]  개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요. => 쿼리스트링으로 처리 (상세보기 시 쿼리스트링 추가)
- 
    - [x]  한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요 => refetch호출해서 구현(추후 상태 관리 통해서 api호출을 최대한 막아볼 예정)
    - [x]  수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야함 => refetch호출해서 구현(추후 상태 관리 통해서 api호출을 최대한 막아볼 예정)
