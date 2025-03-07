'use client';

import { useState } from 'react';

export default function SimuladorLancamentoPago() {
  // Estado para armazenar os valores do simulador
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
  
  // Estado da aba ativa
  const [abaAtiva, setAbaAtiva] = useState('parametros');
  
  // Calcular tickets médios e totais
  const calcularTicketMedioIngressos = () => {
    let total = 0;
    let quantidade = 0;
    
    lotes.forEach(lote => {
      const lotesVendidos = Math.round(ingressos * (lote.percentual / 100));
      total += lotesVendidos * lote.preco;
      quantidade += lotesVendidos;
    });
    
    return quantidade > 0 ? (total / quantidade).toFixed(2) : 0;
  };
  
  // Calcular faturamento de ingressos
  const calcularFaturamentoIngressos = () => {
    let total = 0;
    
    lotes.forEach(lote => {
      const lotesVendidos = Math.round(ingressos * (lote.percentual / 100));
      total += lotesVendidos * lote.preco;
    });
    
    return total;
  };
  
  // Calcular faturamento de gravações
  const calcularFaturamentoGravacoes = () => {
    const vendasGravacoes = Math.round(ingressos * (conversaoGravacoes / 100));
    return vendasGravacoes * precoGravacoes;
  };
  
  // Calcular faturamento total na captação
  const calcularFaturamentoCaptacao = () => {
    return calcularFaturamentoIngressos() + calcularFaturamentoGravacoes();
  };
  
  // Calcular vendas do produto principal
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
  
  // Calcular faturamento do produto principal
  const calcularFaturamentoProdutoPrincipal = () => {
    const vendas = calcularVendasProdutoPrincipal();
    
    return (
      vendas.cashback * precoCashback +
      vendas.normal * precoProdutoPrincipal +
      vendas.boleto * precoBoleto
    );
  };
  
  // Calcular vendas e faturamento de Order Bumps
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
  
  // Calcular vendas e faturamento de Upsell
  const calcularVendasUpsell = () => {
    const vendasProdutoPrincipal = calcularVendasProdutoPrincipal().total;
    const vendasUpsell = Math.round(vendasProdutoPrincipal * (conversaoUpsell / 100));
    
    return {
      quantidade: vendasUpsell,
      faturamento: vendasUpsell * precoUpsell
    };
  };
  
  // Calcular vendas e faturamento de Downsell
  const calcularVendasDownsell = () => {
    const vendasProdutoPrincipal = calcularVendasProdutoPrincipal().total;
    const naoCompradores = ingressos - vendasProdutoPrincipal;
    const vendasDownsell = Math.round(naoCompradores * (conversaoDownsell / 100));
    
    return {
      quantidade: vendasDownsell,
      faturamento: vendasDownsell * precoDownsell
    };
  };
  
  // Calcular faturamento total
  const calcularFaturamentoTotal = () => {
    return (
      calcularFaturamentoCaptacao() +
      calcularFaturamentoProdutoPrincipal() +
      calcularVendasOrderBumps().faturamentoTotal +
      calcularVendasUpsell().faturamento +
      calcularVendasDownsell().faturamento
    );
  };
  
  // Calcular CPA (Custo Por Aquisição) de ingresso via tráfego
  const calcularCPA = () => {
    const ingressosViaTrafico = Math.round(ingressos * (1 - percentualOrganicoIngressos / 100));
    return ingressosViaTrafico > 0 ? orcamentoTrafico / ingressosViaTrafico : 0;
  };
  
  // Calcular ROAS (Return On Ad Spend)
  const calcularROAS = () => {
    return orcamentoTrafico > 0 ? calcularFaturamentoTotal() / orcamentoTrafico : 0;
  };
  
  // Atualizar percentuais de lotes para sempre somar 100%
  const atualizarPercentuaisLotes = (index, novoPercentual) => {
    const novosLotes = [...lotes];
    const percentualAntigo = novosLotes[index].percentual;
    const diferenca = novoPercentual - percentualAntigo;
    
    // Garantir que o percentual não seja negativo
    if (novoPercentual < 1) return;
    
    novosLotes[index].percentual = novoPercentual;
    
    // Ajustar os outros percentuais proporcionalmente
    const lotesAjustaveis = novosLotes.filter((_, i) => i !== index);
    const somaOutrosPercentuais = lotesAjustaveis.reduce((soma, lote) => soma + lote.percentual, 0);
    
    if (somaOutrosPercentuais + diferenca < 0) return;
    
    lotesAjustaveis.forEach((lote, i) => {
      const peso = lote.percentual / somaOutrosPercentuais;
      const lotesIndex = i >= index ? i + 1 : i;
      novosLotes[lotesIndex].percentual = Math.max(1, lote.percentual - (diferenca * peso));
    });
    
    // Garantir que o total seja exatamente 100%
    const total = novosLotes.reduce((soma, lote) => soma + lote.percentual, 0);
    if (total !== 100) {
      const ajuste = (100 - total) / novosLotes.length;
      novosLotes.forEach((lote) => {
        lote.percentual += ajuste;
      });
    }
    
    // Arredondar os percentuais
    novosLotes.forEach((lote) => {
      lote.percentual = Math.round(lote.percentual);
    });
    
    setLotes(novosLotes);
  };
  
  // Formatar valor monetário
  const formatarDinheiro = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="p-4 w-full bg-white text-black">
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span role="img" aria-label="calculator">🧮</span>
          Simulador de Lançamento Pago
        </h1>
        <p className="text-gray-600 mt-1">Planeje seu lançamento e projete seus resultados com base no Framework Estratégico</p>
      </div>

      {/* Navegação das Abas */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap space-x-1">
          <button 
            onClick={() => setAbaAtiva('parametros')}
            className={`py-2 px-4 ${abaAtiva === 'parametros' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Parâmetros Básicos
          </button>
          <button 
            onClick={() => setAbaAtiva('produtos')}
            className={`py-2 px-4 ${abaAtiva === 'produtos' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Produtos e Conversões
          </button>
          <button 
            onClick={() => setAbaAtiva('trafico')}
            className={`py-2 px-4 ${abaAtiva === 'trafico' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Tráfego e Custos
          </button>
          <button 
            onClick={() => setAbaAtiva('resultados')}
            className={`py-2 px-4 ${abaAtiva === 'resultados' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Resultados
          </button>
        </nav>
      </div>

      {/* Aba de Parâmetros Básicos */}
      {abaAtiva === 'parametros' && (
        <div className="space-y-6">
          <div className="space-y-2 border p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <label htmlFor="ingressos" className="text-base font-medium text-gray-700">
                Total de Ingressos
              </label>
              <span className="text-sm text-gray-500">{ingressos} ingressos</span>
            </div>
            <input
              id="ingressos"
              type="range"
              min={100}
              max={5000}
              step={50}
              value={ingressos}
              onChange={(e) => setIngressos(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <h3 className="text-lg font-medium mt-4 text-gray-800">Distribuição e Preço dos Lotes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lotes.map((lote, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-blue-800">{lote.nome}</h4>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor={`percentual-${index}`} className="text-sm text-gray-700">
                      Percentual
                    </label>
                    <span className="text-xs text-gray-500">{lote.percentual}%</span>
                  </div>
                  <input
                    id={`percentual-${index}`}
                    type="number"
                    min="1"
                    max="100"
                    value={lote.percentual}
                    onChange={(e) => atualizarPercentuaisLotes(index, parseInt(e.target.value))}
                    className="w-full h-8 px-2 border border-gray-300 rounded"
                  />
                  
                  <div className="flex items-center justify-between mt-2">
                    <label htmlFor={`preco-${index}`} className="text-sm text-gray-700">
                      Preço
                    </label>
                    <span className="text-xs text-gray-500">{formatarDinheiro(lote.preco)}</span>
                  </div>
                  <input
                    id={`preco-${index}`}
                    type="number"
                    min="1"
                    value={lote.preco}
                    onChange={(e) => {
                      const novosLotes = [...lotes];
                      novosLotes[index].preco = parseInt(e.target.value);
                      setLotes(novosLotes);
                    }}
                    className="w-full h-8 px-2 border border-gray-300 rounded"
                  />
                  
                  <div className="text-sm mt-2">
                    <span className="font-medium text-gray-700">Vendas: </span>
                    <span className="text-gray-900">{Math.round(ingressos * (lote.percentual / 100))} ingressos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 border rounded-lg bg-blue-50">
            <h3 className="text-lg font-medium flex items-center gap-2 text-gray-800">
              <span role="img" aria-label="dollar">💰</span>
              Resultados de Ingressos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-sm text-gray-500">Ticket Médio de Ingressos</p>
                <p className="text-xl font-bold text-gray-900">{formatarDinheiro(calcularTicketMedioIngressos())}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Faturamento Total de Ingressos</p>
                <p className="text-xl font-bold text-gray-900">{formatarDinheiro(calcularFaturamentoIngressos())}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Aba de Produtos e Conversões */}
      {abaAtiva === 'produtos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Bump - Gravações */}
            <div className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800">Gravações (Order Bump)</h3>
              <div className="space-y-4 mt-3">
                <div>
                  <label htmlFor="preco-gravacoes" className="block text-sm font-medium text-gray-700">Preço das Gravações</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="preco-gravacoes"
                      type="number"
                      value={precoGravacoes}
                      onChange={(e) => setPrecoGravacoes(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <span className="text-sm text-gray-500 w-32">{formatarDinheiro(precoGravacoes)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="conversao-gravacoes" className="block text-sm font-medium text-gray-700">Taxa de Conversão</label>
                    <span className="text-sm text-gray-500">{conversaoGravacoes}%</span>
                  </div>
                  <input
                    id="conversao-gravacoes"
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={conversaoGravacoes}
                    onChange={(e) => setConversaoGravacoes(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                  />
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Vendas Estimadas</p>
                      <p className="font-medium text-gray-900">{Math.round(ingressos * (conversaoGravacoes / 100))} unidades</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Faturamento</p>
                      <p className="font-medium text-gray-900">{formatarDinheiro(calcularFaturamentoGravacoes())}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Produto Principal */}
            <div className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800">Produto Principal</h3>
              <div className="space-y-4 mt-3">
                {/* Versão Normal */}
                <div>
                  <label htmlFor="preco-produto" className="block text-sm font-medium text-gray-700">Preço Normal</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="preco-produto"
                      type="number"
                      value={precoProdutoPrincipal}
                      onChange={(e) => setPrecoProdutoPrincipal(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <span className="text-sm text-gray-500 w-32">{formatarDinheiro(precoProdutoPrincipal)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="conversao-normal" className="block text-sm font-medium text-gray-700">Conversão Normal</label>
                    <span className="text-sm text-gray-500">{conversaoNormal}%</span>
                  </div>
                  <input
                    id="conversao-normal"
                    type="range"
                    min={0}
                    max={30}
                    step={1}
                    value={conversaoNormal}
                    onChange={(e) => setConversaoNormal(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                  />
                </div>
                
                {/* Versão com Cashback */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label htmlFor="preco-cashback" className="block text-sm font-medium text-gray-700">Preço com Cashback</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="preco-cashback"
                      type="number"
                      value={precoCashback}
                      onChange={(e) => setPrecoCashback(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <span className="text-sm text-gray-500 w-32">{formatarDinheiro(precoCashback)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="conversao-cashback" className="block text-sm font-medium text-gray-700">Conversão Cashback</label>
                    <span className="text-sm text-gray-500">{conversaoCashback}%</span>
                  </div>
                  <input
                    id="conversao-cashback"
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={conversaoCashback}
                    onChange={(e) => setConversaoCashback(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                  />
                </div>
                
                {/* Boleto */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label htmlFor="preco-boleto" className="block text-sm font-medium text-gray-700">Preço Boleto/Parcelado</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="preco-boleto"
                      type="number"
                      value={precoBoleto}
                      onChange={(e) => setPrecoBoleto(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <span className="text-sm text-gray-500 w-32">{formatarDinheiro(precoBoleto)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="conversao-boleto" className="block text-sm font-medium text-gray-700">Conversão Boleto</label>
                    <span className="text-sm text-gray-500">{conversaoBoleto}%</span>
                  </div>
                  <input
                    id="conversao-boleto"
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={conversaoBoleto}
                    onChange={(e) => setConversaoBoleto(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                  />
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Vendas Estimadas</p>
                      <p className="font-medium text-gray-900">{calcularVendasProdutoPrincipal().total} unidades</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Faturamento</p>
                      <p className="font-medium text-gray-900">{formatarDinheiro(calcularFaturamentoProdutoPrincipal())}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Bumps */}
            <div className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800">Order Bumps</h3>
              <div className="space-y-4 mt-3">
                {/* Order Bump 1 */}
                <div>
                  <label htmlFor="preco-ob1" className="block text-sm font-medium text-gray-700">Preço Order Bump 1</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="preco-ob1"
                      type="number"
                      value={precoOrderBump1}
                      onChange={(e) => setPrecoOrderBump1(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <span className="text-sm text-gray-500 w-32">{formatarDinheiro(precoOrderBump1)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="conversao-ob1" className="block text-sm font-medium text-gray-700">Conversão OB1</label>
                    <span className="text-sm text-gray-500">{conversaoOrderBump1}%</span>
                  </div>
                  <input
                    id="conversao-ob1"
                    type="range"
                    min={0}
                    max={30}
                    step={1}
                    value={conversaoOrderBump1}
                    onChange={(e) => setConversaoOrderBump1(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                  />
                </div>
                
                {/* Order Bump 2 */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label htmlFor="preco-ob2" className="block text-sm font-medium text-gray-700">Preço Order Bump 2</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="preco-ob2"
                      type="number"
                      value={precoOrderBump2}
                      onChange={(e) => setPrecoOrderBump2(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    <span className="text-sm text-gray-500 w-32">{formatarDinheiro(precoOrderBump2)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="conversao-ob2" className="block text-sm font-medium text-gray-700">Conversão OB2</label>
                    <span className="text-sm text-gray-500">{conversaoOrderBump2}%</span>
                  </div>
                  <input
                    id="conversao-ob2"
                    type="range"
                    min={0}
                    max={20}
                    step={1}
                    value={conversaoOrderBump2}
                    onChange={(e) => setConversaoOrderBump2(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
                  />
                </div
