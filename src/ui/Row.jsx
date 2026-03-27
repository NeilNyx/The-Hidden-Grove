import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    ${({ $type }) =>
        $type === "horizontal" &&
        css`
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        `}
`;

export default Row;
