import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useAddress, useSDKChainId } from "@thirdweb-dev/react";
import { SignerWithRestrictions } from "@thirdweb-dev/sdk";
import { differenceInDays } from "date-fns";
import { useSupportedChainsRecord } from "hooks/chains/configureChains";
import { Badge, Card, Heading, Text } from "tw-components";
import { AddressCopyButton } from "tw-components/AddressCopyButton";

interface AccountSignerProps {
  signer: SignerWithRestrictions;
}

export const AccountSigner: React.FC<AccountSignerProps> = ({ signer }) => {
  const address = useAddress();
  const chainId = useSDKChainId();
  const configuredChainsRecord = useSupportedChainsRecord();
  const chain = chainId ? configuredChainsRecord[chainId] : undefined;

  return (
    <Card position="relative" p={8}>
      <Flex direction="column" gap={8}>
        <Flex flexDir="column" gap={2} mt={{ base: 4, md: 0 }}>
          <Flex gap={3} alignItems="center">
            <Heading size="label.lg">
              <AddressCopyButton
                shortenAddress={false}
                address={signer.signer}
              />
            </Heading>
            {signer.isAdmin ? (
              <Badge borderRadius="lg" p={1.5}>
                Admin Key
              </Badge>
            ) : (
              <Badge borderRadius="lg" p={1.5}>
                Scoped key
              </Badge>
            )}
            {signer.signer === address && (
              <Badge colorScheme="green" borderRadius="lg" p={1.5}>
                Currently connected
              </Badge>
            )}
          </Flex>
        </Flex>

        {/*         {!field.isEditing ? ( */}
        {signer.isAdmin ? null : (
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={2}>
            <Flex direction="column">
              <Text fontWeight="bold">Maximum value per transaction</Text>
              <Text textTransform="capitalize">
                {signer.restrictions.nativeTokenLimitPerTransaction.toString()}{" "}
                {chain?.nativeCurrency.symbol}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold">Approved targets</Text>
              <Text textTransform="capitalize">
                {signer.restrictions.approvedCallTargets.length}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text fontWeight="bold">Expiration (in days)</Text>
              <Text textTransform="capitalize">
                {differenceInDays(
                  signer.restrictions.expirationDate,
                  signer.restrictions.startDate,
                )}
              </Text>
            </Flex>
          </SimpleGrid>
        )}
      </Flex>
    </Card>
  );
};
