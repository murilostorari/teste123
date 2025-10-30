import React, { useState, useEffect } from 'react';

const LocationModal: React.FC<{
    onClose: () => void;
    onLocationSelect: (location: string) => void;
}> = ({ onClose, onLocationSelect }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [cities] = useState([
        'São Paulo, SP',
        'Rio de Janeiro, RJ',
        'Belo Horizonte, MG',
        'Salvador, BA',
        'Fortaleza, CE',
        'Curitiba, PR',
        'Manaus, AM',
        'Recife, PE',
        'Porto Alegre, RS',
        'Brasília, DF',
    ]);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => setIsVisible(true));
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleUseCurrentLocation = () => {
        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, use reverse geocoding here.
                // For this demo, we'll use a placeholder.
                setTimeout(() => {
                    onLocationSelect(`Localização Atual`);
                    setIsLoadingLocation(false);
                    handleClose();
                }, 1000);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Não foi possível obter a sua localização. Por favor, verifique as permissões do seu navegador e tente novamente.");
                setIsLoadingLocation(false);
            }
        );
    };

    const handleSelectCity = (city: string) => {
        onLocationSelect(city);
        handleClose();
    };

    const filteredCities = cities.filter(city => city.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'opacity-50' : 'opacity-0'}`}
                onClick={handleClose}
            ></div>
            <div
                className={`relative bg-white rounded-2xl shadow-lg w-full max-w-md transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-heading">Selecione sua Localização</h2>
                        <button onClick={handleClose} className="text-text-body hover:text-primary transition-colors">
                            <i className="ri-close-line text-2xl"></i>
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-text-body"></i>
                        <input
                            type="text"
                            placeholder="Buscar cidade"
                            className="w-full bg-background border border-border rounded-full py-3 pl-12 pr-4 text-heading placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleUseCurrentLocation}
                        disabled={isLoadingLocation}
                        className="w-full flex items-center justify-center gap-2 border border-primary text-primary font-semibold py-3 px-6 rounded-full h-14 hover:bg-primary/5 transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isLoadingLocation ? (
                            <i className="ri-loader-4-line animate-spin text-xl"></i>
                        ) : (
                            <i className="ri-focus-3-line text-xl"></i>
                        )}
                        <span>Usar localização atual</span>
                    </button>
                    <div className="my-4 text-center text-text-body text-sm">OU</div>
                    <ul className="space-y-1 max-h-64 overflow-y-auto">
                        {filteredCities.map(city => (
                            <li key={city}>
                                <button onClick={() => handleSelectCity(city)} className="w-full text-left p-3 rounded-lg hover:bg-background transition-colors text-heading">
                                    {city}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;