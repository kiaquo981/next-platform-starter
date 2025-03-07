'use client';

import { useState } from 'react';

export default function Home() {
  // Estado para parâmetros básicos
  const [ingressos, setIngressos] = useState(500);
  const [precoMedio, setPrecoMedio] = useState(35);
  const [precoGravacoes, setPrecoGravacoes] = useState(197);
  const [conversaoGravacoes, setConversaoGravacoes] = useState(18);
  const [precoProdutoPrincipal, setPrecoProdutoPrincipal] = useState(997);
  const [conversaoProduto, setConversaoProduto] = useState(15);
  const [orcamentoTrafico, setOrcamentoTrafico] = useState(30000);
  const [abaAtiva, setAbaAtiva] = useState('parametros');
  
  // Cálculos simples
  const calcularFaturamentoIngressos = () => ingressos * precoMedio;
  const calcularVendasGravacoes = () => Math.round(ingressos * (conversaoGravacoes / 100));
  const calcularFaturamentoGravacoes = () => calcularVendasGravacoes() * precoGravacoes;
  const calcularVendasProduto = () => Math.round(ingressos * (conversaoProduto / 100));
  const calcularFaturamentoProduto = () => calcularVendasProduto() * precoProdutoPrincipal;
  const calcularFaturamentoTotal = () => calcularFaturamentoIngressos() + calcularFaturamentoGravacoes() + calcularFaturamentoProduto();
  const calcularROAS = () => orcamentoTrafico > 0 ? calcularFaturamentoTotal() / orcamentoTrafico : 0;
  
  // Formatação de valores
  const formatarDinheiro = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="p-4 w-full bg-white rounded-lg shadow">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Simulador de Lançamento Pago</h1>
        <p className="text-gray-600">Projeções financeiras para seu lançamento de produtos</p>
      </div>

      {/* Navegação de Abas */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4">
          <button 
            onClick={() => setAbaAtiva('parametros')}
            className={`py-2 px-4 ${abaAtiva === 'parametros' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Parâmetros
          </button>
          <button 
            onClick={() => setAbaAtiva('trafego')}
            className={`py-2 px-4 ${abaAtiva === 'trafego' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Tráfego
          </button>
          <button 
            onClick={() => setAbaAtiva('resultados')}
            className={`py-2 px-4 ${abaAtiva === 'resultados' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Resultados
          </button>
        </nav>
      </div>

      {/* Conteúdo das Abas */}
      {abaAtiva === 'parametros' && (
        <div className="space-y-6">
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-3">Ingressos</h3>
            <div className="mb-4">
              <label className="block text-sm mb-1">Quantidade de Ingressos</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="50"
                  value={ingressos}
                  onChange={(e) => setIngressos(Number(e.target.value))}
                  className="w-full"
                />
                <span className="ml-3 w-20 text-center bg-blue-50 p-1 rounded">{ingressos}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm mb-1">Preço Médio</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={precoMedio}
                  onChange={(e) => setPrecoMedio(Number(e.target.value))}
                  className="w-24 p-1 border rounded"
                />
                <span className="ml-3">{formatarDinheiro(precoMedio)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded mt-3">
              <div className="flex justify-between">
                <span>Faturamento de Ingressos:</span>
                <span className="font-medium">{formatarDinheiro(calcularFaturamentoIngressos())}</span>
              </div>
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-3">Gravações (Order Bump)</h3>
            <div className="mb-4">
              <label className="block text-sm mb-1">Preço das Gravações</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={precoGravacoes}
                  onChange={(e) => setPrecoGravacoes(Number(e.target.value))}
                  className="w-24 p-1 border rounded"
                />
                <span className="ml-3">{formatarDinheiro(precoGravacoes)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm mb-1">Taxa de Conversão</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={conversaoGravacoes}
                  onChange={(e) => setConversaoGravacoes(Number(e.target.value))}
                  className="w-full"
                />
                <span className="ml-3 w-12 text-center">{conversaoGravacoes}%</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded mt-3">
              <div className="flex justify-between mb-2">
                <span>Vendas de Gravações:</span>
                <span className="font-medium">{calcularVendasGravacoes()} unidades</span>
              </div>
              <div className="flex justify-between">
                <span>Faturamento de Gravações:</span>
                <span className="font-medium">{formatarDinheiro(calcularFaturamentoGravacoes())}</span>
              </div>
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-3">Produto Principal</h3>
            <div className="mb-4">
              <label className="block text-sm mb-1">Preço do Produto</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={precoProdutoPrincipal}
                  onChange={(e) => setPrecoProdutoPrincipal(Number(e.target.value))}
                  className="w-24 p-1 border rounded"
                />
                <span className="ml-3">{formatarDinheiro(precoProdutoPrincipal)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm mb-1">Taxa de Conversão</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={conversaoProduto}
                  onChange={(e) => setConversaoProduto(Number(e.target.value))}
                  className="w-full"
                />
                <span className="ml-3 w-12 text-center">{conversaoProduto}%</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded mt-3">
              <div className="flex justify-between mb-2">
                <span>Vendas do Produto:</span>
                <span className="font-medium">{calcularVendasProduto()} unidades</span>
              </div>
              <div className="flex justify-between">
                <span>Faturamento do Produto:</span>
                <span className="font-medium">{formatarDinheiro(calcularFaturamentoProduto())}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {abaAtiva === 'trafego' && (
        <div className="space-y-6">
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-3">Configuração de Tráfego</h3>
            <div className="mb-4">
              <label className="block text-sm mb-1">Orçamento de Tráfego</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={orcamentoTrafico}
                  onChange={(e) => setOrcamentoTrafico(Number(e.target.value))}
                  className="w-32 p-1 border rounded"
                />
                <span className="ml-3">{formatarDinheiro(orcamentoTrafico)}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded mt-4">
              <div className="flex justify-between mb-2">
                <span>ROAS (Retorno sobre Investimento):</span>
                <span className="font-medium">{calcularROAS().toFixed(2)}x</span>
              </div>
              <div className="flex justify-between">
                <span>Custo por Aquisição (CPA):</span>
                <span className="font-medium">{formatarDinheiro(orcamentoTrafico / ingressos)}</span>
              </div>
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-3">Análise de Cenários</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium text-blue-800">Cenário Conservador</h4>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Faturamento Total:</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal() * 0.8)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ROAS:</span>
                    <span>{(calcularROAS() * 0.8).toFixed(2)}x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded">
                <h4 className="font-medium text-green-800">Cenário Realista</h4>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Faturamento Total:</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ROAS:</span>
                    <span>{calcularROAS().toFixed(2)}x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <h4 className="font-medium text-purple-800">Cenário Otimista</h4>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Faturamento Total:</span>
                    <span>{formatarDinheiro(calcularFaturamentoTotal() * 1.2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ROAS:</span>
                    <span>{(calcularROAS() * 1.2).toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {abaAtiva === 'resultados' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded shadow">
              <h3 className="font-medium mb-2">Faturamento Total</h3>
              <p className="text-2xl font-bold text-blue-700">{formatarDinheiro(calcularFaturamentoTotal())}</p>
              <p className="text-sm text-gray-600 mt-2">Com {ingressos} ingressos vendidos</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded shadow">
              <h3 className="font-medium mb-2">Vendas Produto Principal</h3>
              <p className="text-2xl font-bold text-green-700">{calcularVendasProduto()}</p>
              <p className="text-sm text-gray-600 mt-2">Taxa de conversão: {conversaoProduto}%</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded shadow">
              <h3 className="font-medium mb-2">ROAS</h3>
              <p className="text-2xl font-bold text-purple-700">{calcularROAS().toFixed(2)}x</p>
              <p className="text-sm text-gray-600 mt-2">Investimento: {formatarDinheiro(orcamentoTrafico)}</p>
            </div>
          </div>
          
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-3">Detalhamento de Receita</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span>Faturamento de Ingressos:</span>
                <span className="font-medium">{formatarDinheiro(calcularFaturamentoIngressos())}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Faturamento de Gravações:</span>
                <span className="font-medium">{formatarDinheiro(calcularFaturamentoGravacoes())}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Faturamento do Produto Principal:</span>
                <span className="font-medium">{formatarDinheiro(calcularFaturamentoProduto())}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Faturamento Total:</span>
                <span>{formatarDinheiro(calcularFaturamentoTotal())}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded shadow">
            <h3 className="font-medium mb-3">Insights</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">→</span>
                <span>
                  {calcularFaturamentoIngressos() > orcamentoTrafico ? 
                    `A fase de captação já gerou ${formatarDinheiro(calcularFaturamentoIngressos())}, superando o investimento em tráfego de ${formatarDinheiro(orcamentoTrafico)}.` : 
                    `A fase de captação gerou ${formatarDinheiro(calcularFaturamentoIngressos())}, representando ${((calcularFaturamentoIngressos() / orcamentoTrafico) * 100).toFixed(1)}% do investimento em tráfego.`}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">→</span>
                <span>
                  A venda de gravações aumentou o ticket médio da captação em {formatarDinheiro(calcularFaturamentoGravacoes() / ingressos)} por ingresso.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">→</span>
                <span>
                  O ticket médio total por lead foi de {formatarDinheiro(calcularFaturamentoTotal() / ingressos)}.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
