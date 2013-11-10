## Criando seu post

1) Clone o repositório [git@github.com:Helabs/blog.git](https://github.com/Helabs/blog) e tenha certeza de que está no branch `gh-pages`.

2) Crie um arquivo em `_drafts/titulo-do-seu-post.markdown` com o seguinte formato.

```
---
published: false
author: Seu Nome
layout: post
title: "Título"
date: AAAA-MM-DD HH:MM
comments: true
categories:
  - Tag1
  - Tag2
---

Conteúdo do post
```

3) Veja se ficou bom executando o projeto com --drafts e acessando pelo browser o endereço [http://localhost:4000/blog/](http://localhost:4000/blog/) (Precisa de "/" no final do endereço).

4) Commit as mudanças.

```
$ git add .
$ git commit -am 'post: Titulo do seu post'
```

5) Push na branch.

```
$ git push origin gh-pages
```

## Publicando um post

TODO.

## Observações

### Code Highlighting

Usar a seguinte sintaxe:

```
{% highlight ruby linenos %}
class Say
  def hello
    say "Hello!"
  end
end
{% endhighlight %}
```

### Imagens

Salve suas imagens em `/images/posts/YYYY-MM-DD/`, lembrando que em termos de url vai ficar `/blog/images/posts/YYYY-MM-DD/`.

## Licença

[Blog da HE:mobile](http://hemobile.com.br/blog/) e seu conteúdo está licenciado sob uma [licença Creative Commons Atribuição-NãoComercial-CompartilhaIgual 3.0 Não Adaptada](http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pt_BR).
