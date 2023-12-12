export interface AddonItem {
    id: number;
    item: string;
    price: number;
    imgUrl: string;
}

export interface ButtonProps {
    title: string;
    action: () => void;
    disabled?: boolean;
}

export interface CartItemProps {
    id: string;
    item: string;
    price: number;
    desc: string;
    imgUrl: string;
    quantity: number;
    tweaks?: string[] | undefined;
}

export interface MenuItemProps {
    food: {
        id: string;
        item: string;
        price: number;
        desc: string;
        imgUrl: string;
        protein: [];
        allergen: string[];
        tweaks?: string[];
    };
}

export interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    food: {
      id: string;
      item: string;
      price: number;
      desc: string;
      imgUrl: string;
      protein: [];
      allergen: string[];
    };
}

export interface Order {
    order: OrderDetail[];
    orderNr: string;
    status: string;
    timeStamp: string;
    totalPrice: number;
    deliveryMethod: string;
}

export interface OrderDetails {
    deliveryMethod: string;
    status: string;
}

export interface OrderDetail {
    id: string;
    item: string;
    price: number;
    desc: string;
    imgUrl: string;
    quantity: number;
    orderNr: number;
}

export interface OrderItem {
    orderNr: number;
    timeStamp: string;
    status: string;
}

export interface OrderItemAdminProps {
    order: any;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export interface OrderModalProps {
    orderItem: Order;
    isOpen: boolean;
    closeModal: () => void;
}

export interface OrderTableProps {
    orders: OrderItem[];
    status: string;
    activeOrder: OrderItem | null;
    openModal: (order: OrderItem) => void;
    closeModal: () => void;
}

export interface PageHeaderProps {
    title: string;
    img: string;
    landingpage?: boolean;
    children?: any;
}

export interface PageWrapperProps {
	children: React.ReactNode;
	column?: boolean;
	id?: string;
}

export interface QtyButtonProps {
    title: string;
    action: () => void;
    disabled?: boolean;
}

export interface TweakProps {
    allergens: { [key: string]: boolean };
    protein: string;
}