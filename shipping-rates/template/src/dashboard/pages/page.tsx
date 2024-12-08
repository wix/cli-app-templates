import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Cell,
  Layout,
  Loader,
  Page,
} from "@wix/design-system";
import { dashboard } from "@wix/dashboard";
import { ShippingCostsForm } from "../components/ShippingDeliveryMethodForm";
import type { ShippingAppData, ShippingCosts } from "../../types";
import { RecentOrdersCard } from "../components/RecentOrdersCard";
import { WixPageId } from "../../consts";
import { useShippingAppData } from "../hooks/use-shipping-app-data";
import { withProviders } from "../withProviders";
import { UpgradeCard } from "../components/UpgradeCard";
import { appInstances } from "@wix/app-management";
import { id as activationModalId } from "../modals/activate-shipping-rates-plugin/modal.json";
import { id as shippingRatesPageId } from "./page.json";
import { FreeTrialMessage } from "../components/FreeTrialMessage";

function ShippingRatesPage() {
  const { showToast, navigate } = dashboard;
  const { getShippingAppData, setShippingAppData } = useShippingAppData();

  const [appInstance, setAppInstance] = useState<appInstances.AppInstance>();
  const [currentShippingAppData, setCurrentShippingAppData] = useState<
    ShippingAppData | undefined
  >(getShippingAppData.data);

  useEffect(() => {
    async function getAppInstance() {
      const { instance } = await appInstances.getAppInstance();
      setAppInstance(instance);
    }

    getAppInstance();

    setCurrentShippingAppData(getShippingAppData.data);
  }, [getShippingAppData.data]);

  const onSave = useCallback(async () => {
    if (!currentShippingAppData) return;

    try {
      await setShippingAppData.mutateAsync(currentShippingAppData);

      showToast({
        message: "Shipping rates saved successfully.",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: "Failed to save shipping rates.",
        type: "error",
      });
    }
  }, [setShippingAppData.mutateAsync, currentShippingAppData, showToast]);

  const setCostsForMethod = useCallback(
    (shippingMethodCode: string) => (costs: ShippingCosts) => {
      setCurrentShippingAppData({
        ...currentShippingAppData,
        shippingMethods: currentShippingAppData!.shippingMethods.map(
          (shippingMethod) =>
            shippingMethod.code === shippingMethodCode
              ? { ...shippingMethod, costs }
              : shippingMethod
        ),
      });
    },
    [currentShippingAppData]
  );

  return (
    <Page height="100vh">
      <Page.Header
        actionsBar={
          <Box gap="SP2">
            <Button
              priority="secondary"
              onClick={() => dashboard.openModal(activationModalId)}
            >
              Activate Plugin
            </Button>
            <Button onClick={onSave}>
              {setShippingAppData.isLoading ? (
                <Loader size="tiny" />
              ) : (
                "Save rates"
              )}
            </Button>
          </Box>
        }
        breadcrumbs={
          <Breadcrumbs
            activeId={shippingRatesPageId}
            items={[
              { id: WixPageId.MANAGE_APPS, value: "Apps" },
              {
                id: shippingRatesPageId,
                value: "Shipping Rate App",
              },
            ]}
            onClick={({ id }) => navigate(id as string)}
          />
        }
        title={"Shipping Rates App"}
        subtitle="Customize shipping fees based on item quantity, weight, ensuring a flexible and cost-effective solution for your business."
      />
      <Page.Content>
        <Layout>
          {appInstance?.billing?.freeTrialInfo?.status ===
            appInstances.FreeTrialStatus.IN_PROGRESS && (
            <Cell>
              <FreeTrialMessage
                freeTrialInfo={appInstance?.billing.freeTrialInfo}
              />
            </Cell>
          )}
          <Cell span={8}>
            {getShippingAppData.isLoading ? (
              <Box align="center">
                <Loader />
              </Box>
            ) : (
              <Box direction="vertical" gap="SP4">
                {currentShippingAppData?.shippingMethods.map(
                  (method, index) => (
                    <ShippingCostsForm
                      key={index}
                      title={method.title}
                      shippingCosts={method.costs}
                      onShippingCostsChanged={setCostsForMethod(method.code)}
                    />
                  )
                )}
                {appInstance?.isFree && (
                  <UpgradeCard appInstance={appInstance} />
                )}
              </Box>
            )}
          </Cell>
          <Cell span={4}>
            <Page.Sticky>
              <RecentOrdersCard />
            </Page.Sticky>
          </Cell>
        </Layout>
      </Page.Content>
      <Page.FixedFooter>
        <Page.Footer divider>
          <Page.Footer.End></Page.Footer.End>
        </Page.Footer>
      </Page.FixedFooter>
    </Page>
  );
}

export default withProviders(ShippingRatesPage);
