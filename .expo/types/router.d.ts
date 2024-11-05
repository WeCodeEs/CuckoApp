/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/configuration` | `/(drawer)/orderHistory` | `/(drawer)/paymentMethods` | `/(drawer)/profile` | `/(drawer)/shareApp` | `/(drawer)\_layout` | `/(drawer)\configuration` | `/(drawer)\orderHistory` | `/(drawer)\paymentMethods` | `/(drawer)\profile` | `/(drawer)\shareApp` | `/(home)` | `/(home)/` | `/(home)/detail_product` | `/(home)/details` | `/(registration)` | `/(registration)/registrationForm` | `/(registration)/registrationName` | `/(registration)/registrationPhone` | `/(registration)\_layout` | `/(registration)\registrationForm` | `/(registration)\registrationName` | `/(registration)\registrationPhone` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(home)` | `/(tabs)/(home)/` | `/(tabs)/(home)/detail_product` | `/(tabs)/(home)/details` | `/(tabs)/cart` | `/(tabs)/detail_product` | `/(tabs)/details` | `/(tabs)/favorites` | `/..\components\HeaderDrawer` | `/..\components\InputInfo` | `/..\components\InputPhone` | `/..\components\InputSelect` | `/..\components\ModalAvatar` | `/..\components\RegistrationActionSheet` | `/..\components\ui\alert\` | `/..\components\ui\select\` | `/..\components\ui\select\select-actionsheet` | `/..\constants\Avatars` | `/_sitemap` | `/cart` | `/configuration` | `/detail_product` | `/details` | `/favorites` | `/orderHistory` | `/paymentMethods` | `/profile` | `/registrationForm` | `/registrationName` | `/registrationPhone` | `/shareApp`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
