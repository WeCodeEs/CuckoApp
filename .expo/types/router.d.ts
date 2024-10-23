/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/` | `/(home)/detail_product` | `/(home)/details` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/(home)/detail_product` | `/(tabs)/(home)/details` | `/(tabs)/cart` | `/(tabs)/detail_product` | `/(tabs)/details` | `/(tabs)/favorites` | `/..\constants\Colors` | `/_sitemap` | `/cart` | `/detail_product` | `/details` | `/favorites`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
