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

¡Listo! Ahora tus archivos deberían estar correctamente transferidos y ubicados en el servidor remoto.
