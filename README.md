# Frontend para Google Cloud Virtual Machines (VM)


## Paso 1: Clonar el repositorio y poner la ip correcta en axios.ts

 ```bash
const api = axios.create({
    baseURL: "http://<DIRECCION_IP>/api"
})
```
Seguido de esto correr el siguiente comando para crear una versión optimizada y lista para producción
 ```bash
 npm run build 
   ```
Esto generara una carpeta llamada dist que es lo que debemos pasar a la VM 

---

## Paso 2: Agregar tu clave pública a la VM

1. Usar PowerShell para verificar claves SSH:
Verifica si tienes un directorio .ssh en tu perfil:
 ```bash
 dir $env:USERPROFILE\.ssh
   ```
Busca un archivo llamado id_rsa.pub o id_ecdsa.pub. Si no tienes uno, genera una clave SSH:
 ```bash
   ssh-keygen -t rsa -b 4096
   ```
La clave se guardará en `C:\Users\TU_USUARIO\.ssh`.


2. Copiar la clave pública a la VM
Si ya tienes la clave pública, puedes usarla para autenticarte con la VM.

Abre tu clave pública con PowerShell:
 ```bash
   notepad "C:\Users\usuario\.ssh\id_rsa.pub"
   ```
Copia el contenido completo, conéctate a la VM desde el navegador en la consola de Google Cloud (botón SSH). En la VM, añade la clave pública al archivo ~/.ssh/authorized_keys:

Accede a la VM usando el cliente SSH de Google Cloud Console: Ve a Compute Engine > Instancias de VM en Google Cloud Console. Haz clic en SSH al lado de tu VM para abrir una terminal. Una vez dentro de la VM:

 ```bash
   mkdir -p ~/.ssh
   echo "<TU_CLAVE_PUBLICA>" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   ```


Reemplaza <TU_CLAVE_PUBLICA> por el contenido de tu clave pública.

3. Probar la conexión
Desde tu máquina local, intenta conectarte a la VM para probar la autenticación con claves:
 ```bash
   ssh <usuario_remoto>@<ip_del_servidor>
   ```

Si todo está configurado correctamente, no te pedirá contraseña.

---

## Paso 3: Transferir Archivos con SCP

Usa el comando `scp` para transferir archivos o directorios:
   ```bash
   scp -r "C:\Users\<TuUsuario>\Desktop\frontend-virtualizacion\dist" <usuario_remoto>@<ip_del_servidor>:~
   ```
Este comando copiará el directorio `dist` desde tu máquina local al directorio de inicio del usuario en el servidor remoto.


## Paso 4: Instalar y configurar un servidor web

1. Instala NGINX si no está instalado:
  ```bash
   sudo apt update
   sudo apt install nginx -y
   ```
2. Verifica que NGINX esté en funcionamiento:

```bash
   sudo systemctl status nginx
   ```
3. Configurar NGINX para servir el frontend
Editar la configuración de NGINX:
```bash
   sudo nano /etc/nginx/sites-available/default
   ```
Reemplaza el contenido del archivo con lo siguiente:

```bash
  server {
    listen 80;
    server_name _;

    root /home/<UsuarioVM>/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
   ```
4. Guarda y cierra el archivo (en nano, usa Ctrl+O, luego Enter y Ctrl+X).
5. Prueba la configuración:
 ```bash
   sudo nginx -t
   ```
6. Reinicia NGINX:
```bash
   sudo systemctl restart nginx
   ```

---


## Paso 5: Acceder al frontend


Abre tu navegador y visita la IP de tu VM por ejemplo, `http://<IP_EXTERNA>`.





