'use client';

import { useState } from 'react';

export default function Home() {
  // Estado para parâmetros básicos
  const [ingressos, setIngressos] = useState(500);
  const [lotes, setLotes] = useState([
    { numero: 1, percentual: 12, preco: 19, nome: "Lote 1" },
    { numero: 2, percentual: 14, preco: 27, nome: "Lote 2" },
    { numero: 3, percentual: 15, preco: 34, nome: "Lote 3" },
    { numero: 4, percentual: 15, preco: 39, nome: "Lote 4" },
    { numero: 5, percentual: 14, preco: 45, nome: "Lote 5" },
    { numero: 6, percentual: 15, preco: 49, nome: "Lote 6" },
    { numero: 7, percentual: 15, preco: 54, nome: "Lote 7" }
  ]);
  
  // Order Bump - Gravações
  const [precoGravacoes, setPrecoGravacoes] = useState(197);
  const [conversaoGravacoes, setConversaoGravacoes] = useState(18);
  
  // Produto Principal
  const [precoProdutoPrincipal, setPrecoProdutoPrincipal] = useState(997);
  const [conversaoNormal, setConversaoNormal] = useState(9);
  const [conversaoCashback, setConversaoCashback] = useState(25);
  const [conversaoBoleto, setConversaoBoleto] = useState(3);
  const [precoBoleto, setPrecoBoleto] = useState(1197);
  const [precoCashback, setPrecoCashback] = useState(797);
  
  // Order Bumps e Upsell/Downsell
  const [precoOrderBump1, setPrecoOrderBump1] = useState(497);
  const [conversaoOrderBump1, setConversaoOrderBump1] = useState(12);
  const [precoOrderBump2, setPrecoOrderBump2] = useState(97);
  const [conversaoOrderBump2, setConversaoOrderBump2] = useState(8);
  const [precoUpsell, setPrecoUpsell] = useState(997);
  const [conversaoUpsell, setConversaoUpsell] = useState(5);
  const [precoDownsell, setPrecoDownsell] = useState(297);
  const [conversaoDownsell, setConversaoDownsell] = useState(10);
  
  // Tráfego
  const [orcamentoTrafico, setOrcamentoTrafico] = useState(30000);
  const [percentualOrganicoIngressos, setPercentualOrganicoIngressos] = useState(35);
  
  // Aba ativa
  const [abaAtiva, setAbaAtiva] = useState('parametros');

  // Adicione estes estados ao início do componente
const [diasDeVendas, setDiasDeVendas] = useState(31);
const [diasUteis, setDiasUteis] = useState(23);
const [percentualVendasTrafico, setPercentualVendasTrafico] = useState(69);
const [percentualVendasConteudo, setPercentualVendasConteudo] = useState(17);
const [percentualVendasBase, setPercentualVendasBase] = useState(10);
const [percentualVendasOutros, setPercentualVendasOutros] = useState(4);

// Estados para cálculos de tráfego
const [cpmTrafico, setCpmTrafico] = useState(50);
const [ctrTrafico, setCtrTrafico] = useState(1.2);
const [connectRate, setConnectRate] = useState(85);
const [conversaoPagina, setConversaoPagina] = useState(12);
const [percentualVerbaTrafico, setPercentualVerbaTrafico] = useState(83);
const [percentualVerbaDistribuicao, setPercentualVerbaDistribuicao] = useState(7);
const [percentualVerbaRemkt, setPercentualVerbaRemkt] = useState(5);
const [percentualVerbaDownsell, setPercentualVerbaDownsell] = useState(3);
const [percentualVerbaOutros, setPercentualVerbaOutros] = useState(2);

// Funções de cálculo adicionais
const calcularVendasPorCanal = () => {
  return {
    trafico: Math.round(ingressos * (percentualVendasTrafico / 100)),
    conteudo: Math.round(ingressos * (percentualVendasConteudo / 100)),
    base: Math.round(ingressos * (percentualVendasBase / 100)),
    outros: Math.round(ingressos * (percentualVendasOutros / 100)),
  };
};

const calcularRitmoVendas = () => {
  const vendasDiarias = ingressos / diasDeVendas;
  const vendasDiasUteis = ingressos / diasUteis;
  return {
    vendasDiarias: Math.round(vendasDiarias),
    vendasDiasUteis: Math.round(vendasDiasUteis),
    ritmoMedio: Math.round((vendasDiarias + vendasDiasUteis) / 2)
  };
};

const calcularVerbasTrafico = () => {
  const verbaTotal = orcamentoTrafico;
  return {
    trafico: verbaTotal * (percentualVerbaTrafico / 100),
    distribuicao: verbaTotal * (percentualVerbaDistribuicao / 100),
    remkt: verbaTotal * (percentualVerbaRemkt / 100),
    downsell: verbaTotal * (percentualVerbaDownsell / 100),
    outros: verbaTotal * (percentualVerbaOutros / 100),
  };
};

const calcularMetricasTrafico = () => {
  const views = 1000 / (cpmTrafico / 1000); // Views por real investido
  const cliques = views * (ctrTrafico / 100);
  const acessos = cliques * (connectRate / 100);
  const vendas = acessos * (conversaoPagina / 100);
  const cpmPorVenda = 1000 / vendas;
  const custoPorVenda = cpmTrafico / 1000 * cpmPorVenda;
  
  return {
    views,
    cliques,
    acessos,
    vendas,
    cpmPorVenda,
    custoPorVenda
  };
};
  
  // Cálculos
  const calcularFaturamentoIngressos = () => {
    let total = 0;
    lotes.forEach(lote => {
      const lotesVendidos = Math.round(ingressos * (lote.percentual / 100));
      total += lotesVendidos * lote.preco;
    });
    return total;
  };
  
  const calcularFaturamentoGravacoes = () => {
    const vendasGravacoes = Math.round(ingressos * (conversaoGravacoes / 100));
    return vendasGravacoes * precoGravacoes;
  };
  
  const calcularVendasProdutoPrincipal = () => {
    const vendasGravacoes = Math.round(ingressos * (conversaoGravacoes / 100));
    const vendasProdutoCashback = Math.round(vendasGravacoes * (conversaoCashback / 100));
    const vendasProdutoNormal = Math.round((ingressos - vendasGravacoes) * (conversaoNormal / 100));
    const vendasProdutoBoleto = Math.round(ingressos * (conversaoBoleto / 100));
    
    return {
      cashback: vendasProdutoCashback,
      normal: vendasProdutoNormal,
      boleto: vendasProdutoBoleto,
      total: vendasProdutoCashback + vendasProdutoNormal + vendasProdutoBoleto
    };
  };
  
  const calcularFaturamentoProdutoPrincipal = () => {
    const vendas = calcularVendasProdutoPrincipal();
    return vendas.cashback * precoCashback + vendas.normal * precoProdutoPrincipal + vendas.boleto * precoBoleto;
  };
  
  const calcularVendasOrderBumps = () => {
    const vendasProdutoPrincipal = calcularVendasProdutoPrincipal().total;
    const vendasOB1 = Math.round(vendasProdutoPrincipal * (conversaoOrderBump1 / 100));
    const vendasOB2 = Math.round(vendasProdutoPrincipal * (conversaoOrderBump2 / 100));
    
    return {
      ob1: vendasOB1,
      ob2: vendasOB2,
      faturamentoOB1: vendasOB1 * precoOrderBump1,
      faturamentoOB2: vendasOB2 * precoOrderBump2,
      faturamentoTotal: (vendasOB1 * precoOrderBump1) + (vendasOB2 * precoOrderBump2)
    };
  };
  
  const calcularVendasUpsell = () => {
    const vendasProdutoPrincipal = calcularVendasProdutoPrincipal().total;
    const vendasUpsell = Math.round(vendasProdutoPrincipal * (conversaoUpsell / 100));
    return { quantidade: vendasUpsell, faturamento: vendasUpsell * precoUpsell };
  };
  
  const calcularVendasDownsell = () => {
    const vendasProdutoPrincipal = calcularVendasProdutoPrincipal().total;
    const naoCompradores = ingressos - vendasProdutoPrincipal;
    const vendasDownsell = Math.round(naoCompradores * (conversaoDownsell / 100));
    return { quantidade: vendasDownsell, faturamento: vendasDownsell * precoDownsell };
  };
  
  const calcularFaturamentoCaptacao = () => {
    return calcularFaturamentoIngressos() + calcularFaturamentoGravacoes();
  };
  
  const calcularFaturamentoTotal = () => {
    return calcularFaturamentoCaptacao() + 
           calcularFaturamentoProdutoPrincipal() + 
           calcularVendasOrderBumps().faturamentoTotal + 
           calcularVendasUpsell().faturamento + 
           calcularVendasDownsell().faturamento;
  };
  
  const calcularCPA = () => {
    const ingressosViaTrafico = Math.round(ingressos * (1 - percentualOrganicoIngressos / 100));
    return ingressosViaTrafico > 0 ? orcamentoTrafico / ingressosViaTrafico : 0;
  };
  
  const calcularROAS = () => {
    return orcamentoTrafico > 0 ? calcularFaturamentoTotal() / orcamentoTrafico : 0;
  };
  
  const formatarDinheiro = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const calcularVendasPorCanal = () => {
  return {
    trafico: Math.round(ingressos * (percentualVendasTrafico / 100)),
    conteudo: Math.round(ingressos * (percentualVendasConteudo / 100)),
    base: Math.round(ingressos * (percentualVendasBase / 100)),
    outros: Math.round(ingressos * (percentualVendasOutros / 100)),
  };
};

const calcularRitmoVendas = () => {
  const vendasDiarias = ingressos / diasDeVendas;
  const vendasDiasUteis = ingressos / diasUteis;
  return {
    vendasDiarias: Math.round(vendasDiarias),
    vendasDiasUteis: Math.round(vendasDiasUteis),
    ritmoMedio: Math.round((vendasDiarias + vendasDiasUteis) / 2)
  };
};

const calcularVerbasTrafico = () => {
  const verbaTotal = orcamentoTrafico;
  return {
    trafico: verbaTotal * (percentualVerbaTrafico / 100),
    distribuicao: verbaTotal * (percentualVerbaDistribuicao / 100),
    remkt: verbaTotal * (percentualVerbaRemkt / 100),
    downsell: verbaTotal * (percentualVerbaDownsell / 100),
    outros: verbaTotal * (percentualVerbaOutros / 100),
  };
};

const calcularMetricasTrafico = () => {
  const views = 1000 / (cpmTrafico / 1000); // Views por real investido
  const cliques = views * (ctrTrafico / 100);
  const acessos = cliques * (connectRate / 100);
  const vendas = acessos * (conversaoPagina / 100);
  const cpmPorVenda = 1000 / vendas;
  const custoPorVenda = cpmTrafico / 1000 * cpmPorVenda;
  
  return {
    views,
    cliques,
    acessos,
    vendas,
    cpmPorVenda,
    custoPorVenda
  };
};
  
  return (
    <div className="p-4 w-full bg-white text-black">
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Simulador de Lançamento Pago
        </h1>
        <p className="text-gray-600 mt-1">Baseado no Framework Estratégico de Lançamento Pago</p>
      </div>

      {/* Navegação das Abas */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap">
          <button onClick={() => setAbaAtiva('parametros')} className={`py-2 px-4 ${abaAtiva === 'parametros' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            Parâmetros Básicos
          </button>
          <button onClick={() => setAbaAtiva('produtos')} className={`py-2 px-4 ${abaAtiva === 'produtos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            Produtos e Conversões
          </button>
          <button onClick={() => setAbaAtiva('trafico')} className={`py-2 px-4 ${abaAtiva === 'trafico' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            Tráfego e Custos
          </button>
          <button onClick={() => setAbaAtiva('resultados')} className={`py-2 px-4 ${abaAtiva === 'resultados' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
            Resultados
          </button>
        </nav>
      </div>

      {/* Conteúdo da Aba de Parâmetros Básicos */}
      {abaAtiva === 'parametros' && (
        <div className="space-y-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Total de Ingressos</h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={ingressos}
                onChange={(e) => setIngressos(Number(e.target.value))}
                className="w-full"
              />
              <div className="bg-blue-50 p-2 rounded">
                <span className="font-medium">{ingressos}</span> ingressos
              </div>
            </div>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Distribuição e Preço dos Lotes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lotes.map((lote, index) => (
                <div key={index} className="border p-3 rounded bg-gray-50">
                  <h4 className="font-medium text-blue-800">{lote.nome}</h4>
                  <div className="mt-2">
                    <label className="block text-sm text-gray-700 mb-1">Percentual do Lote</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={lote.percentual}
                        onChange={(e) => {
                          const novosLotes = [...lotes];
                          novosLotes[index].percentual = Number(e.target.value);
                          setLotes(novosLotes);
                        }}
                        className="w-20 p-1 border rounded text-gray-800"
                      />
                      <span className="text-gray-700">{lote.percentual}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <label className="block text-sm text-gray-700 mb-1">Preço do Lote</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={lote.preco}
                        onChange={(e) => {
                          const novosLotes = [...lotes];
                          novosLotes[index].preco = Number(e.target.value);
                          setLotes(novosLotes);
                        }}
                        className="w-20 p-1 border rounded text-gray-800"
                      />
                      <span className="text-gray-700">{formatarDinheiro(lote.preco)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Vendas estimadas:</span>
                      <span>{Math.round(ingressos * (lote.percentual / 100))} ingressos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800">Resultados de Ingressos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <span className="text-sm text-gray-600">Ticket Médio de Ingressos</span>
                <p className="text-xl font-bold text-gray-800">{formatarDinheiro(calcularFaturamentoIngressos() / ingressos)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Faturamento Total de Ingressos</span>
                <p className="text-xl font-bold text-gray-800">{formatarDinheiro(calcularFaturamentoIngressos())}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba de Produtos */}
      {abaAtiva === 'produtos' && (
        <div className="space-y-6">
          {/* Gravações (Order Bump) */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Gravações (Order Bump)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Preço das Gravações</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={precoGravacoes}
                    onChange={(e) => setPrecoGravacoes(Number(e.target.value))}
                    className="w-24 p-1 border rounded text-gray-800"
                  />
                  <span className="text-gray-700">{formatarDinheiro(precoGravacoes)}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={conversaoGravacoes}
                    onChange={(e) => setConversaoGravacoes(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-gray-700">{conversaoGravacoes}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Vendas Estimadas</span>
                  <p className="font-medium text-gray-800">{Math.round(ingressos * (conversaoGravacoes / 100))} unidades</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Faturamento</span>
                  <p className="font-medium text-gray-800">{formatarDinheiro(calcularFaturamentoGravacoes())}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Produto Principal */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Produto Principal</h3>
            
            {/* Versão Normal */}
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-medium text-blue-700">Versão Normal</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preço Normal</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={precoProdutoPrincipal}
                      onChange={(e) => setPrecoProdutoPrincipal(Number(e.target.value))}
                      className="w-24 p-1 border rounded text-gray-800"
                    />
                    <span className="text-gray-700">{formatarDinheiro(precoProdutoPrincipal)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={conversaoNormal}
                      onChange={(e) => setConversaoNormal(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-700">{conversaoNormal}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Versão com Cashback */}
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-medium text-green-700">Versão com Cashback</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preço com Cashback</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={precoCashback}
                      onChange={(e) => setPrecoCashback(Number(e.target.value))}
                      className="w-24 p-1 border rounded text-gray-800"
                    />
                    <span className="text-gray-700">{formatarDinheiro(precoCashback)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={conversaoCashback}
                      onChange={(e) => setConversaoCashback(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-700">{conversaoCashback}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Versão Boleto */}
            <div>
              <h4 className="font-medium text-purple-700">Versão Boleto/Parcelado</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preço Boleto</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={precoBoleto}
                      onChange={(e) => setPrecoBoleto(Number(e.target.value))}
                      className="w-24 p-1 border rounded text-gray-800"
                    />
                    <span className="text-gray-700">{formatarDinheiro(precoBoleto)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={conversaoBoleto}
                      onChange={(e) => setConversaoBoleto(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-700">{conversaoBoleto}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Vendas Estimadas Total</span>
                  <p className="font-medium text-gray-800">{calcularVendasProdutoPrincipal().total} unidades</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Faturamento Total</span>
                  <p className="font-medium text-gray-800">{formatarDinheiro(calcularFaturamentoProdutoPrincipal())}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Bumps */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Order Bumps</h3>
            
            {/* Order Bump 1 */}
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-medium text-blue-700">Order Bump 1</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preço Order Bump 1</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={precoOrderBump1}
                      onChange={(e) => setPrecoOrderBump1(Number(e.target.value))}
                      className="w-24 p-1 border rounded text-gray-800"
                    />
                    <span className="text-gray-700">{formatarDinheiro(precoOrderBump1)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={conversaoOrderBump1}
                      onChange={(e) => setConversaoOrderBump1(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-700">{conversaoOrderBump1}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Bump 2 */}
            <div>
              <h4 className="font-medium text-green-700">Order Bump 2</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preço Order Bump 2</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={precoOrderBump2}
                      onChange={(e) => setPrecoOrderBump2(Number(e.target.value))}
                      className="w-24 p-1 border rounded text-gray-800"
                    />
                    <span className="text-gray-700">{formatarDinheiro(precoOrderBump2)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={conversaoOrderBump2}
                      onChange={(e) => setConversaoOrderBump2(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-700">{conversaoOrderBump2}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Vendas OB Total</span>
                  <p className="font-medium text-gray-800">{calcularVendasOrderBumps().ob1 + calcularVendasOrderBumps().ob2} unidades</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Faturamento OBs</span>
                  <p className="font-medium text-gray-800">{formatarDinheiro(calcularVendasOrderBumps().faturamentoTotal)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upsell e Downsell */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Upsell e Downsell</h3>
            
            {/* Upsell */}
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-medium text-blue-700">Upsell</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preço Upsell</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={precoUpsell}
                      onChange={(e) => setPrecoUpsell(Number(e.target.value))}
                      className="w-24 p-1 border rounded text-gray-800"
                    />
                    <span className="text-gray-700">{formatarDinheiro(precoUpsell)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={conversaoUpsell}
                      onChange={(e) => setConversaoUpsell(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-700">{conversaoUpsell}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Downsell */}
            <div>
              <h4 className="font-medium text-green-700">Downsell</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preço Downsell</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={precoDownsell}
                      onChange={(e) => setPrecoDownsell(Number(e.target.value))}
                      className="w-24 p-1 border rounded text-gray-800"
                    />
                    <span className="text-gray-700">{formatarDinheiro(precoDownsell)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Taxa de Conversão</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={conversaoDownsell}
                      onChange={(e) => setConversaoDownsell(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-gray-700">{conversaoDownsell}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Vendas Upsell</span>
                  <p className="font-medium text-gray-800">{calcularVendasUpsell().quantidade} unidades</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Vendas Downsell</span>
                  <p className="font-medium text-gray-800">{calcularVendasDownsell().quantidade} unidades</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Faturamento Total</span>
                  <p className="font-medium text-gray-800">{formatarDinheiro(calcularVendasUpsell().faturamento + calcularVendasDownsell().faturamento)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Conteúdo da Aba de Tráfego */}
      {abaAtiva === 'trafico' && (
        <div className="space-y-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Configuração de Tráfego</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Orçamento de Tráfego</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={orcamentoTrafico}
                    onChange={(e) => setOrcamentoTrafico(Number(e.target.value))}
                    className="w-32 p-1 border rounded text-gray-800"
                  />
                  <span className="text-gray-700">{formatarDinheiro(orcamentoTrafico)}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">% Ingressos Orgânicos</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={percentualOrganicoIngressos}
                    onChange={(e) => setPercentualOrganicoIngressos(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-gray-700">{percentualOrganicoIngressos}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded">
              <h4 className="font-medium mb-2 text-gray-800">Métricas de Tráfego</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Ingressos via Tráfego Pago</span>
                  <p className="font-medium text-gray-800">{Math.round(ingressos * (1 - percentualOrganicoIngressos / 100))}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Ingressos Orgânicos</span>
                  <p className="font-medium text-gray-800">{Math.round(ingressos * (percentualOrganicoIngressos / 100))}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">CPA (Custo por Ingresso)</span>
                  <p className="font-medium text-gray-800">{formatarDinheiro(calcularCPA())}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">ROAS</span>
                  <p className="font-medium text-gray-800">{calcularROAS().toFixed(2)}x</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Análise de Cenários</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium text-blue-800">Cenário Conservador</h4>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Conversão Gravações</span>
                    <span>{Math.round(conversaoGravacoes * 0.8)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Conversão Produto</span>
                    <span>{Math.round((conversaoNormal + conversaoCashback + conversaoBoleto) * 0.8)}%</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Faturamento</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal() * 0.8)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ROAS</span>
                    <span>{(calcularROAS() * 0.8).toFixed(2)}x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded">
                <h4 className="font-medium text-green-800">Cenário Realista</h4>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Conversão Gravações</span>
                    <span>{conversaoGravacoes}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Conversão Produto</span>
                    <span>{conversaoNormal + conversaoCashback + conversaoBoleto}%</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Faturamento</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ROAS</span>
                    <span>{calcularROAS().toFixed(2)}x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-medium text-purple-800">Cenário Otimista</h4>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Conversão Gravações</span>
                    <span>{Math.round(conversaoGravacoes * 1.2)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Conversão Produto</span>
                    <span>{Math.round((conversaoNormal + conversaoCashback + conversaoBoleto) * 1.2)}%</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Faturamento</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal() * 1.2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ROAS</span>
                    <span>{(calcularROAS() * 1.2).toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

<div className="border p-4 rounded-lg mt-6">
  <h3 className="text-lg font-medium mb-3 text-gray-800">Planejamento de Vendas e Tráfego</h3>
  
  {/* Planejamento de Dias e Ritmo */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <h4 className="font-medium text-blue-700 mb-3">Período de Vendas</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Dias Totais</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={diasDeVendas}
              onChange={(e) => setDiasDeVendas(Number(e.target.value))}
              className="w-20 p-1 border rounded text-gray-800"
            />
            <span className="text-gray-700">dias</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Dias Úteis</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={diasUteis}
              onChange={(e) => setDiasUteis(Number(e.target.value))}
              className="w-20 p-1 border rounded text-gray-800"
            />
            <span className="text-gray-700">dias</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 p-3 rounded">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-sm text-gray-600">Vendas por Dia</span>
            <p className="font-medium text-gray-800">{calcularRitmoVendas().vendasDiarias}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Vendas por Dia Útil</span>
            <p className="font-medium text-gray-800">{calcularRitmoVendas().vendasDiasUteis}</p>
          </div>
          <div className="col-span-2">
            <span className="text-sm text-gray-600">Ritmo Médio</span>
            <p className="font-medium text-gray-800">{calcularRitmoVendas().ritmoMedio} ingressos/dia</p>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h4 className="font-medium text-blue-700 mb-3">Distribuição de Vendas</h4>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Tráfego Pago (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVendasTrafico}
              onChange={(e) => setPercentualVendasTrafico(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVendasTrafico}%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Conteúdo Orgânico (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVendasConteudo}
              onChange={(e) => setPercentualVendasConteudo(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVendasConteudo}%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Base Própria (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVendasBase}
              onChange={(e) => setPercentualVendasBase(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVendasBase}%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Outros (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVendasOutros}
              onChange={(e) => setPercentualVendasOutros(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVendasOutros}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Detalhamento de Vendas */}
  <div className="bg-gray-50 p-3 rounded mb-6">
    <h4 className="font-medium mb-2">Vendas por Canal</h4>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div>
        <span className="text-sm text-gray-600">Tráfego Pago</span>
        <p className="font-medium text-gray-800">{calcularVendasPorCanal().trafico} ingressos</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Conteúdo</span>
        <p className="font-medium text-gray-800">{calcularVendasPorCanal().conteudo} ingressos</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Base Própria</span>
        <p className="font-medium text-gray-800">{calcularVendasPorCanal().base} ingressos</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Outros</span>
        <p className="font-medium text-gray-800">{calcularVendasPorCanal().outros} ingressos</p>
      </div>
    </div>
  </div>
  
  {/* Configuração detalhada de tráfego */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <h4 className="font-medium text-blue-700 mb-3">Métricas de Tráfego</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">CPM (R$)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              step="0.1"
              value={cpmTrafico}
              onChange={(e) => setCpmTrafico(Number(e.target.value))}
              className="w-20 p-1 border rounded text-gray-800"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">CTR (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.1"
              step="0.1"
              max="10"
              value={ctrTrafico}
              onChange={(e) => setCtrTrafico(Number(e.target.value))}
              className="w-20 p-1 border rounded text-gray-800"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Connect Rate (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="100"
              value={connectRate}
              onChange={(e) => setConnectRate(Number(e.target.value))}
              className="w-20 p-1 border rounded text-gray-800"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Conversão Página (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.1"
              step="0.1"
              max="100"
              value={conversaoPagina}
              onChange={(e) => setConversaoPagina(Number(e.target.value))}
              className="w-20 p-1 border rounded text-gray-800"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 p-3 rounded">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-sm text-gray-600">Views por Real</span>
            <p className="font-medium text-gray-800">{calcularMetricasTrafico().views.toFixed(1)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">CPM por Venda</span>
            <p className="font-medium text-gray-800">{calcularMetricasTrafico().cpmPorVenda.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Custo por Venda</span>
            <p className="font-medium text-gray-800">{formatarDinheiro(calcularMetricasTrafico().custoPorVenda)}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">CPA Projetado</span>
            <p className="font-medium text-gray-800">{formatarDinheiro(calcularVerbasTrafico().trafico / calcularVendasPorCanal().trafico)}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h4 className="font-medium text-blue-700 mb-3">Distribuição de Verba</h4>
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Tráfego (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVerbaTrafico}
              onChange={(e) => setPercentualVerbaTrafico(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVerbaTrafico}%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Distribuição (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVerbaDistribuicao}
              onChange={(e) => setPercentualVerbaDistribuicao(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVerbaDistribuicao}%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Remarketing (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVerbaRemkt}
              onChange={(e) => setPercentualVerbaRemkt(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVerbaRemkt}%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Downsell (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVerbaDownsell}
              onChange={(e) => setPercentualVerbaDownsell(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVerbaDownsell}%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Outros (%)</label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={percentualVerbaOutros}
              onChange={(e) => setPercentualVerbaOutros(Number(e.target.value))}
              className="w-full"
            />
            <span className="w-12 text-center text-gray-700">{percentualVerbaOutros}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Resumo de Verba */}
  <div className="bg-gray-50 p-3 rounded">
    <h4 className="font-medium mb-2">Distribuição Orçamentária</h4>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div>
        <span className="text-sm text-gray-600">Tráfego</span>
        <p className="font-medium text-gray-800">{formatarDinheiro(calcularVerbasTrafico().trafico)}</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Distribuição</span>
        <p className="font-medium text-gray-800">{formatarDinheiro(calcularVerbasTrafico().distribuicao)}</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Remarketing</span>
        <p className="font-medium text-gray-800">{formatarDinheiro(calcularVerbasTrafico().remkt)}</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Downsell</span>
        <p className="font-medium text-gray-800">{formatarDinheiro(calcularVerbasTrafico().downsell)}</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Outros</span>
        <p className="font-medium text-gray-800">{formatarDinheiro(calcularVerbasTrafico().outros)}</p>
      </div>
    </div>
  </div>
</div>      
      
      {/* Conteúdo da Aba de Resultados */}
      {abaAtiva === 'resultados' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-800">Faturamento Total</h3>
              <p className="text-2xl font-bold text-blue-700">{formatarDinheiro(calcularFaturamentoTotal())}</p>
              <p className="text-sm text-gray-600 mt-2">Com {ingressos} ingressos vendidos</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-800">Vendas Produto Principal</h3>
              <p className="text-2xl font-bold text-green-700">{calcularVendasProdutoPrincipal().total}</p>
              <p className="text-sm text-gray-600 mt-2">Taxa de conversão: {((calcularVendasProdutoPrincipal().total / ingressos) * 100).toFixed(1)}%</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-800">ROAS</h3>
              <p className="text-2xl font-bold text-purple-700">{calcularROAS().toFixed(2)}x</p>
              <p className="text-sm text-gray-600 mt-2">Investimento: {formatarDinheiro(orcamentoTrafico)}</p>
            </div>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Detalhamento de Receita</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Faturamento de Ingressos:</span>
                <span className="font-medium text-gray-800">{formatarDinheiro(calcularFaturamentoIngressos())}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Faturamento de Gravações:</span>
                <span className="font-medium text-gray-800">{formatarDinheiro(calcularFaturamentoGravacoes())}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Faturamento do Produto Principal:</span>
                <span className="font-medium text-gray-800">{formatarDinheiro(calcularFaturamentoProdutoPrincipal())}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Faturamento Order Bumps:</span>
                <span className="font-medium text-gray-800">{formatarDinheiro(calcularVendasOrderBumps().faturamentoTotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Faturamento Upsell:</span>
                <span className="font-medium text-gray-800">{formatarDinheiro(calcularVendasUpsell().faturamento)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-700">Faturamento Downsell:</span>
                <span className="font-medium text-gray-800">{formatarDinheiro(calcularVendasDownsell().faturamento)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span className="text-gray-800">Faturamento Total:</span>
                <span className="text-gray-800">{formatarDinheiro(calcularFaturamentoTotal())}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3 text-gray-800">Insights</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">→</span>
                <span className="text-gray-700">
                  {calcularFaturamentoCaptacao() > orcamentoTrafico ? 
                    `A fase de captação já gerou ${formatarDinheiro(calcularFaturamentoCaptacao())}, superando o investimento em tráfego de ${formatarDinheiro(orcamentoTrafico)}.` : 
                    `A fase de captação gerou ${formatarDinheiro(calcularFaturamentoCaptacao())}, representando ${((calcularFaturamentoCaptacao() / orcamentoTrafico) * 100).toFixed(1)}% do investimento em tráfego.`}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">→</span>
                <span className="text-gray-700">
                  A venda de gravações aumentou o ticket médio da captação em {formatarDinheiro(calcularFaturamentoGravacoes() / ingressos)} por ingresso.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">→</span>
                <span className="text-gray-700">
                  Os compradores de gravações converteram {(conversaoCashback / conversaoNormal).toFixed(1)}x mais para o produto principal que não compradores.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">→</span>
                <span className="text-gray-700">
                  {calcularFaturamentoTotal() / ingressos > 100 ? 
                    `O ticket médio por lead foi de ${formatarDinheiro(calcularFaturamentoTotal() / ingressos)}, representando um ótimo valor de cliente.` :
                    `O ticket médio por lead foi de ${formatarDinheiro(calcularFaturamentoTotal() / ingressos)}, pode ser otimizado com ajustes na estratégia de monetização.`}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
