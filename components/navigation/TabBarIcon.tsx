import * as Icons from 'lucide-react-native';
import React from 'react';

type TabBarIconProps = {
  name: keyof typeof Icons;
  color: string;
  size?: number;
  style?: any;
};

export function TabBarIcon({ name, color, size = 28, style, ...rest }: TabBarIconProps) {
  const IconComponent = Icons[name] as React.ElementType;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react-native`);
    return null;
  }

  return <IconComponent color={color} size={size} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
