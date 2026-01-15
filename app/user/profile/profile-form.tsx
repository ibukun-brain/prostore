"use client";
import { updateProfileSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions/user.action";

const ProfileForm = () => {
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    const res = await updateProfile(values);
    if (!res.success) {
      return toast.error(res.message, {
        classNames: {
          content: "bg-destructive text-white",
        },
      });
    }

    const newSession = {
      ...session,
      user: {
        ...session.user,
        name: values.name,
      },
    };
    await update(newSession);
    toast.success(res.message);
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-email">
                Email Address
              </FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} disabled />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-name">full name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-input-name"
                aria-invalid={fieldState.invalid}
                placeholder="Enter full name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className="button col-span-2 w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Submitting..." : "Update Profile"}
      </Button>
    </form>
  );
};

export default ProfileForm;
