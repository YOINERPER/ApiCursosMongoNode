import { transporter } from "../Email.connection.js";

export const mensajeEnviar = async (email, nombre, codigo, pass) => {

    const info = await transporter.sendMail({
        from: '"Verificacion de email SenaLearn" <senalearns@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `Hello ${nombre} ✔`, // Subject line
        text: "correo enviado desde node js", // plain text body
        html: `<div class="container-sm ">
        <p>
          Te damos la bienvenida a SenaLear. Estamos emocionados de que te hayas unido a nuestra
          comunidad. Antes de comenzar, necesitamos verificar tu dirección de correo electrónico para garantizar la
          seguridad de tu cuenta.
        </p>
        <p>
          <strong> Por favor verifica tu correo electrónico:</strong>
          Para completar el proceso de registro, necesitamos que verifiques tu dirección de correo electrónico. Por favor, sigue estos pasos:
        </p>
    
        <ul>
          <li>Utiliza el siguiente código de verificación: <a href='#'>${codigo}</a> </li>
          <li>Inicia sesión en tu cuenta</li>
          <li>En la página de inicio de sesión, encontrarás un campo de verificación de correo electrónico. Ingresa el código de verificación proporcionado</li>
          <li>Haz clic en "Verificar" o "Confirmar" para completar el proceso de verificación</li>
        </ul>
    
        <p>Una vez que hayas verificado tu dirección de correo electrónico, tendrás acceso completo a todas las funciones y recursos disponibles</p>
        <div><strong> Tu Información de Registro.</strong></div>
        <div> <strong> Dirección de Correo Electrónico:${email}</strong></div>
        <div><strong> contraseña: ${pass}</strong></div>
         
        <p>Asegúrate de mantener segura tu contraseña y no compartirla con nadie. Si olvidas tu contraseña en el futuro, puedes utilizar la opción "Olvidé mi contraseña" en la página de inicio de sesión para restablecerla.</p>
    
        <p>¡Gracias por unirte a SenaLearn! Esperamos que disfrutes de tu experiencia en nuestra plataforma.
    
          Atentamente,
          
          El Equipo de SenaLearn</p>
      </div>`, // html body
    });
}