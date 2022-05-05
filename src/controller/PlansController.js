module.exports = {
  async index(req, res) {
   const plans =  [
    {
      key: 'vip',
      name: 'VG VIP',
      icon: 'vip',
    },
    {
      key: 'dividendos',
      name: 'VG DIVIDENDOS',
      icon: 'dividendos',
    },
    {
      key: 'caps',
      name: 'VG CAPS',
      icon: 'caps',
    },
    {
      key: 'acoes',
      name: 'VG AÇÕES',
      icon: 'acoes',
    },
    {
      key: 'top10',
      name: 'TOP 10',
      icon: 'top10',
    },
    {
      key: 'rendaPassiva',
      name: 'RENDA PASSIVA',
      icon: 'rendaPassiva',
    },
    {
      key: 'platinium',
      name: 'PLATINIUM',
      icon: 'platinium',
    },
    {
      key: 'pimentinha',
      name: 'PIMENTINHA',
      icon: 'pimentinha',
    },
    {
      key: 'ouro',
      name: 'OURO',
      icon: 'ouro',
    },
    {
      key: 'fiis',
      name: 'FIIS',
      icon: 'fiis',
    },
    {
      key: 'dolar',
      name: 'DOLAR',
      icon: 'dolar',
    },
    {
      key: 'cripto',
      name: 'CRIPTO',
      icon: 'cripto',
    },
  ]
    return res.json(plans);
  },

};
