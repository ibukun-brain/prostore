"use client";

import { productDefaultValues } from "@/lib/constants";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import slugify from "slugify";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createProduct, updateProduct } from "@/lib/actions/product.action";
import { UploadButton } from "@/lib/uploadthing";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(
      type === "Update" ? updateProductSchema : insertProductSchema
    ),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });
  //   toast({});

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    data
  ) => {
    // On Create
    if (type === "Create") {
      const res = await createProduct(data);
      if (!res.success) {
        toast.error(res.message, {
          classNames: { content: "bg-destructive text-white" },
        });
      } else {
        toast.success(res.message);
        router.push("/admin/products");
      }
    }

    // On Update
    if (type === "Update") {
      if (!productId) {
        router.push("/admin/products");
        return;
      }
      const res = await updateProduct({ ...data, id: productId });
      if (!res.success) {
        toast.error(res.message, {
          classNames: { content: "bg-destructive text-white" },
        });
      } else {
        toast.success(res.message);
        router.push("/admin/products");
      }
    }
  };

  // const images = form.watch(["images", "isFeatured", "banner"]);
  const images = useWatch({ control: form.control, name: "images" });
  const isFeatured = useWatch({ control: form.control, name: "isFeatured" });
  const banner = useWatch({ control: form.control, name: "banner" });

  return (
    <form
      method="POST"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div>
        <FieldGroup className="flex flex-col md:flex-row gap-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter product Name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-name">Slug</FieldLabel>
                <div>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Slug"
                  />
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                    onClick={() => {
                      form.setValue(
                        "slug",
                        slugify(form.getValues("name"), { lower: true })
                      );
                    }}
                  >
                    Generate
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <FieldGroup className="flex flex-col md:flex-row gap-5">
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-category">
                  Category
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-category"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Category"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-name">Brand</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Brand"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <FieldGroup className="flex flex-col md:flex-row gap-5">
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-price">Price</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-price"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter product Price"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="stock"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-name">Stock</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-stock"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Stock"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="upload-field flex flex-col gap-5">
        <FieldGroup>
          <Controller
            name="images"
            control={form.control}
            render={() => (
              <Field>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Images
                </FieldLabel>
                <Card>
                  <CardContent className="space-y-2 mt-2 min-h-48">
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="product image"
                          className="w-20 h-20 object-cover object-center rounded-sm"
                          width={100}
                          height={100}
                        />
                      ))}
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: { url: string }[]) => {
                          form.setValue("images", [...images, res[0].url]);
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`ERROR! ${error.message}`, {
                            style: {
                              background: "var(--destructive)",
                              color: "#fff",
                            } as React.CSSProperties,
                          });
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <div className="upload-field">
        <FieldGroup>
          <Controller
            name="isFeatured"
            control={form.control}
            render={({ field }) => (
              <Card>
                <CardContent className="space-y-2 mt-2">
                  <FieldGroup data-slot="checkbox-group">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="form-rhf-checkbox-responses"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FieldLabel
                        htmlFor="form-rhf-checkbox-responses"
                        className="font-normal"
                      >
                        Is Featured?
                      </FieldLabel>
                    </Field>
                  </FieldGroup>
                  {isFeatured && banner && (
                    <Image
                      src={banner}
                      alt="banner image"
                      className="w-full object-cover object-center rounded-sm"
                      width={1920}
                      height={689}
                    />
                  )}
                  {isFeatured && !banner && (
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res: { url: string }[]) => {
                        form.setValue("banner", res[0].url);
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`, {
                          style: {
                            background: "var(--destructive)",
                            color: "#fff",
                          } as React.CSSProperties,
                        });
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          />
        </FieldGroup>
      </div>
      <FieldGroup>
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="form-rhf-textarea-description"
                placeholder="Enter Description"
                className="resize-none"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
        className="button col-span-2 w-full"
      >
        {form.formState.isSubmitting ? "Submitting" : `${type} Product`}
      </Button>
    </form>
  );
};

export default ProductForm;
