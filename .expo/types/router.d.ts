/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/configuration` | `/(drawer)/orderHistory` | `/(drawer)/order_details` | `/(drawer)/paymentMethods` | `/(drawer)/profile` | `/(drawer)/shareApp` | `/(home)` | `/(home)/` | `/(home)/detail_product` | `/(home)/details` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/(home)/detail_product` | `/(tabs)/(home)/details` | `/(tabs)/cart` | `/(tabs)/detail_product` | `/(tabs)/details` | `/(tabs)/favorites` | `/_sitemap` | `/cart` | `/configuration` | `/detail_product` | `/details` | `/favorites` | `/orderHistory` | `/order_details` | `/paymentMethods` | `/profile` | `/shareApp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
