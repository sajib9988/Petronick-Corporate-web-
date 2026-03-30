import * as React from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  UseFormReturn,
  ControllerRenderProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";

type FormProps<TFormValues extends FieldValues> = UseFormReturn<TFormValues> & {
  children: React.ReactNode;
};

function Form<TFormValues extends FieldValues>({ children }: FormProps<TFormValues>) {
  return <>{children}</>;
}

type FormFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  render: (props: {
    field: ControllerRenderProps<TFormValues, Path<TFormValues>>;
  }) => React.ReactNode;
};

function FormField<TFormValues extends FieldValues>({
  control,
  name,
  render,
}: FormFieldProps<TFormValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <>{render({ field })}</>}
    />
  );
}

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

function FormControl({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2", className)} {...props} />;
}

function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-destructive", className)} {...props}>
      {children}
    </p>
  );
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
