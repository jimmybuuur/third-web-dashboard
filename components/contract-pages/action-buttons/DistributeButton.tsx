import { IContractActionButtonProps } from "./types";
import {
  useSplitBalances,
  useSplitDistributeFunds,
} from "@3rdweb-sdk/react/hooks/useSplit";
import { MismatchButton } from "components/buttons/MismatchButton";
import { TransactionButton } from "components/buttons/TransactionButton";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useMemo } from "react";
import { Button } from "tw-components";

export interface IDistributeButtonProps extends IContractActionButtonProps {}

export const DistributeButton: React.FC<IDistributeButtonProps> = ({
  ...restButtonProps
}) => {
  const splitsAddress = useSingleQueryParam("split");

  const balances = useSplitBalances(splitsAddress);
  const numTransactions = useMemo(() => {
    if (!balances.data || balances.isLoading) {
      return 0;
    }
    return balances.data.filter((b) => b.balance !== "0.0").length;
  }, [balances.data, balances.isLoading]);

  const distibutedFundsMutation = useSplitDistributeFunds(splitsAddress);

  if (balances.isError) {
    // if we fail to get the balances, we can't know how many transactions there are going to be
    // we still want to show the button, so we'll just show the mismatch button
    return (
      <MismatchButton
        borderRadius="full"
        isLoading={distibutedFundsMutation.isLoading}
        colorScheme="primary"
        onClick={() => distibutedFundsMutation.mutate()}
        {...restButtonProps}
      >
        Distribute Funds
      </MismatchButton>
    );
  }

  if (numTransactions === 0) {
    return (
      <Button
        borderRadius="full"
        isDisabled
        colorScheme="primary"
        {...restButtonProps}
      >
        Nothing to distribute
      </Button>
    );
  }

  return (
    <TransactionButton
      transactionCount={numTransactions}
      borderRadius="full"
      isLoading={balances.isLoading || distibutedFundsMutation.isLoading}
      colorScheme="primary"
      onClick={() => distibutedFundsMutation.mutate()}
      {...restButtonProps}
    >
      Distribute Funds
    </TransactionButton>
  );
};
