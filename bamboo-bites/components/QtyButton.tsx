import { QtyButtonProps } from "@/interfaces";

const QtyButton = ({ title, action, disabled }: QtyButtonProps) => {
  return (
    <button disabled={disabled} className="qty-button" onClick={action}>
      {title}
    </button>
  );
};

export default QtyButton;
