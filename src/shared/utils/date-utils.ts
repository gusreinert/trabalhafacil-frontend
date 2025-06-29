export const getHours = (dataString: string): string => {
    const data = new Date(dataString);

    return data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};