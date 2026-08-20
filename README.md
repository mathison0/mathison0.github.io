# mathison0.github.io

게임 클라이언트 개발자 포트폴리오 사이트. React + Vite + TypeScript로 만들었고
GitHub Actions를 통해 GitHub Pages에 자동 배포됩니다.

**https://mathison0.github.io**

## 개발

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:5173)
npm run build      # 프로덕션 빌드 (dist/)
npm run preview    # 빌드 결과 로컬 확인
npm run typecheck  # 타입 검사만 실행
```

## 배포

`main` 브랜치에 push하면 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)이
자동으로 빌드해서 GitHub Pages에 배포합니다.

**최초 1회 설정**: 저장소 **Settings → Pages → Build and deployment → Source**를
**GitHub Actions**로 변경해야 합니다. (기본값인 "Deploy from a branch"로 두면
빌드 결과 대신 원본 소스가 그대로 서빙되어 사이트가 깨집니다.)

## 내용 수정하기

사이트의 모든 내용은 코드가 아니라 데이터 파일에 있습니다.

| 파일 | 내용 |
| --- | --- |
| [src/data/profile.ts](src/data/profile.ts) | 이름, 소개, 기술 스택, 이력, 연락처 |
| [src/data/projects.ts](src/data/projects.ts) | 프로젝트 목록 (영상, 담당 범위, 구현, 문제 해결 사례) |

> ⚠️ 현재 들어있는 프로젝트와 이력은 **구조를 보여주기 위한 예시**입니다.
> 본인 내용으로 교체하세요.

### 프로젝트 영상 넣는 법

`src/data/projects.ts`의 `video` 필드를 수정합니다.

```ts
// YouTube (권장 — 저장소 용량을 쓰지 않음)
video: { kind: 'youtube', id: 'VIDEO_ID', caption: '플레이 영상' }

// 로컬 mp4 — public/videos/ 에 파일을 두고
video: { kind: 'file', src: '/videos/demo.mp4', poster: '/videos/demo.jpg' }

// 아직 영상이 없을 때
video: { kind: 'placeholder', caption: '영상 준비 중' }
```

로컬 mp4는 GitHub 파일 제한(100MB)과 저장소 용량에 주의하세요. 30초 내외로
자르거나 YouTube 비공개(unlisted) 업로드를 권장합니다.

## 구조

```
src/
├── data/          # ← 내용 수정은 대부분 여기
├── pages/         # Home / Projects / 프로젝트 상세 / About / 404
├── components/    # Layout, ProjectCard, Media(영상), TagList, Seo
└── styles/        # tokens(디자인 변수) / base / components
```

- SPA 라우팅: GitHub Pages에서 `/projects` 직접 진입 시 404가 뜨는 문제는
  빌드 시 `index.html`을 `404.html`로 복사해 해결합니다 (vite.config.ts 참고).
- 라이트 테마 기준. 색·간격은 전부 [src/styles/tokens.css](src/styles/tokens.css)의
  CSS 변수라서 다크 테마 추가나 색 변경이 쉽습니다.
