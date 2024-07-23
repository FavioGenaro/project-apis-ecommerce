package com.example;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import java.io.BufferedWriter;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Iterator;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import com.send.*;

public class Example implements HttpFunction {

    private static final Gson gson = new Gson();
  @Override
  public void service(HttpRequest request, HttpResponse response) throws Exception {

    //String name = null;

    if (!"POST".equals(request.getMethod())) {
        response.setStatusCode(HttpURLConnection.HTTP_BAD_METHOD);
        return;
    }
    JsonObject body = gson.fromJson(request.getReader(), JsonObject.class); // request

    String codigoCompra = body.get("_id").getAsString(); // obtengo un valor
    String fecha = body.get("fecha").getAsString();
    String total = body.get("total").getAsString();
    String email = body.get("correo").getAsString();

    String name = null; // Nombre del producto
    String price = null;
    String cantidad = null;
    String subtotal = null;
    int count = 0;
    String rows = "";
    //ArrayList<String> listProduct = body.getAsJsonArray("listProdict");
    Iterator<JsonElement> nombreIterator = body.get("listProduct").getAsJsonArray().iterator();

      while(nombreIterator.hasNext()){
          JsonObject producto = nombreIterator.next().getAsJsonObject();
          name = producto.get("name").getAsString();//petición externa
          price = producto.get("price").getAsString();
          cantidad = producto.get("cantidad").getAsString();
          subtotal = producto.get("subtotal").getAsString();
            count += 1;
          String row =
                  "<tr>" +
                  "<th scope=\"row\">" + count + "</th>\n" +
                      "<td>" + name +"</td>\n" +
                      "<td>" + price + "</td>\n" +
                      "<td>" + cantidad + "</td>\n" +
                      "<td>" + subtotal + "</td>\n" +
                  "</tr>";
          rows += row;
      }


    /*if (body.has("name")) { // si exite ese parametro
      name = body.get("name").getAsString(); // obtengo un valor
    }*/

    // Verify that a name was provided
    /*if (name == null) {
      response.setStatusCode(HttpURLConnection.HTTP_BAD_REQUEST);
    }*/
    //body.getAsString()
    SendTicket a = new SendTicket();
        a.createEmail(codigoCompra,fecha,total,rows,email);
        a.sendEmail();

    BufferedWriter writer = response.getWriter();
    writer.write("Hello world!");
  }
}
