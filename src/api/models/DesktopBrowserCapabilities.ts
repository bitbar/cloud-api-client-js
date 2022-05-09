export type DesktopBrowserCapabilities = {
  id: number;
  platforms: Array<any>;
  selfURI: string;
}

export type DesktopPlatform = {
  browsers: Array<DesktopBrowser>;
  id: number;
  name: string;
  resolutions: Array<string>;
  selfURI: string;
  value: string;
  version: string;
}

export type DesktopBrowser = {
  displayName: string;
  id: number;
  name: string;
  selfURI: string;
  value: string;
  version: Array<string>;
}
