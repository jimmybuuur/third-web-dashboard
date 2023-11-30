import { useAllContractList } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { PaymentContractsTable } from "./payment-contracts-table";
import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { NoWalletConnectedPayments } from "contract-ui/tabs/payments/components/no-wallet-connected-payments";
import { validPaymentsChainIds } from "@3rdweb-sdk/react/hooks/usePayments";
import { useMemo } from "react";

export const PaymentContracts = () => {
  const address = useAddress();
  const deployedContracts = useAllContractList(address);
  const { data: account } = useAccount();

  const filteredByChain = useMemo(() => {
    if (!deployedContracts?.data) {
      return [];
    }

    return deployedContracts.data.filter((contract) =>
      validPaymentsChainIds.includes(contract.chainId),
    );
  }, [deployedContracts?.data]);

  return (
    <Flex flexDir="column" gap={3}>
      {account?.id ? (
        <PaymentContractsTable
          paymentContracts={filteredByChain || []}
          accountId={account.id}
          isLoading={deployedContracts.isLoading}
          isFetched={deployedContracts.isFetched}
        />
      ) : (
        <NoWalletConnectedPayments />
      )}
    </Flex>
  );
};
