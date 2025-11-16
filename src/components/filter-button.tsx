
import styled from "@emotion/styled";


type ButtonProp = {
    text: string;
    onClick?: () => void;
    active: string;
    filter: string;
};

const StyledButton = styled.button<{ active: string, filter: string}>`
    padding: ${p => p.theme.spacing(1)} ${p => p.theme.spacing(2)};
    border: none;
    border-radius: ${p => p.theme.radius.md};
    color: ${p => (p.active === p.filter ? p.theme.colors.background : p.theme.colors.text)};
    background: ${p => (p.active === p.filter ? p.theme.colors.accent : p.theme.colors.surface)};
    cursor: pointer;
    transition: background 0.2s ease;
    font-weight: ${p => p.theme.font.weight.medium};
    &:hover{
        color: ${p => p.theme.colors.background};
        background: ${p => p.theme.colors.accentHover};
    }
`


export function FButton({ text, onClick, active, filter }: ButtonProp) {
    return (
        <StyledButton onClick={onClick} active={active} filter={filter}>
            {text}
        </StyledButton>
    );
}