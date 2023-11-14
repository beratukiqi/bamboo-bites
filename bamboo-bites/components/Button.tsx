const Button = ({title, action}) => {
    <button className="primary-button" onClick={action}>
        {title}
    </button>
}

export default Button;