import styled from "@emotion/styled";

export const StyledSelect = styled.select`
  padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(1)};
  border: none;
  border-radius: ${p => p.theme.radius.md};
  color: ${p => p.theme.colors.text};
  background: ${p => p.theme.colors.surface};
  cursor: pointer;
  font-weight: ${p => p.theme.font.weight.medium};
  transition: background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 0 0 1px ${p => p.theme.colors.border};

  &:hover {
    background: ${p => p.theme.colors.surface};
    box-shadow: 0 0 0 2px ${p => p.theme.colors.accent};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${p => p.theme.colors.accent};
  }

  option {
    color: ${p => p.theme.colors.text};
    background: ${p => p.theme.colors.background};
    border-radius: ${p => p.theme.radius.md};
  }
`;
