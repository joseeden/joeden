---
slug: programming-is-easy
title: "Programar es fácil, ¿a que sí?"
tags: [100daysofcode, Devnotes]
date: 2020-06-06
hide_table_of_contents: true
---

# Programar es fácil, ¿a que sí?

> Mi forma de entender la programación.
> También he incluido algunos conceptos fundamentales que creo que todos deberían conocer cuando empiezan a adentrarse en el código.

Para empezar, quiero decirte que has hecho bien en abrir este artículo.

![Ilustración del artículo](../../../../writings/2020-06-06-programming-is-easy/image.png)

Puede que lleves jugando con el código desde pequeño, o que simplemente hayas seguido una cadena de enlaces interesantes en Google y, de alguna manera, hayas acabado con ganas de aprender más sobre programación.

En cualquier caso, seguramente hay una idea, o más bien una pregunta, rondándote la cabeza:

***¿De verdad es fácil programar?***

Bueno, intentemos responder esa pregunta de una vez por todas.

**Programar es relativamente fácil.**

Repítelo conmigo.

Sí, en gran medida, programar consiste en juntar palabras clave e instrucciones en líneas que el ordenador pueda entender, y luego pasar a la siguiente línea.

Algo así como formar una oración.

Pero ¿de verdad es solo eso?

Piensa en cómo formas una oración en inglés. Hay ciertas reglas que debes seguir. Tienes que pensar qué tiempo verbal usar, desde qué punto de vista escribes, dónde van las palabras y con qué signo de puntuación terminar.

La programación funciona de manera parecida.

Tienes unas reglas, un vocabulario y una estructura que debes seguir.

Por supuesto, hay otros conceptos fundamentales que conviene entender antes de empezar a crear tus propios programas.

## ¿Cómo se dice?

Cuando empiezas a aprender un idioma nuevo, por ejemplo japonés, puede que esta sea tu reacción al encontrarte por primera vez con los kanji:

![Ilustración sobre aprender un idioma](../../../../writings/2020-06-06-programming-is-easy/image-2.png)

**Parece complicado, así que debe de ser complicado.**

Pero no es tan difícil cuando das los primeros pasos y empiezas a aprender lo básico.

Todo puede resultar confuso y frustrante la primera vez. Pero, cuando empiezas a descomponerlo en piezas y a entender cómo funcionan juntas, las cosas poco a poco cobran sentido.

Y, con el tiempo, se convierte en pan comido.

### Lo que vino antes

Sea cual sea el lenguaje de programación que intentes aprender, notarás que muchos comparten ideas similares.

Los lenguajes suelen crearse para resolver determinados problemas, introducir nuevas formas de hacer las cosas o superar limitaciones de lenguajes anteriores.

Por eso, los lenguajes más nuevos suelen tomar conceptos, técnicas e incluso sintaxis de los antiguos.

Por supuesto, no todos funcionan exactamente igual, pero, una vez que aprendes los fundamentos de un lenguaje, probablemente reconocerás muchos conceptos familiares al pasar a otro.

Así que podría decirse que los lenguajes de programación hablan de formas distintas, pero muchos piensan de manera parecida.

## En el fondo

Como he mencionado, muchos lenguajes comparten los mismos conceptos básicos. La principal diferencia suele ser cómo se escriben o se implementan.

Estas son algunas de las cosas que encontrarás casi en todas partes.

* **Sintaxis**

  Recuerda que cada lenguaje tiene sus propias reglas.

  Pueden estar influidas por lenguajes anteriores, pero cada uno tiene su propia manera de escribir instrucciones.

  ![Ejemplo de sintaxis](../../../../writings/2020-06-06-programming-is-easy/image-3.png)

  Cuando leíste el título de este artículo en inglés, quizá notaste que había algo un poco raro en cómo estaba escrito.

  Si fue así, enhorabuena. Ya entiendes la idea básica de la sintaxis.

  La sintaxis es, en esencia, el conjunto de reglas que te dice cómo debe escribirse algo.

  Entonces, ***programar sí que es fácil, ¿verdad?*** 😄

* **Variables**

  La idea principal de las variables es asociar un valor con un nombre.

  Piensa en una variable como un recipiente con etiqueta en el que puedes guardar información para usarla después.

  Puedes cambiar esos valores, pasarlos de un lugar a otro, compararlos, hacer cálculos con ellos, mostrarlos y utilizarlos a lo largo de tu programa.

  Por ejemplo, en vez de escribir una y otra vez la edad de una persona como `25`, podrías asignar ese valor a una variable llamada `age`.

  A partir de ahí, el programa puede referirse a `age` cada vez que necesite ese valor.

  ![Ejemplo de variables](../../../../writings/2020-06-06-programming-is-easy/image-4.png)

