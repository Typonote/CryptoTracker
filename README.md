# CryptoTracker 💸

Coinpaprika 에서 제공하는 다양한 Coin Api를 이용하여 암호화폐 시세 트래커 만들기 <br/>
출처: https://api.coinpaprika.com/

## 💻 기술 스택

- React
- Styled Components
- Typescript
- React router dom (version 6)
- React Query
- Recoil
- ApexCharts.js

## 🌲 디렉토리 구조

```
src
├── Components
│   ├── Error.tsx
│   ├── Loading.tsx
│   └── ProgressBar.tsx
│ 
├── Routes
│   ├── Chart.tsx
│   ├── Coin.tsx
│   ├── Coins.tsx
│   └── Price.tsx
│ 
├── Api.ts
├── App.tsx
├── atoms.ts
├── index.tsx
├── Router.tsx
├── styled.d.ts
└── theme.ts
``` 

## ✨ 참고 사항

- 노마드 코더: https://nomadcoders.co/
- 색 조합: https://flatuicolors.com/palette/gb
- 다크 모드: https://medium.muz.li/stepping-out-of-the-light-tips-for-the-design-and-development-of-dark-mode-bb6f7a38043d
- react router dom v6: https://ui.dev/react-router-nested-routes/

## 📄 서비스 예시

1. Web 버전 (600px 이상) <br/>
![Hnet-image (1)](https://user-images.githubusercontent.com/81430564/146667617-657ce2a3-e666-416f-9aee-7a5aa39b1e13.gif)

2. mobile 버전 <br/>
![Hnet-image (1)](https://user-images.githubusercontent.com/81430564/146667770-bb90ce50-a3d2-4a9c-92ac-9c5a6638cdc0.gif)



## ⚙️ 주요 기능

- 다크 모드  
- 거래량이 활발한 100가지의 코인에 대한 리스트 출력
- 특정한 코인 클릭 시, 코인에 대한 정보 확인 가능
- 최근 2주간의 시세 변화를 꺾은 선 그래프로 확인 가능
- 10초 마다 자동으로 값을 업데이트




