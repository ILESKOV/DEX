pragma solidity ^0.8.0;

import "./Wallet.sol";

contract DEX is Wallet {

    enum Side{
        BUY,
        SELL
    }

    struct Order {
        uint id;
        address trader;
        Side side;
        bytes32 ticker;
        uint amount;
        uint price;
    }
    uint public nextOrderId = 0;

    mapping(bytes32 => mapping(uint => Order[])) public orderBook;

    function getOrderBook(bytes32 ticker, Side side) view public returns(Order[] memory){
        return orderBook[ticker][uint(side)];
    }

    function createLimitOrder(Side side, bytes32 ticker, uint amount, uint price) public {
        if(side == Side.BUY){
            require(balances[msg.sender]["ETH"] >= amount * price);
        }
        else if(side == Side.SELL){
            require(balances[msg.sender][ticker] >= amount);
        }

        Order[] storage orders = orderBook[ticker][uint(side)];
        //[Order1, Order2, ...]
        orders.push(Order(nextOrderId, msg.sender, side, ticker, amount, price));
        nextOrderId++;

        if(side == Side.BUY){
            for(uint i = 0; i < orders.length; i++){
                if(orders.price[i] < orders.price[i + 1]){
                    Order memory order = orders[i];
                    orders[i] = orders[i+1];
                    orders[i+1] = order;
                }
            }
        }
        else if(side == Side.SELL){
            for(uint j = 0; j < orders.length; j++){
                if(orders.price[j] > orders.price[j + 1]){
                    Order memory order = orders[j];
                    orders[j] = orders[j+1];
                    orders[j+1] = order;
                }
            }
        }


}