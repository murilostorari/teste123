
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SalesData } from '../types';

interface SalesOverviewChartProps {
  data: SalesData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-heading text-white p-3 rounded-lg shadow-lg">
        <p className="font-bold text-lg">{`R$${payload[0].value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`}</p>
        <p className="text-sm text-gray-300">{`${label} de 2025`}</p>
      </div>
    );
  }

  return null;
};


const SalesOverviewChart: React.FC<SalesOverviewChartProps> = ({ data }) => {
  return (
    <div>
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-lg font-semibold text-heading">Visão Geral de Vendas</h2>
                <div className="flex items-center mt-1">
                    <p className="text-2xl font-bold text-heading">R$23.365</p>
                    <div className="flex items-center ml-2 text-sm text-green-500 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                        <span>3.1%</span>
                    </div>
                    <p className="text-sm text-text-body ml-1">vs ano passado</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-text-body">
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-brand-green mr-2"></span>Este Ano</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>Ano Passado</div>
                </div>
                 <button className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-border rounded-lg text-sm font-medium text-text-body hover:bg-gray-100 transition-colors duration-200">
                    <span>Anual</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
            </div>
        </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#667085', fontSize: 12 }} />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#667085', fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}K`}
            domain={[0, 'dataMax + 5000']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3B8289', strokeWidth: 1, strokeDasharray: '3 3' }}/>
          
          <Line 
            type="monotone" 
            dataKey="Ano Passado" 
            stroke="#D0D5DD" 
            strokeWidth={2} 
            dot={false} 
          />
          <Line 
            type="monotone" 
            dataKey="Este Ano" 
            stroke="#3B8289" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6, fill: '#3B8289', stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverviewChart;