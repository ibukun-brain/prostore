"use client";

import z from "zod";
import { updateUserSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/user.action";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    try {
      const res = await updateUser({
        ...data,
        id: user.id,
      });
      if (!res.success) {
        return toast.error(res.message, {
          style: {
            background: "var(--destructive)",
            color: "#fff",
          },
        });
      }
      toast.success(res.message);

      form.reset();
      router.push("/admin/users/");
    } catch (error) {
      toast.error(error, {
        style: {
          background: "var(--destructive)",
          color: "#fff",
        },
      });
    }
  };

  return (
    <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
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
              <FieldLabel htmlFor="form-rhf-input-name">Name</FieldLabel>
              <Input {...field} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="role"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-role">Role</FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="form-rhf-select-role"
                  aria-invalid={fieldState.invalid}
                  className="min-w-30"
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectItem value={user.role}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </SelectItem>
                  <SelectSeparator />
                  {USER_ROLES.filter((role) => role !== user.role).map(
                    (role, index) => (
                      <SelectItem key={index} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex-between mt-4">
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Update User"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
