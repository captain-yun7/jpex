/**
 * 갤러리 그리드에 들어가는 아이템 타입
 * 작품(work)과 서비스(service) 카드를 같은 그리드에 섞기 위한 union
 */

export interface WorkItemData {
  id: number | string;
  title: string;
  category: string;       // categories.id (web | ai | consulting ...)
  categoryLabel?: string; // 표시용 (한글). 없으면 category 그대로
  description?: string;
  image: string;
  year?: string | number;
  href?: string;          // 상세 페이지 링크 (없으면 클릭 비활성)
}

export interface ServiceItemData {
  id: string;
  title: string;
  description: string;
  category: string;       // 카테고리 필터에 걸리는 값
  categoryLabel?: string;
  href: string;           // /services#... 또는 /quote
}

export type GalleryItem =
  | { kind: 'work'; data: WorkItemData }
  | { kind: 'service'; data: ServiceItemData };
