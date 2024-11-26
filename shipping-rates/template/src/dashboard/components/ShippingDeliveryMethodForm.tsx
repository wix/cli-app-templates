import React from "react";
import {
  Box,
  Card,
  Cell,
  FormField,
  Input,
  Layout,
  NumberInput,
  Text,
} from "@wix/design-system";
import type { ShippingCosts } from "../../types";

interface ShippingCostsFormProps {
  title: string;
  shippingCosts: ShippingCosts;
  onShippingCostsChanged: (shippingCosts: ShippingCosts) => void;
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
        <Box direction="vertical" gap="SP2">
          <Text>Set conditions:</Text>
          <Layout>
            <Cell span={4}>
              <FormField label="First item">
                <NumberInput
                  prefix={<Input.Affix value="$" />}
                  placeholder="Set price"
                  value={shippingCosts.first}
                  onChange={(price) => {
                    if (!price) return;

                    onShippingCostsChanged({
                      ...shippingCosts,
                      first: price,
                    });
                  }}
                />
              </FormField>
            </Cell>
            <Cell span={4}>
              <FormField label="econd item">
                <NumberInput
                  prefix={<Input.Affix value="$" />}
                  placeholder="Set price"
                  value={shippingCosts.second}
                  onChange={(price) => {
                    if (!price) return;

                    onShippingCostsChanged({
                      ...shippingCosts,
                      second: price,
                    });
                  }}
                />
              </FormField>
            </Cell>
            <Cell span={4}>
              <FormField label="Each additional item">
                <NumberInput
                  prefix={<Input.Affix value="$" />}
                  placeholder="Set price"
                  value={shippingCosts.thirdAndUp}
                  onChange={(price) => {
                    if (!price) return;

                    onShippingCostsChanged({
                      ...shippingCosts,
                      thirdAndUp: price,
                    });
                  }}
                />
              </FormField>
            </Cell>
          </Layout>
        </Box>
      </Card.Content>
    </Card>
  );
}
