const reducer = (state, action) =>{
    
    if(action.type === "CLEAR_CART"){
        return {...state, cart: []}
    }

    if(action.type === "REMOVE"){
        return {...state, cart: state.cart.filter((el) => el.id !== action.payload)}
    }

    if(action.type === "INCREASE"){
        let tempCart = state.cart.map((cart) =>{
            if(cart.id === action.payload){
                return {...cart, amount: cart.amount+1}
            }

            return cart;
        });

        return {...state, cart: tempCart}
    }

    if(action.type === "DECREASE"){
        let tempCart = state.cart.map((cart) =>{
            if(cart.id === action.payload){
                return {...cart, amount: cart.amount-1}
            }

            return cart
        }).filter((cart) => cart.amount !== 0)

        return {...state, cart: tempCart}
    }

    if(action.type === "GET_TOTAL"){
        
        let {total, amount} = state.cart.reduce((cartTotal, cartItem) =>{
            const {price, amount} = cartItem;
            const itemTotal = price * amount;
            cartTotal.amount += amount;
            cartTotal.total  += itemTotal
            return cartTotal;
        }, {total: 0, amount: 0})


        total = parseFloat(total.toFixed(2))
        return {...state, total,amount}
    }
    
    return state
}


export default reducer;