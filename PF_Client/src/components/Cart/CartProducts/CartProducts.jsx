import React, { useState } from 'react'
import styles from './CartProducts.module.css';
import { DeleteIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCart, update_cart } from '../../../redux/actions';

export const CartProducts = ({ cart, totalPrice, setTotalPrice, totalQuantity, setTotalQuantity, el }) => {
  // Estado de la cantidad de artículos por producto
  const [itemsPerProduct, setItemsPerProduct] = useState(el.quantity)
  const dispatch = useDispatch()

  const addQuantity = () => {
    el.quantity = Number(el.quantity) + 1
    setTotalPrice(totalPrice + Math.round(el.price))
    setItemsPerProduct(Number(itemsPerProduct) + 1)
    setTotalQuantity(Number(totalQuantity) + 1)
  }

  const reduceQuantity = () => {
    if (itemsPerProduct > 1) {
      el.quantity = Number(el.quantity) - 1
      setTotalQuantity(Number(totalQuantity) - 1)
      setTotalPrice(totalPrice - Math.round(el.price))
      setItemsPerProduct(Number(itemsPerProduct) - 1)
    }
  }

  const handleDeleteItem = () => {
    const indexProduct = cart.find(e => e.id == el.id)
    dispatch(deleteCart(indexProduct.id))

    // Recalcular total de dinero y Cantidad de productos
    setTotalPrice(cart.reduce((accumulator, currentValue) => 
      accumulator + Math.round(currentValue.price * currentValue.quantity), 0))

    setTotalQuantity(cart.reduce((accumulator, currentValue) => 
      accumulator + currentValue.quantity, 0))
  }

  const handleChangeQuantity = (e) => {
    el.quantity = Number(e.target.value)

    setTotalPrice(cart.reduce((accumulator, currentValue) => 
      accumulator + Math.round(currentValue.price * currentValue.quantity), 0))

    setTotalQuantity(cart.reduce((accumulator, currentValue) => 
      accumulator + currentValue.quantity, 0))
    setItemsPerProduct(e.target.value)
  }

  return (
    <div className={styles.containerMain}>
        <li className={styles.containerCartItems}>          
            {/* Imagen */}
              <div className={styles.containerLeft}>
                <Link to= {`/ProductDetail/${el.id}`}>
                  <img title='Ver detalles' className={styles.imgCenter} src={el.image[0]} alt={el.name} width='200px' height='200px'/>
                </Link>
              </div>

            {/* Nombre y cantidad */}
            <div className={styles.cartMiddle}>
              <Link to= {`/ProductDetail/${el.id}`}>
                <h1 title='Ver detalles' className={styles.textBig}>{el.name}</h1>
              </Link>
              <div className={styles.quantity}>
                <button title='Restar 1 unidad' className={styles.buttonLess} onClick={reduceQuantity}>-</button>
                <input type='number' value={itemsPerProduct} onChange={(e) => handleChangeQuantity(e)}></input>
                <button title='Sumar 1 unidad' className={styles.buttonAdd} onClick={addQuantity}>+</button>
              </div>
            </div>

            {/* Subtotal y elminar producto */}
            <div className={styles.cartRight}>
              <h2 className={styles.textMedium}> <b>Subtotal: ${Math.round(el.price) * el.quantity}</b></h2>
              <button title='Quitar producto' className={styles.buttonDeleteItem} onClick={handleDeleteItem}><DeleteIcon /></button>
            </div>
        </li>                      
    </div>
  )
}