import { Divider, Flex, FormControl, Input } from "@chakra-ui/react";
import {
  Button,
  Card,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
} from "tw-components";

import { ApiKey, useUpdateApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ApiKeyPayConfigValidationSchema,
  apiKeyPayConfigValidationSchema,
} from "components/settings/ApiKeys/validations";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

interface PayConfigProps {
  apiKey: ApiKey;
}

const TRACKING_CATEGORY = "pay";

export const PayConfig: React.FC<PayConfigProps> = ({ apiKey }) => {
  const payService = apiKey.services?.find((service) => service.name === "pay");

  const transformedQueryData = useMemo(
    () => ({ payoutAddress: payService?.payoutAddress ?? "" }),
    [payService],
  );
  const form = useForm<ApiKeyPayConfigValidationSchema>({
    resolver: zodResolver(apiKeyPayConfigValidationSchema),
    defaultValues: transformedQueryData,
    values: transformedQueryData,
  });

  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "Pay API Key configuration updated",
    "Failed to update API Key settings for Pay",
  );

  const mutation = useUpdateApiKey();

  const handleSubmit = form.handleSubmit((values) => {
    const services = apiKey.services;
    if (!services) {
      throw new Error("Bad state: Missing services");
    }

    const { payoutAddress } = values;

    const newServices = services.map((service) => {
      if (service.name !== "pay") {
        return service;
      }

      return {
        ...service,
        payoutAddress,
      };
    });

    const formattedValues = {
      ...apiKey,
      services: newServices,
    };

    mutation.mutate(formattedValues, {
      onSuccess: () => {
        onSuccess();
        trackEvent({
          category: TRACKING_CATEGORY,
          action: "configuration-update",
          label: "success",
          data: {
            payoutAddress,
          },
        });
      },
      onError: (err) => {
        onError(err);
        trackEvent({
          category: TRACKING_CATEGORY,
          action: "configuration-update",
          label: "error",
          error: err,
        });
      },
    });
  });

  return (
    <Card>
      <Flex flexDir="column" gap={7}>
        <Heading size="title.md" as="h2">
          Fee Settings
        </Heading>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          autoComplete="off"
        >
          <Flex flexDir={"column"} gap={7} alignItems={"end"}>
            <Flex flexDir={{ base: "column", lg: "row" }} gap={6} w="full">
              <FormControl
                isInvalid={
                  !!form.getFieldState(`payoutAddress`, form.formState).error
                }
                as={Flex}
                flexDir="column"
                gap={1}
              >
                <FormLabel size="label.md">Recipient address</FormLabel>

                <Input
                  placeholder="0x..."
                  type="text"
                  {...form.register(`payoutAddress`)}
                />
                <FormErrorMessage>
                  {
                    form.getFieldState(`payoutAddress`, form.formState).error
                      ?.message
                  }
                </FormErrorMessage>
                <FormHelperText>
                  Shared fees will be sent to this address.
                </FormHelperText>
              </FormControl>
            </Flex>

            <Divider />

            <Button type="submit" colorScheme="primary">
              Save changes
            </Button>
          </Flex>
        </form>
      </Flex>
    </Card>
  );
};
