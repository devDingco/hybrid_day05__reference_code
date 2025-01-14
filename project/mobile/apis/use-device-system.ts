import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";

export const useDeviceSystem = () => {
  const isAndroid = Platform.OS === "android";
  const isIos = Platform.OS === "ios";

  const fetchDeviceSystemForAppSet = () => {
    return {
      fetchDeviceSystemForAppSet: {
        appVersion:
          (isAndroid && Constants.expoConfig?.android?.versionCode) ||
          (isIos && Constants.expoConfig?.ios?.buildNumber),
      },
    };
  };

  const fetchDeviceSystemForPlatformSet = () => {
    return {
      fetchDeviceSystemForPlatformSet: {
        os: Platform.OS,
        osVersion: Device.osVersion, // IOS 10.3
        modelName: Device.modelName, // iPhone 7 Plus
      },
    };
  };

  return {
    fetchDeviceSystemForPlatformSet,
    fetchDeviceSystemForAppSet,
  };
};
