import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom"
import ImageFormulary from "../../components/ImageFormulary/ImageFormulary"
import styles from './Login.module.css'
import { loginUser } from "../../service/userService"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"


export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    console.log('-----| data |----')
    console.log(data)

    let error = ''

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }

    if (error.length) {
        return error
    }

    const response = await loginUser(data)

    if (response) {
        return redirect('/virtual/welcome')
    }

    return redirect('/')
}


export default function Login() {
    const error = useActionData() as string;
    return (
        <div className={styles.background__camp}>
            <Form method="POST" >
                <fieldset className={styles.fieldset}>
                    <div className={styles.cont__camp}>
                        <ImageFormulary />

                        <div className={styles.camp__inputs}>

                            <section className={styles.camp__text}>
                                <h3 className={styles.camp__title}>{'Ingrese su usuario'}</h3>
                            </section>

                            <div className={styles.camp}>
                                <label htmlFor="cli_correo">Correo electrónico </label>
                                <input className={styles.camp__txt} type="email" name="us_email" id="us_email" placeholder='Ej: ejemplo@gmail.com'

                                />
                            </div>

                            <div className={styles.camp}>
                                <label htmlFor="cli_contrasenia">Contraseña</label>
                                <input className={styles.camp__txt} type="password" name="us_password" id="us_password" placeholder='mi contraseña' />
                            </div>

                            {error && <ErrorMessage>{error}</ErrorMessage>}

                            <div className={styles.camp + " " + styles.camp__button}>
                                <input className={styles.button} type="submit" value={'Ingresar'} />
                            </div>

                        </div>
                    </div>
                </fieldset>
            </Form>
        </div>
    )
}