export const getProductImages = (product) => {
  if (!(product && Object.keys(product).length)) return [];
  let itemImages = [];
  const baseUrl = process.env.REACT_APP_MEDIA_ASSETS_URL + "/";
  if (product?.image) {
    itemImages.push({
      original: baseUrl + product.image,
      thumbnail: baseUrl + product.image,
    });
  }
  if (
    product &&
    product?.additionalImages &&
    product?.additionalImages.length > 0
  ) {
    product?.additionalImages?.forEach((image) => {
      itemImages.push({
        original: baseUrl + image.name,
        thumbnail: baseUrl + image.name,
      });
    });
  }
  return itemImages;
};

export const getDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};
