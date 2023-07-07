import { LandingDesktopMobileImageProps } from "./types";
import { Container, useBreakpointValue } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";

export const LandingDesktopMobileImage: React.FC<
  LandingDesktopMobileImageProps
> = ({ image, mobileImage }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const imageToShow = isMobile && mobileImage ? mobileImage : image;

  if (!imageToShow) {
    return null;
  }

  return (
    <Container maxW="container.hero">
      <ChakraNextImage src={imageToShow} alt="" />
    </Container>
  );
};
