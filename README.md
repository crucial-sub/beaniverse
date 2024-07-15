# Beaniverse

<div align="center">
<img width="329" alt="image" src="https://github.com/user-attachments/assets/8e0a13f6-fba5-40ae-b83e-b56f980d79b6">

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fcrucial-sub%2Fbeaniverse&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

</div>

# Beaniverse React-Native App

> **커피샵 앱**

## 프로젝트 소개

안녕하세요, Beaniverse는 React-Native와 Recoil, React-Query 등 최신 기술을 활용하여 만든 완전한 기능을 갖춘 커피샵 앱입니다.</br>
이 프로젝트는 사용자가 다양한 커피와 커피 원두 목록을 탐색할 수 있도록 합니다. 사용자는 원하는 커피를 검색할 수 있으며, 특수 성분, 로스트 레벨, 평점 및 설명과 같은 세부 정보를 확인할 수 있습니다.</br>
마음에 드는 아이템을 즐겨찾기에 추가하고, 장바구니에 담아 주문을 완료할 수 있으며, 마이 프로필에서 그동안 주문했던 목록을 확인하거나 프로필 수정 또한 가능합니다.

이 프로젝트는 이 <a href="https://youtu.be/W1Co2M-gsQE?feature=shared">유튜브 강의 영상</a>에서 제공한 디자인과 기본 컨셉을 바탕으로 개발하였습니다. 강의에서 제공된 Figma 디자인을 참고하여 UI를 구성하고, 실제 기능적인 부분은 직접 독립적으로 구현하여 커피샵 앱을 완성했습니다.

강의 영상에서는 단순히 `data` 폴더 내에 `CoffeeData`라는 샘플 객체를 만들어서 이를 데이터로 사용하는 것에 그쳤지만, 이 프로젝트에서는 실제로 다양한 API 작업을 통해 다음과 같은 기능을 구현했습니다:

- **로그인**: 사용자 인증 및 권한 부여를 위한 기능.
- **API 데이터 받아오기**: 서버에서 커피리스트, 커피 상세 정보, 커피 카테고리, 즐겨찾기 목록, 유저 정보 등 다양한 데이터를 받아와 화면에 렌더링.
- **즐겨찾기 목록 제어**: 사용자가 커피를 즐겨찾기에 추가하거나 제거할 수 있는 기능.
- **프로필 수정**: 사용자 프로필 이미지와 이름을 수정할 수 있는 기능.
- **주문하기**: 장바구니에 담은 커피를 주문하고 결제할 수 있는 기능.

서버와 데이터베이스는 제 지인이 백엔드 작업을 해주었습니다. 이를 통해 보다 실제적인 데이터 흐름과 사용자 경험을 제공하는 완전한 기능의 커피샵 앱을 만들 수 있었습니다.

---

## Stacks 🐈

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![iTerm2](https://img.shields.io/badge/iTerm2-000000?style=for-the-badge&logo=iterm2&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Config

![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

### Tools

![Figma](https://img.shields.io/badge/figma-F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

---

## 화면 구성 📺

|                                              SignIn Screen                                               |                                               Home Screen                                                |                                              Detail Screen                                               |
| :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img width="250" src="https://github.com/user-attachments/assets/b84037a4-fabf-4c85-992f-0252ed46f615"/> | <img width="250" src="https://github.com/user-attachments/assets/60741e4a-3605-47cf-9aa1-8127bcc4ecbd"/> | <img width="250" src="https://github.com/user-attachments/assets/746ed239-d242-4de6-a4de-774c8af7aead"/> |
|                                               Cart Screen                                                |                                              Payment Screen                                              |                                             Favorites Screen                                             |
| <img width="250" src="https://github.com/user-attachments/assets/f8870e05-7f63-454b-ab8d-289e07312349"/> | <img width="250" src="https://github.com/user-attachments/assets/bc4ee6a7-aa6f-4683-baa6-8f63e6eee5c3"/> | <img width="250" src="https://github.com/user-attachments/assets/bfdef092-4f76-4a26-bc42-6a2475bcf3a1"/> |
|                                              Profile Screen                                              |                                            EditProfile Screen                                            |                                           OrderHistory Screen                                            |
| <img width="250" src="https://github.com/user-attachments/assets/bfa184ea-692f-4c01-9892-491e12a06c82"/> | <img width="250" src="https://github.com/user-attachments/assets/6b96bf57-40e1-4bf2-81b7-a5b14d358e20"/> | <img width="250" src="https://github.com/user-attachments/assets/845b9211-09cf-4132-bf35-aa1d86ac6419"/> |

## 주요 기능 📦

### ⭐️ 커피 및 원두 탐색 기능

- 다양한 커피 및 원두 종류를 탐색할 수 있습니다.
- 검색 기능을 통해 원하는 커피를 쉽게 찾을 수 있습니다.
- 카테고리별로 커피를 분류하여 원하는 종류의 커피를 빠르게 찾아볼 수 있습니다.
- 상세 페이지에서 커피의 상세 정보(특별 재료, 로스팅 레벨, 평점, 설명 등)를 확인할 수 있습니다.

### ⭐️ 커피 즐겨찾기 기능

- 마음에 드는 커피를 즐겨찾기에 추가할 수 있습니다.
- 즐겨찾기한 커피 리스트를 쉽게 확인하고 관리할 수 있습니다.

### ⭐️ 장바구니 및 주문 기능

- 장바구니에 커피를 추가하여 한 번에 여러 개의 커피를 주문할 수 있습니다.
- 선택한 커피를 장바구니에 담고, 주문을 진행할 수 있습니다.
- 주문 내역을 확인하고 관리할 수 있습니다.

### ⭐️ 프로필 수정 기능

- 프로필 이미지를 변경하여 나만의 프로필을 꾸밀 수 있습니다.
- 사용자 이름을 변경하여 프로필을 수정할 수 있습니다.

---

## 아키텍쳐

### 디렉토리 구조
