import { RatIcon } from "lucide-react";

export function routeItems(params: any, pathname: string) {
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active:
        pathname === `/${params.storeId}/billboards` ||
        pathname === `/${params.storeId}/billboards/${params.billboardId}`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active:
        pathname === `/${params.storeId}/categories` ||
        pathname === `/${params.storeId}/categories/${params.categoryId}`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active:
        pathname === `/${params.storeId}/sizes` ||
        pathname === `/${params.storeId}/sizes/${params.sizeId}`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active:
        pathname === `/${params.storeId}/colors` ||
        pathname === `/${params.storeId}/colors/${params.colorId}`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/flavors`,
      label: "Flavors",
      active:
        pathname === `/${params.storeId}/flavors` ||
        pathname === `/${params.storeId}/flavors/${params.flavorId}`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active:
        pathname === `/${params.storeId}/products` ||
        pathname === `/${params.storeId}/products/${params.productId}`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
      icon: <RatIcon />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
      icon: <RatIcon />,
    },
  ];

  return routes;
}
