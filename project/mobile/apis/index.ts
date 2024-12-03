import { RefObject } from "react";
import { useDeviceLocation } from "./use-device-location";
import { useDeviceSystem } from "./use-device-system";
import WebView from "react-native-webview";

type APIS = {
  fetchDeviceSystemForAppSet: () => Promise<{ fetchDeviceSystemForAppSet: { appVersion: string } }>;
  fetchDeviceSystemForPlatformSet: () => Promise<{ fetchDeviceSystemForPlatformSet: { modelName: string } }>;
  fetchDeviceLocationForLatLngSet: () => Promise<{ fetchDeviceLocationForLatLngSet: { lat: number; lng: number } }>;
};

export const useApis = (webviewRef: RefObject<WebView<{}>>) => {
  const deviceSystemApis = useDeviceSystem();
  const deviceLocationApis = useDeviceLocation();

  const APIS = {
    ...deviceSystemApis,
    ...deviceLocationApis,
  };

  const onResponse = (result: any) => {
    webviewRef.current?.postMessage(JSON.stringify(result));
  };

  const onRequest = async (query: keyof APIS) => {
    const result = await APIS[query]();
    onResponse(result);
  };

  return {
    onRequest,
    onResponse,
  };
};
