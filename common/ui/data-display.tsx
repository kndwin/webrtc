import * as React from "react";
import { variantProps, VariantPropsOf } from "classname-variants/react";
import clsx from "clsx";

interface BoxProps<T extends React.ElementType> {
  as?: T;
  tw: string;
  children?: React.ReactNode;
}

export function Box<T extends React.ElementType = "div">({
  as,
  tw,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BoxProps<T>>) {
  const Component = as ?? "div";
  return <Component {...props} className={clsx(tw, props.className)} />;
}

const textVariantProps = variantProps({
  base: "text-black",
  variants: {
    b: { true: "font-bold" },
  },
});

interface TextProps<T extends React.ElementType> {
  as?: T;
  tw: string;
  children?: React.ReactNode;
}

export function Text<T extends React.ElementType = "p">({
  as,
  tw,
  ...props
}: ButtonProps<T> &
  VariantPropsOf<typeof buttonProps> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BoxProps<T>>) {
  const Component = as ?? "p";
  return (
    <Component
      {...textVariantProps(props)}
      className={clsx(tw, textVariantProps(props).className)}
    />
  );
}
