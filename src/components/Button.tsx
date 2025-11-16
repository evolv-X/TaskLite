import styled from "@emotion/styled";

type ButtonProp = {
    text: string;
    onClick?: () => void;
};

const StyledButton = styled.button`
    padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
    border: none;
    border-radius: ${p => p.theme.radius.md};
    color: ${p => p.theme.colors.background};
    background: ${p => p.theme.colors.accent};
    cursor: pointer;
    transition: background 0.2s ease;
    font-weight: ${p => p.theme.font.weight.medium};
    &:hover{
        background: ${p => p.theme.colors.accentHover};
    }
`


export function Button({ text, onClick }: ButtonProp) {
    return (
        <StyledButton onClick={onClick}>
            {text}
        </StyledButton>
    );
}
