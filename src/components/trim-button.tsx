import styled from "@emotion/styled";

type ButtonProp = {
    text: string;
    onClick?: () => void;
};

const StyledButton = styled.button`
    padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(3)};
    border: 2px dashed ${p => p.theme.colors.accent};
    border-radius: ${p => p.theme.radius.md};
    color: ${p => p.theme.colors.accent};
    background: ${p => p.theme.colors.surface};
    cursor: pointer;
    transition: background 0.2s ease;
    font-weight: ${p => p.theme.font.weight.medium};
    &:hover{
        background: ${p => `${p.theme.colors.accentHover}1A`}; 
    }
`


export function TrimButton({ text, onClick }: ButtonProp) {
    return (
        <StyledButton onClick={onClick}>
            {text}
        </StyledButton>
    );
}
