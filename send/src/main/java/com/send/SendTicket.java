package com.send;

import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendTicket {
    private final String emailFrom = "ecommerce.test.arq@gmail.com";
    private final String passwordFrom = "ryhyrilxgpzjeptn";
    private String emailTo;
    private String subject;
    private String content;

    private Properties mProperties;
    private Session mSession;
    private MimeMessage mCorreo;

    public SendTicket() {
        mProperties = new Properties();
    }

    public void createEmail(String id, String fecha, String total, String rows,String email) {
        emailTo = email;
        subject = "Prueba"; // Asunto
        content = "<h1> Hola Mundo </h1>"; // contenido

        String head = "<!DOCTYPE html>" +
                "<html lang=\"en\">" +
                "<head>" +
                "    <meta charset=\"UTF-8\">" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "    <title>Document</title>" +
                "\n" +
                "    <!-- Bootstrap CSS -->\n" +
                "    <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3\" crossorigin=\"anonymous\">\n" +
                "    <link rel=\"stylesheet\" href=\"css/styles.css\">\n" +
                "</head>";
        String body = "<body> <div class=\"container\">\n" +
                "            <h3 class=\"mt-5\">Gracias por su compra</h3>\n" +
                "            <hr>\n" +
                "            <div class=\"row\">\n" +
                "                <div class=\"col-12\">\n" +
                "                    <div class=\"resumenPedido\">\n" +
                "                        <h5>Código de pedido: " + id + "</h5>\n" +
                "                        <h5>Fecha: " + fecha + "</h5>\n" +
                "                        <table class=\"table\">\n" +
                "                            <thead  class=\"table-dark\">\n" +
                "                                <tr>\n" +
                "                                    <th scope=\"col\">#</th>\n" +
                "                                    <th scope=\"col\">Producto</th>\n" +
                "                                    <th scope=\"col\">Precio</th>\n" +
                "                                    <th scope=\"col\">Cantidad</th>\n" +
                "                                    <th scope=\"col\">Total</th>\n" +
                "                                </tr>\n" +
                "                            </thead>\n" +
                "                            <tbody class=\"productosPedidos\">\n" +
                                                rows +
                "                            </tbody>\n" +
                "                            <tr>\n" +
                "                                <th colspan=\"6\" class=\"text-center alertPedido\">----</th>\n" +
                "                            </tr>\n" +
                "                            <tfoot>\n" +
                "                                <tr>\n" +
                "                                    <th colspan=\"4\">Total</th>\n" +
                "                                    <td>S/. <span class=\"totalAPagar\">" + total + "</span></td>\n" +
                "                                </tr>\n" +
                "                            </tfoot>\n" +
                "                        </table>\n" +
                "                    </div>\n" +
                "                    \n" +
                "                </div>" +
                "            </div>" +
                "        </div>" +
                "</body> </html>";

        content = head + body;
        // Simple mail transfer protocol
        mProperties.put("mail.smtp.host", "smtp.gmail.com");
        mProperties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        mProperties.setProperty("mail.smtp.starttls.enable", "true");
        mProperties.setProperty("mail.smtp.port", "587");
        mProperties.setProperty("mail.smtp.user", emailFrom);
        mProperties.setProperty("mail.smtp.ssl.protocols", "TLSv1.2");
        mProperties.setProperty("mail.smtp.auth", "true");

        mSession = Session.getDefaultInstance(mProperties);

        try {
            mCorreo = new MimeMessage(mSession);
            mCorreo.setFrom(new InternetAddress(emailFrom));
            mCorreo.setRecipient(Message.RecipientType.TO, new InternetAddress(emailTo));
            mCorreo.setSubject(subject);
            mCorreo.setText(content, "ISO-8859-1", "html");

        } catch (AddressException ex) {
            Logger.getLogger(SendTicket.class.getName()).log(Level.SEVERE, null, ex);
        } catch (MessagingException ex) {
            Logger.getLogger(SendTicket.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void sendEmail() {
        try {
            Transport mTransport = mSession.getTransport("smtp");
            mTransport.connect(emailFrom, passwordFrom);
            mTransport.sendMessage(mCorreo, mCorreo.getRecipients(Message.RecipientType.TO));
            mTransport.close();

            System.out.println("Correo Enviado");
        } catch (NoSuchProviderException ex) {
            Logger.getLogger(SendTicket.class.getName()).log(Level.SEVERE, null, ex);
        } catch (MessagingException ex) {
            Logger.getLogger(SendTicket.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

  /*  public static void main(String[] args) throws Exception {
        SendTicket a = new SendTicket();
        a.createEmail();
        a.sendEmail();
    }*/
}
