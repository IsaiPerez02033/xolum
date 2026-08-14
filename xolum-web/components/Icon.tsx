import {
  Code,
  WhatsappLogo,
  Palette,
  Barbell,
  Package,
  Tooth,
  ForkKnife,
  Stethoscope,
  Invoice,
  Buildings,
  VideoCamera,
  Brain,
  BellRinging,
  DeviceMobile,
  SecurityCamera,
  HouseLine,
  Lightbulb,
  Sun,
} from '@phosphor-icons/react/dist/ssr';
import type { IconProps } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

const map: Record<string, ComponentType<IconProps>> = {
  Code,
  WhatsappLogo,
  Palette,
  Barbell,
  Package,
  Tooth,
  ForkKnife,
  Stethoscope,
  Invoice,
  Buildings,
  VideoCamera,
  Brain,
  BellRinging,
  DeviceMobile,
  SecurityCamera,
  HouseLine,
  Lightbulb,
  Sun,
};

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const C = map[name] ?? Code;
  return <C {...props} />;
}
