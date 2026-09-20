---
slug: a-shift-in-mindset
title: "Un cambio de mentalidad"
tags: [devnotes, 100daysofcode]
date: 2024-03-19
hide_table_of_contents: true
---

# Un cambio en la forma de pensar

> Borrador de noviembre de 2021.
>
> Y ese, creo, es el verdadero cambio de mentalidad:
> pasar de ser alguien que aprende a alguien que resuelve problemas.

![Ilustración del artículo](../../../../writings/2024-03-19-shift-in-mindset/image.png)

Me di cuenta de que, una vez que terminas un curso, aprendes lo básico y empiezas a trabajar en proyectos reales, rara vez vuelves a ver una sección entera del curso solo porque tenga relación con el problema que intentas resolver.

En su lugar, sueles hacer una de dos cosas.

O bien:

a. Revisas tus apuntes o documentación para comprobar si ya te has encontrado con ese problema, siempre que confíes lo suficiente en tus notas, o

b. Tomas el camino mucho más fácil y rápido: buscar en Google, en Stack Overflow o un caso parecido en YouTube.

Por eso creo que los cursos estructurados son muy útiles durante la **etapa de descubrimiento**.

Te presentan la tecnología, explican la terminología, muestran cómo se conectan las cosas y te dan una idea de con qué estás tratando.

Pero, cuando intentas utilizar esa tecnología para resolver tus propios problemas, las cosas cambian.

En ese momento suele entrar en juego el instinto.

Buscas el error en Google y esperas que alguien ya haya hecho exactamente la misma pregunta en Stack Overflow.

O quizá alguien subió hace tres años un vídeo de doce minutos a YouTube que, de alguna manera, resuelve justo tu problema.

También he notado que los cursos pueden quedarse obsoletos bastante rápido, sobre todo cuando las tecnologías avanzan a un ritmo muy, muy acelerado.

Se me ocurren ejemplos de la computación en la nube de AWS (puedes saltarte la lista si no te interesan los detalles):

1. Un día, los límites de EC2 se expresan como un número fijo de instancias por región.
2. Después, se basan en la cantidad de vCPU que puedes ejecutar.
3. Un día, ZooKeeper es una pieza importante de la arquitectura que estudias.
4. Después, las versiones más nuevas de la tecnología empiezan a prescindir de él por completo.

A veces el cambio es importante.

A veces solo es un botón que ha cambiado de sitio en la interfaz.

Pero, cuando sumas todos esos pequeños cambios a todo lo demás que ya intentas aprender, empiezan a pesar bastante.

Un día quizá tengas varias semanas para experimentar con esa fascinante tecnología que acabas de descubrir.

Y al siguiente alguien te dice que tienes dos semanas para entenderla y entregar una solución mínimamente utilizable.

Así que sí.

Las cosas cambian bastante rápido.

Supongo que lo que quiero decir es que tardé casi cuatro años, y sinceramente todavía sigo trabajando en ello, en alejarme de esa forma de aprender estructurada, al estilo universitario, y adaptarme más a cómo se adquiere el conocimiento en la industria.

Cuando digo **aprendizaje al estilo universitario**, me refiero a aquel en el que tienes un esquema claro que seguir.

Empiezas con los primeros pasos.

Quizá abres tu primera terminal.

Luego aprendes los comandos.

Después los conceptos se van complicando.

Y acabas llegando a las partes más difíciles.

Normalmente sabes qué intentas aprender, cuál es el problema y qué debes lograr antes de pasar a la siguiente lección.

La industria no siempre funciona así.

A veces solo te dan una lista de requisitos.

Y ya está.

Nadie te entrega una lista ordenada de todas las tecnologías que debes aprender de antemano.

Te toca averiguar qué herramientas necesitas.

A veces ni siquiera te dan un problema técnico claramente definido.

Primero tienes que descubrir qué preguntas hay que hacer.

Y luego empiezas a buscar las respuestas.

Supongo que esto entra dentro de lo que se llama **problemas mal definidos**, donde no siempre existe una solución perfecta o única.

Durante mi trabajo anterior y ahora en el actual, he aprendido mucho sobre cómo se construyen realmente las soluciones.

Puede que tengas ayuda de un proveedor.

Puede que trabajen contigo servicios profesionales externos.

Puede que haya documentación, arquitectos, ingenieros y otros equipos implicados.

Pero, al final, te das cuenta de que resolver problemas no siempre es tan sencillo como parece desde fuera.

De repente, unas tareas pasan a ser más importantes que otras.

Puede surgir algo del lado del negocio a mitad del sprint.

Cambia un requisito.

Se mueve una fecha límite.

Aparece una dependencia.

Y ahora tienes que replantearte cuál de las diez preguntas que tienes delante necesita respuesta primero.

Así que aprender en la industria puede ser bastante desordenado.

Buscas lo que necesitas en ese momento.

Lo pruebas enseguida en tu entorno de pruebas.

Si funciona, genial.

Quizá empiezas a incorporarlo poco a poco al código o a la configuración.

Después vuelves a probarlo.

Revisas los registros.

Ejecutas las pruebas unitarias.

Haces pruebas de aceptación operativa, o cualquier otro proceso de validación que tengas.

Si todo parece correcto y no empiezan a saltar alarmas en los registros, quizá termine llegando a producción.

