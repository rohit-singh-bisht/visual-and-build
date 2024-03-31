import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { getDate } from "../../utils/helper";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
  },
  TransactionDetailsStyle: {
    flex: 1,
  },
  bold__title: {
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "18px",
    textAlign: "left",
    color: "#333333",
    marginBottom: "8px",
  },
  transaction__header: {
    border: "0.5px solid #cccccc",
    borderBottomWidth: 0,
    padding: "12px 12px 0",
    display: "flex",
    flexDirection: "column",
  },
  data: {
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "left",
  },
  customer__name: {
    textTransform: "capitalize",
  },
  sales__info: {
    fontSize: "12px",
    lineHeight: "20px",
    color: "#000000",
    padding: "12px 0",
  },
  transaction__order__summary: {
    borderLeft: "0.5px solid #cccccc",
    borderRight: "0.5px solid #cccccc",
    borderBottom: "0.5px solid #cccccc",
    display: "block",
  },
  transaction__order__summary__header: {
    background: "#f2f2f2",
    padding: "12px",
    display: "flex",
  },
  transaction__order__th: {
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "20px",
    textAlign: "center",
    flex: 1,
  },
  transaction__order__summary__body: {
    display: "flex",
    padding: "12px",
  },
  transaction__order__td: {
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "center",
    flex: 1,
  },
  transaction__item__details: {
    display: "flex",
    gap: "12px",
  },
  transaction__item__info: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    textAlign: "left",
    color: "#333333",
  },
  product__name: {
    fontWeight: 700,
    color: "#000",
    margin: "4px 0",
    textTransform: "capitalize",
    cursor: "pointer",
    display: "block",
  },
  product__description: {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "2",
    overflow: "hidden",
  },
  sku: {
    margin: "10px 0",
    display: "block",
  },
  transaction__order__summary__footer: {
    background: "#f2f2f2",
    padding: "12px",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "100px",
  },
  transaction__payment__info: {
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transaction__payment__method: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    textAlign: "left",
    textTransform: "capitalize",
  },
  transaction__order__total: {
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "12px",
    textAlign: "left",
    display: "flex",
    gap: "100px",
  },
  transaction__order__status: {
    border: "0.75px solid #d9d9d9",
    padding: "40px 0 32px",
    marginTop: "10px",
  },
  transaction__item__image: {
    flex: "0 0 108px",
  },
});

const TransactionDetailsPdf = ({ transactionData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.transaction__header}>
            <Text style={styles.bold__title}>Purchase Location:</Text>
            {transactionData?.data?.customerId?.name && (
              <Text style={styles.data}>
                {transactionData?.data?.customerId?.name}
              </Text>
            )}
            {transactionData?.data?.shippingAddress && (
              <Text style={styles.data}>
                {transactionData?.data?.shippingAddress}
              </Text>
            )}
            {transactionData?.data?.date && (
              <Text style={styles.sales__info}>
                <span>Sales Date:</span> {getDate(transactionData?.data?.date)}
              </Text>
            )}
          </View>
          <View style={styles.transaction__order__summary}>
            <View style={styles.transaction__order__summary__header}>
              <Text
                style={{
                  ...styles.transaction__order__th,
                  textAlign: "left",
                  flex: "0 0 500px",
                }}
              >
                Order Summary
              </Text>
              <Text style={styles.transaction__order__th}>Price</Text>
              <Text style={styles.transaction__order__th}>Qty</Text>
              <Text style={styles.transaction__order__th}>Subtotal</Text>
            </View>
            <View style={styles.transaction__order__summary__body}>
              {transactionData?.data?.items?.map((item) => (
                <>
                  <View
                    style={{
                      ...styles.transaction__order__td,
                      flex: "0 0 500px",
                    }}
                  >
                    <View style={styles.transaction__item__details}>
                      <View style={styles.transaction__item__image}>
                        <img
                          src={
                            process.env.REACT_APP_MEDIA_ASSETS_URL +
                            "/" +
                            item?.productId?.image
                          }
                          alt={item?.productId?.name}
                        />
                      </View>
                      <View style={styles.transaction__item__info}>
                        <Text style={styles.product__name}>
                          {item?.productId?.name}
                        </Text>
                        <Text style={styles.product__description}>
                          {item?.productId?.description}
                        </Text>
                        <Text style={styles.sku}>
                          <span>SKU: </span>
                          {item?.productId?.sku}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.transaction__order__td}>
                    <Text>
                      {process.env.REACT_APP_PRICE_SYMBOL}
                      {(
                        item?.productId?.price - item?.productId?.discount
                      ).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.transaction__order__td}>
                    <Text>{item?.qty}</Text>
                  </View>
                  <View style={styles.transaction__order__td}>
                    <Text>
                      {process.env.REACT_APP_PRICE_SYMBOL}
                      {item?.price}
                    </Text>
                  </View>
                </>
              ))}
            </View>
            <View style={styles.transaction__order__summary__footer}>
              <Text>
                Subtotal:{" "}
                <span>
                  {process.env.REACT_APP_PRICE_SYMBOL}
                  {transactionData?.data?.subtotal}
                </span>
              </Text>
            </View>
            <View style={styles.transaction__payment__info}>
              <View style={styles.transaction__payment__method}>
                <Text>
                  <span>Payment Method: </span>
                  {transactionData?.data?.paymentMethod}
                  <br />
                  <span>Payment Ref Number: </span>
                  {transactionData?.data?.paymentRefNumber || "N/A"}
                </Text>
              </View>
              <View style={styles.transaction__order__total}>
                <Text>
                  <span>Order Total:</span>
                  {process.env.REACT_APP_PRICE_SYMBOL}
                  {transactionData?.data?.total}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TransactionDetailsPdf;
