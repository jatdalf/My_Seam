import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import EmptyCart from '../../images//empty-cart.png'
import { CartProducts } from './CartProducts/CartProducts';
// Chakra
import { BsFillCartFill } from "react-icons/bs";
import { Icon, useDisclosure, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent } from '@chakra-ui/react'

export const Cart = () => {
  // Menú desplegable Chakra
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const dispatch = useDispatch()
  
  // Estados del reducer
  const cart = useSelector(state => state.cart)
  let userInfo = useSelector(state => state.userInfo) 
  let qty = useSelector(state => state.cartLength) 

  const disabled = cart.find((el) => el.quantity < 1);

  // Estado del precio total del carrito de compras
  const [totalPrice, setTotalPrice] = useState(0);
  // Estado de la cantidad de productos en el carrito de compras
  const [totalQuantity, setTotalQuantity] = useState(qty);


  // Calcular el total del precio y cantidad de productos del carrito
  const calculatePriceQuantity = () => {
    setTotalPrice(cart.reduce((accumulator, currentValue) => 
      accumulator + Math.round(currentValue.price * currentValue.quantity), 0))

    setTotalQuantity(cart.reduce((accumulator, currentValue) => 
      accumulator + currentValue.quantity, 0))

    onOpen()
  }

  let cartLength = cart.reduce((accumulator, currentValue) => 
        accumulator + currentValue.quantity, 0)

  useEffect(() => {      
    setTotalQuantity(qty)
  }, [qty]);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  return (
    <div>
    {/* Ícono NavBar */}
      <button
        type="button"
        className={`${styles.containerIconCart} position-relative`}
      >
        <Icon
          as={BsFillCartFill}
          onClick={calculatePriceQuantity}
          boxSize="2em"
          className={styles.buttonCart}
          title="Ver carrito"
        />
        <span
          className={`${styles.notificationsCart} position-absolute translate-middle badge rounded-pill bg-danger`}
        >
          {cartLength}
        </span>
      </button>

      {/* Menú Desplegable */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>

          {/* Header */}
          <DrawerHeader>
            <p className={styles.titleCart}>
              Tu carrito de compras ({ cartLength })
              <Button colorScheme='orange' className={styles.buttonClose} onClick={onClose}>
                X
              </Button>
            </p>
          </DrawerHeader>

          {/* Body */}
          <DrawerBody>
            <div className={styles.containerBody}>
              {/* Imagen Carrito y Titulo */}
              <div
                className={cart.length === 0 ? styles.imgCarrito : styles.hide}
              >
                <img
                  src={EmptyCart}
                  alt="Carrito de compras"
                  width="150px"
                  height="150px"
                />
                <p>
                  <b>Tu carrito esta vacío</b>
                </p>
              </div>

              {/* Productos en el carrito */}
              <div className={cart.length === 0 ? styles.hide : ""}>
                <ul className={styles.cartContainer}>
                  {cart.length > 0
                    ? cart.map((el) => {
                        return (
                          <CartProducts
                            key={el.id}
                            cart={cart}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                            totalQuantity={totalQuantity}
                            setTotalQuantity={setTotalQuantity}
                            el={el}
                          />
                        );
                      })
                    : ""}
                </ul>
                <div>
                  <h4 className={disabled ? "" : styles.hide}>
                    Todos los productos deben tener al menos 1 unidad
                  </h4>
                  -----------------------------------------------
                </div>

                {/* Footer */}
                <div>
                  <p>
                    <b>Total: ${Math.round(totalPrice)}</b>
                  </p>
                </div>

                {/* Botones */}
                <div>
                  <Link to={"/checkout"}>
                    <Button
                      colorScheme = 'green'
                      isDisabled={disabled}
                      className={cart.length === 0 ? styles.hide : ""}
                      onClick={onClose}
                    >
                      Comprar ahora
                    </Button>
                  </Link>
                  <Button  colorScheme = 'yellow' className={styles.buttonKeepBuying} onClick={onClose}>
                    Seguir comprando
                  </Button>
                </div>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
