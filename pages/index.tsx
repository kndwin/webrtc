import { useEffect, useRef } from "react";
import clsx from "clsx";
import { Box, Text } from "common/ui";
import Head from "next/head";
import tw from "tailwind-styled-components";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  return (
    <StyledContainer>
      <StyledMain>
        <Text b as="h1" tw="text-2xl">
          WebRTC
        </Text>
        <Videos />
      </StyledMain>
    </StyledContainer>
  );
}

const StyledContainer = tw.div`w-full h-full min-h-screen 
	bg-stone-100 pt-4 flex flex-col`;
const StyledMain = tw.main`container mx-auto`;

const Videos = () => {
  const selfVideoRef = useRef(null);
	const peerVideoRef = useRef(null)

  const selfVideoQuery = useQuery(
    ["media"],
    () => navigator.mediaDevices.getUserMedia({ video: true, audio: false }),
    {
      onSuccess: (stream) => {
        selfVideoRef.current.srcObject = stream;
      },
    }
  );

  return (
    <Box tw="grid grid-cols-2 gap-2">
      <StyledVideo autoPlay ref={selfVideoRef} />
      <StyledVideo autoPlay ref={peerVideoRef} />
    </Box>
  );
};

const StyledVideo = tw.video`w-full h-80 bg-black`
