import axios from 'axios';
import dayjs from 'dayjs';

const ORDERS_API_BASE_URL = "http://localhost:8080/api/v1/orders";

class OrdersService {

    getOrders(){
        return axios.get(ORDERS_API_BASE_URL);
    }

    createOrder(order){
        return axios.post(ORDERS_API_BASE_URL, order);
    }
}

export default new OrdersService()