---
slug: thinking-like-a-developer
title: "Pensar como un desarrollador"
tags: [devnotes]
date: 2019-07-13
hide_table_of_contents: true
---

# Pensar como un desarrollador

![Ilustración del artículo](../../../../writings/2019-07-13-thinking-like-a-developer/image.png)

## Haz las preguntas adecuadas

Cuando te planteen un problema, asegúrate de hacer las preguntas correctas. Puede que al principio no se te ocurran todas porque todavía no dispones de todos los datos, pero, a medida que ganes experiencia, desarrollarás una idea de cómo deberían arrancar los proyectos y acabarás teniendo un conjunto de preguntas habituales para cuando te presenten requisitos de negocio.

Ejemplo:

El responsable del proyecto le dice al equipo:

> Necesitamos una función que invierta cualquier cosa que le pasemos.

**Las preguntas habituales:**

- *¿Qué significa «cualquier cosa»?*

    ¿Qué hay que invertir? En el contexto de las estructuras de datos, solo:

    - Cadenas de texto
    - Números
    - Arreglos

    Los diccionarios no tienen un orden bien definido ni índices, por lo que no se pueden invertir. Los siguientes elementos no pueden invertirse:

    - Diccionarios u objetos
    - Booleanos

- *¿Qué hacemos si se pasa otra cosa?*

    ¿Cómo debemos manejar entradas que no sean cadenas, números ni arreglos?

- *¿Qué debería devolver la función?*

    ¿Debería devolver siempre una cadena?
    ¿Debería devolver el mismo tipo que recibió?

## Divide y vencerás

Divide un problema grande en partes manejables o problemas más pequeños para que sea mucho más fácil resolverlo. Al descomponerlo, también podemos comprenderlo mejor.

Con el ejemplo anterior, estos serían los pasos para dividir el problema en otros más pequeños:

- Comprobar si el argumento es una cadena, un número o un arreglo
- Implementar la inversión de un número
- Implementar la inversión de una cadena
- Implementar la inversión de un arreglo
- Devolver el valor invertido

## Investiga todo lo que necesites

Al principio, deberíamos intentar resolver los problemas pequeños por nuestra cuenta y con nuestras propias capacidades. Sin embargo, si sigues encontrando obstáculos, conviene recurrir a fuentes externas, como Google o Stack Overflow.

En la práctica, lo normal es ir directamente a Google y comprobar si ya existe una solución al problema.

## Escribe pseudocódigo

Para los problemas más grandes, resulta útil escribir alguna forma de pseudocódigo antes del código real. El pseudocódigo es una descripción informal del código. Por ejemplo:

```plaintext
function reverse(value) 

  if type(value) == string
    reverse_value = reverse string 
    return reverse_value

  else if type(value) == number
    reverse_value = reverse string 
    return reverse_value

  else if type(value) == array
    reverse_value = reverse string 
    return reverse_value

  else
    return "Invalidy input type"
```

A partir de aquí, puedes usar el lenguaje que prefieras, como Python, y seguir este flujo para crear la función.

## El proceso de depuración

1. **Detectar el error**

    Darse cuenta de que hay un error. Puede descubrirse:

    - Durante el desarrollo
    - Al probar el software
    - En distintos contextos: navegadores, usuarios, etc.
    - A través de informes de usuarios en producción, el peor caso porque llegó a publicarse sin ser detectado

2. **Localizar el error**

    Aislar la parte del código donde se encuentra el error.

    - Aislarlo mediante la consola de desarrollo
    - Para errores complejos, usar un depurador

3. **Corregir el error**

    Corregirlo y asegurarse de que no exista en ninguna otra parte del código.

    - Sustituir la solución existente por una que funcione
    - Buscar el error en código similar
    - Escribir pruebas con herramientas de testing

