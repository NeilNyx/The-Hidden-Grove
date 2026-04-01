import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";

const StyledAlertDialog = styled.div`
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    & p {
        color: var(--color-grey-500);
        margin-bottom: 1.2rem;
    }

    & div {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

function AlertDialog({
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    confirmVariation = "danger", // danger | primary | secondary
    onConfirm,
    onCloseModal,
    disabled,
}) {
    return (
        <StyledAlertDialog>
            <Heading as="h3">{title}</Heading>

            {description && <p>{description}</p>}

            <div>
                <Button
                    $variation="secondary"
                    disabled={disabled}
                    onClick={onCloseModal}
                >
                    {cancelLabel}
                </Button>

                <Button
                    $variation={confirmVariation}
                    disabled={disabled}
                    onClick={onConfirm}
                >
                    {confirmLabel}
                </Button>
            </div>
        </StyledAlertDialog>
    );
}

export default AlertDialog;
