# 포트폴리오 프로젝트 이미지

이 폴더에 프로젝트 스크린샷 이미지를 저장하세요.

## 이미지 추가 방법

1. **스크린샷 찍기**
   - 실제 프로젝트 사이트의 메인 화면 스크린샷
   - 권장 해상도: 1920x1080 이상
   - 16:9 비율 권장

2. **이미지 저장**
   - 파일명: `project1.png`, `project2.png`, ... `project6.png`
   - 형식: PNG 또는 JPG
   - 이 폴더에 저장

3. **프로젝트 정보 업데이트**
   - `src/app/portfolio/page.tsx` 파일 열기
   - 각 프로젝트의 `liveUrl`과 `githubUrl` 업데이트
   - `liveUrl`: 실제 사이트 주소
   - `githubUrl`: GitHub 저장소 주소 (선택사항)

## 예시

```typescript
{
  id: 1,
  title: '내 프로젝트 이름',
  image: '/images/projects/project1.png',  // 이 폴더의 이미지 파일
  liveUrl: 'https://myproject.com',        // 실제 사이트 URL
  githubUrl: 'https://github.com/user/repo', // GitHub URL (선택)
  // ...
}
```

## 이미지가 없을 때

이미지 파일이 없으면 자동으로 이모지 플레이스홀더가 표시됩니다.

## 주의사항

- 이미지 파일 크기는 가능한 1MB 이하로 압축
- 이미지 최적화 도구 사용 권장 (TinyPNG, Squoosh 등)
- `liveUrl`이나 `githubUrl`이 없으면 해당 버튼은 표시되지 않음
