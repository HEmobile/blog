---
published: true
author: Rafael Miranda
layout: post
title: "IBAN para devs Apple brasileiros"
date: 2013-06-14 16:30
comments: true
categories:
  - Rafael Miranda
  - BIC
  - IBAN
  - iOS
  - Normas
  - Programa Desenvolvedor Apple
  - SWIFT
---

Se você é associado a algum <a href="https://developer.apple.com" target="_blank">programa de desenvolvedor da Apple</a>, e possui recebimentos monetário pelos seus apps (eles podem ser pagos ou conter <a href="https://developer.apple.com/in-app-purchase/" target="_blank">compras in-app</a>), deve ter percebido a seguinte mensagem de alerta no seu <a href="https://itunesconnect.apple.com" target="_blank">iTunes Connect</a>:
<p style="text-align: center;"><span style="color: #ff0000;">Our records indicate that your banking information is incomplete. Please access your banking information and update as necessary.</span></p>

<!--more-->

Esta mensagem passou a aparecer há alguns dias pois a Apple atualizou seu formulário de informações bancárias, solicitando o preenchimento de mais um campo: o <strong>IBAN</strong>.

## O que é o IBAN
O IBAN nada mais é do que o <strong>identificador único internacional da sua conta bancária</strong>. Ele serve para facilitar o envio e recebimento de dinheiro entre países, já que, com ele, vários processos podem ser automatizados. Ele tem o mesmo propósito do código SWIFT (ou BIC), que já é usado no Brasil.

Em fevereiro de 2013 o Banco Central publicou uma Circular contendo <a href="http://www.bcb.gov.br/htms/novaPaginaSPB/IBAN-Guidelines_%20port.pdf" target="_blank">Diretrizes para Implementação do IBAN no Brasil</a>. Ela estabelece, dentre outras coisas, que o IBAN passará a ser utilizado formalmente no Brasil a partir do dia <strong>01/07/2013</strong>. Veja abaixo o trecho do documento:

![image](/blog/images/posts/2013-06-14/Captura_de_tela_14_06_13_21_00-1024x446.png)

## Flexibilidade temporária da Apple quanto ao IBAN
Como o nosso aplicativo <a href="http://mixprintpaint.felloway.com" target="_blank">MixPrintPaint</a> gera receitas, temos que atualizar os nossos dados bancários. Porém, não está sendo fácil! :)

Entramos em contato com o nosso banco e ele nos informou que o IBAN não é utilizado no Brasil, e que desconhece qualquer tipo de informação sobre o uso futuro do mesmo em contas brasileiras. Como já sabemos que eles não vão "tomar conhecimento" da Circular do BC antes de Julho, entramos em contato com a Apple.

Após algumas trocas de email, <strong>fomos informados pela Apple que a ausência do IBAN não será impeditivo para recebimento de valores nos meses de Julho e Agosto</strong>. Mas que, após isso, o IBAN será obrigatório.

[quote] We have been advised by our bank that July and August payments will still be successful without an IBAN, but you do need to obtain one from your bank and add it in iTunes Connect.[/quote]

Sendo assim, se você está preocupado em atualizar os seus dados rapidamente, pode ficar um pouco mais tranquilo. Porém, é importante cobrar o seu banco pelas informações, referenciando a <a href="http://www.bcb.gov.br/htms/novaPaginaSPB/IBAN-Guidelines_%20port.pdf" target="_blank">Circular do BC</a>, para que ele se mexa e lhe informe o IBAN da sua conta o quanto antes.

## Gerando você mesmo o seu IBAN
Se o seu banco não sabe informar o seu IBAN, e você estiver com vontade de atualizar logo o seu cadastro na Apple, pode consultar <a href="https://groups.google.com/d/msg/iphonedevbrazil/mtUGszzegVI/qRGUtRK2l64J" target="_blank">esta thread no grupo iPhoneDevBrazil</a>. Somando as informações contidas na <a href="http://www.bcb.gov.br/htms/novaPaginaSPB/IBAN-Guidelines_%20port.pdf" target="_blank">Circular do BC</a> com as descobertas da galera, você mesmo poderá "montar" o IBAN da sua conta corrente! :)


Se ainda tiver alguma dúvida, não deixe perguntar!
