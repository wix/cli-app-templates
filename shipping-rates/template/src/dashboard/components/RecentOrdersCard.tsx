import React from "react";
import {
  Box,
  Card,
  Text,
  TextButton,
  Loader,
  TableListItem,
} from "@wix/design-system";
import { ArrowRight } from "@wix/wix-ui-icons-common";
import { dashboard } from "@wix/dashboard";
import { WixPageId } from "../../consts";
import { useOrders } from "../hooks/use-orders";
import { formatCurrency, formatDate } from "../../utils/utils";

export function RecentOrdersCard() {
  const { navigate } = dashboard;
  const { data: orders, isLoading } = useOrders({ limit: 3 });

  return (
    <Card>
      <Card.Header title="Recent orders" />
      <Card.Divider />
      <Card.Content>
        {isLoading ? (
          <Box align="center">
            <Loader />
          </Box>
        ) : !orders?.length ? (
          <Text size="small">No orders found.</Text>
        ) : (
          orders.map((order, index) => (
            <TableListItem
              verticalPadding="tiny"
              horizontalPadding="xxTiny"
              showDivider={index < orders.length - 1}
              options={[
                {
                  value: (
                    <>
                      <Text size="small" weight="normal">
                        Order #{order.id}
                      </Text>
                      <Text size="tiny" skin="disabled">
                        {formatDate(new Date(order.createdDate))}
                      </Text>
                    </>
                  ),
                },
                {
                  value: (
                    <Text size="tiny">
                      {formatCurrency(order.currency, order.totalPrice)}
                    </Text>
                  ),
                  width: "auto",
                },
              ]}
            />
          ))
        )}
        <Box align="right" paddingTop="SP4">
          <TextButton
            onClick={() => navigate(WixPageId.MANAGE_ORDERS)}
            size="small"
            suffixIcon={<ArrowRight />}
          >
            See all orders
          </TextButton>
        </Box>
      </Card.Content>
    </Card>
  );
}
