import * as Print from 'expo-print'
import { storageService } from '@/services/storage/storageService'
import { ExpensesProps } from '@/types/ExpensesProps'
import { groupStorageProps } from '@/types/storage/group'
import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'
import logoImg from '@/assets/images/icon.jpg'
import { Colors } from '@/constants/Colors'
import { Alert } from 'react-native'

export async function createPDF(month: string) {
  const storageGroup = storageService.getItem<groupStorageProps>('group')
  const currentExpenses = storageGroup?.groupExpenses

  // Carrega o asset da imagem
  const imageAsset = Asset.fromModule(logoImg)
  await imageAsset.downloadAsync() // Garante que o asset está baixado

  // Converte a imagem para base64
  const base64Image = await FileSystem.readAsStringAsync(
    imageAsset.localUri || '',
    {
      encoding: FileSystem.EncodingType.Base64,
    },
  )

  if (currentExpenses) {
    const html = `
      <html>
        <head>
          <style>
            * { print-color-adjust:exact !important; }
            body {
              font-family: 'Helvetica';
              font-size: 12px;
              margin: 20px;
            }
            header, footer {
              color: #000;
              display: flex;
              justify-content: center;
              margin-bottom: 24px;
            }
            img {
              width: 40px;
              height: 40px;
              position: absolute;
              top: 24px;
              right: 20px;
              border-radius: 100px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #000;
              padding: 4px;
            }
            td {
              font-size: 12px;
            }
            th {
              background-color: ${Colors.violetApp};
              color: white;
            }
            th-title {
              width: "30%";
            }
            th-category {
              width: "30%";
            }
            th-owner {
              width: "10%";
            }
            th-date {
              width: "10%";
            }
            th-value {
              width: "20%";
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Relatório de Despesas de ${month}</h1>
          </header>
          <img src="data:image/jpeg;base64,${base64Image}" />
          <table>
            <tr>
              <th class="th-title">Título</th>
              <th class="th-category">Categoria</th>
              <th class="th-owner">Responsável</th>
              <th class="th-date">Data</th>
              <th class="th-value">Valor</th>
            </tr>
            ${currentExpenses[month]
              .map(
                (expenses: ExpensesProps) => `
              <tr>
                <td>${expenses.name}</td>
                <td>${expenses.category}</td>
                <td>
                  ${
                    expenses.owner_id === storageGroup.groupMemberOneId
                      ? storageGroup.groupMemberOneName
                      : expenses.owner_id === storageGroup.groupMemberTwoId
                        ? storageGroup.groupMemberTwoName
                        : 'Não encontrado!'
                  }
                </td>
                <td>${expenses.date}</td>
                <td>R$ ${expenses.value}</td>
              </tr>
            `,
              )
              .join('')}
          </table>
          <footer>
            <p>Obrigado por escolher o Duo-Life!</p>
          </footer>
        </body>
      </html>
    `

    try {
      const { uri } = await Print.printToFileAsync({ html })
      // Caminho final para armazenar o PDF
      const pdfUri = `${FileSystem.documentDirectory}Relatorio Mensal de ${month}.pdf`

      // Copia o arquivo do cache para o diretório de documentos
      await FileSystem.moveAsync({
        from: uri,
        to: pdfUri,
      })
    } catch (error) {
      Alert.alert('Erro ao tentar salvar seu relatório')
    }
  }
}
