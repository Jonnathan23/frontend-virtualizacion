import { Link } from 'react-router-dom'
import styles from './Header.module.css'
export default function Header() {
    const autenticated = false
    const isEmpty = true

    return (
        <header className={styles.header}>
            <div className={styles.cont__h}>
                <div className={styles.cont__header}>
                    <div className={styles.title}>
                        <Link to='/' className={styles.nav_link}>
                            <h1>Practica Virtualizacion</h1>
                        </Link>
                    </div>
                    <nav className={styles.cont__nav__a + " " + styles.nav}>
                        {autenticated ? (
                            <div className={styles.carrito}>
                                <img src="/img/carrito.png" alt="carrito" />

                                <div id="carrito">
                                    {isEmpty ? (<p className={styles.cart__empty_message}>El carrito esta vacio</p>) : (
                                        <>
                                            <table className={styles.cart__tables}>
                                                <thead>
                                                    <tr className={styles.art__header_row}>
                                                        <th className={""} >Imagen</th>
                                                        <th className={""} >Nombre</th>
                                                        <th className={""} >Precio</th>
                                                        <th className={""} >Cantidad</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        /*
                                                                    cart.map(product => (
                                                                        <tr className="cart__row" key={product.prod_id}>
                                                                            <td className="cart__image-cell">
                                                                                <img className="cart__image" src={product.prod_imagen} alt="imagen_producto" />
                                                                            </td>
                                                                            <td className="cart__name">{product.prod_descripcion}</td>
                                                                            <td className="cart__price">{product.prod_precio_unitario}</td>
                                                                            <td className="cart__quantity">
                                                                                <button className="cart__button cart__button--decrease" type="button" onClick={() => decreaseProduct(product.prod_id)}>
                                                                                    -
                                                                                </button>
                                                                                {product.cantidad}
                
                                                                                <button type="button" className="cart__button cart__button--increase" onClick={() => increaseProduct(product.prod_id)}>
                                                                                    +
                                                                                </button>
                                                                            </td>
                                                                            <td className="cart__remove-cell">
                                                                                <button className="cart__button cart__button--remove" type="button" onClick={() => removeProductCart(product.prod_id)}>
                                                                                    X
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                        */
                                                    }
                                                </tbody>
                                            </table>

                                            <p className="text-end">Total pagar: <span className="fw-bold">${"0"}</span></p>
                                        </>
                                    )}
                                    <div>
                                        {!isEmpty && (
                                            <>
                                                <button className={styles.cart__button__total} onClick={() => { }}>Vaciar Carrito</button>
                                                <button className={styles.cart__button__total + " " + styles.bt__buy} onClick={() => { }}>Comprar</button>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link className={styles.nav__a} to="/">Iniciar Sesion</Link>
                                <Link className={styles.nav__a} to="virtual/singup">Registrarse</Link>
                            </>
                        )
                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}