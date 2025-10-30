import React, { useRef, useEffect, useState } from 'react';
import ToggleSwitch from '../ToggleSwitch';

interface ColumnConfig {
    key: string;
    label: string;
    visible: boolean;
}

interface ManageColumnsModalProps {
    isOpen: boolean;
    onClose: () => void;
    columns: ColumnConfig[];
    setColumns: (columns: ColumnConfig[]) => void;
    anchorEl: HTMLElement | null;
}

const ManageColumnsModal: React.FC<ManageColumnsModalProps> = ({ isOpen, onClose, columns, setColumns, anchorEl }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);
    
    const idColumn = columns.find(c => c.key === 'id')!;
    const [localColumns, setLocalColumns] = useState(columns.filter(c => c.key !== 'id'));
    
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setLocalColumns(columns.filter(c => c.key !== 'id'));
    }, [columns]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 150); // animation duration
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);
    
    if (!isOpen || !anchorEl) return null;

    const rect = anchorEl.getBoundingClientRect();

    const handleToggleColumn = (key: string) => {
        const newLocalColumns = localColumns.map(c => c.key === key ? { ...c, visible: !c.visible } : c);
        setLocalColumns(newLocalColumns);
        setColumns([idColumn, ...newLocalColumns]);
    };

    const allHidden = localColumns.every(c => !c.visible);
    const handleToggleAll = () => {
        const shouldShow = allHidden;
        const newLocalColumns = localColumns.map(c => ({ ...c, visible: shouldShow }));
        setLocalColumns(newLocalColumns);
        setColumns([idColumn, ...newLocalColumns]);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
        setIsDragging(true);
        // Make the ghost image transparent
        e.dataTransfer.setDragImage(new Image(), 0, 0);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;
    };

    const handleDragEnd = () => {
        if (dragItem.current !== null && dragOverItem.current !== null) {
            const newColumns = [...localColumns];
            const dragItemContent = newColumns.splice(dragItem.current, 1)[0];
            newColumns.splice(dragOverItem.current, 0, dragItemContent);
            setColumns([idColumn, ...newColumns]);
            setLocalColumns(newColumns);
        }
        dragItem.current = null;
        dragOverItem.current = null;
        setIsDragging(false);
    };
    
    const getTransform = (index: number) => {
        if (!isDragging || dragItem.current === null || dragOverItem.current === null || dragItem.current === dragOverItem.current) {
            return 'translateY(0)';
        }

        const dragIndex = dragItem.current;
        const hoverIndex = dragOverItem.current;
        const itemHeight = 48; // Corresponds to h-12

        if (index === dragIndex) {
            return `translateY(${(hoverIndex - dragIndex) * itemHeight}px)`;
        }
        if (dragIndex < hoverIndex) { // dragging down
            if (index > dragIndex && index <= hoverIndex) {
                return `translateY(-${itemHeight}px)`;
            }
        } else { // dragging up
            if (index >= hoverIndex && index < dragIndex) {
                return `translateY(${itemHeight}px)`;
            }
        }
        return 'translateY(0)';
    };

    return (
        <div
            ref={modalRef}
            className={`absolute z-30 mt-2 w-80 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-border dark:border-dark-border origin-top-right ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
            style={{ 
                top: rect.bottom + window.scrollY + 8,
                right: window.innerWidth - rect.right - window.scrollX,
            }}
        >
            <div className="p-4 flex items-center justify-between border-b border-border dark:border-dark-border">
                <h4 className="font-semibold text-heading dark:text-dark-text-heading">Gerenciar Colunas</h4>
                <button onClick={handleToggleAll} className="text-sm font-medium text-text-body dark:text-dark-text-body hover:text-primary">
                    {allHidden ? 'Mostrar todas' : 'Esconder todas'}
                </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto scrollbar-hide">
                 {/* Locked ID Column */}
                <div className="flex items-center justify-between p-2 rounded-lg cursor-not-allowed opacity-70">
                    <div className="flex items-center gap-3">
                        <i className="ri-drag-move-2-line text-text-body dark:text-dark-text-body"></i>
                        <span className="font-medium text-heading dark:text-dark-text-heading text-base">{idColumn.label}</span>
                    </div>
                    <ToggleSwitch
                        checked={idColumn.visible}
                        onChange={() => {}}
                        disabled={true}
                    />
                </div>

                {/* Draggable Columns */}
                {localColumns.map((col, index) => (
                    <div 
                        key={col.key}
                        className={`flex items-center justify-between p-2 h-12 rounded-lg cursor-grab active:cursor-grabbing ${isDragging && dragItem.current === index ? 'opacity-50 bg-primary/10' : ''}`}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={(e) => handleDragEnter(e, index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        style={{
                            transform: getTransform(index),
                            transition: isDragging ? 'transform 0.2s ease-out' : 'none',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <i className="ri-drag-move-2-line text-text-body dark:text-dark-text-body"></i>
                            <span className="font-medium text-heading dark:text-dark-text-heading text-base">{col.label}</span>
                        </div>
                        <ToggleSwitch
                            checked={col.visible}
                            onChange={() => handleToggleColumn(col.key)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageColumnsModal;