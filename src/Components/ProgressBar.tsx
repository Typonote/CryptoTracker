import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 7px;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
`;

const Status = styled.div`
  transform-origin: top left;
  height: 100%;
  background-color: ${(props) => props.theme.accentColor};
`;

export default function ProgressBar(): JSX.Element {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const length = Number(`${totalScroll / windowHeight}`);
      setScroll(length);
    };
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  }, []);

  return (
    <Container>
      <Status style={{ width: scroll * 100 + "%" }} />
    </Container>
  );
}
