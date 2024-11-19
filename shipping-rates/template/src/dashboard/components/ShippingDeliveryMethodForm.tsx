import React from "react";
import {
  Box,
  Card,
  Cell,
  FormField,
  Input,
  Layout,
  Text,
} from "@wix/design-system";
import { ShippingCosts } from "../../types/types";

interface ShippingCostsFormProps {
  title: string;
  disabled?: boolean;
  shippingCosts: ShippingCosts;
  onShippingCostsChanged: (shippingCosts: ShippingCosts) => void;
  expandByDefault?: boolean;
}

export function ShippingCostsForm({
  title,
  shippingCosts,
  onShippingCostsChanged,
}: ShippingCostsFormProps) {
  return (
    <Card>
      <Card.Header title={title} />
      <Card.Divider />
      <Card.Content>
        <Box direction="vertical" gap="SP5">
          <Box direction="vertical" gap="SP2">
            <Text>Set conditions:</Text>
            <Layout>
              <Cell span={4}>
                <FormField label={`First item`}>
                  <Input
                    prefix={<Input.Affix>$</Input.Affix>}
                    placeholder="Set price"
                    type="number"
                    value={shippingCosts.first}
                    onChange={(e) => {
                      onShippingCostsChanged({
                        ...shippingCosts,
                        first: Number(e.currentTarget.value),
                      });
                    }}
                  />
                </FormField>
              </Cell>
              <Cell span={4}>
                <FormField label={`Second item`}>
                  <Input
                    prefix={<Input.Affix>$</Input.Affix>}
                    placeholder="Set price"
                    type="number"
                    value={shippingCosts.second}
                    onChange={(e) => {
                      onShippingCostsChanged({
                        ...shippingCosts,
                        second: Number(e.currentTarget.value),
                      });
                    }}
                  />
                </FormField>
              </Cell>
              <Cell span={4}>
                <FormField label={`Each additional item`}>
                  <Input
                    prefix={<Input.Affix>$</Input.Affix>}
                    suffix={<Input.Affix>per item</Input.Affix>}
                    value={shippingCosts.thirdAndUp}
                    onChange={(e) => {
                      onShippingCostsChanged({
                        ...shippingCosts,
                        thirdAndUp: Number(e.currentTarget.value),
                      });
                    }}
                    placeholder="Set price"
                    type="number"
                  />
                </FormField>
              </Cell>
            </Layout>
          </Box>
        </Box>
      </Card.Content>
    </Card>
  );
}