Ah, y aquí viene la parte divertida:

Tienes que terminar todo esto en cuatro sprints o menos.

Sin presión.

Ahora bien, estas situaciones *pueden* introducir lo que llamamos **deuda técnica**.

Suele ocurrir cuando eliges hoy una solución más rápida o más fácil, sabiendo que probablemente tendrás que revisarla o mejorarla después.

¿Es mala la deuda técnica?

Sí.

No.

No lo sé.

Supongo que la verdadera respuesta es: **depende**.

A veces, sencillamente, no puedes hacer que algo sea perfecto.

Tu solución puede depender de una plataforma gestionada por otro equipo.

Una nueva versión puede cambiar el comportamiento del código.

Otro sistema puede actualizarse.

Los requisitos pueden volver a cambiar.

Siempre habrá factores fuera de tu control.

Y, a veces, poner en marcha una solución que funcione te permite aprender algo que nunca habrías descubierto dedicando otro mes a intentar que todo fuera perfecto.

Cuanto antes falle algo en un entorno controlado, antes podrás entender por qué falló y mejorarlo.

Así que, de una forma extraña, buscamos constantemente maneras de romper cosas de forma segura para averiguar cómo mejorarlas.

## Espera. ¿Por dónde iba?

Ah, sí.

Un cambio en la forma de pensar.

Supongo que he dedicado todo este tiempo a explicar en qué se diferencia el aprendizaje estructurado de aprender cuando ya estás intentando resolver un problema real.

## Entonces, ¿debería dejar los cursos y centrarme solo en proyectos?

No.

Si algo es completamente nuevo para ti, sigues necesitando alguna base.

Y los cursos son muy buenos para eso.

Te dan herramientas básicas que *quizá* necesites más adelante.

Te muestran lo que es posible.

Te presentan la terminología.

Te dan suficiente conocimiento como para saber, al menos, qué buscar cuando todo se rompa.

Luego, en algún punto del camino, empiezas a usar esas herramientas para responder tus propias preguntas.

A veces seguirás utilizándolas.

Otras descubrirás que la herramienta que aprendiste no es la mejor para el problema que tienes delante.

Así que la dejas y aprendes otra.

Y no pasa nada.

## Sigo confundido

Bueno, no eres el único.

Yo tampoco he resuelto todo esto.

Sigo teniendo en el portátil una cantidad absurda de cursos sin terminar.

Y, como el tiempo es limitado, he ido desarrollando mi propia estrategia para aprender cosas y aplicarlas de verdad.

Si mi objetivo es hacer un examen de certificación, normalmente sigo el curso, hago las prácticas, tomo apuntes y después me preparo con exámenes de prueba.

¿Y cuando apruebo?

Borro el curso.

Sí.

Sin dudarlo.

Llegado ese punto, sé que probablemente no volveré a sentarme a verlo entero.

Si más adelante necesito esa tecnología para un proyecto y me encuentro con un problema, lo más probable es que busque directamente ese problema.

Y, sinceramente, lo prefiero así.

En vez de repasar horas de vídeo, puedo buscar exactamente lo que necesito.

Es un poco como recoger manzanas.

Coges las que necesitas y dejas el resto del árbol en paz.

Lo importante es que, durante la etapa de descubrimiento y repaso, utilicé el curso para construir una base.

Aprendí lo suficiente para conocer la terminología.

Aprendí lo suficiente para comprender los conceptos básicos.

Y, con suerte, aprendí lo suficiente para reconocer lo que no sé.

Después llega la etapa de aplicación.

Ahí empiezo a depender más de mis propias herramientas.

Mis apuntes.

La documentación.

Los experimentos.

Y, por supuesto, mi **Google-fu**.

Ahora mismo estoy preparándome para hacer el RHCSA el año que viene.

Así que, para entonces, espero haber eliminado la mayoría de los cursos de RHEL que tengo en el disco duro.

Al borrarlos, también me obligo a pensar por mi cuenta en vez de volver constantemente a copiar los pasos exactos del instructor.

Si quiero recordar cómo hice una práctica, consulto mis apuntes.

Si no está ahí, probablemente esté en algún lugar de la documentación oficial.

¿Y si tampoco está?

Bueno.

Google seguramente conoce a alguien que lo sabe.

## Vale, creo que lo he entendido

Si es así, probablemente ya me lleves un paso de ventaja.

Repito: no tengo todas las respuestas.

La mitad del tiempo ni siquiera sé todavía cuáles son las preguntas correctas.

Pero espero ir entendiendo más a medida que continúe.

Haré más prácticas.

Romperé más código.

Seguiré más registros en tiempo real.

Probaré soluciones que no funcionen.

Y acabaré encontrando otras que sí.

Después documentaré lo ocurrido para, quizá, no tener que sufrir dos veces el mismo problema.

Y, en algún punto de ese proceso, algo cambia.

Dejas de preguntar únicamente: **«¿Qué debería aprender ahora?»**.

Y empiezas a preguntar: **«¿Qué necesito para resolver esto?»**.

Ese, creo, es el verdadero cambio de mentalidad.

Pasar de ser alguien que **aprende** a alguien que **resuelve problemas**.

Y quizá, después de resolver suficientes problemas, acabes entrando en otra forma de aprendizaje:

Transmitir lo que has aprendido a otra persona.

