import { Box, ButtonGroup, Divider, Flex, Tooltip } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { EngineSidebar } from "core-ui/sidebar/engine";
import { PageId } from "page-id";
import { useState } from "react";
import { Button, Card, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { EngineOverview } from "components/engine/overview/engine-overview";
import { EngineExplorer } from "components/engine/explorer/engine-explorer";
import { EngineConfiguration } from "components/engine/configuration/engine-configuration";
import { NoEngineInstance } from "components/engine/no-engine-instance";
import { useLocalStorage } from "hooks/useLocalStorage";
import { EnginePermissions } from "components/engine/permissions/engine-permissions";
import { useAddress } from "@thirdweb-dev/react";
import { NoConnectedWallet } from "components/engine/no-connected-wallet";

const EngineManage: ThirdwebNextPage = () => {
  const [instanceUrl, setInstanceUrl] = useLocalStorage("engine-instance", "");
  const tabs = [
    {
      title: "Overview",
      isDisabled: false,
      disabledText: "",
      children: <EngineOverview instance={instanceUrl} />,
    },
    {
      title: "Explorer",
      isDisabled: false,
      disabledText: "",
      children: <EngineExplorer instance={instanceUrl} />,
    },
    {
      title: "Configuration",
      isDisabled: false,
      disabledText: "",
      children: <EngineConfiguration instance={instanceUrl} />,
    },
    {
      title: "Permissions",
      isDisabled: false,
      disabledText: "",
      children: <EnginePermissions instance={instanceUrl} />,
    },
  ];

  const [tab, setTab] = useState(tabs[0].title);

  const address = useAddress();

  return (
    <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Heading size="title.lg" as="h1">
            Engine
          </Heading>
          <Text>
            Engine provides a server-side interface for contracts & wallets,
            without the complexities of wallet and transaction management.{" "}
            <Link
              color="blue.500"
              href="https://portal.thirdweb.com/engine"
              isExternal
            >
              Learn more
            </Link>
            .
          </Text>
        </Flex>

        {instanceUrl && (
          <Text>
            Engine URL: <em>{instanceUrl}</em>{" "}
            <Button
              size="sm"
              variant="link"
              onClick={() => setInstanceUrl("")}
              color="blue.500"
            >
              Edit
            </Button>
          </Text>
        )}

        {!instanceUrl ? (
          <NoEngineInstance setInstanceUrl={setInstanceUrl} />
        ) : !address ? (
          <NoConnectedWallet />
        ) : (
          <Flex flexDir="column" gap={4}>
            <Flex flexDir="column" gap={{ base: 0, md: 4 }} mb={4} mt={4}>
              <Box
                w="full"
                overflow={{ base: "auto", md: "hidden" }}
                pb={{ base: 4, md: 0 }}
              >
                <ButtonGroup
                  size="sm"
                  variant="ghost"
                  spacing={2}
                  w={(tabs.length + 1) * 95}
                >
                  {tabs.map((tb) => (
                    <Tooltip
                      key={tb.title}
                      p={0}
                      bg="transparent"
                      boxShadow={"none"}
                      label={
                        tb.isDisabled ? (
                          <Card py={2} px={4} bgColor="backgroundHighlight">
                            <Text size="label.sm">
                              {tb?.disabledText || "Coming Soon"}
                            </Text>
                          </Card>
                        ) : (
                          ""
                        )
                      }
                    >
                      <Button
                        isDisabled={tb.isDisabled}
                        type="button"
                        isActive={tab === tb.title}
                        _active={{
                          bg: "bgBlack",
                          color: "bgWhite",
                        }}
                        rounded="lg"
                        onClick={() => setTab(tb.title)}
                      >
                        {tb.title}
                      </Button>
                    </Tooltip>
                  ))}
                </ButtonGroup>
              </Box>
              <Divider />
            </Flex>

            {tabs.find((t) => t.title === tab)?.children}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

EngineManage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <EngineSidebar activePage="manage" />
    {page}
  </AppLayout>
);

EngineManage.pageId = PageId.EngineManage;

export default EngineManage;
