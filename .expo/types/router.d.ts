/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/` | `/(home)/DetailProduct` | `/(home)/details` | `/(home)/platillos` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/(home)/DetailProduct` | `/(tabs)/(home)/details` | `/(tabs)/(home)/platillos` | `/(tabs)/DetailProduct` | `/(tabs)/details` | `/(tabs)/favorites` | `/(tabs)/platillos` | `/(tabs)\(home)\detail_product` | `/DetailProduct` | `/_sitemap` | `/details` | `/favorites` | `/platillos`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
