# **[👨‍💻 2차 과제]**

[배포사이트](/ㅁㄴㅇ)  
귀여움 사전입니다.  
등록, 수정, 삭제 기능이 있습니다.  
Vite, Express.js, MongoDB, AWS 를 사용해 프로젝트를 구성했습니다.

---

### 기간

📆 24.03.11 ~ 24.03.24

---

### 페이지 소개

#### 1. Header

![Header](/client/public/images/readme/header.png)

- 높이를 200vh 를 줘서 스크롤 할 수 있는 공간을 만들었습니다.
- position: sticky 를 사용해서 구현했습니다.

---

#### 2. Category

![Category](/client/public/images/readme/category.png)

- 클릭했을 때 카테고리가 보입니다.

---

#### 3. Add

![Category](/client/public/images/readme/add.png)

- 등록페이지입니다.
- dialog 태그를 이용해 쉽게 구현했습니다.
- input file, select 부분 커스텀해서 사용했습니다.

---

#### 3. Items

![Category](/client/public/images/readme/items.png)

- 오른쪽 요소에 hover 했을 때 왼쪽에 정보가 나오도록 구현했습니다.
- 클릭 시 수정, 삭제가 가능합니다.

---

#### 3. Footer

![Category](/client/public/images/readme/footer.png)

- footer 요소입니다.

---

### 총평

- 프로젝트 환경 구성에 시간을 너무 많이 사용했습니다.
- 급하게 코드를 치느라 기본적인 부분이 엉성합니다.
  - bem 못 지켰습니다.
  - 함수를 재사용하지 않고 복사붙여넣기 했습니다.
  - 무분별하게 변수 선언했습니다.
- 컴포넌트 식으로 구성했으면 편했을 것 같습니다.
- 이벤트 전파에 대해 이해가 더 필요합니다.
- 경로에 따라 오류가 나는데 이해하지 못했습니다.
- 로컬에서는 경로가 맞고 배포 했을 때는 뭐가 다른지 이미지가 뜨지 않습니다.
- 함수 범위에 대한 이해가 필요합니다.
- 구현하지 못한 부분이 많습니다.
  - 반응형, 검색, 로딩애니메이션, infinityscroll
  - 카테고리 눌렀을 때 해당 카테고리 아이템만 나오게 하기
  - 파일 이름 인코딩/디코딩
- 기본적인 crud를 구현해 봤고 MongoDB, AWS를 어떻게든 연결 했다는 점이 만족스럽습니다.
- scss를 구조화 해서 사용해 봤습니다.
- this를 최대한 사용하지 않았습니다.
