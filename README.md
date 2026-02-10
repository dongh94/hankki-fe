# hankki-frontend

okestro-team5-frontend를 **FSD v2.1** + **React** 스택으로 마이그레이션한 프론트엔드입니다.

## 스택

- **코어**: React 18, TypeScript (strict)
- **상태**: React Query (서버/캐시), Recoil (전역 UI)
- **스타일**: Emotion
- **빌드**: Vite 5
- **패키지 매니저**: pnpm
- **테스트**: Vitest + React Testing Library
- **GraphQL**: Relay (의존성 포함, 추후 연동 가능)

## 환경 설정

- `.env.example`을 참고해 `.env` 또는 `.env.local` 생성
- 로컬 백엔드: `.env.local`에 `VITE_API_BASE_URL=http://localhost:8080` 설정 후 `pnpm dev:local`

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 개발 서버 (기본 API: dev 서버) |
| `pnpm dev:local` | 개발 서버 (로컬 API: localhost:8080) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm type-check` | TypeScript 검사 |
| `pnpm test` | Vitest 실행 |

## FSD 구조 (요약)

```
src/
  app/          # 앱 초기화, 라우터, Provider
  pages/        # 라우트별 페이지 (login, main, post, create-room)
  widgets/      # modal-teleport 등
  features/     # auth (로그인), modal
  entities/     # user, room, post, target, auth
  shared/       # api, lib, ui, config
```

- 모든 slice는 **Public API (`index.ts`)** 로만 접근
- 페이지 → 위젯 → feature/entity → shared 순 의존성
