/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/configuration` | `/(drawer)/orderHistory` | `/(drawer)/paymentMethods` | `/(drawer)/profile` | `/(drawer)/shareApp` | `/(drawer)\_layout` | `/(drawer)\orderHistory` | `/(drawer)\order_details` | `/(drawer)\profile` | `/(home)` | `/(home)/` | `/(home)/detail_product` | `/(home)/details` | `/(registration)\_layout` | `/(registration)\registrationForm` | `/(registration)\registrationName` | `/(registration)\registrationPhone` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/(home)/detail_product` | `/(tabs)/(home)/details` | `/(tabs)/cart` | `/(tabs)/detail_product` | `/(tabs)/details` | `/(tabs)/favorites` | `/(tabs)\cart` | `/..\components\Carrousel` | `/..\components\RegistrationActionSheet` | `/_sitemap` | `/cart` | `/configuration` | `/detail_product` | `/details` | `/favorites` | `/orderHistory` | `/paymentMethods` | `/profile` | `/shareApp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
