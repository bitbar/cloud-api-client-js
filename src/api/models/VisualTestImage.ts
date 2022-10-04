export enum VTImageType {
  FULL_PAGE = 'FULL_PAGE',
  VIEWPORT = 'VIEWPORT',
  ELEMENT_SCREENSHOT = 'ELEMENT_SCREENSHOT'
}

export type VisualTestImage = {
  comparisonStatus:	string;
  comparisonUrl:	string;
  createdAt:	string;
  id: number;
  imageName:	string;
  imageThumbnailUrl:	string;
  imageType:	VTImageType;
  imageUrl:	string;
  sessionId:	string;
  testUrl:	string;
}
