
## ERRORES CON PRISMA
- Asegurarse de tener una db con el nombre ``nfticket`` creada
- En caso de no tenerla, abrir la consola de Postgre, ingresar, y ejecutar: ``CREATE DATABASE nfticket;``
- Ir al archivo *.env* y poner sus credenciales en la ``DATABASE_URL``
- Posicionarse en la carpeta ``/src/prisma``
- Ejecutar el comando ``npx prisma migrate dev --name init``
- Ejecutar ``npm run seed`` para generar la db de ejemplo para trabajar

Ya debería funcionar
# ticketek-web3
