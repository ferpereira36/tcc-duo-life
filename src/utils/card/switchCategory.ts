export const switchCategory = (category: string) => {
  switch (category) {
    case 'Alimentação':
      return 'restaurant-outline'
    case 'Assinaturas':
      return 'star-outline'
    case 'Aluguel':
      return 'newspaper-outline'
    case 'Beleza':
      return 'flower-outline'
    case 'Boletos':
      return 'document-text-outline'
    case 'Conta de água':
      return 'water-outline'
    case 'Conta de energia':
      return 'flash-outline'
    case 'Comunicação':
      return 'chatbubble-outline'
    case 'Doações':
      return 'heart-outline'
    case 'Educação':
      return 'book-outline'
    case 'Entretenimento':
      return 'film-outline'
    case 'Esportes':
      return 'basketball-outline'
    case 'Farmácia':
      return 'medkit-outline'
    case 'Ferramentas':
      return 'construct-outline'
    case 'Finanças':
      return 'cash-outline'
    case 'Imposto':
      return 'calculator-outline'
    case 'Lazer':
      return 'game-controller-outline'
    case 'Moradia':
      return 'home-outline'
    case 'Pets':
      return 'paw-outline'
    case 'Saúde':
      return 'heart-circle-outline'
    case 'Serviços':
      return 'cog-outline'
    case 'Supermercado':
      return 'cart-outline'
    case 'Tecnologia':
      return 'rocket-outline'
    case 'Trabalho':
      return 'briefcase-outline'
    case 'Transporte':
      return 'car-outline'
    case 'Viagens':
      return 'airplane-outline'

    default:
      return 'sync'
  }
}
