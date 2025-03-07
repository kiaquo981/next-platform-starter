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
  
  const calcularROAS = () => {
    return orcamentoTrafico > 0 ? calcularFaturamentoTotal() / orcamentoTrafico : 0;
  };
  
  const formatarDinheiro = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
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
                  <span>{conversaoGravacoes}%</span>
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
                    <span>{conversaoNormal}%</span>
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
                    <span>{conversaoCashback}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Bumps */}
            <div className="mb-4 pb-4 border-b">
              <h4 className="font-medium text-blue-700">Order Bumps</h4>
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
                    <span>{conversaoOrderBump1}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upsell/Downsell */}
            <div>
              <h4 className="font-medium text-green-700">Upsell/Downsell</h4>
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
                    <span>{conversaoUpsell}%</span>
                  </div>
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
                  <span>{percentualOrganicoIngressos}%</span>
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
                  <div className="flex justify-between">
                    <span>Faturamento Total:</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal() * 0.8)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded">
                <h4 className="font-medium text-green-800">Cenário Realista</h4>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>Faturamento Total:</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal())}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-medium text-purple-800">Cenário Otimista</h4>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>Faturamento Total:</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal() * 1.2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <span className="text-gray-700">Faturamento Upsell/Downsell:</span>
                <span className="font-medium text-gray-800">{formatarDinheiro(calcularVendasUpsell().faturamento + calcularVendasDownsell().faturamento)}</span>
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
