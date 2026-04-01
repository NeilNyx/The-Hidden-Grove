import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AlertDialog from "../../ui/AlertDialog";
import useCheckout from "../check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
    const { checkout, isCheckingOut } = useCheckout();

    return (
        <Modal>
            {/* Trigger */}
            <Modal.Open opens="checkout">
                <Button $variation="primary" $size="small">
                    Check out
                </Button>
            </Modal.Open>

            {/* Modal Window */}
            <Modal.Window name="checkout">
                <AlertDialog
                    title="Check out booking"
                    description="Are you sure you want to check out this guest?"
                    confirmLabel="Check out"
                    confirmVariation="primary"
                    disabled={isCheckingOut}
                    onConfirm={() => checkout(bookingId)}
                />
            </Modal.Window>
        </Modal>
    );
}

export default CheckoutButton;
