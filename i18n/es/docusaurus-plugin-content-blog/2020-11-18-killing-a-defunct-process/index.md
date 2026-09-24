---
slug: killing-a-defunct-process
title: "Terminar un proceso defunct"
tags: [Devnotes]
date: 2020-11-18
hide_table_of_contents: true
---

# Terminar un proceso defunct

![Ilustración del artículo](../../../../writings/2020-11-18-killing-a-defunct-process/image.png)

Me encontré con esto al intentar instalar `htop` en una de mis instancias EC2 de pruebas con RHEL. Estaba siguiendo los pasos de esta [guía](https://www.cyberciti.biz/faq/how-to-install-htop-on-rhel-8-using-yum/).

Esto también me llevó a aprender un poco más sobre los procesos **defunct**, o **zombis**, en Linux. Puedes leer más sobre ellos [aquí](https://stackoverflow.com/questions/47977402/zombie-vs-defunct-processes).

---

## Qué ocurrió

Tenía dos terminales abiertas, ambas conectadas a la misma instancia EC2.

En la primera estaba ejecutando:

```bash
yum update -y
```

Mientras seguía la actualización, intenté instalar otro paquete desde la segunda terminal.

Apareció este mensaje:

```text
Running transaction check
Waiting for process with pid 5941 to finish.
```

Así que comprobé qué proceso estaba usando el PID `5941`:

```bash
$ ps -ef | grep 5941

root        5941    5939 18 06:00 pts/0    00:01:42 yum update -y
root       36173   36153  0 06:09 pts/2    00:00:00 grep --color=auto 5941
```

Efectivamente, el PID `5941` correspondía al proceso `yum update` que se ejecutaba en la primera terminal.

Como la actualización estaba tardando, decidí cancelarla para instalar primero los paquetes que necesitaba y volver a ejecutarla después.

Pero, al intentar instalar de nuevo el paquete, seguía apareciendo el mismo mensaje sobre el PID `5941`.

Al revisar otra vez el proceso, vi algo distinto:

```bash
$ ps -ef | grep 5941

root        5941    5939 18 06:00 pts/0    00:01:42 [yum] <defunct>
```

El proceso `yum` aparecía ahora como `<defunct>`.

Naturalmente, lo primero que pensé fue:

```bash
kill -9 5941
```

Problema resuelto, ¿no?

Pues no exactamente.

El proceso seguía apareciendo como `<defunct>`.

## ¿Qué significa `<defunct>`?

Un proceso marcado como `<defunct>` ya ha terminado de ejecutarse.

En otras palabras, técnicamente ya no queda nada que terminar.

Cuando un proceso hijo finaliza, su proceso padre debe recoger su estado de salida. Hasta que lo hace, Linux conserva una pequeña entrada del hijo en la tabla de procesos.

Esa entrada restante es lo que llamamos un **proceso zombi**.

Y, al ejecutar `ps`, los procesos zombis suelen mostrarse así:

```text
<defunct>
```

Por eso ejecutar:

```bash
kill -9 PID
```

no lo elimina.

El proceso ya está muerto. `SIGKILL` no tiene nada que terminar.

## Qué hacer

Primero, localiza el proceso padre del proceso defunct.

Puedes usar:

```bash
$ ps -ef | grep defunct

UID          PID    PPID  C STIME TTY          TIME CMD
root        5941    5939  6 06:00 pts/0    00:01:42 [yum] <defunct>
eden       36210    6097  0 06:24 pts/2    00:00:00 grep --color=auto defunct
```

Las columnas importantes son estas:

```text
PID     PPID
5941    5939
```

`5941` es el proceso zombi.

`5939` es su proceso padre.

Antes de terminar nada, conviene comprobar qué es exactamente ese proceso padre:

```bash
ps -fp 5939
```

Si se puede finalizar de forma segura, puedes intentar detenerlo normalmente:

```bash
sudo kill 5939
```

Después, vuelve a comprobarlo:

```bash
ps -ef | grep defunct
```

Si el padre se resiste a terminar y estás seguro de que es seguro finalizarlo, puedes recurrir a `SIGKILL` como último recurso:

```bash
sudo kill -9 5939
```

Una vez que finalice el proceso padre, normalmente otro proceso, como `init` o `systemd`, debería adoptar y recoger el zombi.

## Algo que conviene recordar

No ejecutes `kill -9` de inmediato contra todos los procesos que veas.

Sobre todo al tratar con procesos padre, comprueba siempre primero de qué proceso se trata:

```bash
ps -fp <PPID>
```

Un proceso defunct no está consumiendo CPU ni ejecutándose activamente. Es, en esencia, una entrada que espera a que su padre reconozca que ya ha terminado.

Así que, si alguna vez ves:

```text
[process] <defunct>
```

recuerda:

**El proceso ya está muerto. Lo que realmente debes investigar es su padre.**

---

## Referencias

* [Cómo instalar htop en RHEL 8 usando yum](https://www.cyberciti.biz/faq/how-to-install-htop-on-rhel-8-using-yum/)
* [¿Qué es un proceso defunct y por qué no se puede terminar?](https://askubuntu.com/questions/201303/what-is-a-defunct-process-and-why-doesnt-it-get-killed)
* [¿Procesos zombi frente a procesos defunct?](https://stackoverflow.com/questions/47977402/zombie-vs-defunct-processes)

