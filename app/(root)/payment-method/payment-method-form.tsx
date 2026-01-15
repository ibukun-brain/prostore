"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { paymentMethodSchema } from "@/lib/validators";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserPaymentMethod } from "@/lib/actions/user.action";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const onSubmit = async (data: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(data);

      if (!res.success) {
        toast.error(res.message, {
          classNames: {
            content: "bg-destructive text-white",
          },
        });
        return;
      }

      router.push("/place-order");
    });
  };

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend className="h2-bold mt-4">
                    Payment Method
                  </FieldLegend>
                  <FieldDescription>
                    Please select a payment method.
                  </FieldDescription>
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  >
                    {PAYMENT_METHODS.map((paymentMethod) => (
                      <FieldLabel
                        key={paymentMethod}
                        htmlFor={`form-rhf-radiogroup-${paymentMethod}`}
                      >
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <FieldTitle>{paymentMethod}</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem
                            value={paymentMethod}
                            id={`form-rhf-radiogroup-${paymentMethod}`}
                            aria-invalid={fieldState.invalid}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
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

export default PaymentMethodForm;
