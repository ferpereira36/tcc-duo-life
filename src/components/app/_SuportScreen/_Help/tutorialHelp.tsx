import React from 'react'
import ButtonDrop from '@/components/app/_SuportScreen/_Help/ui/ButtonDrop'

export default function TutorialHelp() {
  return (
    <>
      <ButtonDrop
        title="Como funciona o aplicativo?"
        text="Este aplicativo foi desenvolvido para auxiliar casais e indivíduos na gestão de suas despesas diárias e mensais.
        Você pode adicionar, visualizar e gerenciar suas despesas de maneira simples e eficaz."
      />
      <ButtonDrop
        title="Como excluir uma despesa?"
        text="Na tela de listagem das suas despesas, basta apenas clicar sobre a despesa e aparecerá um ícone vermelho de uma lixeira."
      />
      <ButtonDrop
        title="Como editar informações?"
        text="Todas as informações referente ao grupo e usuário podem ser editadas na tela Perfil."
      />
      <ButtonDrop
        title="Como gerar relatório?"
        text="O relatório pode ser gerado ao clicar no botão ciano (ícone de download) na tela principal do aplicativo (Inicio)."
      />
      <ButtonDrop
        title="Como chamar alguém para o grupo?"
        text="Você pode enviar o ID do seu grupo para outra pessoas clicando no botão amarelo (ícone de pessoa) na tela principal do aplicativo (Inicio)."
      />
    </>
  )
}
