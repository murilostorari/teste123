
import React from 'react';
import { StatCardData } from '../types';
import { IconProps } from './icons/IconProps';

const InfoIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14.6666C11.6819 14.6666 14.6667 11.6819 14.6667 7.99998C14.6667 4.31808 11.6819 1.33331 8 1.33331C4.3181 1.33331 1.33333 4.31808 1.33333 7.99998C1.33333 11.6819 4.3181 14.6666 8 14.6666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10.6667V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 5.33331H8.00667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowUpIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 6L6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowDownIcon: React.FC<IconProps> = ({ className }) => <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.5 6L6 9.5L2.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const StatCard: React.FC<StatCardData> = ({ title, value, change, changeType, period }) => {
  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-gray-border dark:border-dark-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-text-body dark:text-dark-text-body">{title}</h3>
        <button className="text-gray-400 dark:text-dark-subtle">
            <InfoIcon className="w-5 h-5" />
        </button>
      </div>
      <p className="text-3xl font-semibold text-heading dark:text-dark-text-heading mb-4">{value}</p>
      <div className="flex items-center text-base">
        <div className={`flex items-center mr-2 ${changeColor}`}>
            {isIncrease ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
            <span className="font-medium ml-1">{change}%</span>
        </div>
        <span className="text-text-body dark:text-dark-text-body">{period || 'vs mês passado'}</span>
      </div>
    </div>
  );
};

export default StatCard;