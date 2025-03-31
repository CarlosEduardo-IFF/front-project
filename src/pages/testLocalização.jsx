import React, { useState } from 'react';

function LocalizacaoComBotao() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [erro, setErro] = useState(null);
    const [status, setStatus] = useState("Aguardando...");

    const obterLocalizacao = () => {
        setStatus("Obtendo localização..."); // Atualiza status antes de buscar

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setStatus(null); // Remove o status após obter a localização
                },
                (error) => {
                    setErro(error.message);
                    setStatus(null); // Remove o status em caso de erro
                }
            );
        } else {
            setErro("Geolocalização não é suportada por este navegador.");
            setStatus(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <button
                onClick={obterLocalizacao}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
                Obter Localização
            </button>

            {/* Exibe o status enquanto não obteve a localização */}
            {status && <p className="mt-4 text-lg font-semibold">{status}</p>}

            {/* Exibe as coordenadas após obtê-las */}
            {latitude !== null && longitude !== null && (
                <div className="mt-4 p-4 bg-green-200 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Localização Obtida:</p>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
            )}

            {/* Exibe erro, se houver */}
            {erro && <p className="mt-4 text-red-500">{erro}</p>}
        </div>
    );
}

export default LocalizacaoComBotao;