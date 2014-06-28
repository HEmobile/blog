---
published: true
author: Roberto Morais
layout: post
title: "Xcode Templates - Parte 1"
date: 2014-06-27 16:30
comments: true
categories:
  - Roberto Morais
---

Aqui na HE:mobile nós vivemos um ambiente bastante dinâmico, com projetos novos chegando e outros sendo concluídos constantemente. Nessa freqüência de criar novos projetos, ficou claro para mim que os modelos de templates da Apple não atendem minhas necessidades, eu sempre precisava excluir classes e métodos; incluir outros e re-organizar os arquivos para atender minhas preferências.

<!--more-->

Como basicamente quem faz trabalho repetitivo é robô, decidi aprender e criar meus próprios templates. A Apple não ajuda muito nesse caso, a documentação oficial me pareceu bem fraca, mas a comunidade como sempre resolveu.

## Setup

O melhor modo para começar é copiar alguns dos modelos da Apple para personalização. Abra o finder, vá para pasta de aplicativos, botão direito no Xcode.app, selecione a opção mostrar conteúdo do pacote e navegue para:

```
Contents/Developer/Platforms/iPhoneOS.platform/Developer/Library/Xcode/Templates/Project Templates/Application/
```

Aqui tem diversos templates da Apple, para o nosso exemplo, copie: `Single View Application.xctemplate` e coloque em:

```
~/Biblioteca/Developer/Xcode/Templates/Project Templates/SUA_PASTA
```

### Observações:

- Caso não ache a pasta Biblioteca, o motivo é que ela é uma pasta de sistema e por isso fica escondida (no terminal, use `chflags nohidden ~/Library` para exibi-la). 
- Se não existir a pasta Project Templates, é necessário criá-la.
- *SUA_PASTA* é o nome que o Xcode vai usar para exibir o seu grupo de templates, no menu lateral esquerdo da tela de criação de projetos. Aqui usamos *HE mobile*.

## Criando um Template

Agora que copiamos um modelo de template da Apple para a pasta correta, vamos começar a criar o nosso próprio template.

1. Altere o nome da pasta de `Single View Application.xctemplate` para `Custom Basic Application.xctemplate` (Esse nome aqui pode ser o que você escolher, ele vai aparecer identificando o template no Xcode).
2. Abra o arquivo TemplateInfo.plist com seu editor de texto preferido.
3. Procure a chave Identifier `<key>Identifier</key>`
4. Troque o valor do string de `<string>com.apple.dt.unit.singleViewApplication</string>` para um do seu gosto. Ele precisa ser único para o Xcode reconhecer o template. Aqui usaremos `br.com.hemobile.basicApplication`.

Pronto, template criado. Só com essas alterações o nosso template já pode ser visto no Xcode, mas ainda precisamos dar a nossa cara para ele.

## Personalizando

### Removendo Arquivos do template base

Uma das coisas que eu nunca usei do template Single View Application da Apple e sempre me incomodou é o ViewController criado pelo Xcode, o nome é genérico demais. Para removê-lo do nosso template precisamos entender duas chaves de configuração:

- `Definitions` é o local onde listamos nossas variáveis e arquivos do template. Nada é adicionado ao projeto, apenas são criadas para possível uso ou inclusão no projeto.
- `Nodes` é onde listamos os arquivos definidos em Definitions que iremos copiar ou criar para o nosso projeto.

Certo, agora que sabemos para que servem Nodes e Definitions, podemos procurar por eles no nosso Templateinfo:

	<key>Definitions</key>
	<dict>
		<key>___VARIABLE_classPrefix:identifier___ViewController.m:private</key>
		<string>@interface ___VARIABLE_classPrefix:identifier___ViewController ()

		@end
		</string>
	</dict>

	<key>Nodes</key>
	<array>…content…</array>

Como decidimos remover esse view controller, podemos apagar o conteúdo do dict de Definitions e do array de Nodes, deixando nossos Definitions e Nodes assim:

	<key>Definitions</key>
	<dict>
	</dict>

	<key>Nodes</key>
	<array></array>

Pronto, agora o nosso template não cria mais um ViewController genérico ao criar um projeto.

### Adicionando Arquivos

Bem Roberto, apagar arquivos é legal e tal, mas seria bem mais interessante poder adicionar os nossos próprios arquivos, não? Com certeza.	

Aqui na HE:mobile utilizamos o [CocoaPods](http://cocoapods.org) como gerenciador de dependências e estamos muito felizes com ele, dito isso, um arquivo Podfile padrão é algo que me parece legal para adicionar ao nosso template. 

Para isso, primeiro precisamos criar a definition de nosso Podfile.

1. Copie ou crie um arquivo Podfile na pasta do seu template.
2. Abra novamente o Templateinfo e no dict de Definitions cole:

```
	<key>../Podfile</key>
	<dict>
        		<key>Path</key>
            	<string>Podfile</string>
            	<key>TargetIndices</key>
            	<array/>
            	<key>Group</key>
            	<array>
                		<string>Supporting Files</string>
            	</array>
        	</dict>
```

**Observações**

A chave (key) do Definition é o nome e o local que o arquivo será criado, como o Podfile fica fora da pasta do projeto ficou `../Podfile`, um arquivo dentro da pasta do projeto poderia ter a chave como logo.png por exemplo.

No dict de propriedades do nosso definitions podemos ver algumas funções interessantes:

* `Path` é o caminho do arquivo que iremos copiar para criar o nosso. 
* `TargetIndicies` é usado para associar os recursos a um target, fazendo com que os mesmos sejam copiados ao gerar uma build, como não queremos isso para o Podfile deixei o array vazio. 
* `Group` é usado caso você queria adicionar o arquivo criado a algum grupo dentro do Xcode, no nosso caso usei o já existente “Supporting Files”.

Definition criado, precisamos adicioná-lo ao `Node`, para que ele seja adicionado aos projetos gerados pelo Template.

Vá ao array de Nodes no Template Info e cole: `<string>../Podfile</string>`.

Como podem notar, precisa ser utilizada exatamente a mesma chave usada para criar o definition.

Pronto. Template criado, e você já pode abrir o Xcode e criar novos projetos sem um ViewController inútil e com seu Podfile padrão.

![Imagem 1](/blog/images/posts/2014-06-27/box.png "Imagem - Meus templates no Xcode")

## Próximos Passos

Em breve, publicarei a parte 2 falando sobre outras capacidades do template como `Ancestors` que permite você herdar as funcionalidades de outro template, `Concrete` que decide se o template deve ser exibido ou não no Xcode entre outros. 

Os mais curiosos que não quiserem esperar, podem aprender bastante bisbilhotando os templates da Apple, e para quem sabe inglês, segue um link com outros templates e várias informações: [https://github.com/NSBoilerplate/Xcode-Project-Templates/wiki/Creating-Xcode-4.x-Project-Templates](https://github.com/NSBoilerplate/Xcode-Project-Templates/wiki/Creating-Xcode-4.x-Project-Templates)

Obrigado! E qualquer dúvida, só postar um comentário e responderei assim que possível. 





