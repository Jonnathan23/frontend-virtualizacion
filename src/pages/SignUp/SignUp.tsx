import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom"
import styles from './SignUp.module.css'
import ImageFormulary from "../../components/ImageFormulary/ImageFormulary"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { signUpUser } from "../../service/userService"

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }

    if (error.length) {
        return error
    }

    const response = await signUpUser(data)

    if (response) {
        return redirect('/')
    }

    return redirect('/virtual/singup')
}


export default function SignUp() {
    const error = useActionData() as string;
    return (
        <div className={styles.background__camp}>
            <Form method="POST" >
                <fieldset className={styles.fieldset}>
                    <div className={styles.cont__camp}>
                        <ImageFormulary />

                        <div className={styles.camp__inputs}>
                            <section className={styles.camp__text + " " + styles.cont__camp__title}>
                                <h3 className={styles.camp__title}>{'Registrarse'}</h3>
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

                            <div className={styles.camp}>
                                <label htmlFor="cli_cedula">Cedula </label>
                                <input className={styles.camp__txt} type="text" name="us_ci" id="us_ci" placeholder='Ej: 0125478963'

                                />
                            </div>
                            <div className={styles.camp}>
                                <label htmlFor="cli_nombre">Nombre </label>
                                <input className={styles.camp__txt} type="text" name="us_name" id="us_name" placeholder='Ej: Felipe'

                                />
                            </div>

                            <div className={styles.camp}>
                                <label htmlFor="cli_apellido">Apellido </label>
                                <input className={styles.camp__txt} type="text" name="us_lastname" id="us_lastname" placeholder='Ej: Sanchez' />
                            </div>
                            <div className={styles.camp}>
                                <label htmlFor="cli_direccion">Dirección </label>
                                <input className={styles.camp__txt} type="text" name="us_address" id="us_address" placeholder='Ej: Av. Americas' />
                            </div>
                            <div className={styles.camp}>
                                <label htmlFor="cli_celular">Celular </label>
                                <input className={styles.camp__txt} type="text" name="us_phone" id="us_phone" placeholder='Ej: 0985236147' />
                            </div>

                            {error && <ErrorMessage>{error}</ErrorMessage>}

                            <div className={styles.camp + " " + styles.camp__button}>
                                <input className={styles.button} type="submit" value={'Registrarse'} />
                            </div>

                        </div>
                    </div>
                </fieldset>
            </Form>
        </div>
    )
}