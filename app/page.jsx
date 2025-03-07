'use client';

import { useState } from 'react';

export default function Home() {
  // Estado para parâmetros básicos
  const [ingressos, setIngressos] = useState(500);
  const [orcamentoTrafico, setOrcamentoTrafico] = useState(30000);
  const [precoGravacoes, setPrecoGravacoes] = useState(197);
  const [conversaoGravacoes, setConversaoGravacoes] = useState(18);
  const [precoProdutoPrincipal, setPrecoProdutoPrincipal] = useState(997);
  const [conversaoNormal, setConversaoNormal] = useState(9);
  
  // Aba ativa
  const [abaAtiva, setAbaAtiva] = useState('parametros');
  
  // Cálculos
  const calcularFaturamentoIngressos = () => {
    return ingressos * 35; // Ticket médio de R$ 35
  };
  
  const calcularFaturamentoGravacoes = () => {
    const vendasGravacoes = Math.round(ingressos * (conversaoGravacoes / 100));
    return vendasGravacoes * precoGravacoes;
  };
  
  const calcularVendasProdutoPrincipal = () => {
    return Math.round(ingressos * (conversaoNormal / 100));
  };
  
  const calcularFaturamentoProdutoPrincipal = () => {
    return calcularVendasProdutoPrincipal() * precoProdutoPrincipal;
  };
  
  const calcularFaturamentoCaptacao = () => {
    return calcularFaturamentoIngressos() + calcularFaturamentoGravacoes();
  };
  
  const calcularFaturamentoTotal = () => {
    return calcularFaturamentoCaptacao() + calcularFaturamentoProdutoPrincipal();
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
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800">Resultados de Ingressos</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <span className="text-sm text-gray-600">Ticket Médio de Ingressos</span>
                <p className="text-xl font-bold text-gray-800">R$ 35,00</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Faturamento Total de Ingressos</span>
                <p className="text-xl font-bold text-gray-800">{formatarDinheiro(calcularFaturamentoIngressos())}</p>
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
              <p className="text-2xl font-bold text-green-700">{calcularVendasProdutoPrincipal()}</p>
              <p className="text-sm text-gray-600 mt-2">Taxa de conversão: {conversaoNormal}%</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-800">ROAS</h3>
              <p className="text-2xl font-bold text-purple-700">{calcularROAS().toFixed(2)}x</p>
              <p className="text-sm text-gray-600 mt-2">Investimento: {formatarDinheiro(orcamentoTrafico)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
