---
published: true
author: Roberto Morais
layout: post
title: "Xcode Templates - Parte 2"
date: 2014-08-05 16:30
comments: true
categories:
  - Roberto Morais
---

Como prometido, estamos de volta ao obscuro mundo de templates para o Xcode :D. Hoje vamos olhar as chaves que ajudam bastante a organizar nossos templates e trazem todo o poder da Herança para criação de templates.

<!--more-->

Aos que não acompanharam, segue o link para a [Parte 1](http://hemobile.com.br/blog/2014/06/27/xcode-templates-parte-1/).

## Ancestor

Ancestor é uma das propriedades mais importantes de um arquivo template, ele permite que você herde as propriedades de um outro template, trazendo assim todos os benefícios comuns da Herança. 

*PS:Heranças múltiplas são permitidas.*

Vamos a um exemplo pratico então. Um outro arquivo que eu sempre tenho em meus projetos e me desagradava criar sempre é um '.gitignore' padrão. Usando as coisas que aprendemos no ultimo post, é simples criar um template que faça isso para mim.

1. Crie uma pasta: `GitIgnoreTemplate.xctemplate` em:
```
~/Biblioteca/Developer/Xcode/Templates/Project Templates/SUA_PASTA
```
2. Copie um `TemplateInfo.plist ` para a pasta, apague tudo que tem no `<dict>...</dict>` principal e nele cole: 
	
    		<key>Description</key>
        	<string>This template provides a default gitignore file for all the HE:mobile templates.</string>	
        	<key>Identifier</key>
        	<string>br.com.hemobile.template.gitIgnore</string>
        	
        	<key>Kind</key>
        	<string>Xcode.Xcode3.ProjectTemplateUnitKind</string>
        	
        	<key>Ancestors</key>
        	<array></array	
    		<key>Concrete</key>
    		<true/>
        	<key>Definitions</key>
        	<dict>
        		<key>../.gitignore</key>
        		<dict>
                	<key>Path</key>
                    <string>.gitignore</string>
                    <key>TargetIndices</key>
                    <array/>
                    <key>Group</key>
                    <array>
                        <string>Supporting Files</string>
                    </array>
                </dict>
        	</dict>
        	
        	<key>Nodes</key>
        	<array>
                <string>../.gitignore</string>
            </array>
        	
        	<key>Options</key>
            <array></array>
        	
        	<key>SortOrder</key>
        	<integer>1</integer>

Relembrando os pontos importantes:

* Um *identifier* único
* Em *Definitions* nós apontamos para o arquivo .gitignore que iremos usar
* Em *Nodes* indicamos as definições que devem ser criadas no projeto
* Lembrando de adicionar o arquivo *.gitignore* desejado a pasta do template.

Template novo criado, agora vamos editar o nosso outro template (Custom Basic Application.xctemplate, como criado no último post) para herdar as propriedades dele.

Procurem o seguinte código:

	<key>Ancestors</key>
	<array>
		<string>com.apple.dt.unit.storyboardApplication</string>
	</array>
	
Como podem ver, o nosso template já utiliza da chave `Ancestors` para herdar do template de storyboard padrão da Apple. Vamos adicionar o nosso template ao array para herdá-lo também.

	<key>Ancestors</key>
	<array>
		<string>com.apple.dt.unit.storyboardApplication</string>
		<string>br.com.hemobile.template.gitIgnore</string>
	</array>
	
Simples assim, template herdado e agora o nosso CustomBasicApplication também cria um .gitignore na raiz de seus projetos. 

## Concrete

Se vocês abrirem o Xcode para testar o novo template irão perceber que o nosso *GitIgnoreTemplate*  está lá para seleção também, e isso está longe do ideal. Eu quero poder criar templates com capacidades básicas só para herdar suas propriedades nos templates que eu realmente irei utilizar e deixar o meu xcode limpo e organizado.

Para isso temos a chave *Concrete*, ela define os template que iremos usar diretamente no Xcode.

Abrindo o GitIgnoreTemplate podemos ver que ele está definido como concrete:

    <key>Concrete</key>
    <true/>
 
Para alterar isso, basta remover as duas linhas e esse template não irá mais aparecer como opção de escolha no Xcode.

## Conclusão

Usar Concrete e Ancestor ajuda a organizar nossos templates, evita o famoso copiar e colar, que complica muito qualquer tipo de refatoração, e nos permite criar nossos templates com mais facilidade inclusive herdando funcionalidades dos templates da Apple.

Para os interessados, fica como tarefa separar a inclusão do Podfile em um outro template e herdar suas propriedades no nosso template principal.
