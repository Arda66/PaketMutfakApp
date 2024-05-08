export interface Order {
    id: string;
    address: string;
    payment: string;
    delivery_time: string;
    status: string;
    items: Array<{ id: string; name: string; }>;
  }
  
  export interface Courier {
    id: string;
    name: string;
  }
  
  export interface Basket {
    id: string;
    courier_id: string;
    status: string;
    orders: string[];
  }
  