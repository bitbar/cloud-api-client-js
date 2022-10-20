export enum VisualTestImageType {
  FULL_PAGE = 'FULL_PAGE',
  VIEWPORT = 'VIEWPORT',
  ELEMENT_SCREENSHOT = 'ELEMENT_SCREENSHOT'
}

export type VisualTestAccess = {
  enabled: boolean;
  apiKey: string | null;
}

export type VisualTest = {
  comparisonStatus:	string;
  appUrl:	string;
  createdAt:	string;
  id: number;
  imageName:	string;
  imageThumbnailUrl:	string;
  imageType:	VisualTestImageType;
  imageUrl:	string;
  sessionId:	string;
  testUrl:	string;
}
