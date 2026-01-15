"use client";

import { ShippingAddress } from "@/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ArrowRight, Loader } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { shippingAddressSchema } from "@/lib/validators";
import { shippingAddressDefaultValues } from "@/lib/constants";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserAddress } from "@/lib/actions/user.action";
import CheckoutSteps from "@/components/shared/checkout-steps";

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  async function onSubmit(data: z.infer<typeof shippingAddressSchema>) {
    // Do something with the form values.
    startTransition(async () => {
      const res = await updateUserAddress(data);

      if (!res.success) {
        toast.error(res.message, {
          classNames: {
            content: "bg-destructive text-white",
          },
        });
        return;
      }

      router.push("/payment-method");
    });
  }

  return (
    <>
      <CheckoutSteps current={1} />
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Shipping Address</h1>
        <p className="text-sm text-muted-foreground">
          Please enter and address to ship to
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-fullName">
                    full name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-fullName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter full name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="streetAddress"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-streetAddress">
                    Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-streetAddress"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Address"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-city">City</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-city"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter City"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="postalCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-postalCode">
                    Postal Code
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-postalCode"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Postal Code"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-country">
                    Country
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-country"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Country"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex mt-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}{" "}
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShippingAddressForm;
