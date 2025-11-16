import styled from "@emotion/styled";

type InputProp = {
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledInput = styled.input`
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(1)};
  border: solid 1px ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.md};
  color: ${(p) => p.theme.colors.textMuted};
  background: ${(p) => p.theme.colors.background};
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;
  font-weight: ${(p) => p.theme.font.weight.medium};
  &:hover {
    background: ${(p) => p.theme.colors.surface};
  }
`;

export function Input({ type, value, onChange, placeholder }: InputProp) {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></StyledInput>
  );
}
