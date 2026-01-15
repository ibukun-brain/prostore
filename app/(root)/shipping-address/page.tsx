import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import ShippingAddressForm from "./shipping-address.form";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  //   if cart is empty redirect home page
  if (!cart || cart.items.length === 0) redirect("/");
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("No user ID");
  const user = await getUserById(userId);
  return (
    <>
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
