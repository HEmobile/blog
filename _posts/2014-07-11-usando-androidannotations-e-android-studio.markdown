---
published: true
author: Leandro Santos
layout: post
title: "Usando AndroidAnnotations e Android Studio"
date: 2014-07-11 16:30
comments: true
categories:
  - Leandro Santos
  - Android
  - Android Studio
  - AndroidAnnotations
---
Nós da HE:mobile estamos sempre procurando focar no que é mais importante, no que é essencial. Trazendo este pensamento para o desenvolvimento, significa que temos que estar sempre atentos para desenvolver código reusável, fácil de entender e modificar. 

Mas nós buscamos ir além: Queremos código **fácil de escrever!**

<!--more-->

Para isso, buscamos utilizar ferramentas e *frameworks* que facilitem o nosso dia a dia. Em Android, o que nos ajuda muito é o [AndroidAnnotations](http://androidannotations.org/). O AndroidAnnotations (podemos chamar só de AA) permite que escrevamos menos e melhor. 

Bom, por que menos? Porque ele faz o trabalho repetitivo por você. Colocar seu XML de Layout na *Activity*, injetar as *Views* nas variáveis, injetar animações, imagens ou strings dos recursos para as variáveis, e até mesmo lidar com *Threads* facilmente. São trabalhos que consomem tempo, são repetitivos, e você precisa deles o tempo todo. Então, agora tem quem faça isso por você!
E por que melhor? Porque esse tempo ganho te deixa focar no que é importante, no que precisa de fato ser pensado antes de escrito. E também porque deixa o seu código mais limpo e fácil de entender. 

E como acontece essa mágica? Simples: O AA tem um pré-compilador, e a partir das anotações usadas por você, ele "escreve" todo esse código repetitivo que você teria que escrever. A grande vantagem disso é que **NADA** é feito em tempo de execução. Não é necessário nenhum tipo de [reflexão](http://docs.oracle.com/javase/tutorial/reflect), então a performance não é impactada pelo uso do AA. 

Agora que você já sabe o que é o AA, seus benefícios e como ele funciona, vamos aprender como você vai usá-lo, certo? Ótimo! Vamos usar o [Android Studio](http://developer.android.com/sdk/installing/studio.html) como IDE e o [Gradle](http://tools.android.com/tech-docs/new-build-system/user-guide) como ferramenta de gestão de dependências (que também automatiza os *builds*). 

Vamos criar um projeto novo no Android Studio. Pode deixar a IDE criar uma *Activity* no estilo *"Hello World"*. É ela que usaremos para mostrar a mágica acontecendo! Então, ao terminar de criar o seu projeto, a estrutura de pastas será a seguinte:

![Imagem 1](/blog/images/posts/2014-07-11/img2.png "Imagem - Estrutura de Pastas")

A pasta ```app``` é um *módulo*. Nesse caso será nosso único módulo, correspondente a aplicação em si. O que está na raiz (fora da pasta ```app```) são configurações globais, que correspondem a todos os módulos. Note que no projeto existem dois arquivos chamados ```build.gradle```. São estes arquivos que gerenciam o processo de build e as dependências, e são eles que vamos alterar para adicionarmos o AA ao projeto.

Primeiramente, vamos adicionar o [android-apt](https://bitbucket.org/hvisser/android-apt) ao *buildscript* do projeto, pois este plugin é um pré-requisito para que as anotações sejam reconhecidas pelo Android Studio. Para isso, basta adicionarmos o seguinte comando dentro de ```dependencies```:

```
 classpath 'com.neenbedankt.gradle.plugins:android-apt:1.+'
```

Feito isso, partiremos para o ```build.gradle``` do módulo. Inicialmente ele deverá estar como na figura abaixo.

![Imagem 2](/blog/images/posts/2014-07-11/img3.png "Imagem - build.gradle")

Logo abaixo da linha 1, vamos importar o android-apt, com o comando ```apply plugin: 'android-apt'```. Nas dependências (linha 21), vamos adicionar o AA assim:

```
   apt "org.androidannotations:androidannotations:3.+"
   compile "org.androidannotations:androidannotations-api:3.+"
```

O AA tem dois arquivos *jar*, o primeiro é usado no processamento das anotações (apt) e é responsável por gerar o código, enquanto o segundo é usado na compilação. Na geração do código, o AA não pode modificar a sua classe *Java*, então ele cria uma nova classe, que estende da sua. Essa classe criada estará no mesmo pacote (mas não na mesma pasta) da sua. O nome da classe criada será o nome da sua acrescido de um ```_```.

Para que o AA possa gerar seu código e se certificar de que ele está correto, ele precisa de alguns parâmetros. Estes são passados também no arquivo ```build.gradle``` do módulo. Ao final do arquivo, após as dependências, adicione o seguinte:

```
apt {
    arguments {
        androidManifestFile variant.processResources.manifestFile
        resourcePackageName 'br.com.myapplication.app'
    }
}
```

O arquivo de manifesto será passado através dessa variável, e o ```resourcePackageName``` deve conter o pacote da sua aplicação, que é definido no ```AndroidManifest.xml```. 

Pronto, agora você tem um projeto com o AndroidAnnotations à disposição! Para finalizar, vamos apenas mostrar umas anotações básicas, e futuramente eu irei aprofundar um pouco mais sobre o que pode ser feito usando AA.

Na classe ```MainActivity```, vamos apagar o método onCreate, e anotar a classe com: 

```@EActivity(R.layout.activity_main)```

  Como parâmetro é passado o arquivo de layout que estava sendo usado na chamada ao método ```setContentView```.  Note que neste exemplo nós não precisamos do ```onCreate```, pois o mesmo servia apenas para colocar o conteúdo na *Activity*. O AA já faz isso pra você quando você passa o id do layout na anotação! 

Pra terminar, lembram que eu falei que o AA criava uma outra classe, estendendo da sua? Pois bem, vamos até o ```AndroidManifest.xml```, pois precisamos usar a classe criada pelo AA como *Activity* da sua aplicação. Basta acrescentar o ```_``` ao fim do atributo ```android:name```:

```android:name="br.com.myapplication.app.MainActivity_"```

Bom, depois de tudo isso já podemos rodar a aplicação, e o que veremos é um Hello World normal. O intuito deste primeiro post é explicar um pouco das capacidades do AndroidAnnotations, além de mostrar como se configura o ambiente para usá-lo. Nas próximas postagens vamos entrar em detalhes sobre algumas anotações e então veremos melhor como o AA pode nos salvar bastante tempo, deixando seu código limpo, organizado, e sua cabeça mais livre para pensar no que realmente importa!