import { ApiKeyDetailsRow } from "./DetailsRow";
import { ApiKeyValidationSchema, HIDDEN_SERVICES } from "./validations";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  HStack,
  Input,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  Tooltip,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { ServiceName, getServiceByName } from "@thirdweb-dev/service-utils";
import React, { useState } from "react";
import {
  FieldArrayWithId,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import {
  Button,
  Card,
  Checkbox,
  CodeBlock,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
} from "tw-components";
import {
  AnyBundleIdAlert,
  AnyDomainAlert,
  NoBundleIdsAlert,
  NoDomainsAlert,
} from "./Alerts";

interface ApiKeyKeyFormProps {
  form: UseFormReturn<ApiKeyValidationSchema, any>;
  selectedSection?: number;
  apiKey?: ApiKey | null;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSectionChange?: (idx: number) => void;
  tabbed?: boolean;
}

type FormStep = "name" | "services" | "permissions" | "keys";

export const ApiKeyKeyForm: React.FC<ApiKeyKeyFormProps> = ({
  form,
  selectedSection,
  apiKey,
  onClose,
  onSubmit,
  onSectionChange,
  tabbed = true,
  isLoading,
}) => {
  const isEditing = !!apiKey;
  const { secret, key } = apiKey || {};
  const [formStep, setFormStep] = useState<FormStep>(
    isEditing ? "keys" : "name",
  );
  const [domainsFieldActive, setDomainsFieldActive] = useState(true);
  const enabledServices =
    form.getValues("services")?.filter((srv) => !!srv.enabled) || [];

  const { fields, update } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const renderName = () => {
    return (
      <>
        <FormControl
          isRequired
          isInvalid={!!form.getFieldState("name", form.formState).error}
        >
          <FormLabel>Key name</FormLabel>
          <Input
            autoFocus
            placeholder="Descriptive name"
            type="text"
            {...form.register("name")}
          />
          <FormErrorMessage>
            {form.getFieldState("name", form.formState).error?.message}
          </FormErrorMessage>
        </FormControl>
      </>
    );
  };

  const handleAction = (
    srvIdx: number,
    srv: FieldArrayWithId<ApiKeyValidationSchema, "services", "id">,
    actionName: string,
    checked: boolean,
  ) => {
    const actions = checked
      ? [...(srv.actions || []), actionName]
      : (srv.actions || []).filter((a) => a !== actionName);

    update(srvIdx, {
      ...srv,
      actions,
    });
  };

  const renderGeneral = () => {
    return (
      <VStack gap={2} alignItems="flex-start">
        {isEditing && <FormLabel>Access Restrictions</FormLabel>}

        <ButtonGroup
          size="sm"
          variant="ghost"
          spacing={{ base: 0.5, md: 2 }}
          w="full"
        >
          <Button
            type="button"
            isActive={domainsFieldActive}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
            variant="outline"
            onClick={() => setDomainsFieldActive(true)}
          >
            Domains (Web apps)
          </Button>
          <Button
            type="button"
            isActive={!domainsFieldActive}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
            variant="outline"
            onClick={() => setDomainsFieldActive(false)}
          >
            Bundle IDs (iOS, Android, Games)
          </Button>
        </ButtonGroup>

        {domainsFieldActive && (
          <VStack spacing={4}>
            <FormControl
              isInvalid={!!form.getFieldState("domains", form.formState).error}
            >
              <FormHelperText pb={4} size="body.md">
                <Text fontWeight="medium">
                  Prevent third-parties from using your Client ID by restricting
                  access to allowed domains.
                </Text>

                <UnorderedList pt={2} spacing={1}>
                  <Text as={ListItem}>
                    Use <code>*</code> to authorize all subdomains. eg:
                    *.thirdweb.com accepts all sites ending in .thirdweb.com.
                  </Text>
                  <Text as={ListItem}>
                    Enter <code>localhost:&lt;port&gt;</code> to authorize local
                    URLs.
                  </Text>
                </UnorderedList>
              </FormHelperText>

              <HStack alignItems="center" justifyContent="space-between" pb={2}>
                <FormLabel size="label.sm" mb={0}>
                  Allowed Domains
                </FormLabel>
                <HStack alignItems="center">
                  <Checkbox
                    onChange={(e) => {
                      form.setValue("domains", e.target.checked ? "*" : "");
                    }}
                  />
                  <Text>Unrestricted access</Text>
                </HStack>
              </HStack>

              {form.watch("domains") !== "*" && (
                <>
                  <Textarea
                    placeholder="thirdweb.com, rpc.example.com, localhost:3000"
                    {...form.register("domains")}
                  />
                  {!form.getFieldState("domains", form.formState).error ? (
                    <FormHelperText>
                      Enter domains separated by commas or new lines.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      {
                        form.getFieldState("domains", form.formState).error
                          ?.message
                      }
                    </FormErrorMessage>
                  )}
                </>
              )}
            </FormControl>

            {form.getValues("domains").length === 0 && <NoDomainsAlert />}
            {form.getValues("domains").includes("*") && <AnyDomainAlert />}
          </VStack>
        )}

        {!domainsFieldActive && (
          <VStack spacing={4}>
            <FormControl
              isInvalid={
                !!form.getFieldState("bundleIds", form.formState).error
              }
            >
              <FormHelperText pb={4} size="body.md">
                <Text fontWeight="medium">
                  Prevent third-parties from using your Client ID by restricting
                  access to allowed Bundle IDs. This is applicable only if you
                  want to use your key with native games or native mobile
                  applications.
                </Text>
              </FormHelperText>

              <HStack alignItems="center" justifyContent="space-between" pb={2}>
                <FormLabel size="label.sm" mb={0}>
                  Allowed Bundle IDs
                </FormLabel>
                <HStack alignItems="center">
                  <Checkbox
                    onChange={(e) => {
                      form.setValue("bundleIds", e.target.checked ? "*" : "");
                    }}
                  />
                  <Text>Unrestricted access</Text>
                </HStack>
              </HStack>

              {form.watch("bundleIds") !== "*" && (
                <>
                  <Textarea
                    placeholder="com.thirdweb.app"
                    {...form.register("bundleIds")}
                  />

                  {!form.getFieldState("bundleIds", form.formState).error ? (
                    <FormHelperText>
                      Enter bundle ids separated by commas or new lines.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      {
                        form.getFieldState("bundleIds", form.formState).error
                          ?.message
                      }
                    </FormErrorMessage>
                  )}
                </>
              )}
            </FormControl>

            {form.getValues("bundleIds").length === 0 && <NoBundleIdsAlert />}
            {form.getValues("bundleIds").includes("*") && <AnyBundleIdAlert />}
          </VStack>
        )}

        {/* <FormControl>
          <FormLabel>Allowed Wallet addresses</FormLabel>
          <Textarea
            placeholder="0xa1234567890AbcC1234567Bb1bDa6c885b2886b6"
            {...form.register("walletAddresses")}
          />
          <FormHelperText>
            New line or comma-separated list of wallet addresses.
            <br />
            To allow any wallet, set to <code>*</code>.
          </FormHelperText>
        </FormControl> */}
      </VStack>
    );
  };

  const renderServices = () => {
    return (
      <>
        <VStack alignItems="flex-start" w="full" gap={4}>
          <Text size="body.md">
            Choose thirdweb services this API Key is allowed to access.
          </Text>
          {fields.map((srv, idx) => {
            const service = getServiceByName(srv.name as ServiceName);

            return service ? (
              <Card
                w="full"
                key={srv.name}
                display={HIDDEN_SERVICES.includes(srv.name) ? "none" : "block"}
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  pb={3}
                >
                  <Box>
                    <Heading size="label.lg" pb={1}>
                      {service.title}
                    </Heading>
                    <Text size="body.md">{service.description}</Text>
                  </Box>

                  <Switch
                    colorScheme="primary"
                    isChecked={srv.enabled}
                    onChange={() =>
                      update(idx, {
                        ...srv,
                        enabled: !srv.enabled,
                      })
                    }
                  />
                </HStack>

                {service.name === "bundler" && (
                  <FormControl
                    isInvalid={
                      !!form.getFieldState(`services.${idx}`, form.formState)
                        .error
                    }
                  >
                    <FormLabel>Allowed Target addresses</FormLabel>
                    <Textarea
                      disabled={!srv.enabled}
                      placeholder="0xa1234567890AbcC1234567Bb1bDa6c885b2886b6"
                      {...form.register(`services.${idx}.targetAddresses`)}
                    />
                    {!form.getFieldState(
                      `services.${idx}.targetAddresses`,
                      form.formState,
                    ).error ? (
                      <FormHelperText>
                        Enter contract/wallet addresses separated by commas or
                        new lines. Leave blank to deny all. Use <code>*</code>{" "}
                        to allow any.
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        {
                          form.getFieldState(
                            `services.${idx}.targetAddresses`,
                            form.formState,
                          ).error?.message
                        }
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}

                {service.actions.length > 0 && (
                  <FormControl>
                    <HStack gap={4}>
                      {service.actions.map((sa) => (
                        <Tooltip
                          key={sa.name}
                          label={
                            <Card py={2} px={4} bgColor="backgroundHighlight">
                              <Text fontSize="small" lineHeight={6}>
                                {sa.description}
                              </Text>
                            </Card>
                          }
                          p={0}
                          bg="transparent"
                          boxShadow="none"
                        >
                          <HStack gap={1} cursor="help">
                            <Checkbox
                              isChecked={srv.actions.includes(sa.name)}
                              onChange={(e) =>
                                handleAction(
                                  idx,
                                  srv,
                                  sa.name,
                                  e.target.checked,
                                )
                              }
                            />
                            <Text>{sa.title}</Text>
                          </HStack>
                        </Tooltip>
                      ))}
                    </HStack>
                  </FormControl>
                )}
              </Card>
            ) : null;
          })}
        </VStack>
      </>
    );
  };

  const renderKeys = () => {
    return (
      <VStack gap={4}>
        <ApiKeyDetailsRow
          title="Client ID"
          content={
            isLoading ? (
              <Spinner size="sm" />
            ) : key ? (
              <CodeBlock codeValue={key} code={key} />
            ) : (
              <Text>Error generating keys</Text>
            )
          }
          description="Identifies your application. It should generally be restricted to specific domains (web) and/or bundle-ids (native)."
        />

        <Divider />

        <ApiKeyDetailsRow
          title="Secret Key"
          content={
            isLoading ? (
              <Spinner size="sm" />
            ) : secret ? (
              <CodeBlock codeValue={secret} code={secret} />
            ) : (
              <Text>Error generating keys</Text>
            )
          }
          description="Identifies and authenticates your application from the backend."
        />

        <Alert status="warning" variant="left-accent">
          <AlertIcon />
          <Flex direction="column" gap={2}>
            <Heading as={AlertTitle} size="label.md">
              Secret Key Handling
            </Heading>
            <Text as={AlertDescription} size="body.md">
              Store the Secret Key in a secure place and{" "}
              <strong>never share it</strong>. You will not be able to retrieve
              it again. If you lose it, you will need to create a new API Key
              pair.
            </Text>
          </Flex>
        </Alert>
      </VStack>
    );
  };

  const renderFormStep = () => {
    switch (formStep) {
      case "name":
        return renderName();
      case "services":
        return renderServices();
      case "permissions":
        return renderGeneral();
      case "keys":
        return renderKeys();
    }
  };

  const handleSubmit = async () => {
    switch (formStep) {
      case "name":
        await form.trigger();
        if (form.formState.isValid) {
          setFormStep("services");
        }
        break;
      case "services":
        await form.trigger();
        if (form.formState.isValid) {
          setFormStep("permissions");
        }
        break;
      case "permissions":
        await form.trigger();
        if (form.formState.isValid) {
          setFormStep("keys");
        }
        onSubmit();
        break;
      case "keys":
        onClose();
        break;
    }
  };

  const backAction = () => {
    switch (formStep) {
      case "name":
        break;
      case "services":
        setFormStep("name");
        break;
      case "permissions":
        setFormStep("services");
        break;
      case "keys":
        break;
    }
  };
  const shouldShowBack = () => {
    switch (formStep) {
      case "name":
      case "keys":
        return false;
      case "services":
      case "permissions":
        return true;
    }
  };

  const actionLabel = () => {
    switch (formStep) {
      case "name":
      case "services":
        return "Next";
      case "permissions":
        return "Create";
      case "keys":
        return "I have stored the Secret Key securely";
    }
  };

  const titleLabel = () => {
    switch (formStep) {
      case "name":
        return "Create an API Key";
      case "services":
        return "Enable Services";
      case "permissions":
        return "Set Access Restrictions";
      case "keys":
        return "Your API Keys";
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      autoComplete="off"
    >
      {tabbed && (
        <Tabs
          defaultIndex={selectedSection}
          onChange={onSectionChange}
          h="full"
          mx={-6}
        >
          <TabList borderColor="borderColor">
            <Tab>General</Tab>
            <Tab>Services ({enabledServices?.length || 0})</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack gap={6} pt={4}>
                {renderName()}
                {renderGeneral()}
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack alignItems="flex-start" w="full" gap={3} pt={3}>
                {renderServices()}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}

      {!tabbed && (
        <ModalContent minHeight={250}>
          <ModalHeader>{titleLabel()}</ModalHeader>
          {!isEditing && <ModalCloseButton />}
          <ModalBody>{renderFormStep()}</ModalBody>
          <ModalFooter gap={4}>
            {shouldShowBack() && <Button onClick={backAction}>Back</Button>}
            <Button
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {actionLabel()}
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </form>
  );
};