* **Mostrar resultados**

  Mostrar un resultado consiste, básicamente, en decirle al programa que presente algo como salida.

  Puede ser el resultado de un cálculo, el valor de una variable, un mensaje o prácticamente cualquier cosa que quieras que vea el usuario o el programador.

  Quizá escuches a los programadores decir algo como:

  «*El código devolvió este valor*».

  Lo que suelen querer decir es que, después de procesar las instrucciones, el programa produjo algún resultado.

  Pero los programas no siempre muestran esos resultados automáticamente.

  A veces el cálculo ocurre en segundo plano y, si quieres ver el resultado, debes indicarle al programa expresamente que lo imprima o lo muestre.

  Probablemente ya viste un adelanto de esto en el ejemplo de variables de arriba.

  ![Ejemplo de salida del programa](../../../../writings/2020-06-06-programming-is-easy/image-5.png)

* **Comentarios**

  Los comentarios son notas que los programadores dejan dentro del código.

  Sirven para explicar qué hace una sección, por qué se escribió de una manera determinada, qué representa una variable o cualquier otra cosa útil para quien lea el código después.

  Y sí, esa persona podrías ser tú dentro de seis meses, preguntándote:

  «*¿Por qué demonios escribí esto?*».

  El programa no procesa los comentarios como instrucciones.

  Cada lenguaje tiene su propia forma de marcar los comentarios.

  En Python, por ejemplo, puedes poner un **#** al principio de una línea para indicar que es un comentario y que no debe ejecutarse.

  ![Ejemplo de comentarios](../../../../writings/2020-06-06-programming-is-easy/image-6.png)

* **Cadenas de texto**

  Antes hablamos de los comentarios y de cómo Python reconoce una línea que empieza con **#** como algo que no debe ejecutarse.

  Pero ¿y si quieres que tu programa trabaje con palabras u oraciones?

  Ahí entran las cadenas de texto.

  Una cadena es, básicamente, texto almacenado como datos.

  ![Ejemplo de cadenas de texto](../../../../writings/2020-06-06-programming-is-easy/image-7.png)

  Cuando asignas texto a una variable, normalmente lo rodeas de comillas para que el lenguaje sepa que está tratando con texto y no con otra instrucción.

  También puedes combinar cadenas con otros valores mediante el formateo.

  Por ejemplo, si tienes una variable con el nombre de alguien, puedes insertar su valor en una oración en vez de escribir el nombre manualmente cada vez.

* **Arreglos**

  Un arreglo es, básicamente, una colección de valores agrupados.

  En vez de crear una variable diferente para cada dato, puedes guardar varios valores relacionados en una sola colección.

  Según el lenguaje, estas colecciones pueden contener números, cadenas, objetos o incluso otras colecciones.

  Python, por ejemplo, suele utilizar algo llamado **lista** para este propósito.

  ![Ejemplo de listas](../../../../writings/2020-06-06-programming-is-easy/image-8.png)

  También es importante entender que los valores dentro de estas colecciones ocupan posiciones.

  Así que, si solo quieres un valor concreto, no necesitas recuperar todo. Puedes referirte a su posición, normalmente mediante lo que llamamos un **índice**.

  Por ejemplo, si tienes una lista de cinco nombres y solo necesitas el primero, puedes acceder directamente a ese elemento.

  Y aquí va algo que al principio puede resultar extraño:

  En muchos lenguajes de programación, la cuenta empieza en **0**, no en **1**.

  Bienvenido a la programación.

## Espera, hay más

A estas alturas, espero que entiendas mejor por qué digo que programar es relativamente fácil.

Mucha gente se centra de inmediato en esta pregunta:

***¿Qué lenguaje de programación debería aprender primero?***

Y está perfectamente bien.

Pero creo que es más importante entender los conceptos que los lenguajes tienen en común.

Una vez que entiendes ideas como variables, sintaxis, cadenas, colecciones, condiciones, bucles y funciones, pasar de un lenguaje a otro resulta mucho menos intimidante.

La sintaxis puede cambiar.

Las palabras clave pueden cambiar.

Pero las ideas generales suelen seguir ahí.

Si quieres conocer algunas cosas que puedes explorar antes de adentrarte de lleno en la programación, puedes consultar el curso de Evan Kimbrell en Udemy, [Pre-Programming: Everything you need to know before you code](https://www.udemy.com/course/pre-programming-everything-you-need-to-know-before-you-code/).

Desde luego, puedes lanzarte directamente al lenguaje que te interese.

Pero si no tienes un perfil técnico y has empezado a interesarte por la programación hace poco, creo que aprender primero estas ideas básicas puede hacer que todo resulte mucho menos abrumador.

Porque programar en sí no es la parte que da miedo.

Lo difícil suele ser averiguar qué quieres que haga el ordenador y descomponer ese problema en instrucciones que pueda entender.

Cuando te acostumbras a hacerlo, el código empieza a tener mucho más sentido.

Como siempre, ¡que disfrutes aprendiendo!

