import styled from "@emotion/styled";

export const MainDiv = styled.div`
  padding: padding: ${p => p.theme.spacing(4)} ${p => p.theme.spacing(4)};;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const Stats = styled.p`
  font-size: ${p => p.theme.font.size.sm};
  color: ${(p) => p.theme.colors.textMuted};
`;

export const SortRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SortGap = styled.div`
  display: flex;
  gap: 8px;
`;

export const Titleh1 = styled.h1`
  font-size: 22px;
`;