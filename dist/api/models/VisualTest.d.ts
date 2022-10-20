export declare enum VisualTestImageType {
    FULL_PAGE = "FULL_PAGE",
    VIEWPORT = "VIEWPORT",
    ELEMENT_SCREENSHOT = "ELEMENT_SCREENSHOT"
}
export declare type VisualTestAccess = {
    enabled: boolean;
    apiKey: string | null;
};
export declare type VisualTest = {
    comparisonStatus: string;
    appUrl: string;
    createdAt: string;
    id: number;
    imageName: string;
    imageThumbnailUrl: string;
    imageType: VisualTestImageType;
    imageUrl: string;
    sessionId: string;
    testUrl: string;
};
