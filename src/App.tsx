import React, { useEffect } from "react";
import HutaoProject from "./HutaoProject";
import styled from "styled-components";

export default function App() {
  useEffect(() => {
    new HutaoProject().render();
  }, []);
  return <Page id="three" />;
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  user-select: none;
`;
