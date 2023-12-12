import { ButtonProps } from "@/interfaces";

const Button = ({ title, action, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className="primary-button"
      onClick={() => action()}
    >
      {title}
    </button>
  );
};

export default Button;
