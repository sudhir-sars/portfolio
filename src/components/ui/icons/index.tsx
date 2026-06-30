import {
  ArrowRight01Icon,
  Cancel01Icon,
  File01Icon,
  GithubIcon as GithubIconHg,
  LibraryIcon,
  Linkedin02Icon,
  MailAtSign02Icon,
  MailSend02Icon,
  Menu01Icon,
  NewTwitterIcon,
  QuillWrite02Icon,
  TimeHalfPassIcon,
  ViewIcon as ViewIconHg,
} from "@hugeicons/core-free-icons";
import {
  HugeiconsIcon,
  type HugeiconsProps,
  type IconSvgElement,
} from "@hugeicons/react";
import type { ComponentType } from "react";

export type IconComponent = ComponentType<Omit<HugeiconsProps, "icon">>;

export function createIcon(icon: IconSvgElement) {
  return function Icon(props: Omit<HugeiconsProps, "icon">) {
    return (
      <HugeiconsIcon
        icon={icon}
        size={16}
        strokeWidth={1.5}
        color="currentColor"
        className="text-white/80"
        {...props}
      />
    );
  };
}

export const ResumeIcon = createIcon(File01Icon);
export const MailIcon = createIcon(MailAtSign02Icon);
export const WriteIcon = createIcon(QuillWrite02Icon);
export const ProjectIcon = createIcon(LibraryIcon);
export const JourneyIcon = createIcon(TimeHalfPassIcon);
export const ContactIcon = createIcon(MailSend02Icon);
export const ViewIcon = createIcon(ViewIconHg);
export const ArrowRightIcon = createIcon(ArrowRight01Icon);
export const TwitterIcon = createIcon(NewTwitterIcon);
export const LinkedinIcon = createIcon(Linkedin02Icon);
export const GithubIcon = createIcon(GithubIconHg);
export const MenuIcon = createIcon(Menu01Icon);
export const CloseIcon = createIcon(Cancel01Icon);
