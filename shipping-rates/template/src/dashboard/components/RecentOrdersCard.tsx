import React from "react";
import {
  Box,
  Card,
  Divider,
  Text,
  TextButton,
  Loader,
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
        <Box direction="vertical" paddingBottom="SP3">
          {isLoading ? (
            <Loader size="medium" />
          ) : !orders || orders.length === 0 ? (
            <Text size="small" weight="thin">
              No orders found.
            </Text>
          ) : (
            orders.map((order, index) => (
              <React.Fragment key={index}>
                <Box
                  key={index}
                  verticalAlign="middle"
                  align="space-between"
                  paddingTop="SP2"
                  paddingBottom="SP1"
                >
                  <Box direction="vertical">
                    <Text size="small" weight="normal">
                      Order #{order.id}
                    </Text>
                    <Text size="tiny" weight="thin" skin="disabled">
                      {formatDate(new Date(order.createdDate))}
                    </Text>
                  </Box>
                  <Text size="tiny" weight="thin">
                    {formatCurrency(order.currency, order.totalPrice)}
                  </Text>
                </Box>
                {index < orders.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </Box>
        <Box align="right" paddingTop="SP1">
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
