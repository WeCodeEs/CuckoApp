/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/` | `/(home)/details` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/(home)/details` | `/(tabs)/cart` | `/(tabs)/details` | `/(tabs)/favorites` | `/(tabs)\(home)\detail_product` | `/(tabs)\cart` | `/..\components\CustomHeader` | `/..\components\ui\actionsheet\` | `/..\components\ui\drawer\` | `/..\components\ui\modal\` | `/..\components\ui\pressable\` | `/..\constants\platillos` | `/_sitemap` | `/cart` | `/details` | `/favorites`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
