import { AnimatedCLICommand } from "../AnimatedCLICommand/AnimatedCLICommand";
import { Aurora } from "../Aurora";
import {
  Flex,
  Grid,
  GridItem,
  Icon,
  LightMode,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import { BsLightningCharge } from "react-icons/bs";
import { ChakraNextLink, Heading, LinkButton } from "tw-components";

export const HeroSection = () => {
  const trackEvent = useTrack();

  const images = [
    {
      src: require("public/assets/landingpage/homepage-wallets.png"),
      href: "/connect",
    },
    {
      src: require("public/assets/landingpage/homepage-contracts.png"),
      href: "/explore",
    },
    {
      src: require("public/assets/landingpage/homepage-payments.png"),
      href: "/checkout",
    },
    {
      src: require("public/assets/landingpage/homepage-infra.png"),
      href: "/engine",
    },
  ];

  return (
    <HomepageSection id="home" bottomPattern>
      {/* right */}
      <Aurora
        pos={{ left: "80%", top: "40%" }}
        size={{ width: "1400px", height: "1400px" }}
        color="hsl(260deg 78% 35% / 30%)"
      />

      {/* left */}
      <Aurora
        pos={{ left: "30%", top: "20%" }}
        size={{ width: "1800px", height: "1800px" }}
        color="hsl(290deg 92% 54% / 30%)"
      />

      <Grid
        pt={{
          base: 8,
          md: 16,
          lg: 24,
        }}
        templateColumns={{ base: "1fr", lg: "1fr auto" }}
        gap={{ base: 6, lg: 8 }}
        mb={{ base: 8, md: 0 }}
      >
        <Flex
          flexDir="column"
          gap={{ base: 6, md: 8 }}
          align={{ base: "center", lg: "start" }}
        >
          <Heading
            as="h2"
            letterSpacing="-0.04em"
            lineHeight={1.1}
            fontWeight={700}
            fontSize={{ base: "36px", md: "52px", lg: "64px" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            The fastest way to
            <br />
            build web3 apps.
          </Heading>
          <Heading
            as="h3"
            size="subtitle.md"
            textAlign={{ base: "center", lg: "left" }}
            maxW="500px"
          >
            SDKs in every language, smart contracts, tools, and infrastructure
            for web3 development.
          </Heading>

          <LightMode>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
              mt={{ base: 8, md: 0 }}
            >
              <Flex flexDir="column" gap={3} flexGrow={1} minW={300}>
                <LinkButton
                  href="/dashboard"
                  onClick={() =>
                    trackEvent({
                      category: "cta-button",
                      action: "click",
                      label: "start",
                      title: "Start building",
                      experiment: "open_dashboard",
                    })
                  }
                  px={4}
                  py={7}
                  // h={{ base: "48px", md: "68px" }}
                  fontSize="20px"
                  leftIcon={<Icon as={BsLightningCharge} color="black" />}
                  color="black"
                  flexShrink={0}
                  background="rgba(255,255,255,1)"
                  _hover={{
                    background: "rgba(255,255,255,0.9)!important",
                  }}
                >
                  Get Started
                </LinkButton>
              </Flex>
              <AnimatedCLICommand />
            </Flex>
          </LightMode>
        </Flex>

        <SimpleGrid
          columns={2}
          gap={6}
          justifyItems={"center"}
          maxW={{ base: "384px", lg: "100%" }}
          mx="auto"
          marginTop={{ base: 5, lg: "0" }}
        >
          {images.map((image, index) => {
            return (
              <GridItem key={index} maxW={{ base: "100%", lg: "180px" }}>
                <ChakraNextLink href={image.href}>
                  <ChakraNextImage
                    alt=""
                    w={96}
                    src={image.src}
                    priority
                    quality={95}
                    justifySelf="flex-end"
                    transition="border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease"
                    _hover={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 16px hsl(215deg 100% 60% / 30%)",
                      transform: "scale(1.01)",
                    }}
                    borderRadius={"12px"}
                  />
                </ChakraNextLink>
              </GridItem>
            );
          })}
        </SimpleGrid>
      </Grid>
    </HomepageSection>
  );
};
