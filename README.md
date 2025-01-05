# Guía para Transferir Archivos a un Servidor Remoto con SCP

## Paso 1: Configurar Clave SSH en el Sistema Local

1. Abre una terminal en tu sistema Windows.
2. Genera un par de claves SSH:
   ```bash
   ssh-keygen -t rsa -b 4096
   ```
   - Cuando te pregunte el nombre del archivo para guardar la clave, presiona **Enter** para usar la ruta predeterminada (`C:\Users\<TuUsuario>\.ssh\id_rsa`).
   - Si deseas, puedes establecer una frase de paso (opcional).

3. Localiza tu clave pública:
   ```bash
   dir %USERPROFILE%\.ssh
   ```
   El archivo `id_rsa.pub` contiene tu clave pública.

## Paso 2: Configurar la Clave Pública en el Servidor Remoto

1. Conéctate al servidor remoto utilizando las credenciales existentes:
   ```bash
   ssh <usuario_remoto>@<ip_del_servidor>
   ```
2. Crea el directorio `.ssh` en el servidor remoto (si no existe):
   ```bash
   mkdir -p ~/.ssh
   ```
3. Copia la clave pública desde tu máquina local al servidor remoto. Usa este comando desde tu máquina local:
   ```bash
   scp %USERPROFILE%\.ssh\id_rsa.pub <usuario_remoto>@<ip_del_servidor>:~
   ```
4. En el servidor remoto, mueve la clave al archivo `authorized_keys`:
   ```bash
   cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
   rm ~/id_rsa.pub
   ```
5. Establece los permisos correctos en el servidor remoto:
   ```bash
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

## Paso 3: Transferir Archivos con SCP

1. Usa el comando `scp` para transferir archivos o directorios:
   ```bash
   scp -r "C:\Users\<TuUsuario>\Desktop\frontend-virtualizacion\dist" <usuario_remoto>@<ip_del_servidor>:~
   ```
   Este comando copiará el directorio `dist` desde tu máquina local al directorio de inicio del usuario en el servidor remoto.

2. Si necesitas mover los archivos al directorio web del servidor remoto, como `/var/www/html`, hazlo después de conectarte al servidor:
   ```bash
   ssh <usuario_remoto>@<ip_del_servidor>
   sudo mv ~/dist /var/www/html
   ```

## Paso 4: Verificar la Transferencia

1. Conéctate al servidor remoto:
   ```bash
   ssh <usuario_remoto>@<ip_del_servidor>
   ```
2. Verifica que los archivos se hayan copiado correctamente:
   ```bash
   ls /var/www/html
   ```

## Paso 5: Configuración Final (Opcional)

- Asegúrate de que el servidor web (como Apache o Nginx) esté configurado para servir los archivos desde `/var/www/html`.
- Reinicia el servidor web para aplicar los cambios:
  ```bash
  sudo systemctl restart apache2
  ```
  o
  ```bash
  sudo systemctl restart nginx
  ```

Con estos pasos, tus archivos deberían estar correctamente transferidos y accesibles en el servidor remoto.
