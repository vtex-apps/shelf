import axios from 'axios'

export const resolvers = {
  Query: {
    getRecomendations: async (root, args, ctx) => [
      {
        id: 1,
        name: 'Batom Cod. 3456',
        imagePath: '//storecomponents.vteximg.com.br/arquivos/ids/155395-500-500',
        price: 180.80
      },
      {
        id: 2,
        name: 'Condicionador Respeito aos Cachos',
        imagePath: '//storecomponents.vteximg.com.br/arquivos/ids/155395-500-500',
        price: 25.80
      },
      {
        id: 3,
        name: 'Batom Intense Cod. 9056',
        imagePath: '//storecomponents.vteximg.com.br/arquivos/ids/155395-500-500',
        price: 25.80
      },
      {
        id: 4,
        name: 'Brilho Labial Cod. 19056',
        imagePath: '//storecomponents.vteximg.com.br/arquivos/ids/155395-500-500',
        price: 25.80
      },
      {
        id: 5,
        name: 'Escova de Cabelo',
        imagePath: '//storecomponents.vteximg.com.br/arquivos/ids/155395-500-500',
        price: 25.80
      },
      {
        id: 6,
        name: 'Batom Cod. 39056',
        imagePath: '//storecomponents.vteximg.com.br/arquivos/ids/155395-500-500',
        price: 25.80
      },
      {
        id: 7,
        name: 'Batom Cod. 009056',
        imagePath: '//storecomponents.vteximg.com.br/arquivos/ids/155395-500-500',
        price: 25.80
      }
    ]
    
  }
}
