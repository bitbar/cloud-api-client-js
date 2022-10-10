export declare enum VTImageType {
    FULL_PAGE = "FULL_PAGE",
    VIEWPORT = "VIEWPORT",
    ELEMENT_SCREENSHOT = "ELEMENT_SCREENSHOT"
}
export declare type VisualTestAccess = {
    enabled: boolean;
    apiKey: string | null;
};
export declare type VisualTesting = {
    comparisonStatus: string;
    comparisonUrl: string;
    createdAt: string;
    id: number;
    imageName: string;
    imageThumbnailUrl: string;
    imageType: VTImageType;
    imageUrl: string;
    sessionId: string;
    testUrl: string;
};
