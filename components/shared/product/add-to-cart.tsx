"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/types";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message, {
          style: {
            background: "var(--color-destructive)",
            color: "white",
          },
        });
        return;
      }

      //   Handle sucess add to cart
      toast.success(res.message, {
        actionButtonStyle: {
          borderRadius: "5px",
        },
        action: {
          label: "Go To Cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(res.message, {
          style: {
            background: "var(--color-destructive)",
            color: "white",
          },
        });
        return;
      }

      //   Handle sucess add to cart
      toast.success(res.message, {
        actionButtonStyle: {
          borderRadius: "5px",
        },
        action: {
          label: "Go To Cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };

  // Check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId == item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button type="button" className="w-full" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}{" "}
      Add to Cart
    </Button>
  );
};

export default AddToCart;
